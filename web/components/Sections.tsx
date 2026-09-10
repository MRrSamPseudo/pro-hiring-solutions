import { Icon, type IconName } from './Icons';
import { LogoMark } from './Logo';
import { site, stats } from '@/lib/site';

/* ---------------------------------- HERO ---------------------------------- */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="container grid items-center gap-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
            Now hiring across 40+ industries
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build your career with{' '}
            <span className="gradient-text">industry leaders</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/90">
            {site.name} matches driven professionals with companies that value them —
            permanent roles, contract work, and executive placements. Real people,
            real opportunities, {site.responsePromise.toLowerCase()}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#apply" className="btn-primary text-base">
              Apply now <Icon.arrow className="h-4 w-4" />
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost text-base">
              <Icon.chat className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold text-white sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs font-medium text-navy-200">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="animate-float card relative z-10 p-6 shadow-2xl shadow-navy-950/60">
            <div className="flex items-center justify-between">
              <LogoMark className="h-11 w-11" />
              <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-200">
                Verified match
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { role: 'Senior Product Designer', co: 'Remote · Full-time', pay: '$135k' },
                { role: 'Operations Manager', co: 'On-site · Contract', pay: '$98k' },
                { role: 'Full-Stack Engineer', co: 'Hybrid · Full-time', pay: '$150k' },
              ].map((j) => (
                <div key={j.role} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{j.role}</p>
                    <p className="text-xs text-navy-200">{j.co}</p>
                  </div>
                  <span className="text-sm font-bold text-teal-300">{j.pay}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-navy-600/20 p-4">
              <Icon.clock className="h-5 w-5 shrink-0 text-teal-300" />
              <p className="text-sm text-navy-50">
                <span className="font-semibold text-white">24-hour</span> response on every application.
              </p>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 -z-0 h-32 w-32 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 -z-0 h-40 w-40 rounded-full bg-navy-500/30 blur-3xl" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-y border-white/10 bg-white/[0.02]">
        <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-xs font-semibold uppercase tracking-widest text-navy-300 sm:justify-between">
          <span>Trusted by teams at</span>
          {['Northwind', 'Lumen Labs', 'Vertex', 'Cascade', 'Brightpath'].map((c) => (
            <span key={c} className="text-navy-200/70">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SERVICES -------------------------------- */
const services: { icon: IconName; title: string; body: string }[] = [
  { icon: 'briefcase', title: 'Permanent placement', body: 'Full-time hires vetted for skill and culture fit. We shortlist only candidates who can succeed long-term.' },
  { icon: 'users', title: 'Contract & temp staffing', body: 'Scale your team on demand. Pre-screened contractors ready to start, with compliant onboarding handled for you.' },
  { icon: 'crown', title: 'Executive search', body: 'Confidential, headhunted searches for leadership roles — director to C-suite — backed by deep market mapping.' },
  { icon: 'globe', title: 'Remote & global hiring', body: 'Access talent anywhere. We handle sourcing across time zones so you never compromise on the right person.' },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            One partner for every hiring need
          </h2>
          <p className="mt-4 text-lg text-navy-100/85">
            Whether you're a candidate chasing your next move or a company building a team,
            we cover the full spectrum of recruitment.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const I = Icon[s.icon];
            return (
              <article
                key={s.title}
                className="reveal card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:bg-white/[0.06]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300 transition-colors group-hover:bg-teal-500/25">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- PROCESS -------------------------------- */
const steps = [
  { n: '01', title: 'Apply or reach out', body: 'Send your details through the form below or message us directly. Takes under two minutes.' },
  { n: '02', title: 'Discovery call', body: 'A recruiter learns your goals, strengths, and what you actually want next — no generic scripts.' },
  { n: '03', title: 'Matched & introduced', body: 'We put you in front of roles that fit, prep you for interviews, and advocate on your behalf.' },
  { n: '04', title: 'Placed & supported', body: 'From offer negotiation to your first 90 days, we stay in your corner well past day one.' },
];

export function Process() {
  return (
    <section id="process" className="section border-y border-white/10 bg-white/[0.02]">
      <div className="container">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Four steps from hello to hired
          </h2>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative card p-6"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="text-4xl font-black text-teal-500/30">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------- ROLES --------------------------------- */
const roleGroups = [
  { title: 'Technology', roles: ['Software Engineering', 'Data & Analytics', 'DevOps & Cloud', 'IT Support'] },
  { title: 'Business & Ops', roles: ['Operations', 'Project Management', 'Finance & Accounting', 'HR & People'] },
  { title: 'Growth', roles: ['Marketing', 'Sales & BizDev', 'Customer Success', 'Product'] },
  { title: 'Design & Creative', roles: ['Product Design', 'UX Research', 'Content & Copy', 'Brand'] },
];

export function Roles() {
  return (
    <section id="roles" className="section">
      <div className="container">
        <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Open roles</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Opportunities across every function
            </h2>
            <p className="mt-4 text-lg text-navy-100/85">
              New positions open weekly. Don't see your exact title? Apply anyway —
              we match people to roles that aren't public yet.
            </p>
          </div>
          <a href="#apply" className="btn-ghost shrink-0">
            Submit your profile <Icon.arrow className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roleGroups.map((g, i) => (
            <div key={g.title} className="reveal card p-6" style={{ transitionDelay: `${i * 60}ms` }}>
              <h3 className="text-base font-bold text-teal-300">{g.title}</h3>
              <ul className="mt-4 space-y-3">
                {g.roles.map((r) => (
                  <li key={r} className="flex items-center gap-2.5 text-sm text-navy-100">
                    <Icon.check className="h-4 w-4 shrink-0 text-teal-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- WHY ----------------------------------- */
const perks: { icon: IconName; title: string; body: string }[] = [
  { icon: 'globe', title: 'Remote or on-site flexibility', body: 'Roles that fit your life — work from home, hybrid, or in-office. You choose what matters.' },
  { icon: 'book', title: 'Continuous learning', body: 'Partner companies invest in mentorship, certifications, and upskilling so you keep growing.' },
  { icon: 'heart', title: 'Respect for your time', body: 'No ghosting, no endless loops. Clear communication and honest timelines at every stage.' },
  { icon: 'wallet', title: 'Top-tier pay & bonuses', body: 'We negotiate hard on your behalf. Competitive salaries, benefits, and performance bonuses.' },
  { icon: 'shield', title: 'Vetted employers only', body: 'Every company on our roster is screened. You interview with teams worth your talent.' },
  { icon: 'chart', title: 'Long-term career growth', body: 'We think beyond the next job — placements built for progression, not just a paycheck.' },
];

export function Why() {
  return (
    <section id="why" className="section border-y border-white/10 bg-white/[0.02]">
      <div className="container">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why Pro Hiring</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Built around what candidates actually want
          </h2>
          <p className="mt-4 text-lg text-navy-100/85">
            We measure success by careers advanced, not just seats filled.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => {
            const I = Icon[p.icon];
            return (
              <div key={p.title} className="reveal card p-6" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                  <I className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
const testimonials = [
  { quote: 'I applied on a Tuesday and had two interviews lined up by Thursday. The recruiter actually understood the role I wanted.', name: 'Marcus T.', role: 'Placed as Backend Engineer' },
  { quote: 'They found candidates our internal team had been searching months for. The shortlist was tight and every person was strong.', name: 'Priya S.', role: 'Head of Talent, SaaS company' },
  { quote: 'No pressure, no games. They negotiated a package well above what I expected and checked in after I started.', name: 'Dana K.', role: 'Placed as Operations Manager' },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Results</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">People we've placed say it best</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="reveal card flex flex-col p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="flex gap-1 text-teal-400" aria-hidden>
                {'★★★★★'.split('').map((s, j) => (<span key={j}>{s}</span>))}
              </div>
              <blockquote className="mt-4 flex-1 text-navy-50">“{t.quote}”</blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-teal-300">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */
const faqs = [
  { q: 'Does it cost anything to apply?', a: 'Never. Our services are completely free for candidates. Employers pay us only when we successfully place someone.' },
  { q: 'How fast will I hear back?', a: 'We respond to every qualified applicant within 24 hours — most within a few hours during business days.' },
  { q: 'What if my role isn’t listed?', a: 'Apply anyway. Many of our openings are confidential or filled before they’re advertised. We match you to roles as they come in.' },
  { q: 'Do you work with remote and international candidates?', a: 'Yes. We place candidates across remote, hybrid, and on-site roles, and work with employers hiring globally.' },
  { q: 'How is my information handled?', a: 'Your details are shared only with employers you approve. We never post your profile publicly or contact your current employer.' },
];

export function FAQ() {
  return (
    <section id="faq" className="section border-t border-white/10 bg-white/[0.02]">
      <div className="container max-w-3xl">
        <div className="reveal text-center">
          <span className="eyebrow">Questions</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Good to know</h2>
        </div>
        <div className="reveal mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group px-5 py-1 open:border-teal-400/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-teal-300 transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-navy-200">{f.a}</p>
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
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <LogoMark className="h-10 w-10" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
            {site.description}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
            <li><a href="#services" className="hover:text-teal-300">Services</a></li>
            <li><a href="#process" className="hover:text-teal-300">How it works</a></li>
            <li><a href="#roles" className="hover:text-teal-300">Open roles</a></li>
            <li><a href="#why" className="hover:text-teal-300">Why us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
            <li>
              <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-teal-300">
                <Icon.phone className="h-4 w-4" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-teal-300">
                <Icon.mail className="h-4 w-4" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal-300">
                <Icon.chat className="h-4 w-4" /> WhatsApp us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Ready to move?</h3>
          <p className="mt-4 text-sm text-navy-200">Submit your application in two minutes.</p>
          <a href="#apply" className="btn-primary mt-4 w-full">Apply now</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Free for candidates · {site.responsePromise}</p>
        </div>
      </div>
    </footer>
  );
}
