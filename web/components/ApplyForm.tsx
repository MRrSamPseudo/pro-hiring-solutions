'use client';

import { useRef, useState } from 'react';
import { Icon } from './Icons';
import { site } from '@/lib/site';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fields = [
  'Technology',
  'Business & Operations',
  'Marketing & Sales',
  'Design & Creative',
  'Finance & Accounting',
  'HR & People',
  'Customer Success',
  'Executive / Leadership',
  'Other',
];

export function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'mail'>('whatsapp');
  const warmed = useRef(false);

  // The free API host sleeps when idle. Wake it once, when the visitor starts
  // filling the form, so the submit does not wait for a cold start.
  function warmUp() {
    if (warmed.current || !API_BASE) return;
    warmed.current = true;
    fetch(`${API_BASE}/health`, { mode: 'no-cors' }).catch(() => {});
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill the hidden field, so succeed quietly without sending.
    if (data.company_website) {
      setStatus('success');
      form.reset();
      return;
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          email: data.email,
          phone: data.phone,
          role: data.role,
          message: data.message,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-teal-500">
          <Icon.check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">Application received</h3>
        <p className="mt-2 max-w-sm text-[15px]">
          Thanks — we have your details. A recruiter will be in touch within 24 hours.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Icon.chat className="h-4 w-4" /> Message us now
          </a>
          <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={warmUp} className="card p-6 sm:p-8" noValidate>
      <div className="flex items-start gap-4">
        <span className="tile shrink-0">
          <Icon.users className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-ink">Submit your application</h3>
          <p className="mt-1 text-[14px]">
            We respond to all qualified applicants within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Full name <span className="text-teal-500">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" className="field" />
        </div>
        <div>
          <label htmlFor="age" className="label">
            Age <span className="text-teal-500">*</span>
          </label>
          <input id="age" name="age" type="number" min={16} max={99} required placeholder="28" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email <span className="text-teal-500">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@example.com" className="field" />
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone <span className="text-teal-500">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(555) 123-4567" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="role" className="label">
            Field of interest <span className="text-teal-500">*</span>
          </label>
          <select id="role" name="role" required defaultValue="" className="field appearance-none">
            <option value="" disabled>
              Select a field…
            </option>
            {fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact channel */}
      <div className="mt-6">
        <span className="label">You can contact us at</span>
        <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-line bg-canvas p-1.5">
          <button
            type="button"
            onClick={() => setChannel('whatsapp')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13.5px] font-medium transition-colors ${
              channel === 'whatsapp' ? 'bg-white text-ink shadow-btn' : 'text-muted hover:text-ink'
            }`}
          >
            <Icon.chat className="h-4 w-4" /> iMessage / WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setChannel('mail')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13.5px] font-medium transition-colors ${
              channel === 'mail' ? 'bg-white text-ink shadow-btn' : 'text-muted hover:text-ink'
            }`}
          >
            <Icon.mail className="h-4 w-4" /> Mail
          </button>
        </div>

        <a
          href={channel === 'whatsapp' ? site.whatsapp : `mailto:${site.email}`}
          target={channel === 'whatsapp' ? '_blank' : undefined}
          rel={channel === 'whatsapp' ? 'noopener noreferrer' : undefined}
          className="mt-3 flex items-center gap-3.5 rounded-xl border border-line bg-canvas px-4 py-3.5 transition-colors hover:border-navy-300"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-navy-800 shadow-btn">
            {channel === 'whatsapp' ? <Icon.chat className="h-5 w-5" /> : <Icon.mail className="h-5 w-5" />}
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              {channel === 'whatsapp' ? 'Message us at' : 'Send us an email at'}
            </span>
            <span className="block truncate text-[15px] font-semibold text-ink">
              {channel === 'whatsapp' ? site.phoneDisplay : site.email}
            </span>
          </span>
        </a>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="label">
          Message <span className="font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Briefly introduce yourself…"
          className="field resize-y"
        />
      </div>

      {/* Honeypot — hidden from people */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === 'error' && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full disabled:opacity-70">
        {status === 'loading' ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Submit Application <Icon.arrow className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[12.5px] text-muted">
        By applying you agree to be contacted about opportunities. Always free for candidates.
      </p>
    </form>
  );
}
