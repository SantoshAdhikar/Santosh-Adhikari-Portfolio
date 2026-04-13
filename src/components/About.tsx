import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="scroll-mt-24 py-10 md:py-14"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 text-white">
        <h2 className="text-3xl font-bold">About</h2>

        <p className="mt-5 max-w-5xl leading-relaxed text-white/90 text-base md:text-lg">
          I’m a full-stack developer focused on building practical, reliable software.
          My work includes web applications built with React, Java Spring Boot, SQL, and
          cloud-based tools. I enjoy creating clean user experiences backed by strong
          backend systems.
        </p>

        <p className="mt-5 max-w-5xl leading-relaxed text-white/90 text-base md:text-lg">
          Recent projects include StudentNest, a student management system with authentication,
          course workflows, and backend integration, along with business-focused web projects
          designed for real users and real needs.
        </p>
      </div>
    </motion.section>
  );
}