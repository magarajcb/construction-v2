"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  LogOut,
  Trash2,
} from "lucide-react";


export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    client: "",
    location: "",
    category: "",
    year: "",
    status: "Completed",
    description: "",
    coverImage: "",
    images: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  useEffect(() => {
  loadProjects();
  loadInquiries();
}, []);

async function loadProjects() {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    const data = await response.json();

    setProjects(data);
  } catch (error) {
    console.error("LOAD PROJECTS ERROR:", error);
  }
}
async function loadInquiries() {
  try {
    const response = await fetch("/api/inquiries");

    if (!response.ok) {
      throw new Error("Failed to load inquiries");
    }

    const data = await response.json();

    setInquiries(data);
  } catch (error) {
    console.error("LOAD INQUIRIES ERROR:", error);
  }
}
async function deleteProject(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch("/api/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete project");
    }

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project._id !== id)
    );

    setMessage("Project deleted successfully!");
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Failed to delete project"
    );
  }
}
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function createSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    setForm({
      ...form,
      title,
      slug: createSlug(title),
    });
  }
  async function handleLogout() {
  await fetch("/api/admin/logout", {
    method: "POST",
  });

  window.location.href = "/admin/login";
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          images: form.images
            .split(",")
            .map((image) => image.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      setMessage("Project added successfully!");

      setForm({
        title: "",
        slug: "",
        client: "",
        location: "",
        category: "",
        year: "",
        status: "Completed",
        description: "",
        coverImage: "",
        images: "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-12 text-white">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
              GLOARO CONSTRUCTION
            </p>

            <h1 className="mt-3 text-4xl font-black">
              ADMIN DASHBOARD
            </h1>

            <p className="mt-2 text-white/50">
              Add and manage construction projects.
            </p>
          </div>

         <div className="flex items-center gap-3">
  <a
    href="/"
    className="flex items-center gap-2 border border-white/20 px-5 py-3 text-sm transition hover:border-[#d6ff3f] hover:text-[#d6ff3f]"
  >
    <ArrowLeft size={16} />
    WEBSITE
  </a>

  <button
    type="button"
    onClick={handleLogout}
    className="flex items-center gap-2 border border-white/20 px-5 py-3 text-sm transition hover:border-red-400 hover:text-red-400"
  >
    <LogOut size={16} />
    LOGOUT
  </button>
</div>

        </div>

        {/* ADD PROJECT */}
        <section className="border border-white/10 bg-[#0d0d0d] p-8">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#d6ff3f] text-black">
              <Plus size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Add New Project
              </h2>

              <p className="text-sm text-white/40">
                Project information will be saved to MongoDB.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="mt-10 border border-white/10 bg-[#0d0d0d] p-8">
  <div className="mb-8">
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
      PROJECT MANAGEMENT
    </p>

    <h2 className="mt-3 text-2xl font-bold">
      Existing Projects
    </h2>

    <p className="mt-2 text-sm text-white/40">
      Manage projects currently displayed on the website.
    </p>
  </div>

  <div className="space-y-4">
    {projects.length === 0 ? (
      <p className="text-white/40">
        No projects found.
      </p>
    ) : (
      projects.map((project) => (
        <div
          key={project._id}
          className="flex items-center justify-between border border-white/10 bg-black p-5"
        >
          <div>
            <h3 className="font-bold">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-white/40">
              {project.category} · {project.location}
            </p>
          </div>

          <button
            type="button"
            onClick={() => deleteProject(project._id)}
            className="flex items-center gap-2 border border-red-500/30 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={16} />
            DELETE
          </button>
        </div>
      ))
    )}
  </div>
</section>

            {/* TITLE + SLUG */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Project Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Modern Residence"
                  required
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-[#d6ff3f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Slug
                </label>

                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="modern-residence"
                  required
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white/50 outline-none focus:border-[#d6ff3f]"
                />
              </div>

            </div>

            {/* CLIENT + LOCATION */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Client
                </label>

                <input
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  placeholder="GLOARO"
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Location
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Madurai, Tamil Nadu"
                  required
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
                />
              </div>

            </div>

            {/* CATEGORY + YEAR + STATUS */}
            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
                >
                  <option value="">Select category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior">Interior</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Year
                </label>

                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2026"
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm text-white/60">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the project..."
                required
                rows={5}
                className="w-full resize-none border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
              />
            </div>

            {/* COVER IMAGE */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-white/60">
                <ImageIcon size={16} />
                Cover Image
              </label>

              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="/images/projects/residence-1.jpg"
                className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
              />

              <p className="mt-2 text-xs text-white/30">
                For now use an image path from public/images.
              </p>
            </div>

            {/* GALLERY IMAGES */}
            <div>
              <label className="mb-2 block text-sm text-white/60">
                Gallery Images
              </label>

              <input
                name="images"
                value={form.images}
                onChange={handleChange}
                placeholder="/images/projects/img1.jpg, /images/projects/img2.jpg"
                className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
              />

              <p className="mt-2 text-xs text-white/30">
                Separate multiple image paths with commas.
              </p>
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="border border-white/10 bg-black px-4 py-3 text-sm text-[#d6ff3f]">
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-3 bg-[#d6ff3f] px-7 py-4 font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={18} />

              {loading ? "ADDING PROJECT..." : "ADD PROJECT"}
            </button>

          </form>

{/* CUSTOMER INQUIRIES */}
<section className="mt-10 border border-white/10 bg-[#0d0d0d] p-8">

  <div className="mb-8">
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
      CUSTOMER INQUIRIES
    </p>

    <h2 className="mt-3 text-2xl font-bold">
      Project Enquiries
    </h2>

    <p className="mt-2 text-sm text-white/40">
      Messages submitted through the website contact form.
    </p>
  </div>

  <div className="space-y-4">

    {inquiries.length === 0 ? (
      <p className="text-white/40">
        No inquiries found.
      </p>
    ) : (
      inquiries.map((inquiry) => (
        <div
          key={inquiry._id}
          className="border border-white/10 bg-black p-6"
        >

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <h3 className="text-lg font-bold">
                  {inquiry.name}
                </h3>

                <span className="border border-[#d6ff3f]/30 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d6ff3f]">
                  {inquiry.status}
                </span>

              </div>

              <div className="mt-3 space-y-1 text-sm text-white/50">

                <p>
                  Email:{" "}
                  <span className="text-white/80">
                    {inquiry.email}
                  </span>
                </p>

                <p>
                  Phone:{" "}
                  <span className="text-white/80">
                    {inquiry.phone}
                  </span>
                </p>

                <p>
                  Project Type:{" "}
                  <span className="text-white/80">
                    {inquiry.projectType}
                  </span>
                </p>

              </div>

            </div>

            <p className="text-xs text-white/30">
              {new Date(inquiry.createdAt).toLocaleString()}
            </p>

          </div>

          <div className="mt-5 border-t border-white/10 pt-5">

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">
              Project Details
            </p>

            <p className="leading-7 text-white/70">
              {inquiry.details}
            </p>

          </div>

        </div>
      ))
    )}

  </div>

</section>
        </section>

      </div>

    </main>
  );
}