import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "developer" | "customer";

const experience = [
  { role: "Cage Cashier", company: "Hustler Casino", period: "Feb–Mar 2026", detail: "Handled financial transactions and followed procedures requiring accuracy, attention to detail, and customer service." },
  { role: "Rideshare / Delivery Driver", company: "App-based services", period: "2019–Present", detail: "Managed schedules, navigation, and professional interactions with customers independently." },
  { role: "Retail Associate / Cashier", company: "7-Eleven", period: "2019–2020", detail: "Operated point-of-sale systems, handled transactions, and supported store operations." },
  { role: "Waiter / Cashier", company: "Nanking Restaurant", period: "2018–2019", detail: "Coordinated customer orders and transactions in a fast-paced restaurant setting." },
];

export default function ProfileMode() {
  const [mode, setMode] = useState<Mode>("developer");
  return (
    <section id="experience" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-white/20 bg-[#0b1c34]/75 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Additional experience</p>
          <h2 className="mt-2 text-2xl font-bold">Different roles, transferable skills</h2>
          <p className="mt-3 max-w-3xl text-white/75">My primary focus is software engineering. I also bring experience working independently, helping customers, and handling detailed transactions.</p>
          <div className="mt-5 inline-flex gap-2 rounded-lg border border-white/20 bg-black/20 p-1" role="group" aria-label="Background view">
            <button type="button" aria-pressed={mode === "developer"} onClick={() => setMode("developer")} className={`rounded-md px-4 py-2 text-sm font-semibold ${mode === "developer" ? "bg-white text-slate-950" : "text-white/80 hover:bg-white/10"}`}>Software background</button>
            <button type="button" aria-pressed={mode === "customer"} onClick={() => setMode("customer")} className={`rounded-md px-4 py-2 text-sm font-semibold ${mode === "customer" ? "bg-white text-slate-950" : "text-white/80 hover:bg-white/10"}`}>Other work experience</button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {mode === "developer" ? (
              <motion.div key="developer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 grid gap-4 text-sm leading-relaxed text-white/85 sm:grid-cols-2">
                <div className="rounded-xl border border-white/15 bg-white/5 p-5"><p className="font-semibold text-white">Backend & APIs</p><p className="mt-2">Built Spring Boot endpoints, database-backed features, and integrations used by React clients.</p></div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-5"><p className="font-semibold text-white">Delivery & collaboration</p><p className="mt-2">Worked on a team capstone, maintained independent projects, tested features, and debugged application workflows.</p></div>
              </motion.div>
            ) : (
              <motion.div key="customer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 grid gap-3 sm:grid-cols-2">
                {experience.map((job) => <div key={job.company} className="rounded-xl border border-white/15 bg-white/5 p-4"><h3 className="font-semibold">{job.role}</h3><p className="mt-1 text-sm text-white/65">{job.company} · {job.period}</p><p className="mt-2 text-sm leading-relaxed text-white/80">{job.detail}</p></div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
