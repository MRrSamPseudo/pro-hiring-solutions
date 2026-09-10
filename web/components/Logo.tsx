import { site } from '@/lib/site';

/**
 * Inline SVG logomark for Pro Hiring Solutions.
 * Vector "PH" monogram with a teal check-swoosh and a person dot —
 * echoes the brand logo and stays crisp at any size / on any background.
 * Drop the real raster logo at /public/logo.png to swap the wordmark image if preferred.
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={`${site.name} logo`}>
      <defs>
        <linearGradient id="phNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#213c7d" />
          <stop offset="1" stopColor="#0e1c38" />
        </linearGradient>
        <linearGradient id="phTeal" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#158298" />
          <stop offset="1" stopColor="#6fdae6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#phNavy)" />
      {/* P stem + H bar suggestion */}
      <path
        d="M16 46V18h10a9 9 0 0 1 0 18h-4"
        fill="none"
        stroke="#dbe6fb"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M44 18v28" fill="none" stroke="#dbe6fb" strokeWidth="4.5" strokeLinecap="round" />
      {/* teal check swoosh */}
      <path
        d="M20 40c8 3 15-2 20-10s9-14 9-14"
        fill="none"
        stroke="url(#phTeal)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="30" cy="27" r="4.5" fill="url(#phTeal)" />
    </svg>
  );
}

export function LogoWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-tight text-white">Pro Hiring</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-300">
          Solutions
        </span>
      </span>
    </span>
  );
}
