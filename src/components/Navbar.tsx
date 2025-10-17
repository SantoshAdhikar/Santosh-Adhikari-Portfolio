export default function Navbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold">Santosh Adhikari</a>
        <ul className="flex items-center gap-6 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <a className="hover:underline" href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
