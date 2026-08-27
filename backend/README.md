# VSCF Backend (FastAPI)

Backend API for the Venkata Sivaji Charitable Foundation website. Python 3.12+, FastAPI,
SQLite (stdlib `sqlite3`, file at `backend/data/vscf.db` — created automatically).

## Run locally

```bash
cd backend
python -m venv .venv                 # optional but recommended
.venv\Scripts\activate               # Windows   (Linux/macOS: source .venv/bin/activate)
pip install -r requirements.txt
cp .env.example .env                 # then edit values as needed

python main.py                       # respects PORT from .env (default 8787)
# or:
uvicorn main:app --host 0.0.0.0 --port 8787
```

The API is then at `http://localhost:8787/api/...` (`GET /api/health` to smoke-test).
Without Razorpay keys the server runs in **mock mode**: donation orders and verification
succeed without contacting Razorpay, so the full donate flow can be tested end-to-end.

## Switching from mock to live Razorpay

1. Log in at [dashboard.razorpay.com](https://dashboard.razorpay.com) → **Settings → API Keys**
   and generate a Key ID + Key Secret (use Test keys first, then Live keys after KYC).
2. Put them in `backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```
3. Restart the server. `GET /api/health` should now return `"mock": false`, and the
   frontend will open the real Razorpay checkout.

**Settlement:** Razorpay settles captured payments to the foundation's registered bank
account on a T+2 working-day cycle (configurable in the Razorpay dashboard).

**Monthly donations:** currently recorded as one-time payments (the `frequency` field is
stored with the donation). True recurring billing via Razorpay Subscriptions can be added
later without changing the frontend contract.

## Deploying on a Linux server

```bash
cd /opt/vscf/backend
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env   # set JWT_SECRET + Razorpay keys
```

Run it under a process manager — either pm2:

```bash
pm2 start ".venv/bin/uvicorn main:app --host 127.0.0.1 --port 8787" --name vscf-api
pm2 save
```

or a systemd unit (`/etc/systemd/system/vscf-api.service`):

```ini
[Unit]
Description=VSCF API
After=network.target

[Service]
WorkingDirectory=/opt/vscf/backend
ExecStart=/opt/vscf/backend/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8787
Restart=always

[Install]
WantedBy=multi-user.target
```

Then reverse-proxy `/api` through nginx:

```nginx
server {
    server_name example.org;

    location /api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

(Advice: add HTTPS with certbot, and set `CORS_ORIGINS` in `.env` to the real site origin.)
