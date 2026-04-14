// @ts-nocheck
import { motion } from "framer-motion";

export default function Hero() {
  function goToProjects() {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 min-h-[78vh] grid place-items-center px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-5xl text-center">
        <div className="flex justify-center">
          <div className="relative h-56 w-56 rounded-full md:h-64 md:w-64">
            <div
              className="absolute inset-[-14px] rounded-full blur-xl opacity-90 animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, #ffd700, #ffb703, #ffe28a, #ffd700)",
              }}
            />

            <img
              src="/profile.jpg"
              alt="Santosh Adhikari"
              width={256}
              height={256}
              decoding="async"
              className="relative z-10 h-full w-full rounded-full object-cover border-4 border-white/60 shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="animated-portfolio text-4xl font-extrabold leading-tight md:text-5xl">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-6xl">
            Hi, I’m <span className="animated-name">Santosh Adhikari</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base text-white/90 md:text-xl">
            CS student at CSULB. I build full-stack apps with React, Java Spring
            Boot, and SQL. Passionate about secure messaging, education tech, and
            clean UI.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={goToProjects}
              className="rounded-lg border border-white/40 px-4 py-2 transition hover:bg-white hover:text-blue-700"
            >
              View Projects
            </button>

            <a
              href="/Santosh Adhikari Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white hover:text-black"
            >
              View Resume
            </a>

            <a
              href="https://github.com/SantoshAdhikar"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white hover:text-black"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/santosh-adhikari-2043-sant"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white hover:text-black"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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