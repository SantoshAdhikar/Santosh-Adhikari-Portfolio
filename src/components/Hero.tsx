// @ts-nocheck
import { motion } from "framer-motion";

export default function Hero() {
  function goToProjects() {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 min-h-screen flex items-center px-6 py-16 md:px-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-7xl grid items-center gap-12 md:grid-cols-[360px_minmax(0,1fr)] lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="flex justify-center md:justify-start">
          <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full">
            <div
              className="absolute inset-[-18px] rounded-full blur-2xl opacity-90 animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, #ffd700, #ffb703, #ffe28a, #ffd700)",
              }}
            />
            <img
              src="/profile.jpg"
              alt="Santosh Adhikari"
              width={400}
              height={400}
              decoding="async"
              className="relative z-10 h-full w-full rounded-full object-cover border-4 border-white/60 shadow-2xl"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-white/70">
            Full-Stack Developer | React, Spring Boot, SQL
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Hi, I’m <span className="rainbow-text">Santosh Adhikari</span>
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-white/90 md:text-xl">
            Building modern web apps with clean UI and strong backend systems.
          </p>

          <div className="mt-4 text-base text-white/75">
            Los Angeles, CA
          </div>

          <p className="mt-5 max-w-3xl leading-relaxed text-white/80 text-base md:text-lg">
            Computer Science graduate focused on full-stack and backend development.
            I build practical, reliable software using React, Java Spring Boot, SQL,
            and cloud tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <button
              onClick={goToProjects}
              className="rounded-lg border border-white/40 px-5 py-3 hover:bg-white hover:text-blue-700 transition"
            >
              View Projects
            </button>

            <a
              href="/Santosh Adhikari Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-5 py-3 text-white transition hover:bg-white hover:text-black"
            >
              View Resume
            </a>

            <a
              href="https://github.com/SantoshAdhikar"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-5 py-3 hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/santosh-adhikari-2043-sant"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-5 py-3 hover:bg-white hover:text-black transition"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              React
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              Spring Boot
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              SQL
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
              REST APIs
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}