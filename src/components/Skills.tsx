import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "REST APIs", "Node.js"],
  },
  {
    title: "Database / Cloud",
    items: ["MySQL", "SQL", "Google Cloud", "Firebase"],
  },
  {
    title: "Tools",
    items: ["GitHub", "VS Code", "Postman", "Figma"],
  },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="scroll-mt-24 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <p className="mt-3 max-w-3xl text-white/80">
          A focused stack for building modern full-stack applications with clean interfaces
          and reliable backend systems.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}