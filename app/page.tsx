"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Hammer,
  Home as HomeIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Sofa,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Project = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  coverImage?: string;
};

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

const gallery = [
  {
    src: "/images/projects/modern-living.jpg",
    alt: "Modern Living - Residential Construction",
    category: "Residential",
    title: "Modern Living",
    wide: true,
    overlay: "bg-primary/5",
    delay: 0.1,
  },
  {
    src: "/images/projects/fine-details.jpg",
    alt: "Fine Details - Interior Works",
    category: "Interior",
    title: "Fine Details",
    wide: false,
    overlay: "bg-primary/5",
    delay: 0.25,
  },
  {
    src: "/images/projects/bold-spaces.jpg",
    alt: "Bold Spaces - Commercial Construction",
    category: "Commercial",
    title: "Bold Spaces",
    wide: false,
    overlay: "bg-primary/5",
    delay: 0.4,
  },
  {
    src: "/images/projects/designed-to-last.jpg",
    alt: "Designed To Last - Architecture",
    category: "Architecture",
    title: "Designed To Last",
    wide: true,
    overlay: "bg-primary/5",
    delay: 0.55,
  },
];

/* ---------- Animation helpers ---------- */

// Numbers that count up when scrolled into view
function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const number = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, number, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, number, suffix]);

  return <span ref={ref}>{value}</span>;
}

