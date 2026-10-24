# Deployment — Pro Hiring Solutions

## Production

| Piece | Where |
|-------|-------|
| Site + API | Vercel project `pro-hiring-solutions` (team ACME, Hobby), root dir `web/`. Domain **https://prohiringsolutions.site**; `www.` redirects 308 to the apex. `/api/apply` is the only server code and runs only when the form is submitted. |
| Data + lead email | Google Sheet "Pro Hiring Solutions — Applications" with the bound Apps Script in `apps-script/Code.gs` (account muhammadsameedabid@gmail.com). Each submission adds a row and emails `contact@prohiringsolutions.site` via MailApp. |
| Domain + DNS | `prohiringsolutions.site` at Namecheap (BasicDNS): `A @ 216.198.79.1`, `CNAME www <project>.vercel-dns-017.com`. |
| Email | Namecheap Private Email on `prohiringsolutions.site`. MX `mx1/mx2.privateemail.com`, SPF `include:spf.privateemail.com`, DKIM `privateemail._domainkey`, DMARC `p=none` with reports to the mailbox. Webmail: https://privateemail.com |

`git push` to `main` deploys automatically (only when `web/` changes).

## Environment variables (Vercel)

| Name | Type | Value |
|------|------|-------|
| `SHEETS_WEBHOOK_URL` | Sensitive, Production + Preview | Apps Script web app `/exec` URL |

The URL is the only credential. It never reaches the browser and must never be committed.

## Rotating the Apps Script URL

1. Apps Script editor → **Deploy → New deployment** → Web app, Execute as **Me**, access **Anyone**.
2. Copy the new `/exec` URL and replace `SHEETS_WEBHOOK_URL` in Vercel
   (`vercel env rm SHEETS_WEBHOOK_URL production` then `vercel env add SHEETS_WEBHOOK_URL production --sensitive`).
3. Redeploy production and submit a test application.
4. Apps Script → **Deploy → Manage deployments** → archive the old deployment. Its URL stops working.

## Changing the Apps Script code

Edit `apps-script/Code.gs`, paste it into the editor, then **Deploy → Manage deployments →
edit the active deployment → Version: New version**. The URL stays the same.

## Verify end-to-end

1. Submit a test application on https://prohiringsolutions.site.
2. Confirm a new row in the Sheet and the lead email in the mailbox, then delete the test row.
3. If it fails, check Vercel → Logs for `[apply]` lines: `SHEETS_WEBHOOK_URL is not set` (503)
   or `Apps Script responded ...` (502).
