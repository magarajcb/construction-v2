"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  LogOut,
  Trash2,
} from "lucide-react";


const MAX_IMAGE_SIDE = 1920;
const SMALL_ENOUGH = 1.5 * 1024 * 1024;
const WEB_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Resize big photos and re-encode unusual formats (AVIF, BMP…) as JPEG in the
 * browser, so uploads stay under Vercel's 4.5 MB request limit. GIFs keep their
 * animation, and formats the browser can't decode (e.g. HEIC on Windows) are sent
 * as-is for the server to convert.
 */
async function prepareImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= SMALL_ENOUGH && WEB_TYPES.includes(file.type)) {
    bitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.fillStyle = "#ffffff"; // transparent PNG areas become white, not black
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85),
  );
  if (!blob) return file;
  if (blob.size >= file.size && WEB_TYPES.includes(file.type)) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
    type: "image/jpeg",
  });
}

const INQUIRY_STATUSES = ["new", "contacted", "closed"] as const;
type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
const STATUS_STYLE: Record<InquiryStatus, string> = {
  new: "border-accent/30 text-accent-strong",
  contacted: "border-blue-200 text-blue-700",
  closed: "border-green-200 text-green-700",
};

/** wa.me link; 10-digit numbers are treated as Indian (+91). */
function whatsappLink(phone: string, name: string): string | null {
  let digits = (phone ?? "").replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  if (digits.length < 11 || digits.length > 15) return null;
  const text = encodeURIComponent(`Hello ${name}, thank you for your enquiry with Arun Construction.`);
  return `https://wa.me/${digits}?text=${text}`;
}

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
  
const [coverUploading, setCoverUploading] = useState(false);
const [galleryUploading, setGalleryUploading] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | InquiryStatus>("all");
  const [inquiryBusy, setInquiryBusy] = useState<string | null>(null);
  const visibleInquiries =
    inquiryFilter === "all"
      ? inquiries
      : inquiries.filter((i) => (i.status ?? "new") === inquiryFilter);
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
async function updateInquiryStatus(id: string, status: InquiryStatus) {
  setInquiryBusy(id);
  try {
    const response = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Failed to update inquiry");
    setInquiries((list) => list.map((i) => (i._id === id ? { ...i, status } : i)));
  } catch (error) {
    alert(error instanceof Error ? error.message : "Failed to update inquiry");
  } finally {
    setInquiryBusy(null);
  }
}

