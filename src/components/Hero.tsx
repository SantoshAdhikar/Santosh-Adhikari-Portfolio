import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="scroll-mt-24 min-h-[72vh] grid place-items-center bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <img
          src="/profile.jpg"
          alt="Santosh Adhikari"
          className="mx-auto h-32 w-32 rounded-full object-cover border shadow-md"
        />

        <p className="mt-4 text-xs tracking-wide uppercase text-gray-600">
          Portfolio
        </p>

        <h1 className="mt-2 text-4xl md:text-5xl font-bold">
          Hi, I’m <span className="text-blue-600">Santosh Adhikari</span>
        </h1>

        <p className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed">
          CS student at CSULB. I build full-stack apps with React, Java Spring Boot, and SQL.
          Passionate about secure messaging, education tech, and clean UI.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 hover:text-white transition"
          >
            View Projects
          </a>

        <a
            href="#"
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-500 cursor-not-allowed"
            title="Resume coming soon"
          >
            Resume Coming Soon
          </a>
        </div>
      </div>
    </motion.section>
  );
}
