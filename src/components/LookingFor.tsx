import { motion } from "framer-motion";

export default function LookingFor() {
  return (
    <motion.section
      id="looking-for"
      className="scroll-mt-24 py-12 md:py-14"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            What I’m Looking For
          </h2>

          <p className="mt-4 max-w-4xl text-white/90 leading-relaxed text-base md:text-lg">
            I’m looking for Software Engineer, Full-Stack Developer, and Backend Developer
            opportunities where I can build scalable applications, contribute to real products,
            and continue growing as an engineer.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
              Software Engineer
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
              Full-Stack Developer
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
              Backend Developer
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
              Internships
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85">
              Freelance Projects
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}