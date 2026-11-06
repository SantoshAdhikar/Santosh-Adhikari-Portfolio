const groups = [
  { title: "Backend & APIs", description: "My main focus", items: ["Java 21", "Spring Boot", "Spring Data JPA", "REST APIs", "Maven", "Testing"] },
  { title: "Frontend", description: "Interfaces for real workflows", items: ["React", "TypeScript", "JavaScript", "Vite", "HTML/CSS", "Tailwind CSS"] },
  { title: "Databases", description: "Persistence and data modeling", items: ["PostgreSQL", "MySQL", "SQL", "Flyway", "Relational modeling"] },
  { title: "Tools & Integration", description: "Development workflow", items: ["Git/GitHub", "Linux", "Google Cloud", "Postman", "Meta Model API", "Ollama"] },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Technical toolkit</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Skills</h2>
        <p className="mt-3 max-w-3xl text-white/75">
          Technologies I have used in coursework and application development, grouped by how I work with them.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/20 bg-[#0b1c34]/80 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <p className="mt-1 text-sm text-white/70">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/90">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
