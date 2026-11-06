import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink, Code2, Maximize2, X } from "lucide-react";

type Preview = { src: string; alt: string; caption: string };
type Project = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  status: string;
  role: string;
  problem: string;
  contributions: string[];
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  previews: Preview[];
  featured?: boolean;
};

// Images are served from /public. Use the existing PNG screenshots for all three galleries.
const projects: Project[] = [
  {
    id: "s4-neighborhood-intelligence",
    title: "S4 Neighborhood Intelligence",
    subtitle: "AI-assisted local business research",
    summary: "A full-stack application developed for the 2026 Meta Global AI Developer Hackathon. It brings storefront analysis, neighborhood research, evidence reporting, and opportunity ranking into one workflow.",
    date: "Oct–Nov 2026",
    status: "Hackathon prototype",
    role: "Independent full-stack developer",
    highlights: [
      "Built Java/Spring Boot APIs, PostgreSQL persistence, Flyway migrations, and analysis history.",
      "Connected Meta AI storefront inspection and neighborhood evidence to a React/TypeScript workflow.",
    ],
    problem: "Small businesses need a way to examine local evidence and decide which growth opportunities to prioritize without researching every source manually.",
    contributions: [
      "Built Spring Boot APIs for business workspaces, storefront media, analysis runs, and saved report history.",
      "Integrated Meta model workflows for storefront inspection and segmentation, with local Ollama support.",
      "Created React/TypeScript interfaces for neighborhood exploration, evidence review, and ranked opportunities.",
      "Used PostgreSQL, Flyway migrations, and automated backend tests while iterating on the product.",
    ],
    stack: ["Java 21", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Flyway", "Meta Model API", "SAM 3.1", "Ollama"],
    github: "https://github.com/SantoshAdhikar/s4-neighborhood-intelligence",
    previews: [
      { src: "/projects/s4-intelligence/1.png", alt: "S4 business workspace and unified analysis screen", caption: "Business workspace & analysis" },
      { src: "/projects/s4-intelligence/2.png", alt: "S4 storefront inspection with SAM segmentation overlay", caption: "AI storefront inspection" },
      { src: "/projects/s4-intelligence/3.png", alt: "S4 neighborhood explorer with local businesses and supporting evidence", caption: "Neighborhood intelligence" },
      { src: "/projects/s4-intelligence/4.png", alt: "S4 evidence report showing ranked recommendations", caption: "Evidence report & priorities" },
      { src: "/projects/s4-intelligence/5.png", alt: "Additional S4 Neighborhood Intelligence application screenshot", caption: "Additional application view 5" },
      { src: "/projects/s4-intelligence/6.png", alt: "Additional S4 Neighborhood Intelligence application screenshot", caption: "Additional application view 6" },
    ],
    featured: true,
  },
  {
    id: "studentnest",
    title: "StudentNest",
    subtitle: "CSULB senior capstone",
    summary: "A team-developed academic platform supporting student planning, course workflows, tuition information, and role-based access.",
    date: "2025",
    status: "Capstone project",
    role: "Backend-focused contributor on a five-person team",
    highlights: [
      "Developed Java/Spring Boot REST endpoints and MySQL-backed application logic.",
      "Integrated features with React screens in a five-person capstone team.",
    ],
    problem: "Academic planning workflows often span disconnected tools and are difficult to track in one place.",
    contributions: [
      "Developed REST endpoints and backend logic using Java and Spring Boot.",
      "Worked with MySQL-backed data relationships, CRUD operations, and validation.",
      "Integrated backend functionality with React screens and collaborated through Git and project sprints.",
    ],
    stack: ["Java", "Spring Boot", "React", "MySQL", "REST APIs", "Git"],
    github: "https://github.com/erictran739/StudentNest",
    previews: [
      { src: "/projects/studentnest/1.png", alt: "StudentNest application screenshot one", caption: "StudentNest interface" },
      { src: "/projects/studentnest/2.png", alt: "StudentNest application screenshot two", caption: "Academic workflows" },
      { src: "/projects/studentnest/3.png", alt: "StudentNest application screenshot three", caption: "StudentNest features" },
    ],
  },
  {
    id: "golden-brows",
    title: "Golden Brows Web Platform",
    subtitle: "Beauty studio booking and business software",
    summary: "An independently developed web application project built around real beauty-studio requirements, including service presentation and appointment workflows.",
    date: "2025–2026",
    status: "Independent project",
    role: "Full-stack developer",
    highlights: [
      "Built customer-facing React screens and Java/Spring Boot booking functionality.",
      "Translated real beauty-studio workflows into a working application project.",
    ],
    problem: "A beauty studio needed a clearer online experience for displaying services and managing customer booking workflows.",
    contributions: [
      "Developed React-based customer-facing screens and responsive service pages.",
      "Built Java/Spring Boot application features and data-backed booking workflows in the original platform.",
      "Worked directly with business requirements, testing, and usability improvements.",
    ],
    stack: ["React", "Java", "Spring Boot", "MySQL", "REST APIs"],
    github: "https://github.com/SantoshAdhikar/GoldenBrows-web",
    previews: [
      { src: "/projects/goldenbrows/1.png", alt: "Golden Brows website screenshot one", caption: "Business website" },
      { src: "/projects/goldenbrows/2.png", alt: "Golden Brows website screenshot two", caption: "Service presentation" },
      { src: "/projects/goldenbrows/3.png", alt: "Golden Brows website screenshot three", caption: "Responsive interface" },
      { src: "/projects/goldenbrows/4.png", alt: "Golden Brows website screenshot four", caption: "Golden Brows website features" },
    ],
  },
  {
    id: "personal-budget-management",
    title: "Personal Budget Management",
    subtitle: "Team software project",
    summary: "A budgeting application project designed to help users record expenses and understand their spending against a budget.",
    date: "Academic project",
    status: "Team project",
    role: "Development team member",
    highlights: [
      "Contributed to budgeting and expense-tracking features.",
      "Collaborated on implementation and testing in an academic team.",
    ],
    problem: "Tracking expenses in separate notes makes it difficult to understand spending and compare it with a budget.",
    contributions: [
      "Contributed to the team's budgeting and expense-tracking workflows.",
      "Collaborated on planning, implementation, and testing of project features.",
    ],
    stack: ["Budgeting", "Expense tracking", "Team collaboration"],
    // Previous team repository URL currently returns 404 to public visitors.
    // Restore the GitHub link only after a working public URL is provided.
    previews: [], // Intentionally text-only, as requested.
  },
];

function useAvailablePreviews(previews: Preview[]) {
  const [available, setAvailable] = useState<Preview[]>([]);
  useEffect(() => {
    if (previews.length === 0) return;
    let active = true;
    Promise.all(previews.map((preview) => new Promise<Preview | null>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(preview);
      img.onerror = () => resolve(null);
      img.src = preview.src;
    }))).then((results) => {
      if (active) setAvailable(results.filter((p): p is Preview => p !== null));
    });
    return () => { active = false; };
  }, [previews]);
  return available;
}

