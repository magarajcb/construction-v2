import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Hammer,
  RefreshCw,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export default function RenovationPage() {
  return (
    <main className="min-h-screen bg-page text-ink">

      {/* HERO */}
      <section className="px-6 pb-20 pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent-strong"
          >
            <ArrowLeft size={16} />
            BACK TO SERVICES
          </Link>

          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-strong">
              ARUN CONSTRUCTION
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              RENOVATION
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
              We renew and transform existing spaces with modern solutions,
              careful planning, and quality workmanship.
            </p>
          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="border-y border-line bg-section px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-accent-strong">
              WHAT WE DO
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              REIMAGINE
              <br />
              YOUR SPACE.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-muted">
              We renovate existing spaces to improve their functionality,
              appearance, comfort, and long-term value.
            </p>

            <p className="mt-6 text-lg leading-8 text-muted">
              From individual improvements to complete renovations, we manage
              the work from planning through completion.
            </p>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em] text-accent-strong">
            OUR EXPERTISE
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            WHAT WE PROVIDE
          </h2>

          <div className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Hammer,
                number: "01",
                title: "Structural Updates",
                text: "Improving existing spaces with carefully planned structural work.",
              },
              {
                icon: RefreshCw,
                number: "02",
                title: "Space Transformation",
                text: "Modernizing spaces to better suit current requirements.",
              },
              {
                icon: Ruler,
                number: "03",
                title: "Planning",
                text: "Detailed planning before renovation work begins.",
              },
              {
                icon: ShieldCheck,
                number: "04",
                title: "Finishing",
                text: "Quality finishing that gives renovated spaces a refined appearance.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group min-h-[280px] border-b border-r border-line p-8 transition duration-300 hover:bg-accent hover:text-primary"
                >
                  <span className="text-sm font-bold text-accent-strong group-hover:text-primary">
                    {item.number}
                  </span>

                  <Icon
                    size={34}
                    strokeWidth={1.5}
                    className="mt-12 text-accent-strong group-hover:text-primary"
                  />

                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                  <p className="mt-4 text-sm leading-6 text-subtle group-hover:text-primary/70">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-section px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em] text-accent-strong">
            HOW WE WORK
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            OUR PROCESS
          </h2>

          <div className="mt-14 grid border-l border-t border-line md:grid-cols-4">

            {[
              ["01", "ASSESSMENT", "Understanding the existing space and renovation requirements."],
              ["02", "PLANNING", "Preparing the renovation strategy, materials, and schedule."],
              ["03", "RENOVATION", "Executing the planned improvements with care and precision."],
              ["04", "COMPLETION", "Final checks and delivery of the renewed space."],
            ].map(([number, title, text]) => (
              <div key={number} className="border-b border-r border-line p-8">
                <span className="text-accent-strong">{number}</span>

                <h3 className="mt-8 text-xl font-bold">{title}</h3>

                <p className="mt-4 text-sm leading-6 text-subtle">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">

          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-accent-strong">
              WHY ARUN
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              OLD SPACE.
              <br />
              NEW LIFE.
            </h2>
          </div>

          <div className="space-y-6">
            {[
              "Careful assessment",
              "Modern renovation solutions",
              "Quality workmanship",
              "Clean project execution",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-line pb-6"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-accent text-primary">
                  <Check size={17} />
                </div>

                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-accent px-6 py-20 text-primary lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em]">
            START YOUR PROJECT
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            GIVE YOUR SPACE A NEW LIFE.
          </h2>

        </div>
      </section>

    </main>
  );
}