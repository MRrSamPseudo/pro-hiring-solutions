import { ApplyForm } from './ApplyForm';
import { BenefitCards, GrowthCard } from './Sections';

export function Apply() {
  return (
    <section id="apply" className="section bg-canvas">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
            Role Details &amp; Application
          </h2>
          <p className="mt-3 text-[15px] sm:text-base">
            Everything you need to know, and how to apply, in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ApplyForm />
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <BenefitCards />
            <GrowthCard />
          </div>
        </div>
      </div>
    </section>
  );
}
