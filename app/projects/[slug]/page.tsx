import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();

  const project = await Project.findOne({ slug }).lean();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* HEADER */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#projects"
            className="mb-8 inline-block text-sm text-white/50 transition hover:text-[#d6ff3f]"
          >
            ← Back to Projects
          </Link>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
            {project.category}
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            {project.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/50">
            <span>{project.location}</span>

            {project.year && (
              <span>{project.year}</span>
            )}

            <span>{project.status}</span>
          </div>

        </div>
      </section>

      {/* COVER IMAGE */}
      {project.coverImage && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="h-[450px] overflow-hidden md:h-[650px]">
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
            Project Details
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            {project.title}
          </h2>
        </div>

        <div className="md:col-span-2">
          <p className="text-lg leading-8 text-white/60">
            {project.description}
          </p>
        </div>

      </section>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
              Our Work
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Project Gallery
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {project.images.map((image: string, index: number) => (
              <div
                key={image}
                className="group overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[450px]"
                />
              </div>
            ))}

          </div>

        </section>
      )}

      {/* BACK */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#projects"
            className="inline-flex bg-[#d6ff3f] px-7 py-4 font-bold text-black transition hover:bg-white"
          >
            ← BACK TO PROJECTS
          </Link>

        </div>
      </section>

    </main>
  );
}