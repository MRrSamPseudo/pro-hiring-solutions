import { Logo } from './Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-tight flex h-[72px] items-center justify-between sm:h-20">
        <a href="#top" aria-label="Pro Hiring Solutions home" className="rounded-lg">
          <Logo size={44} />
        </a>

        <a href="#apply" className="btn-primary px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-[15px]">
          Apply Now
        </a>
      </div>
    </header>
  );
}
