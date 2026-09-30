import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Mail,
  Phone,
  ExternalLink,
  Menu,
  X,
  MapPin,
  GraduationCap,
  Briefcase,
  Download,
  Copy,
  Check,
  ArrowUp,
  Award,
  Linkedin,
} from "lucide-react";

/* ============================================================
   DEEPAK BHARTI — PORTFOLIO
   Design concept: architectural / engineering "blueprint sheet"
   ============================================================ */

const TOKENS = {
  bg: "#0A1929",
  panel: "#0F2540",
  panelLight: "#132C4D",
  grid: "#173A5E",
  border: "#20476F",
  text: "#E8F1F8",
  muted: "#8FA8C2",
  amber: "#F5A623",
  cyan: "#4FD1C5",
  coral: "#FF6B5B",
};

const SECTIONS = [
  { id: "hero", label: "Title", sheet: "01" },
  { id: "about", label: "About", sheet: "02" },
  { id: "skills", label: "Materials", sheet: "03" },
  { id: "projects", label: "Structures", sheet: "04" },
  { id: "experience", label: "Site Log", sheet: "05" },
  { id: "education", label: "Education", sheet: "06" },
  { id: "contact", label: "Contact", sheet: "07" },
];

const PROJECTS = [
  {
    code: "S-04A",
    name: "AutoGrade AI",
    role: "College Major Project · 2025–2026",
    desc: "AI-powered answer-sheet evaluation system. Owned the document image-processing pipeline in a 6-member team — scanned sheets are read with OCR, scored semantically against a model answer, and compiled into an automated PDF report.",
    stack: ["Django", "OpenCV", "Tesseract / EasyOCR", "HuggingFace flan-t5", "ReportLab"],
    accent: "cyan",
  },
  {
    code: "S-04B",
    name: "SmartBuild Hub",
    role: "Summer Training · 2025",
    desc: "Digital platform connecting homeowners with contractors — streamlines home-construction workflows and centralizes project data across stakeholders.",
    stack: ["Django", "MySQL"],
    accent: "amber",
    demo: "https://deepakbharti.github.io",
  },
  {
    code: "S-04C",
    name: "File Tracking System",
    role: "Summer Training, Softpro India · for Green Gas Limited · 2026",
    desc: "Centralized digital platform to streamline file creation, movement, and approval, with real-time status updates and a full audit trail. Guided the trainee batch through the build as coordinator.",
    stack: ["Python", "Django"],
    accent: "coral",
  },
  {
    code: "S-04D",
    name: "KaaryaSetu",
    role: "Personal Project · 2026",
    desc: "Hyperlocal labor marketplace connecting local skilled workers with customers — booking flow, listings, and role-based access control.",
    stack: ["Laravel", "PHP", "MySQL"],
    accent: "cyan",
  },
];

