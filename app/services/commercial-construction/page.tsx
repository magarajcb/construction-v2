import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Building2,
  Ruler,
  HardHat,
  ShieldCheck,
} from "lucide-react";

export default function CommercialConstructionPage() {
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
                COMMERCIAL
                <br />
                CONSTRUCTION
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
                We build high-quality commercial spaces with efficient
                planning, modern construction techniques, and dependable
                project execution.
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
              BUILT FOR
              <br />
              BUSINESS.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-muted">
              From offices and retail spaces to larger commercial
              developments, we provide structured construction solutions
              designed around your business requirements.
            </p>

            <p className="mt-6 text-lg leading-8 text-muted">
              Our team coordinates planning, construction, quality control,
              and project delivery to keep every stage organized.
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
                icon: Building2,
                number: "01",
                title: "Commercial Buildings",
                text: "Construction solutions for offices, retail spaces, and business facilities.",
              },
              {
                icon: Ruler,
                number: "02",
                title: "Planning & Design",
                text: "Detailed planning to create efficient and functional commercial spaces.",
              },
              {
                icon: HardHat,
                number: "03",
                title: "Structural Work",
                text: "Reliable structural construction focused on strength and durability.",
              },
              {
                icon: ShieldCheck,
                number: "04",
                title: "Quality Control",
                text: "Consistent quality checks throughout the construction process.",
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

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

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
              ["01", "CONSULTATION", "Understanding your business requirements and project goals."],
              ["02", "PLANNING", "Developing the construction plan, schedule, and execution strategy."],
              ["03", "CONSTRUCTION", "Managing construction with quality, safety, and precision."],
              ["04", "HANDOVER", "Completing final inspections and delivering the finished project."],
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
              BUILT FOR
              <br />
              PERFORMANCE.
            </h2>
          </div>

          <div className="space-y-6">

            {[
              "Efficient project coordination",
              "Quality-focused construction",
              "Modern construction practices",
              "Reliable project delivery",
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
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em]">
            START YOUR PROJECT
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            LET'S BUILD SOMETHING GREAT.
          </h2>

        </div>
      </section>

    </main>
  );
}