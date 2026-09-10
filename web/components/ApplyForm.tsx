'use client';

import { useState } from 'react';
import { Icon } from './Icons';
import { site } from '@/lib/site';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

type Status = 'idle' | 'loading' | 'success' | 'error';

const roles = [
  'Technology', 'Business & Operations', 'Marketing & Sales',
  'Design & Creative', 'Finance & Accounting', 'HR & People',
  'Customer Success', 'Executive / Leadership', 'Other',
];

export function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill hidden field -> silently succeed without sending.
    if (data.company_website) {
      setStatus('success');
      form.reset();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/apply`, {
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
      <div className="card flex flex-col items-center p-10 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-teal-500/15 text-teal-300">
          <Icon.check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">Application received</h3>
        <p className="mt-3 max-w-sm text-navy-200">
          Thanks — we've got your details. {site.responsePromise} Keep an eye on your inbox and phone.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Icon.chat className="h-4 w-4" /> Message us now
          </a>
          <button type="button" onClick={() => setStatus('idle')} className="btn-ghost">
            Submit another
          </button>
        </div>
      </div>
    );
  }

  const field =
    'w-full rounded-xl border border-white/12 bg-navy-900/60 px-4 py-3.5 text-white placeholder:text-navy-300 outline-none transition-colors focus:border-teal-400/70 focus:bg-navy-900';
  const label = 'mb-1.5 block text-sm font-medium text-navy-100';

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name *</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Jordan Rivera" className={field} />
        </div>
        <div>
          <label htmlFor="age" className={label}>Age *</label>
          <input id="age" name="age" type="number" min={16} max={99} required placeholder="28" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 (555) 123-4567" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="role" className={label}>Field of interest *</label>
          <select id="role" name="role" required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>Select a field…</option>
            {roles.map((r) => (<option key={r} value={r} className="bg-navy-900">{r}</option>))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Message <span className="text-navy-300">(optional)</span></label>
          <textarea id="message" name="message" rows={4} placeholder="Tell us about your experience and what you're looking for…" className={`${field} resize-y`} />
        </div>
      </div>

      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === 'error' && (
        <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-navy-300">
          By applying you agree to be contacted about opportunities. Free for candidates.
        </p>
        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full sm:w-auto">
          {status === 'loading' ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            <>Submit application <Icon.arrow className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}
