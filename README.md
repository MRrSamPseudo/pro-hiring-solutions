# Pro Hiring Solutions

Marketing + application site for **Pro Hiring Solutions**, a recruitment & staffing agency.

- **`web/`** — Next.js 14 (App Router) frontend. Deploys to **Vercel**.
- **`server/`** — Express API. Deploys to **Render**. Validates applications and
  forwards them to a **Google Sheet** via a Google Apps Script webhook.
- Application flow: form (Vercel) → API `/api/apply` (Render) → Google Sheet.

## Local development

```bash
# API
cd server && npm install && npm run dev      # http://localhost:8080

# Web (separate terminal)
cd web && npm install && npm run dev          # http://localhost:3000
```

Create `web/.env.local` from `web/.env.example` and set:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Without the API running, the form still validates; submissions log to the API console.

## Deployment

Full step-by-step in **[DEPLOY.md](DEPLOY.md)** — GitHub, Render, Google Sheets, Vercel, Cloudinary.

## Editing content

Almost all copy lives in:
- `web/lib/site.ts` — name, phone, email, stats, nav.
- `web/components/Sections.tsx` — services, process, roles, perks, testimonials, FAQ.

## Brand / logo

The header/footer use a scalable inline SVG monogram (`web/components/Logo.tsx`,
`web/app/icon.svg`). To use the raster brand logo instead, drop it at
`web/public/logo.png` and swap `LogoWordmark` for an `<Image>` — or upload it to
Cloudinary and reference the URL (see DEPLOY.md).
