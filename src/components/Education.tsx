import { GraduationCap, BriefcaseBusiness } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Background</p>
        <h2 className="mt-2 text-3xl font-bold">Education & experience</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-[#0b1c34]/70 p-6">
            <GraduationCap size={24} className="text-sky-300" aria-hidden="true"/>
            <h3 className="mt-3 text-xl font-bold">B.S. Computer Science</h3>
            <p className="mt-2 text-white/90">California State University, Long Beach</p>
            <p className="mt-1 text-sm text-white/65">Graduated December 2025</p>
            <p className="mt-4 leading-relaxed text-white/80">Coursework in software engineering, data structures and algorithms, databases, operating systems, and security. Senior capstone: StudentNest.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-[#0b1c34]/70 p-6">
            <BriefcaseBusiness size={24} className="text-sky-300" aria-hidden="true"/>
            <h3 className="mt-3 text-xl font-bold">Independent software development</h3>
            <p className="mt-2 text-white/90">2025–2026 · Project-based experience</p>
            <p className="mt-4 leading-relaxed text-white/80">Built applications using Java/Spring Boot, React, and relational databases, from implementation and integration through testing and demonstration. Recent work includes S4 Neighborhood Intelligence and Golden Brows business software.</p>
            <p className="mt-3 text-sm text-white/60">Personal and project work, not represented as paid software engineering employment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
