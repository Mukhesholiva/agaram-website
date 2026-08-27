"""VSCF backend — FastAPI + stdlib sqlite3.

Implements the VSCF website API contract: /api/health, /api/auth/*,
/api/donations/*, /api/contact, /api/volunteers. All errors are returned
as {"error": "..."} JSON (never FastAPI's default {"detail": ...}).
"""

import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import threading
import traceback
from datetime import datetime, timedelta, timezone
from pathlib import Path

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

# ---------------------------------------------------------------- config ----
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

PORT = int(os.getenv("PORT", "8787"))

JWT_SECRET = os.getenv("JWT_SECRET") or "vscf-dev-secret-change-me"
if not os.getenv("JWT_SECRET"):
    print("[vscf] WARNING: JWT_SECRET is not set — using an insecure dev default. "
          "Set it in backend/.env for production.")

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
MOCK_PAYMENTS = not (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET)
if MOCK_PAYMENTS:
    print("[vscf] Razorpay keys not set — payments run in MOCK mode (no real money moves).")
    razorpay_client = None
else:
    import razorpay  # imported only when actually needed
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

CORS_ORIGINS = [
    o.strip()
    for o in (
        os.getenv("CORS_ORIGINS")
        or "http://localhost:5173,http://localhost:4173,https://mukhesholiva.github.io"
    ).split(",")
    if o.strip()
]

# -------------------------------------------------------------------- db ----
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

db = sqlite3.connect(DATA_DIR / "vscf.db", check_same_thread=False)
db.row_factory = sqlite3.Row
db_lock = threading.Lock()

db.executescript(
    """
    CREATE TABLE IF NOT EXISTS users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT,
        email         TEXT UNIQUE,
        phone         TEXT,
        password_hash TEXT,
        created_at    TEXT DEFAULT current_timestamp
    );
    CREATE TABLE IF NOT EXISTS donations (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id    INTEGER NULL,
        donor_json TEXT,
        amount     INTEGER,
        frequency  TEXT,
        plan       TEXT,
        order_id   TEXT,
        payment_id TEXT,
        status     TEXT,
        created_at TEXT DEFAULT current_timestamp
    );
    CREATE TABLE IF NOT EXISTS messages (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        type         TEXT,
        payload_json TEXT,
        created_at   TEXT DEFAULT current_timestamp
    );
    """
)
db.commit()


def db_write(sql: str, params: tuple = ()) -> int:
    """Run a write statement under the lock; return lastrowid."""
    with db_lock:
        cur = db.execute(sql, params)
        db.commit()
        return cur.lastrowid


def db_get(sql: str, params: tuple = ()):
    with db_lock:
        return db.execute(sql, params).fetchone()


def db_all(sql: str, params: tuple = ()):
    with db_lock:
        return db.execute(sql, params).fetchall()


# --------------------------------------------------------------- helpers ----
EMAIL_RE = re.compile(r"^\S+@\S+\.\S+$")


def err(status: int, message: str) -> JSONResponse:
    return JSONResponse({"error": message}, status_code=status)


def is_nonempty_str(v) -> bool:
    return isinstance(v, str) and v.strip() != ""


def is_email(v) -> bool:
    return isinstance(v, str) and bool(EMAIL_RE.match(v.strip()))


def random_id(prefix: str) -> str:
    return prefix + secrets.token_hex(10)


