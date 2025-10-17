type LinkPair = { github?: string; live?: string };

const items: Array<{ title: string; tech: string; desc: string; links: LinkPair }> = [
  {
    title: "StudentNest (Student Management System)",
    tech: "React • Spring Boot • SQL • Google Cloud",
    desc: "Student/teacher registration, course management, tuition processing, secure login, and scalable storage.",
    links: { github: "https://github.com/your-username/studentnest", live: "" },
  },
  {
    title: "SafeChat Backend",
    tech: "Spring Boot • H2 • FastAPI (ML) • OpenCV",
    desc: "Encryption, validation, phishing detection, and image upload scanner. /messages API ready.",
    links: { github: "https://github.com/your-username/safechat-backend", live: "" },
  },
  {
    title: "Android Labs (Jetpack Compose)",
    tech: "Kotlin • ViewModel • Navigation • Room",
    desc: "Image grids, state handling, error/loading UIs using Compose.",
    links: { github: "https://github.com/your-username/android-labs", live: "" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <article key={p.title} className="rounded-xl border p-5 bg-white">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.tech}</p>
              <p className="mt-3 text-gray-700">{p.desc}</p>
              <div className="mt-4 flex gap-3 text-sm">
                {p.links.github && <a className="underline" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                {p.links.live && <a className="underline" href={p.links.live} target="_blank" rel="noreferrer">Live</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
