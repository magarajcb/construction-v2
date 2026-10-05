"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Hammer,
   Home as HomeIcon,
  Menu,
  Play,
  Ruler,
  Sofa,
  X,
   MapPin, Phone, Mail 
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "18+", label: "Years Experience" },
  { value: "45+", label: "Team Members" },
  { value: "99%", label: "Customer Satisfaction" },
];



const services = [
  {
    number: "01",
    title: "Residential Construction",
    description:
      "Complete residential construction services focused on quality, durability, and modern living.",
    slug: "residential-construction",
    icon: HomeIcon,
  },
  {
    number: "02",
    title: "Commercial Construction",
    description:
      "Reliable commercial construction solutions designed for functionality, efficiency, and long-term value.",
    slug: "commercial-construction",
    icon: Building2,
  },
  {
    number: "03",
    title: "Architecture & Design",
    description:
      "Thoughtful architectural planning and design that combines creativity, functionality, and modern aesthetics.",
    slug: "architecture-design",
    icon: Ruler,
  },
  {
    number: "04",
    title: "Interior Works",
    description:
      "Complete interior solutions with premium finishes, practical layouts, and attention to every detail.",
    slug: "interior-works",
    icon: Sofa,
  },
  {
    number: "05",
    title: "Renovation",
    description:
      "Transforming existing spaces through carefully planned renovation and modern upgrades.",
    slug: "renovation",
    icon: Hammer,
  },
  {
    number: "06",
    title: "Project Management",
    description:
      "End-to-end project coordination to keep construction organized, efficient, and on schedule.",
    slug: "project-management",
    icon: ClipboardList,
  },
];
const reasons = [
  "Experienced construction professionals",
  "Quality materials and workmanship",
  "Transparent project management",
  "On-time project delivery",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
  fetch("/api/projects")
    .then((res) => res.json())
    .then((data) => setProjects(data))
    .catch((error) => console.error("Failed to load projects:", error));
}, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">

      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#d6ff3f] text-black">
              <Building2 size={21} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-[0.2em]">
                GLO<span className="text-[#d6ff3f]">ARO</span>
              </div>

              <div className="text-[9px] tracking-[0.35em] text-white/40">
                CONSTRUCTION
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {["Home", "About", "Services", "Projects", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-sm text-white/70 transition hover:text-white"
                >
                  {item}

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#d6ff3f] transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 bg-[#d6ff3f] px-5 py-3 text-sm font-bold text-black transition hover:bg-white md:flex"
          >
            GET A QUOTE
            <ArrowRight size={16} />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black px-6 py-5 md:hidden">
            {["Home", "About", "Services", "Projects", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-white/10 py-4 text-white/80"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        )}
      </nav>

      {/* HERO */}
        {/* HERO */}
<section
  id="home"
  className="relative flex min-h-screen items-center overflow-hidden pt-20"
>
  {/* Hero background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/hero/hero-construction.jpeg')",
    }}
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/65" />

  {/* Lime glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(214,255,63,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_25%)]" />

  {/* Decorative circles */}
  <div className="absolute right-[-10%] top-[15%] h-[600px] w-[600px] rounded-full border border-white/5" />

  <div className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full border border-[#d6ff3f]/10" />

  {/* Main hero content */}
  <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 py-24 lg:px-10">
    <div className="flex max-w-3xl flex-col justify-center">

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8 flex items-center gap-3"
      >
        <span className="h-px w-12 bg-[#d6ff3f]" />

        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6ff3f]">
          Building Beyond Boundaries
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-6xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl"
      >
        WE BUILD
        <br />
        <span className="text-[#d6ff3f]">
          THE FUTURE.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 max-w-xl text-lg leading-8 text-white/70"
      >
        From ambitious architectural concepts to extraordinary
        completed spaces, we transform ideas into structures built
        to last.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#projects"
          className="group flex items-center gap-3 bg-[#d6ff3f] px-7 py-4 font-bold text-black transition hover:bg-white"
        >
          EXPLORE PROJECTS

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </motion.div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/50">
    Scroll to explore
  </div>
</section>
      {/* STATS */}
      <section className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-r border-white/10 px-6 py-12 last:border-r-0"
            >
              <p className="text-4xl font-black text-[#d6ff3f]">
                {stat.value}
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-6 py-32 lg:px-10"
      >
        <div className="grid gap-16 lg:grid-cols-2">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
              Who We Are
            </p>

            <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
              MORE THAN
              <br />
              <span className="text-white/30">
                CONSTRUCTION.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-xl leading-9 text-white/50">
              We create spaces that combine engineering, architecture
              and human experience. Every project is treated as an
              opportunity to build something meaningful.
            </p>

            <a
              href="#contact"
              className="mt-8 flex w-fit items-center gap-3 border-b border-[#d6ff3f] pb-2 text-sm font-bold text-[#d6ff3f]"
            >
              DISCOVER OUR STORY
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
     {/* WHY CHOOSE US */}
<section className="border-y border-white/10 bg-[#0d0d0d] py-24">
  <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

    {/* IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[420px] overflow-hidden border border-white/10"
    >
      <img
        src="/images/about/worker.jpg"
        alt="GLOARO construction project"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Lime accent */}
      <div className="absolute bottom-0 left-0 h-1 w-32 bg-[#d6ff3f]" />

      {/* Small label */}
      <div className="absolute bottom-6 left-6 border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.25em] text-[#d6ff3f]">
          GLOARO Construction
        </p>
        <p className="mt-1 text-sm text-white/70">
          Built with precision
        </p>
      </div>
    </motion.div>

    {/* CONTENT */}
    <div className="flex flex-col justify-center">

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
          Why Choose Us
        </p>

        <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
          BUILT ON
          <br />
          <span className="text-white/30">
            TRUST.
          </span>
        </h2>
      </motion.div>

      {/* REASONS */}
      <div className="mt-12 space-y-5">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-5 border-b border-white/10 pb-5"
          >
            <CheckCircle2
              className="shrink-0 text-[#d6ff3f]"
              size={22}
            />

            <span className="text-lg text-white/70">
              {reason}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  </div>
</section>
      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-[#080808] py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
                Selected Work
              </p>

              <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                OUR PROJECTS
              </h2>
            </div>

            <button className="flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-[#d6ff3f]">
              VIEW ALL PROJECTS
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {projects.map((project, index) => (
              <motion.article
             key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="group relative h-[460px] overflow-hidden border border-white/10 bg-[#151515]"
              >
               {project.coverImage ? (
  <img
    src={project.coverImage}
    alt={project.title}
    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
  />
) : (
  <div className="absolute inset-0 bg-gradient-to-br from-[#303030] via-[#151515] to-black transition duration-700 group-hover:scale-105" />
)}

                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(214,255,63,0.08))]" />

                <div className="absolute left-6 top-6 text-sm text-white/30">
                {String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-7">

                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#d6ff3f]">
                    {project.category}
                  </p>

                  <h3 className="text-3xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    {project.location}
                  </p>

                  <div className="mt-6 flex h-0 items-center gap-2 overflow-hidden text-sm font-bold text-[#d6ff3f] transition-all duration-300 group-hover:h-6">
                   <Link href={`/projects/${project.slug}`}>
  VIEW PROJECT →
</Link>
                    <ArrowRight size={15} />
                  </div>

                </div>
              </motion.article>
            ))}

          </div>
        </div>
      </section>

      {/* SERVICES */}
      {/* SERVICES */}
<section
  id="services"
  className="mx-auto max-w-7xl px-6 py-32 lg:px-10"
>
  {/* Section heading */}
  <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
        What We Do
      </p>

      <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
        OUR SERVICES
      </h2>
    </div>

    <button className="flex w-fit items-center gap-2 text-sm font-bold text-white/60 transition hover:text-[#d6ff3f]">
      VIEW ALL SERVICES
      <ArrowRight size={16} />
    </button>
  </div>

  {/* Service cards */}
  <div className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
    
       {services.map((service) => {
  const Icon = service.icon;

  return (  
    <Link
      key={service.number}
      href={`/services/${service.slug}`}
      className="block"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group relative min-h-[240px] border-b border-r border-white/10 bg-[#080808] p-8 transition-all duration-300 hover:bg-[#d6ff3f]"
      >
        {/* Number */}
        <span className="text-sm font-medium text-[#d6ff3f] transition-colors duration-300 group-hover:text-black">
          {service.number}
        </span>

        {/* Icon */}
        <div className="mt-10">
          <Icon
            size={34}
            strokeWidth={1.5}
            className="text-[#d6ff3f] transition-colors duration-300 group-hover:text-black"
          />
        </div>

        {/* Service title */}
        <h3 className="mt-6 max-w-[260px] text-xl font-bold text-white transition-colors duration-300 group-hover:text-black">
          {service.title}
        </h3>

        {/* Arrow */}
        <ArrowRight
          size={26}
          strokeWidth={1.5}
          className="absolute bottom-7 right-7 text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-black"
        />
      </motion.div>
    </Link>
  );
})}
  </div>
</section>

      GALLERY
      <section className="border-y border-white/10 bg-[#0d0d0d] py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6ff3f]">
              Our Work
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
              PROJECT GALLERY
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">

            <div className="group relative h-72 overflow-hidden bg-gradient-to-br from-[#333] to-[#111] md:col-span-2">
              <div className="absolute inset-0 bg-[#d6ff3f]/0 transition group-hover:bg-[#d6ff3f]/10" />

              <div className="absolute bottom-5 left-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Residential
                </p>

                <p className="mt-1 text-xl font-bold">
                  Modern Living
                </p>
              </div>
            </div>

            <div className="group relative h-72 overflow-hidden bg-gradient-to-br from-[#222] to-[#080808]">
              <div className="absolute bottom-5 left-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Interior
                </p>

                <p className="mt-1 text-xl font-bold">
                  Fine Details
                </p>
              </div>
            </div>

            <div className="group relative h-72 overflow-hidden bg-gradient-to-br from-[#444] to-[#101010]">
              <div className="absolute bottom-5 left-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Commercial
                </p>

                <p className="mt-1 text-xl font-bold">
                  Bold Spaces
                </p>
              </div>
            </div>

            <div className="group relative h-72 overflow-hidden bg-gradient-to-br from-[#151515] to-[#303030] md:col-span-2">
              <div className="absolute bottom-5 left-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Architecture
                </p>

                <p className="mt-1 text-xl font-bold">
                  Designed To Last
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[#d6ff3f] py-28 text-black"
      >

        <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full border border-black/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em]">
                Start a Project
              </p>

              <h2 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
                HAVE A VISION?
                <br />
                LET&apos;S BUILD IT.
              </h2>
            </div>
            

            <button className="flex items-center gap-3 bg-black px-7 py-5 font-bold text-white transition hover:bg-white hover:text-black">
              GET IN TOUCH
              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </section>

      {/* FOOTER */}
<footer className="border-t border-white/10 bg-black">
  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3 lg:px-10">

    {/* Company */}
    <div>
      <p className="text-xl font-black tracking-[0.2em] text-white">
        GLOARO
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">
        Construction
      </p>

      <p className="mt-6 max-w-xs text-sm leading-6 text-white/40">
        Building better spaces with quality, precision and innovation.
      </p>
    </div>

    {/* Address */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d6ff3f]">
        Visit Us
      </p>

    <div>
 
  <p className="mt-4 text-sm text-white/50">
    Prefer to reach out directly? Here's how to find us.
  </p>

  <div className="mt-6 space-y-5">

    {/* Address */}
    <div className="flex gap-4">
      <MapPin className="mt-1 shrink-0 text-[#d6ff3f]" size={20} />

      <p className="text-sm leading-6 text-white/70">
        SF No.101/2B, Esai Towers, Salem Main Road,
        <br />
        Near Bypass, Emmaper, Kallakurichi – 606202,
        <br />
        Tamil Nadu, India.
      </p>
    </div>

    {/* Phone */}
    <div className="flex items-center gap-4">
      <Phone className="shrink-0 text-[#d6ff3f]" size={18} />

      <p className="text-sm text-white/70">
        +91 72000 73704
      </p>
    </div>

    {/* Email */}
    <div className="flex items-center gap-4">
      <Mail className="shrink-0 text-[#d6ff3f]" size={18} />

      <p className="text-sm text-white/70">
        info@gloaro.com
      </p>
    </div>

  </div>
</div>
    </div>

    {/* Contact */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d6ff3f]">
        Contact
      </p>

      <p className="mt-4 text-sm leading-7 text-white/60">
        Get in touch with us
        <br />
        for your next project.
      </p>
    </div>

  </div>

  {/* Bottom bar */}
  <div className="border-t border-white/10">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs text-white/30 sm:flex-row lg:px-10">
      <p>
        © {new Date().getFullYear()} GLOARO. All rights reserved.
      </p>

      <p>
        BUILDING THE FUTURE.
      </p>
    </div>
  </div>
</footer>

    </main>
  );
}