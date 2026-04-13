import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ProjectItem = {
  title: string;
  summary: string;
  stack: string[];
  role: string;
  problem: string;
  built: string[];
  status: string;
  github?: string;
  live?: string;
  previews: string[];
};

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function showPrev() {
    setActiveImage((prev) =>
      prev === 0 ? project.previews.length - 1 : prev - 1
    );
  }

  function showNext() {
    setActiveImage((prev) =>
      prev === project.previews.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <>
      <motion.article
        className="rounded-xl border border-white/20 bg-white/10 p-6 text-white shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
            {project.status}
          </span>
        </div>

        <p className="mt-3 text-white/90">{project.summary}</p>

        {project.previews.length > 0 && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="block w-full overflow-hidden rounded-xl border border-white/15 bg-black/20 text-left"
            >
              <img
                src={project.previews[activeImage]}
                alt={`${project.title} preview ${activeImage + 1}`}
                className="h-56 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </button>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {project.previews.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 overflow-hidden rounded-lg border ${
                    activeImage === i ? "border-white" : "border-white/20"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} thumbnail ${i + 1}`}
                    className="h-16 w-24 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-white/60">
              Click image to view fullscreen
            </p>
          </div>
        )}

        <div className="mt-5">
          <p className="text-sm font-medium text-white/70">Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm text-white/85">
          <p>
            <span className="font-semibold text-white">Role:</span> {project.role}
          </p>
          <p>
            <span className="font-semibold text-white">Problem:</span> {project.problem}
          </p>
          <div>
            <p className="font-semibold text-white">What I built:</p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-white/85">
              {project.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-3 text-sm">
          {project.github && (
            <a
              className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}

          {project.live ? (
            <a
              className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          ) : (
            <a> </a>
          )}
        </div>
      </motion.article>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white hover:text-black transition"
            >
              Close
            </button>

            {project.previews.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-4 md:left-8 rounded-full border border-white/20 px-4 py-3 text-white hover:bg-white hover:text-black transition"
              >
                ‹
              </button>
            )}

            <motion.img
              key={project.previews[activeImage]}
              src={project.previews[activeImage]}
              alt={`${project.title} fullscreen preview ${activeImage + 1}`}
              className="max-h-[85vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {project.previews.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 md:right-8 rounded-full border border-white/20 px-4 py-3 text-white hover:bg-white hover:text-black transition"
              >
                ›
              </button>
            )}

            <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-[90vw]">
              {project.previews.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-lg border ${
                    activeImage === i ? "border-white" : "border-white/20"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} fullscreen thumbnail ${i + 1}`}
                    className="h-14 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const items: ProjectItem[] = [
  {
    title: "StudentNest Final Year Project",
    summary:
      "Student management platform for handling registration, course management, tuition, and secure login.",
    stack: ["React", "Spring Boot", "SQL", "Google Cloud"],
    role: "Full-Stack Developer",
    problem:
      "Built to simplify student and teacher workflows in one centralized academic system.",
    built: [
      "Implemented role-based workflows for students and teachers",
      "Built backend integration, authentication, and course management features",
    ],
    status: "Completed",
    github: "https://github.com/erictran739/StudentNest",
    previews: [
      "/projects/studentnest/1.png",
      "/projects/studentnest/2.png",
      "/projects/studentnest/3.png",
    ],
  },
  {
    title: "Golden Brows Threading Beauty Studio Website",
    summary:
      "Responsive business website for a real beauty studio brand focused on service presentation and polished UI.",
    stack: ["React", "Vite", "Tailwind CSS"],
    role: "Frontend Developer / Personal Project",
    problem:
      "Created a modern online presence for a real business to improve branding and service visibility.",
    built: [
      "Designed a clean responsive layout for services and brand presentation",
      "Built a modern UI structure focused on usability and visual trust",
    ],
    status: "Completed",
    github: "https://github.com/SantoshAdhikar/GoldenBrows-web",
    previews: [
      "/projects/goldenbrows/1.png",
      "/projects/goldenbrows/2.png",
      "/projects/goldenbrows/3.png",
    ],
  },
  {
    title: "Personal Budget Management",
    summary:
      "Budget tracking web app to help users manage expenses, organize budgets, and improve financial visibility.",
    stack: ["Web App", "Budget Tracking", "Personal Finance"],
    role: "Developer / Team Project",
    problem:
      "Built to help users better understand spending habits and manage their personal finances.",
    built: [
      "Created budgeting and expense organization workflows",
      "Improved visibility into personal spending and budget tracking",
    ],
    status: "Completed",
    github: "https://github.com/davidNicolas-cecs/Personal-Budget-Management",
    previews: [
      "/projects/budget/1.png",
      "/projects/budget/2.png",
      "/projects/budget/3.png",
    ],
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="scroll-mt-24 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <p className="mt-3 max-w-3xl text-white/80">
          Selected work that shows my experience building responsive interfaces,
          backend systems, and practical full-stack applications.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {items.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}