async function deleteInquiry(id: string, name: string) {
  if (!window.confirm(`Delete the enquiry from ${name}? This cannot be undone.`)) return;
  setInquiryBusy(id);
  try {
    const response = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Failed to delete inquiry");
    setInquiries((list) => list.filter((i) => i._id !== id));
  } catch (error) {
    alert(error instanceof Error ? error.message : "Failed to delete inquiry");
  } finally {
    setInquiryBusy(null);
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
  
async function uploadImage(original: File): Promise<string> {
  const file = await prepareImage(original);
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  // Vercel answers oversized requests with plain text, not JSON.
  let data: { url?: string; message?: string } = {};
  try {
    data = await response.json();
  } catch {
    if (response.status === 413) {
      throw new Error(`"${original.name}" is too large to upload (maximum 4 MB)`);
    }
  }

  if (!response.ok || !data.url) {
    throw new Error(data.message || `Image upload failed (HTTP ${response.status})`);
  }

  return data.url;
}

async function handleCoverUpload(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  setCoverUploading(true);
  setMessage("");

  try {
    const url = await uploadImage(file);
    setForm((current) => ({ ...current, coverImage: url }));
    setMessage("Cover image uploaded successfully!");
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : "Cover image upload failed",
    );
  } finally {
    setCoverUploading(false);
    event.target.value = "";
  }
}

async function handleGalleryUpload(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const files = Array.from(event.target.files ?? []);
  if (!files.length) return;

  setGalleryUploading(true);
  setMessage("");

  try {
    const urls: string[] = [];

    for (const file of files) {
      urls.push(await uploadImage(file));
    }

    setForm((current) => ({
      ...current,
      images: [
        ...current.images.split(",").map((url) => url.trim()).filter(Boolean),
        ...urls,
      ].join(", "),
    }));

    setMessage(`${urls.length} gallery image(s) uploaded successfully!`);
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : "Gallery upload failed",
    );
  } finally {
    setGalleryUploading(false);
    event.target.value = "";
  }
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
    <main className="min-h-screen bg-page px-6 py-12 text-ink">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
              ARUN CONSTRUCTION
            </p>

            <h1 className="mt-3 text-4xl font-black">
              ADMIN DASHBOARD
            </h1>

            <p className="mt-2 text-muted">
              Add and manage construction projects.
            </p>
          </div>

         <div className="flex items-center gap-3">
  <a
    href="/"
    className="flex items-center gap-2 border border-line-strong px-5 py-3 text-sm transition hover:border-accent hover:text-accent-strong"
  >
    <ArrowLeft size={16} />
    WEBSITE
  </a>

  <button
    type="button"
    onClick={handleLogout}
    className="flex items-center gap-2 border border-line-strong px-5 py-3 text-sm transition hover:border-red-400 hover:text-red-600"
  >
    <LogOut size={16} />
    LOGOUT
  </button>
</div>

        </div>

        {/* ADD PROJECT */}
        <section className="border border-line bg-section p-8">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-accent text-primary">
              <Plus size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Add New Project
              </h2>

              <p className="text-sm text-subtle">
                Project information will be saved to MongoDB.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="mt-10 border border-line bg-section p-8">
  <div className="mb-8">
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
      PROJECT MANAGEMENT
    </p>

    <h2 className="mt-3 text-2xl font-bold">
      Existing Projects
    </h2>

    <p className="mt-2 text-sm text-subtle">
      Manage projects currently displayed on the website.
    </p>
  </div>

  <div className="space-y-4">
    {projects.length === 0 ? (
      <p className="text-subtle">
        No projects found.
      </p>
    ) : (
      projects.map((project) => (
        <div
          key={project._id}
          className="flex items-center justify-between border border-line bg-white p-5"
        >
          <div>
            <h3 className="font-bold">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-subtle">
              {project.category} · {project.location}
            </p>
          </div>

          <button
            type="button"
            onClick={() => deleteProject(project._id)}
            className="flex items-center gap-2 border border-red-500/30 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-ink"
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
                <label className="mb-2 block text-sm text-muted">
                  Project Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Modern Residence"
                  required
                  className="w-full border border-line bg-white px-4 py-3 outline-none transition focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">
                  Slug
                </label>

                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="modern-residence"
                  required
                  className="w-full border border-line bg-white px-4 py-3 text-muted outline-none focus:border-accent"
                />
              </div>

            </div>

            {/* CLIENT + LOCATION */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-muted">
                  Client
                </label>

                <input
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  placeholder="Client name"
                  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">
                  Location
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Madurai, Tamil Nadu"
                  required
                  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>

            </div>

            {/* CATEGORY + YEAR + STATUS */}
            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm text-muted">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
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
                <label className="mb-2 block text-sm text-muted">
                  Year
                </label>

                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2026"
                  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm text-muted">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the project..."
                required
                rows={5}
                className="w-full resize-none border border-line bg-white px-4 py-3 outline-none focus:border-accent"
              />
            </div>

            {/* COVER IMAGE */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-muted">
                <ImageIcon size={16} />
                Cover Image
              </label>

              
<input
  type="file"
  accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/heic,image/heif,.heic,.heif"
  onChange={handleCoverUpload}
  disabled={coverUploading}
  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent disabled:opacity-50"
/>

{coverUploading && (
  <p className="mt-2 text-sm text-accent-strong">
    Uploading cover image...
  </p>
)}

{form.coverImage && (
  <div className="mt-3">
    <img
      src={form.coverImage}
      alt="Cover preview"
      className="h-40 w-full max-w-md object-cover"
    />
    <p className="mt-2 break-all text-xs text-muted">
      {form.coverImage}
    </p>
  </div>
)}

            </div>

            {/* GALLERY IMAGES */}
            <div>
              <label className="mb-2 block text-sm text-muted">
                Gallery Images
              </label>

              
<input
  type="file"
  accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/heic,image/heif,.heic,.heif"
  multiple
  onChange={handleGalleryUpload}
  disabled={galleryUploading}
  className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent disabled:opacity-50"
/>

{galleryUploading && (
  <p className="mt-2 text-sm text-accent-strong">
    Uploading gallery images...
  </p>
)}

{form.images && (
  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
    {form.images.split(",").filter(Boolean).map((url) => (
      <img
        key={url.trim()}
        src={url.trim()}
        alt="Project gallery"
        className="h-28 w-full object-cover"
      />
    ))}
  </div>
)}

            </div>

            {/* MESSAGE */}
            {message && (
              <div className="border border-line bg-white px-4 py-3 text-sm text-accent-strong">
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
         disabled={loading || coverUploading || galleryUploading}
              className="flex items-center gap-3 bg-accent px-7 py-4 font-bold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={18} />

              {loading ? "ADDING PROJECT..." : "ADD PROJECT"}
            </button>

          </form>

{/* CUSTOMER INQUIRIES */}
<section className="mt-10 border border-line bg-section p-8">

  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
        CUSTOMER INQUIRIES
      </p>
      <h2 className="mt-3 text-2xl font-bold">Project Enquiries</h2>
      <p className="mt-2 text-sm text-subtle">
        Messages submitted through the website contact form.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      {(["all", ...INQUIRY_STATUSES] as const).map((key) => {
        const count = key === "all"
          ? inquiries.length
          : inquiries.filter((i) => (i.status ?? "new") === key).length;
        const active = inquiryFilter === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setInquiryFilter(key)}
            className={`border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
              active ? "border-accent bg-accent text-white" : "border-line bg-white text-muted hover:border-accent"
            }`}
          >
            {key} ({count})
          </button>
        );
      })}
    </div>
  </div>

  <div className="space-y-4">
    {visibleInquiries.length === 0 ? (
      <p className="text-subtle">No inquiries found.</p>
    ) : (
      visibleInquiries.map((inquiry) => {
        const status: InquiryStatus = inquiry.status ?? "new";
        const busy = inquiryBusy === inquiry._id;
        const wa = whatsappLink(inquiry.phone, inquiry.name);
        return (
          <div key={inquiry._id} className={`border border-line bg-white p-6 ${busy ? "opacity-60" : ""}`}>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">{inquiry.name}</h3>
                  <span className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLE[status]}`}>
                    {status}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted">
                  <p>Email: <span className="text-body">{inquiry.email}</span></p>
                  <p>Phone: <span className="text-body">{inquiry.phone}</span></p>
                  <p>Project Type: <span className="text-body">{inquiry.projectType}</span></p>
                </div>
              </div>
              <p className="text-xs text-faint">{new Date(inquiry.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-faint">Project Details</p>
              <p className="leading-7 text-body">{inquiry.details}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
              <a href={`tel:${inquiry.phone}`} className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-wider text-body hover:border-accent">
                Call
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-wider text-body hover:border-accent">
                  WhatsApp
                </a>
              )}
              <a
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Your ${inquiry.projectType} enquiry`)}`}
                className="border border-line px-3 py-2 text-xs font-bold uppercase tracking-wider text-body hover:border-accent"
              >
                Email
              </a>

              <label className="ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                Status
                <select
                  value={status}
                  disabled={busy}
                  onChange={(e) => updateInquiryStatus(inquiry._id, e.target.value as InquiryStatus)}
                  className="border border-line bg-white px-2 py-2 text-xs font-bold uppercase text-body"
                >
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                disabled={busy}
                onClick={() => deleteInquiry(inquiry._id, inquiry.name)}
                className="flex items-center gap-1 border border-red-200 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        );
      })
    )}
  </div>

</section>
        </section>

      </div>

    </main>
  );
}