import { site } from '@/lib/site';

/**
 * The brand asset at /public/logo.png is a square lockup: the PH monogram
 * sits above the "Pro Hiring Solutions" wordmark. At header sizes the baked-in
 * wordmark is unreadable, so we crop to the monogram and set the wordmark in
 * type beside it. MARK_* describe where the monogram sits inside the artwork.
 */
const MARK_HEIGHT_RATIO = 0.42; // monogram height as a fraction of the image
const MARK_CENTER_Y = 0.445; // vertical centre of the monogram
const MARK_CENTER_X = 0.5;

export function LogoMark({ size = 44, className = '' }: { size?: number; className?: string }) {
  const img = size / MARK_HEIGHT_RATIO;
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ height: size, width: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        style={{
          position: 'absolute',
          height: img,
          width: img,
          maxWidth: 'none',
          top: -(MARK_CENTER_Y * img - size / 2),
          left: -(MARK_CENTER_X * img - size / 2),
        }}
      />
    </span>
  );
}

/** Horizontal lockup for light surfaces (header). */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-ink">Pro Hiring</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-500">
          Solutions
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}

/** Horizontal lockup for the navy footer — the mark sits on a white tile. */
export function LogoOnDark({ size = 40 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid place-items-center rounded-xl bg-white p-1.5">
        <LogoMark size={size} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-white">Pro Hiring</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300">
          Solutions
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
