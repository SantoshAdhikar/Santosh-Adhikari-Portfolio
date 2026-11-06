export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Beyond the tech stack</p>
        <h2 className="mt-2 text-3xl font-bold text-white">About me</h2>
        <div className="mt-6 grid gap-6 text-base leading-8 text-white/85 md:grid-cols-2">
          <p>I’m a Computer Science graduate who enjoys turning messy requirements into useful applications. I’m particularly interested in Java backend development, API design, databases, and connecting services to interfaces people can actually use.</p>
          <p>My projects span a five-person university capstone, software for a real local business, and an independent AI-assisted neighborhood intelligence prototype. I like debugging across the frontend, backend, and database rather than stopping at the first layer.</p>
        </div>
      </div>
    </section>
  );
}
