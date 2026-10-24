// Receives applications from the form, validates them, and forwards them to
// the Google Apps Script web app that appends a Sheet row and emails the lead.
// Runs only when someone submits the form.
//
// SHEETS_WEBHOOK_URL is the Apps Script /exec URL. It is the only credential:
// keep it in Vercel (type Sensitive), never in code or the browser.

const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL ?? '';
const MAX_BODY = 16 * 1024;

// Best-effort per-instance rate limit; the form is low volume.
const WINDOW_MS = 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { n: number; at: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.at > WINDOW_MS) {
    hits.set(ip, { n: 1, at: now });
    return false;
  }
  h.n += 1;
  return h.n > MAX_HITS;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 500) => String(v ?? '').trim().slice(0, max);

function validate(body: Record<string, unknown>) {
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const role = clean(body.role, 80);
  const message = clean(body.message, 2000);
  const age = Number.parseInt(clean(body.age, 3), 10);

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (!isEmail(email)) errors.push('email');
  if (phone.length < 6) errors.push('phone');
  if (!Number.isInteger(age) || age < 16 || age > 99) errors.push('age');

  return { data: { name, email, phone, age, role, message }, errors };
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return Response.json({ error: 'Your message is too long.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { data, errors } = validate(body);
  if (errors.length) {
    return Response.json({ error: 'Please check the highlighted fields.', fields: errors }, { status: 400 });
  }

  if (!SHEETS_WEBHOOK_URL) {
    console.error('[apply] SHEETS_WEBHOOK_URL is not set');
    return Response.json({ error: 'Applications are temporarily unavailable.' }, { status: 503 });
  }

  const row = {
    ...data,
    submittedAt: new Date().toISOString(),
    source: req.headers.get('origin') || req.headers.get('referer') || 'direct',
  };

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) {
      throw new Error(`Apps Script responded ${res.status}${result?.error ? `: ${result.error}` : ''}`);
    }
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[apply] Failed to save application:', err instanceof Error ? err.message : err);
    return Response.json(
      { error: 'Could not save your application right now. Please try again shortly.' },
      { status: 502 },
    );
  }
}
