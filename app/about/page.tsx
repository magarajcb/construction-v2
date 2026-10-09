import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-page text-ink">

      {/* NAVBAR */}
      <nav className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-accent text-primary">
              <span className="text-xl font-black">A</span>
            </div>

            <div>
              <p className="text-xl font-black tracking-[0.2em]">
                ARUN
              </p>
              <p className="text-[9px] tracking-[0.35em] text-subtle">
                CONSTRUCTION
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold transition hover:text-accent-strong"
          >
            <ArrowLeft size={16} />
            BACK HOME
          </Link>

        </div>
      </nav>


      {/* HERO */}
      <section className="border-b border-line px-6 py-28 lg:px-10 lg:py-40">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
            OUR STORY
          </p>

          <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-9xl">
            MORE THAN
            <br />
            <span className="text-faint">CONSTRUCTION.</span>
          </h1>

          <div className="mt-12 max-w-2xl">
            <p className="text-xl leading-9 text-muted">
              We create spaces that combine engineering, architecture,
              craftsmanship and human experience.
            </p>
          </div>

        </div>

      </section>


      {/* OUR STORY */}
      <section className="border-b border-line px-6 py-28 lg:px-10">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
              WHO WE ARE
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              BUILDING WITH
              <br />
              PURPOSE.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Arun Construction is built around a simple idea:
              great spaces begin with great thinking.
            </p>

            <p>
              From residential homes to commercial environments,
              we bring together planning, design, engineering and
              construction to create spaces that are practical,
              distinctive and built to last.
            </p>

            <p>
              Every project is treated as an opportunity to turn
              an idea into something real.
            </p>
          </div>

        </div>

      </section>


      {/* APPROACH */}
      <section className="border-b border-line bg-section px-6 py-28 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
              OUR APPROACH
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-6xl">
              FROM VISION
              <br />
              TO REALITY.
            </h2>
          </div>


          <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                number: "01",
                title: "UNDERSTAND",
                text: "We understand the vision, requirements and goals behind every project.",
              },
              {
                number: "02",
                title: "DESIGN",
                text: "We transform ideas into thoughtful and practical spaces.",
              },
              {
                number: "03",
                title: "BUILD",
                text: "We execute with attention to quality, detail and precision.",
              },
              {
                number: "04",
                title: "DELIVER",
                text: "We create spaces designed to perform and last for years.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="bg-section p-8"
              >
                <p className="text-sm font-bold text-accent-strong">
                  {step.number}
                </p>

                <h3 className="mt-16 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-subtle">
                  {step.text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* VALUES */}
      <section className="border-b border-line px-6 py-28 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                WHAT WE BELIEVE
              </p>

              <h2 className="mt-5 text-4xl font-black sm:text-6xl">
                BUILT ON
                <br />
                STRONG VALUES.
              </h2>
            </div>

            <div className="space-y-6">

              {[
                "Quality without compromise",
                "Design with purpose",
                "Transparent execution",
                "Attention to every detail",
                "Spaces built to last",
              ].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-4 border-b border-line pb-5"
                >
                  <Check
                    size={18}
                    className="text-accent-strong"
                  />

                  <p className="text-lg font-bold">
                    {value}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* BIG STATEMENT */}
      <section className="px-6 py-32 lg:px-10">

        <div className="mx-auto max-w-7xl">

          <p className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            WE DON'T JUST BUILD STRUCTURES.
            <span className="text-accent-strong">
              {" "}WE BUILD WHAT COMES NEXT.
            </span>
          </p>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-accent px-6 py-20 text-primary lg:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em]">
              HAVE A VISION?
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              LET'S BUILD IT.
            </h2>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-3 bg-primary px-7 py-5 font-bold text-white transition hover:bg-white hover:text-primary"
          >
            START A PROJECT
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}