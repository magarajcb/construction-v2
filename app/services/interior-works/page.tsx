import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Sofa,
  Palette,
  Ruler,
  Lightbulb,
} from "lucide-react";

export default function InteriorWorksPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* HERO */}
      <section className="px-6 pb-20 pt-32 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d6ff3f]"
          >
            <ArrowLeft size={16} />
            BACK TO SERVICES
          </Link>

          <div className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d6ff3f]">
              GLOARO CONSTRUCTION
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              INTERIOR
              <br />
              WORKS
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/50">
              We transform interiors into functional and refined spaces through
              thoughtful planning, quality materials, and precise execution.
            </p>
          </div>

        </div>
      </section>

      {/* INTRO */}
      <section className="border-y border-white/10 bg-[#0d0d0d] px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-[#d6ff3f]">
              WHAT WE DO
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              SPACES THAT
              <br />
              FEEL RIGHT.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-white/50">
              We create interiors that combine comfort, functionality, and
              modern aesthetics while reflecting the personality of each space.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/50">
              From planning and material selection to final finishing, we
              coordinate every stage carefully.
            </p>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em] text-[#d6ff3f]">
            OUR EXPERTISE
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            WHAT WE PROVIDE
          </h2>

          <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Sofa,
                number: "01",
                title: "Interior Planning",
                text: "Planning functional layouts that make the best use of your space.",
              },
              {
                icon: Palette,
                number: "02",
                title: "Material Selection",
                text: "Choosing materials and finishes that suit the design and purpose.",
              },
              {
                icon: Ruler,
                number: "03",
                title: "Custom Works",
                text: "Detailed interior elements designed around your requirements.",
              },
              {
                icon: Lightbulb,
                number: "04",
                title: "Finishing",
                text: "Careful finishing work that brings the complete interior together.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group min-h-[280px] border-b border-r border-white/10 p-8 transition duration-300 hover:bg-[#d6ff3f] hover:text-black"
                >
                  <span className="text-sm font-bold text-[#d6ff3f] group-hover:text-black">
                    {item.number}
                  </span>

                  <Icon
                    size={34}
                    strokeWidth={1.5}
                    className="mt-12 text-[#d6ff3f] group-hover:text-black"
                  />

                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                  <p className="mt-4 text-sm leading-6 text-white/40 group-hover:text-black/60">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/10 bg-[#0d0d0d] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em] text-[#d6ff3f]">
            HOW WE WORK
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            OUR PROCESS
          </h2>

          <div className="mt-14 grid border-l border-t border-white/10 md:grid-cols-4">

            {[
              ["01", "CONSULTATION", "Understanding your needs, style, and space."],
              ["02", "PLANNING", "Developing the layout, materials, and execution plan."],
              ["03", "EXECUTION", "Completing interior works with precision and care."],
              ["04", "FINISHING", "Final detailing and preparation of the completed space."],
            ].map(([number, title, text]) => (
              <div key={number} className="border-b border-r border-white/10 p-8">
                <span className="text-[#d6ff3f]">{number}</span>

                <h3 className="mt-8 text-xl font-bold">{title}</h3>

                <p className="mt-4 text-sm leading-6 text-white/40">
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
            <p className="text-sm font-bold tracking-[0.25em] text-[#d6ff3f]">
              WHY GLOARO
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              DETAIL MAKES
              <br />
              THE DIFFERENCE.
            </h2>
          </div>

          <div className="space-y-6">
            {[
              "Thoughtful interior planning",
              "Quality materials",
              "Precise execution",
              "Attention to detail",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-white/10 pb-6"
              >
                <div className="flex h-8 w-8 items-center justify-center bg-[#d6ff3f] text-black">
                  <Check size={17} />
                </div>

                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#d6ff3f] px-6 py-20 text-black lg:px-10">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold tracking-[0.25em]">
            START YOUR PROJECT
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            LET'S CREATE YOUR SPACE.
          </h2>

        </div>
      </section>

    </main>
  );
}