def sign_token(user: sqlite3.Row) -> str:
    payload = {
        "uid": user["id"],
        "email": user["email"],
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def public_user(user: sqlite3.Row) -> dict:
    return {"id": user["id"], "name": user["name"], "email": user["email"], "phone": user["phone"]}


def read_auth(request: Request):
    """Return the decoded JWT payload ({uid, email}) or None."""
    header = request.headers.get("authorization", "")
    parts = header.split(" ", 1)
    if len(parts) != 2 or parts[0] != "Bearer" or not parts[1].strip():
        return None
    try:
        return jwt.decode(parts[1].strip(), JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        return None


async def read_json(request: Request):
    """Parse the JSON body; return (data, None) or (None, error-response)."""
    try:
        data = await request.json()
    except Exception:
        return None, err(400, "Invalid JSON body")
    if not isinstance(data, dict):
        return None, err(400, "JSON object body required")
    return data, None


# ------------------------------------------------------------------- app ----
app = FastAPI(title="VSCF API", docs_url=None, redoc_url=None, openapi_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(_request: Request, exc: StarletteHTTPException):
    message = exc.detail if isinstance(exc.detail, str) else "Error"
    return JSONResponse({"error": message}, status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, _exc: RequestValidationError):
    return err(400, "Invalid request body")


@app.exception_handler(Exception)
async def unhandled_exception_handler(_request: Request, exc: Exception):
    traceback.print_exception(exc)  # log to console only — never leaked to clients
    return err(500, "Internal server error")


# GET /api/health
@app.get("/api/health")
async def health():
    return {"ok": True, "mock": MOCK_PAYMENTS}


# POST /api/auth/register
@app.post("/api/auth/register", status_code=201)
async def register(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    name, email, password, phone = (body.get("name"), body.get("email"),
                                    body.get("password"), body.get("phone"))
    if not is_nonempty_str(name):
        return err(400, "Name is required")
    if not is_email(email):
        return err(400, "A valid email is required")
    if not isinstance(password, str) or len(password) < 6:
        return err(400, "Password must be at least 6 characters")

    norm_email = email.strip().lower()
    if db_get("SELECT id FROM users WHERE email = ?", (norm_email,)):
        return err(409, "Email already registered")

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=10)).decode("utf-8")
    uid = db_write(
        "INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)",
        (name.strip(), norm_email, phone.strip() if is_nonempty_str(phone) else None, password_hash),
    )
    user = db_get("SELECT * FROM users WHERE id = ?", (uid,))
    return JSONResponse({"token": sign_token(user), "user": public_user(user)}, status_code=201)


# POST /api/auth/login
@app.post("/api/auth/login")
async def login(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    email, password = body.get("email"), body.get("password")
    if not is_email(email) or not isinstance(password, str):
        return err(400, "Email and password are required")

    user = db_get("SELECT * FROM users WHERE email = ?", (email.strip().lower(),))
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
        return err(401, "Invalid email or password")
    return {"token": sign_token(user), "user": public_user(user)}


# GET /api/auth/me
@app.get("/api/auth/me")
async def me(request: Request):
    auth = read_auth(request)
    if not auth:
        return err(401, "Authentication required")
    user = db_get("SELECT * FROM users WHERE id = ?", (auth["uid"],))
    if not user:
        return err(401, "Account no longer exists")
    return {"user": public_user(user)}


# POST /api/donations/order  (auth OPTIONAL — attach user if token present)
@app.post("/api/donations/order", status_code=201)
async def create_order(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    amount = body.get("amount")
    frequency = body.get("frequency", "once")
    plan = body.get("plan")
    donor = body.get("donor")

    if not isinstance(amount, int) or isinstance(amount, bool) or amount < 1:
        return err(400, "Amount must be a whole number of rupees (at least 1)")
    if frequency not in ("once", "monthly"):
        return err(400, 'Frequency must be "once" or "monthly"')
    if not isinstance(donor, dict):
        return err(400, "Donor details are required")
    if not is_nonempty_str(donor.get("name")):
        return err(400, "Donor name is required")
    if not is_email(donor.get("email")):
        return err(400, "A valid donor email is required")
    if not is_nonempty_str(donor.get("phone")):
        return err(400, "Donor phone is required")

    auth = read_auth(request)
    user_id = auth["uid"] if auth else None
    plan_str = None if plan is None else str(plan)

    donation_id = db_write(
        "INSERT INTO donations (user_id, donor_json, amount, frequency, plan, status) "
        "VALUES (?, ?, ?, ?, ?, 'created')",
        (user_id, json.dumps(donor), amount, frequency, plan_str),
    )

    if MOCK_PAYMENTS:
        order_id = random_id("mock_order_")
        key_id = None
    else:
        order = razorpay_client.order.create(
            {
                "amount": amount * 100,  # paise
                "currency": "INR",
                "receipt": f"vscf_don_{donation_id}",
                "notes": {
                    "donationId": str(donation_id),
                    "frequency": frequency,
                    "plan": plan_str or "",
                },
            }
        )
        order_id = order["id"]
        key_id = RAZORPAY_KEY_ID

    db_write("UPDATE donations SET order_id = ? WHERE id = ?", (order_id, donation_id))
    return JSONResponse(
        {
            "orderId": order_id,
            "amount": amount,
            "currency": "INR",
            "keyId": key_id,
            "mock": MOCK_PAYMENTS,
            "donationId": donation_id,
        },
        status_code=201,
    )


# POST /api/donations/verify
@app.post("/api/donations/verify")
async def verify_payment(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    donation_id = body.get("donationId")
    order_id = body.get("orderId")
    payment_id = body.get("paymentId")
    signature = body.get("signature")

    if not donation_id or not is_nonempty_str(order_id):
        return err(400, "donationId and orderId are required")

    donation = db_get("SELECT * FROM donations WHERE id = ?", (donation_id,))
    if not donation or donation["order_id"] != order_id:
        return err(400, "Unknown donation or order mismatch")

    if MOCK_PAYMENTS:
        final_payment_id = random_id("mock_pay_")
    else:
        if not is_nonempty_str(payment_id) or not is_nonempty_str(signature):
            return err(400, "paymentId and signature are required")
        expected = hmac.new(
            RAZORPAY_KEY_SECRET.encode("utf-8"),
            f"{order_id}|{payment_id}".encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(expected, str(signature)):
            db_write(
                "UPDATE donations SET status = 'failed', payment_id = ? WHERE id = ?",
                (payment_id, donation["id"]),
            )
            return err(400, "Payment signature verification failed")
        final_payment_id = payment_id

    db_write(
        "UPDATE donations SET status = 'paid', payment_id = ? WHERE id = ?",
        (final_payment_id, donation["id"]),
    )
    return {
        "status": "paid",
        "receipt": {
            "id": donation["id"],
            "amount": donation["amount"],
            "frequency": donation["frequency"],
            "plan": donation["plan"],
            "paidAt": datetime.now(timezone.utc).isoformat(),
        },
    }


# GET /api/donations/mine
@app.get("/api/donations/mine")
async def my_donations(request: Request):
    auth = read_auth(request)
    if not auth:
        return err(401, "Authentication required")
    rows = db_all(
        "SELECT id, amount, frequency, plan, status, order_id, payment_id, created_at "
        "FROM donations WHERE user_id = ? ORDER BY id DESC",
        (auth["uid"],),
    )
    return {
        "donations": [
            {
                "id": r["id"],
                "amount": r["amount"],
                "frequency": r["frequency"],
                "plan": r["plan"],
                "status": r["status"],
                "orderId": r["order_id"],
                "paymentId": r["payment_id"],
                "createdAt": r["created_at"],
            }
            for r in rows
        ]
    }


# POST /api/contact
@app.post("/api/contact", status_code=201)
async def contact(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    name, phone, email, message = (body.get("name"), body.get("phone"),
                                   body.get("email"), body.get("message"))
    if not is_nonempty_str(name):
        return err(400, "Name is required")
    if not is_email(email):
        return err(400, "A valid email is required")
    if not is_nonempty_str(message):
        return err(400, "Message is required")
    db_write(
        "INSERT INTO messages (type, payload_json) VALUES ('contact', ?)",
        (json.dumps({"name": name, "phone": phone, "email": email, "message": message}),),
    )
    return JSONResponse({"ok": True}, status_code=201)


# POST /api/volunteers
@app.post("/api/volunteers", status_code=201)
async def volunteers(request: Request):
    body, bad = await read_json(request)
    if bad:
        return bad
    if not body:
        return err(400, "Volunteer form data is required")
    db_write(
        "INSERT INTO messages (type, payload_json) VALUES ('volunteer', ?)",
        (json.dumps(body),),
    )
    return JSONResponse({"ok": True}, status_code=201)


# ------------------------------------------------------------------ main ----
if __name__ == "__main__":
    import uvicorn

    print(f"[vscf] API starting on http://localhost:{PORT} "
          f"(payments: {'MOCK' if MOCK_PAYMENTS else 'LIVE Razorpay'})")
    uvicorn.run(app, host="0.0.0.0", port=PORT)
