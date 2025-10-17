export default function Hero() {
  return (
    <section id="home" className="min-h-[72vh] grid place-items-center bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <img
          src="/src/assets/profile.jpg"
          alt="Santosh Adhikari"
          className="mx-auto h-28 w-28 rounded-full object-cover border"
        />
        <p className="mt-4 text-xs tracking-wide uppercase text-gray-600">Portfolio</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">
          Hi, I’m Santosh Adhikari
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          CS student at CSULB. I build full-stack apps with React, Java Spring Boot, and SQL.
          Interested in secure messaging, education tech, and clean UI.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#projects" className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white">
            View Projects
          </a>
          <a
  href="#"
  className="px-4 py-2 rounded-lg border opacity-70 cursor-not-allowed"
  title="Resume coming soon"
>
  Resume Coming Soon
</a>

        </div>
      </div>
    </section>
  );
}
