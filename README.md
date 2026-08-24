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

Forms (contact, donate, login, volunteer) are UI-only — no backend is wired yet.
