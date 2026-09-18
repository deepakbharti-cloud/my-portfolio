import React, { useState, useEffect, useRef, useCallback } from "react";
import { Github, Mail, ExternalLink, Menu, X, MapPin, GraduationCap, Briefcase } from "lucide-react";

/* =======================================================
   DEEPAK BHARTI — PORTFOLIO
   Design concept: architectural / engineering "blueprint sheet"
   — fits a backend+AI developer whose flagship projects touch
   construction (SmartBuild Hub) and document scanning (AutoGrade AI).
   Sections are framed as numbered drawing sheets with a live
   title block, annotation leader-lines, and a graph-paper ground.
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
  { id: "contact", label: "Contact", sheet: "06" },
];

const PROJECTS = [
  {
    code: "S-04A",
    name: "AutoGrade AI",
    role: "DIP Engineer · 6-member team",
    desc: "An AI-powered answer-sheet evaluation system. Scanned sheets are read with OCR, matched against a model answer, and scored automatically — with a generated report and SMS notification pipeline.",
    stack: ["Django", "OpenCV", "Tesseract / EasyOCR", "HuggingFace flan-t5", "ReportLab", "Twilio"],
    accent: "cyan",
  },
  {
    code: "S-04B",
    name: "SmartBuild Hub",
    role: "Full-stack build",
    desc: "A platform connecting homeowners with contractors — project listings, requests, and coordination, backed by a relational schema built for real construction workflows.",
    stack: ["Django", "MySQL", "HTML/CSS", "Bootstrap"],
    accent: "amber",
    demo: "https://deepakbharti.github.io",
  },
];

const SKILLS = [
  { cat: "Backend", items: ["PHP / Laravel", "Python / Django"] },
  { cat: "Database", items: ["MySQL"] },
  { cat: "Frontend", items: ["HTML / CSS", "JavaScript", "Bootstrap", "Tailwind CSS"] },
];

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

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef({});

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
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

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
                className="mono text-xs px-3 py-2 rounded transition-colors"
                style={{
                  color: active === s.id ? TOKENS.amber : TOKENS.muted,
                  background: active === s.id ? TOKENS.panelLight : "transparent",
                }}
              >
                {s.sheet} — {s.label}
              </button>
            ))}
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
              Full-stack developer drafting web systems in{" "}
              <span style={{ color: TOKENS.amber }}>Django</span> and{" "}
              <span style={{ color: TOKENS.amber }}>Laravel</span> — currently building at{" "}
              <span style={{ color: TOKENS.text }}>Softpro India Pvt. Ltd.</span>, Lucknow.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="mono text-sm px-6 py-3 rounded-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: TOKENS.amber, color: TOKENS.bg }}
              >
                VIEW STRUCTURES →
              </button>
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
                  I'm a trainee software developer working across the Django and Laravel stacks, with a
                  particular pull toward projects where code has to interpret something messy —
                  scanned handwriting, contractor requests, real-world data — and turn it into something
                  structured.
                </p>
                <p>
                  My flagship project, <span style={{ color: TOKENS.text }}>AutoGrade AI</span>, came out of
                  a 6-member team build where I owned the document image-processing pipeline. Alongside
                  that, I've been deepening my C and data-structures fundamentals, and I'm currently
                  working Django REST Framework into my existing projects to round out an API-first
                  skillset.
                </p>
              </div>
              <div
                className="p-5 rounded-sm space-y-4"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
              >
                <div className="flex items-start gap-3">
                  <GraduationCap size={18} color={TOKENS.cyan} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm" style={{ color: TOKENS.text }}>Diploma, CSE</p>
                    <p className="mono text-xs mt-1" style={{ color: TOKENS.muted }}>CSJMGP, Ambedkar Nagar</p>
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
                    <p className="text-sm" style={{ color: TOKENS.text }}>Lucknow, Uttar Pradesh</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="03" title="Materials Legend" />
            <div className="grid sm:grid-cols-3 gap-6">
              {SKILLS.map((group) => (
                <div key={group.cat} className="p-5 rounded-sm" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}>
                  <p className="mono text-xs tracking-widest mb-4" style={{ color: TOKENS.amber }}>
                    {group.cat.toUpperCase()}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2" style={{ color: TOKENS.text }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.cyan }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
              const accentColor = p.accent === "cyan" ? TOKENS.cyan : TOKENS.amber;
              return (
                <Reveal key={p.code} delay={i * 100}>
                  <div
                    className="rounded-sm p-6 sm:p-8 relative overflow-hidden"
                    style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
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
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="mono text-xs flex items-center gap-1 px-3 py-2 rounded-sm" style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.text }}>
                            Live <ExternalLink size={12} />
                          </a>
                        )}
                        <a href="https://github.com/deepakbharti-cloud" target="_blank" rel="noopener noreferrer" className="mono text-xs flex items-center gap-1 px-3 py-2 rounded-sm" style={{ border: `1px solid ${TOKENS.border}`, color: TOKENS.text }}>
                          <Github size={12} /> Code
                        </a>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: TOKENS.muted }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span key={t} className="mono text-[11px] px-2.5 py-1 rounded-sm" style={{ background: TOKENS.bg, color: accentColor, border: `1px solid ${TOKENS.border}` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
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
            <div className="relative pl-8" style={{ borderLeft: `1px solid ${TOKENS.border}` }}>
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: TOKENS.amber }} />
              <p className="mono text-xs mb-1" style={{ color: TOKENS.cyan }}>PRESENT</p>
              <h3 className="display text-lg font-semibold mb-1" style={{ color: TOKENS.text }}>Trainee Software Developer</h3>
              <p className="text-sm mb-3" style={{ color: TOKENS.muted }}>Softpro India Pvt. Ltd. — Lucknow</p>
              <p className="text-sm leading-relaxed" style={{ color: TOKENS.muted }}>
                Working through an intensive C and data-structures training track, alongside hands-on
                web development in the company's project pipeline.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <SheetLabel sheet="06" title="Contact" />
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-3 p-5 rounded-sm transition-transform hover:-translate-y-0.5"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
              >
                <Mail size={18} color={TOKENS.amber} />
                <div>
                  <p className="text-sm" style={{ color: TOKENS.text }}>Email</p>
                  <p className="mono text-xs" style={{ color: TOKENS.muted }}>your.email@example.com</p>
                </div>
              </a>
              <a
                href="https://github.com/deepakbharti-cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-sm transition-transform hover:-translate-y-0.5"
                style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.border}` }}
              >
                <Github size={18} color={TOKENS.amber} />
                <div>
                  <p className="text-sm" style={{ color: TOKENS.text }}>GitHub</p>
                  <p className="mono text-xs" style={{ color: TOKENS.muted }}>deepakbharti-cloud</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 border-t text-center mono text-xs" style={{ borderColor: TOKENS.border, color: TOKENS.muted }}>
        © 2026 Deepak Bharti — Sheet {activeSheet.sheet}/06
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
            <span style={{ color: TOKENS.amber }}>{activeSheet.sheet} / 06</span>
            <span style={{ color: TOKENS.muted }}>SECTION</span>
            <span style={{ color: TOKENS.cyan }}>{activeSheet.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
