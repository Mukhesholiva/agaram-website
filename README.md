# Venkata Sivaji Charitable Foundation — Website

React rebuild of the foundation website (layout based on agaram.in), built with Vite + React 18 + React Router v6.

## Pages

Home, Our Mission, Our Journey, Financials, Partners, Contact, Donate, Login, Profile, Volunteers (Join Us), Privacy Policy, Terms & Conditions.

## Development

```bash
npm install
npm run dev       # dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build
```

## Structure

- `src/pages/` — one component per route
- `src/components/` — shared Navbar / Footer (incl. mobile bottom tab bar)
- `src/data/partners.js` — partner institutions list (75 entries)
- `public/css/` — compiled site stylesheets (Tailwind/HeroUI utilities)
- `public/assets/` — images, documents, fonts

## Backend

`backend/` holds a FastAPI service (SQLite + JWT auth + Razorpay) powering login/register,
profile with donation history, donation orders + payment verification, and the contact /
volunteer forms. See `backend/README.md` for running it, switching Razorpay from mock to
live keys, and deploying with nginx.

The frontend reads the API base URL from `VITE_API_BASE` at build time
(default `http://localhost:8787`). For the GitHub Pages deploy, set a repository
variable `VITE_API_BASE` to the hosted backend URL.
