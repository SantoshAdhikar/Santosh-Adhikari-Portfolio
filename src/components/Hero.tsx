// @ts-nocheck
import { motion } from "framer-motion";

export default function Hero() {
  function goToGallery() {
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 min-h-[72vh] grid place-items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Clickable avatar with electric ring */}
      <button
        type="button"
        onClick={goToGallery}
        className="relative mx-auto h-56 w-56 md:h-64 md:w-64 rounded-full outline-none focus:ring-2 focus:ring-white/50"
        title="Open Community Gallery"
      >
        <div
          className="absolute inset-[-14px] rounded-full blur-xl opacity-90 animate-[spin_6s_linear_infinite]"
          style={{ background: "conic-gradient(from 0deg, #ffd700, #ffb703, #ffe28a, #ffd700)" }}
        />
        <img
          src="/profile.jpg"
          alt="Santosh Adhikari"
          width={256}
          height={256}
          decoding="async"
          className="relative z-10 h-full w-full rounded-full object-cover border-4 border-white/60 shadow-2xl"
        />
      </button>

      <div className="text-center mt-8">
        <p className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">Portfolio</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">
          Hi, I’m <span className="rainbow-text">Santosh Adhikari</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto opacity-90">
          CS student at CSULB. I build full-stack apps with React, Java Spring Boot, and SQL.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white hover:text-blue-700 transition"
          >
            View Projects
          </a>
          <span
            className="px-4 py-2 rounded-lg border border-white/20 text-white/70 cursor-not-allowed"
            title="Resume coming soon"
          >
            Resume Coming Soon
          </span>
        </div>
      </div>
    </motion.section>
  );
}
