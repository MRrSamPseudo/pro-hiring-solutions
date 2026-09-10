'use client';

import { useEffect, useState } from 'react';
import { LogoWordmark } from './Logo';
import { nav } from '@/lib/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-navy-950/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between sm:h-20">
        <a href="#top" aria-label="Pro Hiring Solutions home">
          <LogoWordmark />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-navy-100 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#apply" className="btn-primary">
            Apply now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-all ${open ? 'top-1.5 rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-all ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-white transition-all ${open ? '!top-1.5 -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 top-16 bg-navy-950/95 backdrop-blur-lg transition-opacity duration-300 sm:top-20 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <nav className="container flex flex-col gap-1 pt-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-semibold text-navy-50 transition-colors hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <a href="#apply" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
              Apply now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
