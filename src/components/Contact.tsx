import { useState, type FormEvent } from "react";
import { ExternalLink, Code2, UserRound, Mail, Send } from "lucide-react";

type SubmissionStatus = "idle" | "sending" | "sent" | "error";

const email = "santoshskyadhikari@gmail.com";

export default function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || status === "sending") return;

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xdkwbyak", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const fieldClasses = "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-white placeholder:text-white/55 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/30";

  return (
    <section id="contact" className="scroll-mt-24 pb-20 pt-14 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Get in touch</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Contact</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-white/80">
          I’m interested in junior backend and full-stack software engineering opportunities.
          You can email me directly or use the form below.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white/20 bg-[#0b1c34]/80 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Connect with me</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Email is the easiest way to reach me. My code and background are available through the links below.</p>
            <div className="mt-6 space-y-4">
              <a href={`mailto:${email}`} className="flex min-w-0 items-center gap-3 text-sky-100 underline-offset-4 hover:underline">
                <Mail size={19} className="shrink-0" aria-hidden="true" />
                <span className="break-all">{email}</span>
              </a>
              <a href="https://github.com/SantoshAdhikar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sky-100 underline-offset-4 hover:underline">
                <Code2 size={19} className="shrink-0" aria-hidden="true" /> GitHub <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/santosh-adhikari-2043-sant/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sky-100 underline-offset-4 hover:underline">
                <UserRound size={19} className="shrink-0" aria-hidden="true" /> LinkedIn <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a href="/Santosh Adhikari Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                View my resume <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} onChange={() => { if (status !== "sending") setStatus("idle"); }} className="rounded-2xl border border-white/20 bg-[#0b1c34]/80 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">Send a message</h3>
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field blank</label>
              <input id="contact-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-white/90">Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" className={fieldClasses} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-white/90">Email</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={fieldClasses} />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-white/90">Message</label>
                <textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={4000} placeholder="Tell me about the position or project..." className={`${fieldClasses} resize-y`} />
              </div>
              <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-100 disabled:cursor-wait disabled:opacity-60">
                <Send size={17} aria-hidden="true" /> {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <p role="status" aria-live="polite" className="min-h-6 text-sm text-white/80">
                {status === "sent" && "Thank you! The form provider accepted your message."}
                {status === "error" && <>The form could not be submitted. Please <a className="font-semibold underline" href={`mailto:${email}`}>email me directly</a>.</>}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
