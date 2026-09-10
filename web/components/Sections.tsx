import { Icon, type IconName } from './Icons';
import { LogoOnDark } from './Logo';
import { site, stats } from '@/lib/site';

/* ---------------------------------- HERO ---------------------------------- */
export function Hero() {
  return (
    <section id="top" className="dotted bg-navy-800">
      <div className="container-tight py-20 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-100">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          Actively hiring
        </span>

        <h1 className="mx-auto mt-7 max-w-3xl text-[34px] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
          Build your career with industry leaders.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
          Join a team where your work makes a real impact. Explore the role below
          and submit your application in seconds.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#apply" className="btn bg-white text-ink hover:bg-navy-50">
            Apply Now <Icon.arrow className="h-4 w-4" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light"
          >
            <Icon.chat className="h-4 w-4" /> Talk to a recruiter
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xl font-bold text-white sm:text-2xl">{s.value}</dt>
              <dd className="mt-1 text-[12px] text-navy-300 sm:text-[13px]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------- BENEFITS -------------------------------- */
const benefits: { icon: IconName; title: string; body: string }[] = [
  { icon: 'home', title: 'Flexible Work', body: 'Remote or on-site flexibility.' },
  { icon: 'book', title: 'Career Growth', body: 'Continuous learning programs.' },
  { icon: 'clock', title: 'Balance', body: 'Respect for your personal time.' },
  { icon: 'wallet', title: 'Competitive Pay', body: 'Top-tier salary and bonuses.' },
];

export function BenefitCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {benefits.map((b) => {
        const I = Icon[b.icon];
        return (
          <div key={b.title} className="card p-5">
            <span className="tile">
              <I className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{b.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed">{b.body}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------- GROWTH CARD ------------------------------ */
export function GrowthCard() {
  return (
    <div className="rounded-2xl bg-navy-800 p-6">
      <span className="tile-dark">
        <Icon.chart className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-white">Growth</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-navy-200">
        Opportunities designed to enhance your skills, accelerate learning, and
        support long-term career progression.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {['Mentorship', 'Upskilling', 'Certifications'].map((t) => (
          <span
            key={t}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-[12px] font-medium text-navy-100"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- RESPONSIBILITIES --------------------------- */
const duties = [
  'Seeking talented individuals for roles across technology, operations, marketing, and finance.',
  'Contribute to projects that drive consistent company growth and make a measurable impact.',
  'Collaborate with experienced professionals in a structured, supportive work environment.',
  'Own your work end to end, with clear expectations and regular feedback.',
];

export function Responsibilities() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-tight">
        <div className="card p-6 sm:p-8">
          <span className="tile">
            <Icon.briefcase className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-ink">Responsibilities</h2>
          <ul className="mt-5 space-y-3.5">
            {duties.map((d) => (
              <li key={d} className="flex gap-3 text-[14px] leading-relaxed sm:text-[15px]">
                <Icon.check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-teal-500" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */
const faqs = [
  {
    q: 'Does it cost anything to apply?',
    a: 'No. Our service is completely free for candidates. Employers pay us only when we successfully place someone.',
  },
  {
    q: 'How quickly will I hear back?',
    a: 'We respond to every qualified applicant within 24 hours, and most within a few hours on business days.',
  },
  {
    q: 'What if my role is not listed?',
    a: 'Apply anyway. Many of our openings are confidential or filled before they are advertised, and we match candidates as new roles come in.',
  },
  {
    q: 'How is my information handled?',
    a: 'Your details are shared only with employers you approve. We never publish your profile or contact your current employer.',
  },
];

export function FAQ() {
  return (
    <section className="border-t border-line bg-canvas py-16 sm:py-20">
      <div className="container-tight max-w-3xl">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-ink sm:text-3xl">Frequently asked questions</h2>
          <p className="mt-3 text-[15px]">Everything candidates usually want to know.</p>
        </div>

        <div className="mt-9 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group px-5 py-1 open:shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-navy-500 transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-10 text-[14px] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */
export function Footer() {
  return (
    <footer className="bg-navy-800">
      <div className="container-tight grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <LogoOnDark size={38} />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-navy-300">
            {site.description}
          </p>
        </div>

        <div className="sm:justify-self-end">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-300">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-[14px] text-navy-100">
            <li>
              <a href={`tel:${site.phone}`} className="flex items-center gap-2.5 hover:text-teal-300">
                <Icon.phone className="h-4 w-4 text-teal-400" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-teal-300">
                <Icon.mail className="h-4 w-4 text-teal-400" /> {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-teal-300"
              >
                <Icon.chat className="h-4 w-4 text-teal-400" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-[12.5px] text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Free for candidates · 24-hour response</p>
        </div>
      </div>
    </footer>
  );
}
