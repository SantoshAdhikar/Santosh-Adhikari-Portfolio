import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xdkwbyak", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) { form.reset(); setStatus("sent"); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <motion.section
      id="contact"
      className="scroll-mt-24 py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-4 text-white/90">Best ways to reach me:</p>
        <ul className="mt-2 list-disc list-inside text-white/90">
          <li>
            Email: <a className="underline" href="mailto:santoshasladhikari@gmail.com">santoshasladhikari@gmail.com</a>
          </li>
          <li>
            GitHub: <a className="underline" href="https://github.com/SantoshAdhikar" target="_blank" rel="noreferrer">
              github.com/SantoshAdhikar
            </a>
          </li>
          <li>
            LinkedIn: <a className="underline" href="https://www.linkedin.com/in/santosh-adhikari-2043-sant" target="_blank" rel="noreferrer">
              linkedin.com/in/santosh-adhikari-2043-sant
            </a>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-3 max-w-md">
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <label className="text-sm" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            className="rounded p-2 bg-white/10 border border-white/30 text-white placeholder-white/70"
            autoComplete="name"
            required
          />

          <label className="text-sm" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            className="rounded p-2 bg-white/10 border border-white/30 text-white placeholder-white/70"
            autoComplete="email"
            required
          />

          <label className="text-sm" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            className="rounded p-2 h-28 bg-white/10 border border-white/30 text-white placeholder-white/70"
            required
          />

          <button
            disabled={status === "sending"}
            className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white hover:text-blue-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>

          <p className="text-sm" aria-live="polite">
            {status === "sent" && <span className="text-green-300">Thanks! Your message was sent successfully.</span>}
            {status === "error" && <span className="text-red-300">Something went wrong. Please try again.</span>}
          </p>
        </form>
      </div>
    </motion.section>
  );
}
