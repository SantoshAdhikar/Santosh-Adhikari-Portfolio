import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Code2, UserRound, MapPin } from "lucide-react";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.section
      id="home"
      className="scroll-mt-24 px-4 pb-16 pt-14 sm:pt-20"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[1fr_230px] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
            Open to junior backend & full-stack roles
          </p>
          <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I’m <span className="animated-name">Santosh Adhikari</span>
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-semibold text-sky-100 sm:text-3xl">
            Backend-focused full-stack developer
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Computer Science graduate from California State University, Long Beach. I build Java/Spring Boot APIs, React/TypeScript applications, and PostgreSQL-backed systems. My recent work includes an AI-assisted local business intelligence application.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} /> Los Angeles County, CA</span>
            <span className="rounded-full border border-white/25 px-3 py-1">B.S. Computer Science · Dec 2025</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"><ArrowDown size={18} /> Explore projects</a>
            <a href="/Santosh Adhikari Resume.pdf" download="Santosh_Adhikari_Resume.pdf" className="inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"><Download size={18} /> Download resume</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
            <a href="https://github.com/SantoshAdhikar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-white hover:underline"><Code2 size={18}/> GitHub</a>
            <a href="https://www.linkedin.com/in/santosh-adhikari-2043-sant/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-white hover:underline"><UserRound size={18}/> LinkedIn</a>
            <a href="mailto:santoshskyadhikari@gmail.com" className="text-white/85 underline-offset-4 hover:text-white hover:underline">Email me</a>
          </div>
        </div>
        <div className="order-first mx-auto lg:order-last">
          <div className="electric-gold relative h-44 w-44 sm:h-52 sm:w-52 lg:h-56 lg:w-56">
            <img src="/profile.webp" alt="Portrait of Santosh Adhikari" width={240} height={240} fetchPriority="high" className="relative z-10 h-full w-full rounded-full border-4 border-white/70 object-cover shadow-2xl" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
