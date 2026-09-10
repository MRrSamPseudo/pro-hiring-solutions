import express from 'express';
import cors from 'cors';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // Render sits behind a proxy; needed for real client IPs.
app.use(express.json({ limit: '16kb' }));

// ---- Config from environment ----------------------------------------------
const PORT = process.env.PORT || 8080;
// Google Apps Script Web App URL that appends a row to the target sheet.
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || '';
// Optional shared secret sent to the Apps Script for verification.
const SHEETS_WEBHOOK_TOKEN = process.env.SHEETS_WEBHOOK_TOKEN || '';
// Comma-separated list of allowed origins (your Vercel domains).
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// ---- CORS ------------------------------------------------------------------
app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / server-to-server (no Origin header) and curl.
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.length === 0) return cb(null, true); // dev fallback
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['POST', 'GET'],
  }),
);

// ---- Tiny in-memory rate limiter (per IP) ----------------------------------
const WINDOW_MS = 60 * 1000;
const MAX_HITS = 5;
const hits = new Map();
setInterval(() => hits.clear(), WINDOW_MS).unref();

function rateLimited(ip) {
  const n = (hits.get(ip) || 0) + 1;
  hits.set(ip, n);
  return n > MAX_HITS;
}

// ---- Validation ------------------------------------------------------------
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);

function validate(body) {
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const ageRaw = clean(body.age, 3);
  const role = clean(body.role, 80);
  const message = clean(body.message, 2000);
  const age = Number.parseInt(ageRaw, 10);

  const errors = [];
  if (name.length < 2) errors.push('name');
  if (!isEmail(email)) errors.push('email');
  if (phone.length < 6) errors.push('phone');
  if (!Number.isInteger(age) || age < 16 || age > 99) errors.push('age');

  return { data: { name, email, phone, age, role, message }, errors };
}

// ---- Routes ----------------------------------------------------------------
app.get('/', (_req, res) => res.json({ ok: true, service: 'pro-hiring-api' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/apply', async (req, res) => {
  const ip = req.ip || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
  }

  const { data, errors } = validate(req.body || {});
  if (errors.length) {
    return res.status(400).json({ error: 'Please check the highlighted fields.', fields: errors });
  }

  const row = {
    ...data,
    submittedAt: new Date().toISOString(),
    source: req.get('origin') || req.get('referer') || 'direct',
    token: SHEETS_WEBHOOK_TOKEN || undefined,
  };

  if (!SHEETS_WEBHOOK_URL) {
    // Not configured yet: log so nothing is lost, still succeed for the user.
    console.warn('[apply] SHEETS_WEBHOOK_URL not set. Submission:', JSON.stringify(row));
    return res.status(201).json({ ok: true, stored: false });
  }

  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);
    const resp = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      signal: controller.signal,
    });
    clearTimeout(t);
    if (!resp.ok) throw new Error(`Sheets webhook responded ${resp.status}`);
    return res.status(201).json({ ok: true, stored: true });
  } catch (err) {
    console.error('[apply] Failed to write to sheet:', err?.message || err);
    return res.status(502).json({ error: 'Could not save your application right now. Please try again shortly.' });
  }
});

app.listen(PORT, () => {
  console.log(`pro-hiring-api listening on :${PORT}`);
});
