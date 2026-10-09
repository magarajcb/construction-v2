import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HardHat,
  House,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export default function ResidentialConstructionPage() {
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

          <div className="mt-16 grid items-end gap-12 lg:grid-cols-2">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-strong">
                ARUN CONSTRUCTION
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
                RESIDENTIAL
                <br />
                CONSTRUCTION
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
                We build high-quality homes with careful planning, modern
                construction techniques, and attention to every detail.
              </p>
            </div>

            

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
              BUILT FOR THE WAY
              <br />
              YOU LIVE.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-muted">
              From the initial concept to the final handover, our residential
              construction service focuses on creating spaces that are
              practical, durable, and designed around the people who use them.
            </p>

            <p className="mt-6 text-lg leading-8 text-muted">
              We coordinate every stage of construction to maintain quality,
              precision, and a smooth building experience.
            </p>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="text-sm font-bold tracking-[0.25em] text-accent-strong">
              OUR EXPERTISE
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              WHAT WE PROVIDE
            </h2>
          </div>

          <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: House,
                number: "01",
                title: "House Construction",
                text: "Complete construction solutions for modern residential homes.",
              },
              {
                icon: Ruler,
                number: "02",
                title: "Planning & Design",
                text: "Careful planning and coordination before construction begins.",
              },
              {
                icon: HardHat,
                number: "03",
                title: "Structural Work",
                text: "Strong and reliable structural construction built to last.",
              },
              {
                icon: ShieldCheck,
                number: "04",
                title: "Finishing",
                text: "Detailed finishing work that completes your space.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="min-h-[280px] border-b border-r border-line p-8 transition duration-300 hover:bg-accent hover:text-primary"
                >
                  <span className="text-sm font-bold text-accent-strong transition hover:text-primary">
                    {item.number}
                  </span>

                  <Icon
                    size={34}
                    strokeWidth={1.5}
                    className="mt-12 text-accent-strong"
                  />

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-subtle transition group-hover:text-primary/70">
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
              ["01", "CONSULTATION", "Understanding your requirements, budget, and vision."],
              ["02", "PLANNING", "Developing the construction plan and project schedule."],
              ["03", "CONSTRUCTION", "Executing the work with quality and precision."],
              ["04", "HANDOVER", "Completing final checks and delivering your finished space."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-b border-r border-line p-8"
              >
                <span className="text-accent-strong">{number}</span>

                <h3 className="mt-8 text-xl font-bold">
                  {title}
                </h3>

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
              BUILT WITH
              <br />
              PURPOSE.
            </h2>
          </div>

          <div className="space-y-6">

            {[
              "Quality-focused construction",
              "Clear project coordination",
              "Modern construction practices",
              "Attention to detail",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-line pb-6"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-accent text-primary">
                  <Check size={17} />
                </div>

                <span className="text-lg font-medium">
                  {item}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-accent px-6 py-20 text-primary lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-bold tracking-[0.25em]">
              START YOUR PROJECT
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              LET'S BUILD SOMETHING GREAT.
            </h2>
          </div>

          

        </div>
      </section>

    </main>
  );
}