import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b dark:bg-neutral-900/80 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold dark:text-neutral-100">Santosh Adhikari</a>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <a className="hover:underline dark:text-neutral-200" href={l.href}>{l.label}</a>
            </li>
          ))}
          <ThemeToggle />
        </ul>

        <button
          className="md:hidden p-2 rounded-lg border dark:border-neutral-700"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 dark:text-neutral-200">
                {l.label}
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
