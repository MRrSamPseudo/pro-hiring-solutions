import { ApplyForm } from './ApplyForm';
import { Icon } from './Icons';
import { site } from '@/lib/site';

const bullets = [
  'A recruiter reviews your profile within 24 hours',
  'We match you to roles that fit — including unlisted ones',
  'Interview prep, salary negotiation, and support included',
  'Always free for candidates',
];

export function Apply() {
  return (
    <section id="apply" className="section">
      <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal">
          <span className="eyebrow">Apply</span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything you need to apply — in one place
          </h2>
          <p className="mt-4 text-lg text-navy-100/85">
            Fill in the form and a recruiter will be in touch. {site.responsePromise}
          </p>
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-navy-50">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-300">
                  <Icon.check className="h-4 w-4" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 card flex items-center gap-4 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500/15 text-teal-300">
              <Icon.chat className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Prefer to talk first?</p>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-300 hover:underline">
                Message us on WhatsApp → {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="reveal">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