function Gallery({ project }: { project: Project }) {
  const previews = useAvailablePreviews(project.previews);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const currentPreview = previews[current] ?? previews[0];

  useEffect(() => {
    if (!open || previews.length === 0) return;
    const previousOverflow = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowLeft") setCurrent((i) => (i - 1 + previews.length) % previews.length);
      if (event.key === "ArrowRight") setCurrent((i) => (i + 1) % previews.length);
      if (event.key === "Tab" && dialogRef.current) {
        const controls = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      focused?.focus();
    };
  }, [open, previews]);

  if (previews.length === 0) {
    if (!project.featured) return null;
    return (
      <div className="mt-5 rounded-xl border border-sky-300/20 bg-gradient-to-br from-[#173c65] via-[#132c4d] to-[#101a33] p-6 sm:p-8" aria-label="S4 project overview">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Meta Global AI Developer Hackathon · 2026</p>
        <p className="mt-3 text-5xl font-black tracking-tight text-white">S4<span className="text-sky-300">.</span></p>
        <p className="mt-1 text-xl font-semibold">Neighborhood Intelligence</p>
        <p className="mt-3 max-w-xl text-white/75">Storefront inspection · Local evidence · Ranked opportunities · Analysis history</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full overflow-hidden rounded-xl border border-white/20 bg-[#10182e] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300" aria-label={`Enlarge ${currentPreview.caption} screenshot`}>
        <img src={currentPreview.src} alt={currentPreview.alt} loading="lazy" decoding="async" className={`w-full object-contain ${project.featured ? "max-h-[460px]" : "max-h-[310px]"}`} />
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/75 px-3 py-2 text-xs text-white"><Maximize2 size={14} /> Enlarge</span>
      </button>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Project screenshots">
        {previews.map((preview, i) => (
          <button type="button" key={preview.src} onClick={() => setCurrent(i)} aria-label={`Show ${preview.caption}`} aria-pressed={current === i} className={`shrink-0 overflow-hidden rounded-lg border-2 ${current === i ? "border-sky-300" : "border-white/20"}`}>
            <img src={preview.src} alt="" loading="lazy" className="h-14 w-24 object-cover" />
          </button>
        ))}
      </div>
      <p className="mt-1 text-xs text-white/65">{currentPreview.caption} · {current + 1} of {previews.length}</p>
      <AnimatePresence>
        {open && (
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`${project.title} screenshot gallery`} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} onClick={() => setOpen(false)}>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/30 bg-black/60 px-4 py-2 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"><X size={18} /> Close</button>
            <div className="flex w-full max-w-6xl items-center justify-between gap-2" onClick={(event) => event.stopPropagation()}>
              {previews.length > 1 ? <button type="button" onClick={() => setCurrent((i) => (i - 1 + previews.length) % previews.length)} aria-label="Previous screenshot" className="rounded-full border border-white/30 p-3 text-white"><ArrowLeft size={18}/></button> : <span />}
              <img src={currentPreview.src} alt={currentPreview.alt} className="max-h-[78vh] min-w-0 max-w-[84vw] object-contain" />
              {previews.length > 1 ? <button type="button" onClick={() => setCurrent((i) => (i + 1) % previews.length)} aria-label="Next screenshot" className="rounded-full border border-white/30 p-3 text-white"><ArrowRight size={18}/></button> : <span />}
            </div>
            <p className="mt-3 text-center text-sm text-white/80">{currentPreview.caption} · {current + 1} / {previews.length} · Esc to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      className={`flex h-full flex-col scroll-mt-24 rounded-2xl border border-white/20 bg-[#0b1c34]/85 p-5 text-white shadow-lg sm:p-7 ${project.featured ? "lg:col-span-2" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {project.featured && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Featured engineering project</p>}
          <h3 className="text-xl font-bold sm:text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-white/70">{project.subtitle} · {project.date}</p>
        </div>
        <span className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85">{project.status}</span>
      </div>

      <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/85 sm:text-base">{project.summary}</p>
      <p className="mt-3 text-sm text-sky-200"><span className="font-semibold">My role:</span> {project.role}</p>

      <Gallery project={project} />

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="rounded-full border border-sky-300/20 bg-sky-300/10 px-2.5 py-1 text-xs text-sky-50">{tech}</span>
        ))}
      </div>

      <div className={`mt-5 grid gap-3 ${project.featured ? "sm:grid-cols-2" : ""}`}>
        {project.highlights.map((highlight) => (
          <p key={highlight} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-white/85">
            <span className="mr-2 text-sky-300" aria-hidden="true">✓</span>{highlight}
          </p>
        ))}
      </div>

      <details className="group mt-5 rounded-xl border border-white/20 bg-black/15">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-sky-100 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 [&::-webkit-details-marker]:hidden">
          Engineering details
          <ChevronDown size={17} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-white/15 px-4 pb-5 pt-4 text-sm leading-relaxed text-white/85">
          <h4 className="font-semibold text-white">Problem</h4>
          <p className="mt-1">{project.problem}</p>
          {project.featured && (
            <div className="mt-4 rounded-lg border border-sky-300/20 bg-[#102b49]/70 p-3">
              <h4 className="font-semibold text-sky-200">Architecture</h4>
              <p className="mt-1">React + TypeScript → Spring Boot REST API → PostgreSQL + Flyway.</p>
              <p className="mt-1">AI workflows use Meta Model API, including storefront segmentation, with local Ollama support.</p>
            </div>
          )}
          <h4 className="mt-4 font-semibold text-white">Contributions</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            {project.contributions.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
      </details>

      {project.github && (
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            <Code2 size={17} aria-hidden="true" /> View source code <ExternalLink size={14} aria-hidden="true" />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
              Live site <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Selected work</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Projects that demonstrate what I can build</h2>
        <p className="mt-3 max-w-3xl text-white/75">Real applications, academic collaboration, and independent engineering work. Each project explains the problem, the technology, and my contributions.</p>
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
