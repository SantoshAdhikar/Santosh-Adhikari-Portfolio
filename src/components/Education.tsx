import { motion } from "framer-motion";

export default function Education() {
  return (
    <motion.section
      id="education"
      className="scroll-mt-24 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white">Education & Experience</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">
              B.S. in Computer Science
            </h3>
            <p className="mt-2 text-white/90">
              California State University, Long Beach
            </p>
            <p className="mt-1 text-white/70">Graduation: December 2025</p>

            <div className="mt-4 space-y-2 text-white/85">
              <p>
                <span className="font-medium text-white">Senior Project:</span> StudentNest,
                a student management system built with React, Spring Boot, SQL, and Google Cloud.
              </p>
              <p>
                <span className="font-medium text-white">Relevant Focus:</span> full-stack development,
                backend systems, database-driven applications, and software engineering workflows.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">
              Independent Projects & Personal Work
            </h3>

            <ul className="mt-4 list-disc list-inside space-y-2 text-white/85">
              <li>Built full-stack web applications using React, Spring Boot, and SQL</li>
              <li>Created responsive business website for a real beauty studio brand</li>
              <li>Worked on personal portfolio development with a focus on clean UI and recruiter-ready presentation</li>
              <li>Built academic and personal projects that demonstrate frontend, backend, and database integration</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}