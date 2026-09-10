# Deployment guide — Pro Hiring Solutions

Order: **GitHub → Google Sheet + Apps Script → Render (API) → Vercel (web) → Cloudinary (optional)**.

---

## 1. Push to GitHub

```bash
cd "Pro Hiring Solutions"
git add -A
git commit -m "Initial Pro Hiring Solutions site"
git branch -M main
git remote add origin https://github.com/<you>/pro-hiring-solutions.git
git push -u origin main
```

---

## 2. Google Sheet + Apps Script (the data sink)

1. Create/open the Google Sheet you want applications in. Name a tab, e.g. `Applications`.
2. **Extensions → Apps Script**. Delete the default code, paste **`server/google-apps-script.gs`**.
3. In that script set:
   - `SHEET_NAME` = your tab name.
   - `SECRET` = a random string (or leave `''`). If set, use the same value for
     `SHEETS_WEBHOOK_TOKEN` on Render.
4. **Deploy → New deployment → Web app**:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
5. Authorize when prompted. Copy the **Web app URL** (ends in `/exec`).
   This URL is your `SHEETS_WEBHOOK_URL`.

> The URL is only known to your Render server, never exposed to the browser.

---

## 3. Render (Express API)

**Option A — Blueprint (uses `render.yaml`):** New → Blueprint → pick the repo.

**Option B — manual:** New → Web Service → the repo, then set:
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/health`

Set environment variables (Render → the service → Environment):

| Key | Value |
|-----|-------|
| `SHEETS_WEBHOOK_URL` | the `/exec` URL from step 2 |
| `SHEETS_WEBHOOK_TOKEN` | the `SECRET` (only if you set one) |
| `ALLOWED_ORIGINS` | `https://<your-vercel-domain>` (add the custom domain too, comma-separated) |

Deploy, then note the service URL, e.g. `https://pro-hiring-api.onrender.com`.
Test: `GET /health` → `{"ok":true}`.

> Free Render services sleep when idle; the first request after idle can take
> ~30s to wake. Upgrade the plan to avoid cold starts.

---

## 4. Vercel (Next.js web)

New Project → import the repo:
- **Root Directory**: `web`
- Framework preset auto-detects **Next.js**.

Environment variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_BASE_URL` | your Render URL, e.g. `https://pro-hiring-api.onrender.com` |

Deploy. Then go back to **Render** and put the final Vercel domain(s) into
`ALLOWED_ORIGINS`, and redeploy the API.

### Custom domain
Add `prohiringsolutions.com` in Vercel → Domains, follow DNS steps, then add
that domain to Render `ALLOWED_ORIGINS`.

---

## 5. Cloudinary (optional — images/logo)

Use for any raster images (real logo, team photos, OG image).

1. Upload the asset in the Cloudinary dashboard; copy its **secure URL**
   (`https://res.cloudinary.com/<cloud>/image/upload/...`).
2. `next.config.mjs` already allows `res.cloudinary.com`, so use `next/image`:

```tsx
import Image from 'next/image';
<Image src="https://res.cloudinary.com/<cloud>/image/upload/v1/logo.png"
       alt="Pro Hiring Solutions" width={160} height={48} priority />
```

To replace the SVG wordmark with the real logo, swap `LogoWordmark` in
`web/components/Header.tsx` / `Footer` with the `<Image>` above.

---

## Verify end-to-end

1. Open the Vercel site → **Apply** → submit a test application.
2. Confirm a new row lands in the Google Sheet.
3. If not: Render → Logs. `SHEETS_WEBHOOK_URL not set` or a 401 means the env
   var / `SECRET` mismatch; a CORS error means the Vercel origin isn't in
   `ALLOWED_ORIGINS`.
