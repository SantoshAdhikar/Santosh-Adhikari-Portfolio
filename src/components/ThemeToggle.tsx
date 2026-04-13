import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldUseDark = saved === "dark";

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white hover:text-black dark:border-gray-600 dark:hover:bg-white dark:hover:text-black"
    >
      <span className="hidden sm:inline">
        {dark ? "Light Mode" : "Dark Mode"}
      </span>{" "}
      {dark ? "☀️" : "🌙"}
    </button>
  );
}