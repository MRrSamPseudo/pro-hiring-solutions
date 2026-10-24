// Same-origin relay to the Render API. The browser posts here, so any site
// domain works without being listed in the API's ALLOWED_ORIGINS. Runs only
// when someone submits the form.

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const MAX_BODY = 16 * 1024;

// A sleeping free Render instance can take ~30 s to wake.
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!API_BASE) {
    console.error('[apply] NEXT_PUBLIC_API_BASE_URL is not set');
    return Response.json({ error: 'Applications are temporarily unavailable.' }, { status: 503 });
  }

  const body = await req.text();
  if (body.length > MAX_BODY) {
    return Response.json({ error: 'Your message is too long.' }, { status: 413 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const site = new URL(req.url).origin;

  try {
    const res = await fetch(`${API_BASE}/api/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: site,
        ...(ip ? { 'X-Forwarded-For': ip } : {}),
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(55_000),
    });
    const text = await res.text();
    if (!res.ok) console.error(`[apply] API responded ${res.status}: ${text.slice(0, 200)}`);
    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('[apply] API request failed:', err instanceof Error ? err.message : err);
    return Response.json(
      { error: 'Could not send your application right now. Please try again shortly.' },
      { status: 502 },
    );
  }
}
