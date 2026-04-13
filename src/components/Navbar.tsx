import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#looking-for", label: "Looking For" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    
    { href: "#contact", label: "Contact" },
    
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10 text-white">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold">
          Santosh Adhikari
        </a>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a className="hover:underline" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}

          <a
            href="/Santosh Adhikari Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white hover:text-black transition"
          >
            Resume
          </a>

          <ThemeToggle />
        </ul>

        <button
          className="md:hidden p-2 rounded-lg border border-white/20"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-white/10 bg-white/10 backdrop-blur-md"
        >
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {l.label}
              </a>
            ))}

            <a
              href="/Santosh Adhikari Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="py-1"
              onClick={() => setOpen(false)}
            >
              Resume
            </a>

            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}