// Heading words that slide up one by one
function WordReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [scrolled, setScrolled] = useState(false);

  // Fetch projects
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Failed to load projects:", error));
  }, []);

  // Navbar shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero parallax + fade
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-hidden bg-page text-ink">
        {/* SCROLL PROGRESS BAR */}
        <motion.div
          style={{ scaleX }}
          className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-accent"
        />

        {/* NAVBAR */}
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-white/85 backdrop-blur-xl">
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <a href="#home" className="flex items-center gap-3">
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
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {["Home", "About", "Services", "Projects", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group relative text-sm text-body transition hover:text-ink"
                  >
                    {item}

                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                ),
              )}
            </div>

            <Link
              href="/admin"
              className="hidden items-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white md:flex"
            >
              ADMIN
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {menuOpen && (
            <div className="border-t border-line bg-white px-6 py-5 md:hidden">
              {["Home", "About", "Services", "Projects", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line py-4 text-body"
                  >
                    {item}
                  </a>
                ),
              )}
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block py-4 font-bold text-accent-strong"
              >
                ADMIN
              </Link>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section
          id="home"
          ref={heroRef}
          className="relative flex min-h-screen items-center overflow-hidden pt-20"
        >
          {/* Hero background image (parallax) */}
          <motion.div
            className="absolute inset-0 scale-110 bg-cover bg-center"
            style={{
              y: bgY,
              backgroundImage: "url('/images/hero/hero-construction.jpeg')",
            }}
          />

          {/* Light overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-page via-page/85 to-page/25" />

          {/* Warm accent glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(249,115,22,0.10),transparent_35%)]" />

          {/* Slowly rotating circles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute right-[-10%] top-[15%] h-[600px] w-[600px] rounded-full border border-dashed border-line"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full border border-dashed border-accent/30"
          />

          {/* Main hero content (fades on scroll) */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 mx-auto flex w-full max-w-7xl px-6 py-24 lg:px-10"
          >
            <div className="flex max-w-3xl flex-col justify-center">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-8 flex items-center gap-3"
              >
                <span className="h-px w-12 bg-accent" />

                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-strong">
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
                <span className="text-accent-strong">THE FUTURE.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 max-w-xl text-lg leading-8 text-body"
              >
                From ambitious architectural concepts to extraordinary
                completed spaces, we transform ideas into structures built to
                last.
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
                  className="group flex items-center gap-3 bg-accent px-7 py-4 font-bold text-primary transition hover:bg-primary hover:text-white"
                >
                  EXPLORE PROJECTS
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Bouncing scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted"
          >
            Scroll to explore
          </motion.div>
        </section>

        {/* MARQUEE STRIP */}
        <section className="overflow-hidden bg-accent py-4">
          <motion.div
            className="flex w-max whitespace-nowrap text-sm font-black uppercase tracking-[0.3em] text-primary"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...services, ...services].map((s, i) => (
              <span key={i} className="pr-12">
                {s.title} <span className="pl-12">✦</span>
              </span>
            ))}
          </motion.div>
        </section>

        {/* STATS */}
        <section className="border-y border-line bg-section">
          <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-r border-line px-6 py-12 last:border-r-0"
              >
                <p className="text-4xl font-black text-accent-strong">
                  <Counter value={stat.value} />
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-subtle">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                Who We Are
              </p>

              <h2 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
                <WordReveal text="MORE THAN" />
                <br />
                <span className="text-faint">
                  <WordReveal text="CONSTRUCTION." />
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-xl leading-9 text-muted">
                We create spaces that combine engineering, architecture and
                human experience. Every project is treated as an opportunity to
                build something meaningful.
              </p>

              <Link
                href="/about"
                className="mt-8 flex w-fit items-center gap-3 border-b border-accent pb-2 font-bold text-accent-strong transition hover:text-ink"
              >
                DISCOVER OUR STORY
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="border-y border-line bg-section py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[420px] overflow-hidden border border-line"
            >
              <img
                src="/images/about/worker.jpg"
                alt="Arun Construction project"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute bottom-0 left-0 h-1 w-32 bg-accent" />

              <div className="absolute bottom-6 left-6 border border-line bg-white/90 px-5 py-3 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.25em] text-accent-strong">
                  Arun Construction
                </p>
                <p className="mt-1 text-sm text-body">
                  Built with precision
                </p>
              </div>
            </motion.div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                  Why Choose Us
                </p>

                <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                  <WordReveal text="BUILT ON" />
                  <br />
                  <span className="text-faint">
                    <WordReveal text="TRUST." />
                  </span>
                </h2>
              </div>

              <div className="mt-12 space-y-5">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-5 border-b border-line pb-5"
                  >
                    <CheckCircle2
                      className="shrink-0 text-accent-strong"
                      size={22}
                    />

                    <span className="text-lg text-body">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="bg-page py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                  Selected Work
                </p>

                <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                  <WordReveal text="OUR PROJECTS" />
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {projects.map((project, index) => (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="group relative h-[460px] overflow-hidden border border-line bg-card"
                >
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white transition duration-700 group-hover:scale-105" />
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(249,115,22,0.08))]" />

                  <div className="absolute left-6 top-6 bg-white/90 px-2.5 py-1 text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent p-7">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-strong">
                      {project.category}
                    </p>

                    <h3 className="text-3xl font-bold">{project.title}</h3>

                    <p className="mt-2 text-sm text-subtle">
                      {project.location}
                    </p>

                    <div className="mt-6 flex h-0 items-center gap-2 overflow-hidden text-sm font-bold text-accent-strong transition-all duration-300 group-hover:h-6">
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
        <section
          id="services"
          className="mx-auto max-w-7xl px-6 py-32 lg:px-10"
        >
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                What We Do
              </p>

              <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                <WordReveal text="OUR SERVICES" />
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
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
                    className="group relative min-h-[240px] border-b border-r border-line bg-page p-8 transition-all duration-300 hover:bg-accent"
                  >
                    <span className="text-sm font-medium text-accent-strong transition-colors duration-300 group-hover:text-primary">
                      {service.number}
                    </span>

                    {/* Icon wiggle on hover */}
                    <motion.div
                      whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className="mt-10 w-fit"
                    >
                      <Icon
                        size={34}
                        strokeWidth={1.5}
                        className="text-accent-strong transition-colors duration-300 group-hover:text-primary"
                      />
                    </motion.div>

                    <h3 className="mt-6 max-w-[260px] text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>

                    <ArrowRight
                      size={26}
                      strokeWidth={1.5}
                      className="absolute bottom-7 right-7 text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary"
                    />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* GALLERY */}
        <section className="border-y border-line bg-section py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-strong">
                Our Work
              </p>

              <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                <WordReveal text="PROJECT GALLERY" />
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {gallery.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: item.delay,
                    ease: "easeOut",
                  }}
                  className={`group relative h-72 overflow-hidden ${
                    item.wide ? "md:col-span-2" : ""
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 ${item.overlay} transition group-hover:bg-accent/15`}
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-5 pt-16">
                    <p className="text-xs uppercase tracking-widest text-white/80">
                      {item.category}
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="relative overflow-hidden bg-accent py-28 text-primary"
        >
          <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full border border-primary/10" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]">
                  Start a Project
                </p>

                <h2 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
                  <WordReveal text="HAVE A VISION?" />
                  <br />
                  <WordReveal text="LET'S BUILD IT." />
                </h2>
              </div>

              <Link
                href="/contact"
                className="flex items-center gap-3 bg-primary px-7 py-5 font-bold text-white transition hover:bg-white hover:text-primary"
              >
                GET IN TOUCH
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-primary text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3 lg:px-10">
            {/* Company */}
            <div>
              <p className="text-xl font-black tracking-[0.2em] text-white">
                ARUN
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">
                Construction
              </p>

              <p className="mt-6 text-sm font-semibold text-accent">
                Your Dreams Our Reality
              </p>

              <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                Building better spaces with quality, precision and innovation.
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Visit Us
              </p>

              <p className="mt-4 text-sm text-white/65">
                Prefer to reach out directly? Here&apos;s how to find us.
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <MapPin className="mt-1 shrink-0 text-accent" size={20} />

                  <p className="text-sm leading-6 text-white/75">
                    No. 52, Alagiri Samy Salai,
                    <br />
                    KK Nagar, Chennai – 600 078.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="shrink-0 text-accent" size={18} />
                  <p className="text-sm leading-6 text-white/75">
                    044 - 423 44333
                    <br />
                    +91 99403 07575
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="shrink-0 text-accent" size={18} />
                  <p className="text-sm leading-6 text-white/75">
                    arunconstructionno1@gmail.com
                    <br />
                    sales@arunbuilders.in
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Contact
              </p>

              <p className="mt-4 text-sm leading-7 text-white/65">
                Get in touch with us
                <br />
                for your next project.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs text-white/45 sm:flex-row lg:px-10">
              <p>
                © {new Date().getFullYear()} Arun Construction. All rights
                reserved.
              </p>
              <p>
                © Developed by{" "}
                <span className="font-semibold text-white/75">GLOARO</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
