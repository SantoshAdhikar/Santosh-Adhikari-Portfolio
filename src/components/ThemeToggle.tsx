import { useState } from "react";
import { Moon, Sparkles } from "lucide-react";

export default function ThemeToggle() {
  const [starfield, setStarfield] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  function toggleBackground() {
    const next = !starfield;
    document.documentElement.classList.toggle("dark", next);
    setStarfield(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // The background toggle still works when storage is blocked.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleBackground}
      aria-label={starfield ? "Use calm navy background" : "Use subtle starfield background"}
      aria-pressed={starfield}
      title={starfield ? "Calm navy background" : "Subtle starfield background"}
      className="rounded-lg border border-white/25 p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
    >
      {starfield ? <Moon size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
    </button>
  );
}
