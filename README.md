# Pro Hiring Solutions

Marketing + application site for **Pro Hiring Solutions**, a recruitment & staffing agency.

Live: **https://prohiringsolutions.site** · Contact: **contact@prohiringsolutions.site**

- **`web/`** — Next.js (App Router) site plus the `/api/apply` route. Deploys to **Vercel**.
- **`apps-script/Code.gs`** — Google Apps Script bound to the applications Google Sheet.
  It appends each application as a row and emails the lead to the business mailbox.
- Application flow: form → `/api/apply` (Vercel, validates) → Apps Script → Google Sheet + email.

## Local development

```bash
cd web && npm install && npm run dev          # http://localhost:3000
```

The form needs `SHEETS_WEBHOOK_URL` (the Apps Script `/exec` URL) to save submissions.
Without it, `/api/apply` validates input and returns 503. Never commit that URL:
it is the credential that lets callers write to the Sheet.

## Deployment

See **[DEPLOY.md](DEPLOY.md)**.

## Editing content

Almost all copy lives in:
- `web/lib/site.ts` — name, URL, phone, email, stats.
- `web/components/Sections.tsx` — hero, benefits, responsibilities, FAQ, footer.

## Brand / logo

`web/public/logo.png` (header/footer) and `web/app/icon.png` (favicon). The original
artwork is in `brand/`.
