import { motion } from "framer-motion";

type LinkPair = { github?: string; live?: string };

const items: Array<{ title: string; tech: string; desc: string; links: LinkPair }> = [
  {
    title: "StudentNest (Student Management System)",
    tech: "React • Spring Boot • SQL • Google Cloud",
    desc: "Student/teacher registration, course management, tuition processing, secure login, and scalable storage.",
    links: { github: "https://github.com/SantoshAdhikar/<repo>", live: "https://<vercel-url>" },
  },
  {
    title: "SafeChat Backend",
    tech: "Spring Boot • H2 • FastAPI (ML) • OpenCV",
    desc: "Encryption, validation, phishing detection, and image upload scanner. /messages API ready.",
    links: { github: "https://github.com/SantoshAdhikar/<repo>", live: "https://<vercel-url>" },
  },
  {
    title: "Android Labs (Jetpack Compose)",
    tech: "Kotlin • ViewModel • Navigation • Room",
    desc: "Image grids, state handling, error/loading UIs using Compose.",
    links: { github: "https://github.com/SantoshAdhikar/", live: "https://<vercel-url>" },
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="scroll-mt-24 py-16"  // <-- removed bg-gray-50
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Projects</h2>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <motion.article
              key={p.title}
              className="rounded-xl border border-white/20 p-5 bg-white/10 backdrop-blur-sm text-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-white/70 mt-1">{p.tech}</p>
              <p className="mt-3 text-white/90">{p.desc}</p>
              <div className="mt-4 flex gap-3 text-sm">
                {p.links.github && (
                  <a
                    className="underline hover:text-white"
                    href={p.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {p.links.live && (
                  <a
                    className="underline hover:text-white"
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
