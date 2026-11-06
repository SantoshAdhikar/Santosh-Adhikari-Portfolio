import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-[#06162b]/85 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4" aria-label="Main navigation">
        <a href="#home" className="font-bold tracking-tight hover:text-sky-200" onClick={() => setOpen(false)}>Santosh Adhikari<span className="text-sky-300">.</span></a>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => <a href={link.href} key={link.href} className="text-sm text-white/80 transition hover:text-white">{link.label}</a>)}
          <a href="/Santosh Adhikari Resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/30 px-3 py-2 text-sm font-medium hover:bg-white hover:text-slate-950">Resume</a>
          <ThemeToggle />
        </div>
        <button type="button" className="rounded-lg border border-white/30 p-2 md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-nav" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      </nav>
      {open && (
        <div id="mobile-nav" className="border-t border-white/15 bg-[#06162b]/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            {links.map((link) => <a key={link.href} href={link.href} className="rounded-lg px-2 py-2 text-white/90 hover:bg-white/10" onClick={() => setOpen(false)}>{link.label}</a>)}
            <a href="/Santosh Adhikari Resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-lg px-2 py-2" onClick={() => setOpen(false)}>View resume</a>
            <div className="px-2"><ThemeToggle /></div>
          </div>
        </div>
      )}
    </header>
  );
}
