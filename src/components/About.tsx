import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="scroll-mt-24 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          I’m a developer focused on practical, reliable software. Recent work includes a
          Student Management System (React + Spring Boot + SQL on GCP) and SafeChat —
          a secure messaging backend with phishing detection and an image scan pipeline.
        </p>
        <ul className="mt-4 text-gray-700 list-disc list-inside">
          <li><span className="font-medium">Languages/Tools:</span> Java, TypeScript/JavaScript, React, Spring Boot, SQL, Git, Vite, Tailwind</li>
          <li><span className="font-medium">Interests:</span> backend APIs, clean UI, Android (Jetpack Compose), security</li>
        </ul>
      </div>
    </motion.section>
  );
}
