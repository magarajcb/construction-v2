"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Image as ImageIcon } from "lucide-react";
import { LogOut } from "lucide-react";

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

        </section>

      </div>

    </main>
  );
}