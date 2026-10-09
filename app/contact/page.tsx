"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          projectType: formData.get("projectType"),
          details: formData.get("details"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      setMessage("Your inquiry has been submitted successfully!");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-page text-ink">

      {/* NAVBAR */}
      <nav className="border-b border-line bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-accent text-primary">
              <Building2 size={21} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-[0.2em]">
                AR<span className="text-accent-strong">UN</span>
              </div>

              <div className="text-[9px] tracking-[0.35em] text-subtle">
                CONSTRUCTION
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-muted transition hover:text-accent-strong"
          >
            <ArrowLeft size={16} />
            BACK HOME
          </Link>

        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-line py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
            Start a Conversation
          </p>

          <h1 className="mt-5 max-w-4xl text-6xl font-black tracking-tight sm:text-8xl">
            LET&apos;S BUILD
            <br />
            <span className="text-faint">SOMETHING GREAT.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
            Tell us about your project, your vision, and what you want to
            build. Our team will get back to you.
          </p>

        </div>
      </section>

      {/* CONTACT AREA */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_0.7fr] lg:px-10">

          {/* FORM */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
              Project Inquiry
            </p>

            <h2 className="mt-4 text-4xl font-black">
              TELL US ABOUT YOUR PROJECT
            </h2>

            <form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6"
>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
                    Name
                  </label>

                 <input
  name="name"
  type="text"
  placeholder="Your name"
                    className="w-full border border-line bg-card px-5 py-4 text-ink outline-none transition placeholder:text-faint focus:border-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
                    Email
                  </label>

                  <input
  name="email"
  type="email"
  placeholder="you@example.com"
                    className="w-full border border-line bg-card px-5 py-4 text-ink outline-none transition placeholder:text-faint focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
                    Phone
                  </label>

                 <input
  name="phone"
  type="tel"
  placeholder="+91"
                    className="w-full border border-line bg-card px-5 py-4 text-ink outline-none transition placeholder:text-faint focus:border-accent"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
                    Project Type
                  </label>

                 <select
  name="projectType"
  defaultValue=""
                    className="w-full border border-line bg-card px-5 py-4 text-ink outline-none transition focus:border-accent"
                  >
                    <option value="" disabled>
                      Select project type
                    </option>
                    <option value="residential">Residential Construction</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="architecture">Architecture & Design</option>
                    <option value="interior">Interior Works</option>
                    <option value="renovation">Renovation</option>
                    <option value="management">Project Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
                  Project Details
                </label>

                <textarea
  name="details"
  rows={7}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none border border-line bg-card px-5 py-4 text-ink outline-none transition placeholder:text-faint focus:border-accent"
                />
              </div>

              <button
  type="submit"
  disabled={loading}
  className="group flex items-center gap-3 bg-accent px-7 py-4 font-bold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "SENDING..." : "SEND INQUIRY"}

  <ArrowRight
    size={18}
    className="transition-transform group-hover:translate-x-1"
  />
</button>
{message && (
  <p className="text-sm font-medium text-accent-strong">
    {message}
  </p>
)}  

            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="border-l border-line pl-8 lg:pl-12">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
              Contact
            </p>

            <h2 className="mt-4 text-3xl font-black">
              ARUN CONSTRUCTION
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Have a question or planning a new project? Reach out directly.
              We&apos;d be happy to hear from you.
            </p>

            <div className="mt-12 space-y-8">

              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-accent-strong" size={20} />

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-subtle">
                    Visit Us
                  </p>

                  <p className="mt-2 text-sm leading-6 text-body">
                    No. 52, Alagiri Samy Salai,
                    <br />
                    KK Nagar, Chennai – 600 078.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="shrink-0 text-accent-strong" size={20} />

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-subtle">
                    Phone
                  </p>

                  <p className="mt-2 text-sm leading-6 text-body">
                    044 - 423 44333
                    <br />
                    +91 99403 07575
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="shrink-0 text-accent-strong" size={20} />

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-subtle">
                    Email
                  </p>

                  <p className="mt-2 text-sm leading-6 text-body">
                    arunconstructionno1@gmail.com
                    <br />
                    arunbuildersindia@gmail.com
                    <br />
                    sales@arunbuilders.in
                    <br />
                    marketing@arunbuilders.in
                    <br />
                    arun@arunbuilders.in
                    <br />
                    admin@arunbuilders.in
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-accent py-20 text-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <p className="text-xs font-bold uppercase tracking-[0.3em]">
            Ready to Build?
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <h2 className="max-w-3xl text-4xl font-black sm:text-6xl">
              YOUR VISION.
              <br />
              OUR CRAFT.
            </h2>

            <Link
              href="/"
              className="flex w-fit items-center gap-3 bg-primary px-6 py-4 font-bold text-white transition hover:bg-white hover:text-primary"
            >
              BACK HOME
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}