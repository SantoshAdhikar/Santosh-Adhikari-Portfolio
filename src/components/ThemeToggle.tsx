export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
  return (
    <button onClick={toggle} className="text-sm px-3 py-1.5 rounded-lg border hover:bg-black hover:text-white dark:border-gray-600">
      <span className="hidden sm:inline">Toggle Dark</span> 🌙
    </button>
  );
}