const SKILLS = [
  { cat: "Programming", items: ["PHP / Laravel", "Python / Django", "Python (NumPy)", "C"] },
  { cat: "Web", items: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Tailwind CSS"] },
  { cat: "Database", items: ["MySQL", "MongoDB"] },
  { cat: "Backend & APIs", items: ["REST APIs"] },
  { cat: "Tools", items: ["Git & GitHub", "VS Code"] },
];

const EDUCATION = [
  { degree: "B.Tech, Computer Science & Engineering", place: "ITM Lucknow", note: "2nd Year — in progress" },
  { degree: "Diploma, Computer Science & Engineering", place: "CSJM Govt. Polytechnic, Ambedkar Nagar", note: "" },
  { degree: "Intermediate (PCM)", place: "Govt. Jubilee Inter College, Gorakhpur", note: "" },
  { degree: "High School", place: "PNSJI College, Barhi Sonbarsa, Gorakhpur", note: "" },
];

const CERTIFICATIONS = [
  {
    name: "Soft Skill Development Certification (UNXT)",
    issuer: "SGBS Unnati Foundation",
    note: "Communication, Teamwork, Problem-Solving, Workplace Ethics",
  },
];

const EMAIL = "deepak28609@gmail.com";
const PHONE = "9120041854";
const LOCATION = "Chauri Chaura, Gorakhpur, UP";
const RESUME_URL = "/resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/deepak-bharti-ab7622315";

/* ---------- Scroll reveal ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Cursor-follow spotlight hover card ---------- */
function SpotlightCard({ children, className = "", style = {}, glowColor = TOKENS.cyan, ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative overflow-hidden transition-transform duration-300 ${className}`}
      style={{
        ...style,
        transform: hovering ? "translateY(-4px)" : "translateY(0)",
      }}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, ${glowColor}22, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${glowColor}66`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SheetLabel({ sheet, title }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span
        className="text-xs tracking-widest px-2 py-1 rounded-sm"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: TOKENS.bg, background: TOKENS.amber }}
      >
        SHEET {sheet}
      </span>
      <div className="h-px flex-1" style={{ background: TOKENS.border }} />
      <h2
        className="text-2xl sm:text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: TOKENS.text }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ---------- Copy-to-clipboard button with toast ---------- */
function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy} 
      className="mono text-[11px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm transition-colors flex-shrink-0"
      style={{
        border: `1px solid ${copied ? TOKENS.cyan : TOKENS.border}`,
        color: copied ? TOKENS.cyan : TOKENS.muted,
      }}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ---------- Scroll progress bar ---------- */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${TOKENS.amber}, ${TOKENS.cyan})` }}
      />
    </div>
  );
}

/* ---------- Back to top ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1 shadow-lg"
      style={{ background: TOKENS.amber, color: TOKENS.bg }}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const activeSheet = SECTIONS.find((s) => s.id === active) || SECTIONS[0];
  const totalSheets = SECTIONS.length - 1; // excludes hero (01) from the "of N" count shown

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `linear-gradient(${TOKENS.grid} 1px, transparent 1px), linear-gradient(90deg, ${TOKENS.grid} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        ::selection { background: ${TOKENS.amber}; color: ${TOKENS.bg}; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${TOKENS.amber}; outline-offset: 2px; }
        .skill-tag { transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .skill-tag:hover { transform: translateY(-2px) scale(1.04); border-color: ${TOKENS.cyan}; color: ${TOKENS.cyan}; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: 4px; height: 1px;
          background: ${TOKENS.amber}; transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .stack-chip { transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease; }
        .stack-chip:hover { transform: translateY(-2px); }
        .resume-btn { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .resume-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px ${TOKENS.amber}88; }
        .icon-link { transition: transform 0.2s ease, border-color 0.2s ease; }
        .icon-link:hover { transform: translateY(-2px); border-color: ${TOKENS.amber}; }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <ScrollProgress />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
        style={{ background: "rgba(10,25,41,0.85)", borderBottom: `1px solid ${TOKENS.border}` }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="mono text-sm tracking-widest" style={{ color: TOKENS.amber }}>
            DB / PORTFOLIO
          </button>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="nav-link mono text-xs px-3 py-2 rounded transition-colors"
                style={{
                  color: active === s.id ? TOKENS.amber : TOKENS.muted,
                  background: active === s.id ? TOKENS.panelLight : "transparent",
                }}
              >
                {s.sheet} — {s.label}
              </button>
            ))}
            <a
              href={RESUME_URL}
              download
              className="resume-btn mono text-xs flex items-center gap-1.5 px-3 py-2 rounded-sm font-medium ml-2"
              style={{ background: TOKENS.amber, color: TOKENS.bg }}
            >
              <Download size={13} /> Resume
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} color={TOKENS.text} /> : <Menu size={20} color={TOKENS.text} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-1" style={{ borderTop: `1px solid ${TOKENS.border}` }}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="mono text-xs text-left px-2 py-3"
                style={{ color: active === s.id ? TOKENS.amber : TOKENS.muted }}
              >
                {s.sheet} — {s.label}
              </button>
            ))}
            <a
              href={RESUME_URL}
              download
              className="mono text-xs flex items-center gap-1.5 px-2 py-3 font-medium"
              style={{ color: TOKENS.amber }}
            >
              <Download size={14} /> Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
          <Reveal>
            <p className="mono text-xs tracking-[0.3em] mb-6" style={{ color: TOKENS.cyan }}>
              DRAWING NO. 2026-DB-01 &nbsp;·&nbsp; SCALE NA
            </p>
            <h1
              className="display font-bold leading-[0.95] mb-6"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)", color: TOKENS.text }}
            >
              DEEPAK
              <br />
              BHARTI
            </h1>
            <p className="max-w-xl text-base sm:text-lg mb-10" style={{ color: TOKENS.muted }}>
              Software developer building full-stack applications in{" "}
              <span style={{ color: TOKENS.amber }}>Python / Django</span> and{" "}
              <span style={{ color: TOKENS.amber }}>React</span> — currently a Trainee Software
              Developer at <span style={{ color: TOKENS.text }}>Softpro India Pvt. Ltd.</span>, Lucknow.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="mono text-sm px-6 py-3 rounded-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TOKENS.amber, color: TOKENS.bg }}
              >
                VIEW STRUCTURES →
              </button>
              <a
                href={RESUME_URL}
                download
                className="resume-btn mono text-sm px-6 py-3 rounded-sm font-medium border flex items-center gap-2"
                style={{ borderColor: TOKENS.border, color: TOKENS.text }}
              >
                <Download size={15} /> DOWNLOAD RESUME
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="mono text-sm px-6 py-3 rounded-sm font-medium border transition-transform hover:-translate-y-0.5"
                style={{ borderColor: TOKENS.border, color: TOKENS.text }}
              >
                CONTACT
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="02" title="About" />
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-4 text-base leading-relaxed" style={{ color: TOKENS.muted }}>
                <p>
                  I'm a software developer working across the Django and React stacks, with hands-on
                  experience building full-stack applications backed by REST APIs and responsive
                  dashboards. I'm drawn to projects where code has to interpret something messy —
                  scanned handwriting, construction workflows, file approvals — and turn it into
                  something structured and trackable.
                </p>
                <p>
                  I completed my summer training at <span style={{ color: TOKENS.text }}>Softpro India</span> as
                  a Coordinator, guiding a trainee batch through the{" "}
                  <span style={{ color: TOKENS.text }}>File Tracking System</span> project for Green Gas
                  Limited — and I'm now a Trainee Software Developer there, collaborating on feature
                  builds, bug fixes, and code reviews in a production environment. My flagship project,{" "}
                  <span style={{ color: TOKENS.text }}>AutoGrade AI</span>, came out of a 6-member college
                  team build where I owned the document image-processing pipeline. Alongside all this,
                  I'm pursuing my B.Tech (2nd year) at ITM Lucknow.
                </p>
              </div>
              <SpotlightCard
                className="p-5 rounded-sm space-y-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.cyan}
              >
                <div className="flex items-start gap-3">
                  <GraduationCap size={18} color={TOKENS.cyan} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>B.Tech CSE, 2nd Year</p>
                    <p className="mono text-xs mt-1" style={{ color: TOKENS.muted }}>ITM Lucknow</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase size={18} color={TOKENS.cyan} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>Trainee Software Developer</p>
                    <p className="mono text-xs mt-1" style={{ color: TOKENS.muted }}>Softpro India Pvt. Ltd.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} color={TOKENS.cyan} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>Lucknow (work) · {LOCATION} (home)</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="03" title="Materials Legend" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((group) => (
                <SpotlightCard
                  key={group.cat}
                  className="p-5 rounded-sm"
                  style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                  glowColor={TOKENS.amber}
                >
                  <p className="mono text-xs tracking-widest mb-4" style={{ color: TOKENS.amber }}>
                    {group.cat.toUpperCase()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="skill-tag mono text-xs px-2.5 py-1.5 rounded-sm cursor-default"
                        style={{ background: TOKENS.bg, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="04" title="Structures Built" />
          </Reveal>
          <div className="space-y-6">
            {PROJECTS.map((p, i) => {
              const accentColor =
                p.accent === "cyan" ? TOKENS.cyan : p.accent === "coral" ? TOKENS.coral : TOKENS.amber;
              return (
                <Reveal key={p.code} delay={i * 100}>
                  <SpotlightCard
                    className="rounded-sm p-6 sm:p-8"
                    style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                    glowColor={accentColor}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accentColor }} />
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="mono text-xs tracking-widest mb-1" style={{ color: accentColor }}>{p.code}</p>
                        <h3 className="display text-xl sm:text-2xl font-semibold" style={{ color: TOKENS.text }}>{p.name}</h3>
                        <p className="mono text-xs mt-1" style={{ color: TOKENS.muted }}>{p.role}</p>
                      </div>
                      <div className="flex gap-3">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="icon-link mono text-xs flex items-center gap-1 px-3 py-2 rounded-sm" style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.text }}>
                            Live <ExternalLink size={12} />
                          </a>
                        )}
                        <a href="https://github.com/deepakbharti-cloud" target="_blank" rel="noopener noreferrer" className="icon-link mono text-xs flex items-center gap-1 px-3 py-2 rounded-sm" style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.text }}>
                          <Github size={12} /> Code
                        </a>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: TOKENS.muted }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span key={t} className="stack-chip mono text-[11px] px-2.5 py-1 rounded-sm" style={{ background: TOKENS.bg, color: accentColor, border: `1px solid ${TOKENS.border}` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="05" title="Site Log" />
            <div className="relative pl-8 space-y-10" style={{ borderLeft: `1px solid ${TOKENS.border}` }}>
              <div>
                <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full" style={{ background: TOKENS.amber }} />
                <p className="mono text-xs mb-1" style={{ color: TOKENS.cyan }}>PRESENT</p>
                <h3 className="display text-lg font-semibold mb-1" style={{ color: TOKENS.text }}>Trainee Software Developer</h3>
                <p className="text-sm mb-3" style={{ color: TOKENS.muted }}>Softpro India Pvt. Ltd. — Lucknow</p>
                <p className="text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
                  Collaborating with the development team on feature builds, bug fixes, and code
                  reviews in a production environment — while continuing B.Tech (2nd year) in parallel.
                </p>
              </div>
              <div>
                <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full" style={{ background: TOKENS.border }} />
                <p className="mono text-xs mb-1" style={{ color: TOKENS.muted }}>EARLIER</p>
                <h3 className="display text-lg font-semibold mb-1" style={{ color: TOKENS.text }}>Summer Training Coordinator</h3>
                <p className="text-sm mb-3" style={{ color: TOKENS.muted }}>Softpro India Pvt. Ltd. — Lucknow</p>
                <p className="text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
                  Coordinated a batch of students during summer training — resolving code and technical
                  errors, managing day-to-day training activities, and guiding the batch through the
                  File Tracking System project for Green Gas Limited.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section id="education" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="06" title="Education & Certifications" />
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="mono text-xs tracking-widest mb-4" style={{ color: TOKENS.amber }}>EDUCATION</p>
                <div className="space-y-5">
                  {EDUCATION.map((ed) => (
                    <div key={ed.degree} className="flex items-start gap-3">
                      <GraduationCap size={16} color={TOKENS.cyan} className="mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm" style={{ color: TOKENS.text }}>{ed.degree}</p>
                        <p className="mono text-xs mt-0.5" style={{ color: TOKENS.muted }}>
                          {ed.place}{ed.note ? ` · ${ed.note}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mono text-xs tracking-widest mb-4" style={{ color: TOKENS.amber }}>CERTIFICATIONS</p>
                <div className="space-y-4">
                  {CERTIFICATIONS.map((c) => (
                    <SpotlightCard
                      key={c.name}
                      className="p-4 rounded-sm"
                      style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                      glowColor={TOKENS.coral}
                    >
                      <div className="flex items-start gap-3">
                        <Award size={16} color={TOKENS.coral} className="mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm" style={{ color: TOKENS.text }}>{c.name}</p>
                          <p className="mono text-xs mt-0.5" style={{ color: TOKENS.muted }}>{c.issuer}</p>
                          <p className="text-xs mt-1.5 leading-relaxed" style={{ color: TOKENS.muted }}>{c.note}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="07" title="Contact" />
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mb-6">
              <SpotlightCard
                className="rounded-sm"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.amber}
              >
                <div className="flex items-center justify-between gap-3 p-5">
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 min-w-0">
                    <Mail size={18} color={TOKENS.amber} className="flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm" style={{ color: TOKENS.text }}>Email</p>
                      <p className="mono text-xs truncate" style={{ color: TOKENS.muted }}>{EMAIL}</p>
                    </div>
                  </a>
                  <CopyButton value={EMAIL} label="email" />
                </div>
              </SpotlightCard>
              <SpotlightCard
                className="rounded-sm"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.cyan}
              >
                <div className="flex items-center justify-between gap-3 p-5">
                  <a href={`tel:+91${PHONE}`} className="flex items-center gap-3 min-w-0">
                    <Phone size={18} color={TOKENS.cyan} className="flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm" style={{ color: TOKENS.text }}>Phone</p>
                      <p className="mono text-xs truncate" style={{ color: TOKENS.muted }}>+91 {PHONE}</p>
                    </div>
                  </a>
                  <CopyButton value={PHONE} label="phone" />
                </div>
              </SpotlightCard>
              <SpotlightCard
                className="rounded-sm"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.amber}
              >
                <a
                  href="https://github.com/deepakbharti-cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5"
                >
                  <Github size={18} color={TOKENS.amber} />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>GitHub</p>
                    <p className="mono text-xs" style={{ color: TOKENS.muted }}>deepakbharti-cloud</p>
                  </div>
                </a>
              </SpotlightCard>
              <SpotlightCard
                className="rounded-sm"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.cyan}
              >
                <a
                  href="https://www.linkedin.com/in/deepak-bharti-ab7622315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5"
                >
                  <Linkedin size={18} color={TOKENS.cyan} />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>LinkedIn</p>
                    <p className="mono text-xs" style={{ color: TOKENS.muted }}>deepak-bharti</p>
                  </div>
                </a>
              </SpotlightCard>


              <SpotlightCard
                className="rounded-sm sm:col-span-2"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
                glowColor={TOKENS.cyan}
              >
                <div className="flex items-center gap-3 p-5">
                  <MapPin size={18} color={TOKENS.cyan} />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>Location</p>
                    <p className="mono text-xs" style={{ color: TOKENS.muted }}>{LOCATION}</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
            <a
              href={RESUME_URL}
              download
              className="resume-btn mono text-sm inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium"
              style={{ background: TOKENS.amber, color: TOKENS.bg }}
            >
              <Download size={15} /> DOWNLOAD RESUME (PDF)
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 border-t text-center mono text-xs" style={{ borderColor: TOKENS.border, color: TOKENS.muted }}>
        © 2026 Deepak Bharti — Sheet {activeSheet.sheet}/{String(totalSheets).padStart(2, "0")}
      </footer>

      {/* TITLE BLOCK — signature element, live sheet indicator */}
      <div
        className="hidden sm:flex fixed bottom-5 right-5 z-40 mono text-[11px] rounded-sm overflow-hidden shadow-lg"
        style={{ border: `1px solid ${TOKENS.border}`, background: TOKENS.panel }}
      >
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <span style={{ color: TOKENS.muted }}>DRAWN BY</span>
            <span style={{ color: TOKENS.text }}>D. BHARTI</span>
            <span style={{ color: TOKENS.muted }}>SHEET</span>
            <span style={{ color: TOKENS.amber }}>{activeSheet.sheet} / {String(totalSheets).padStart(2, "0")}</span>
            <span style={{ color: TOKENS.muted }}>SECTION</span>
            <span style={{ color: TOKENS.cyan }}>{activeSheet.label}</span>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
