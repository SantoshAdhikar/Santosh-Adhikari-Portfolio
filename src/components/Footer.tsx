export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="mx-auto max-w-6xl px-4 text-sm text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p>
          © {new Date().getFullYear()} Santosh Adhikari. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:santoshskyadhikari@gmail.com"
            className="hover:underline"
          >
            Email
          </a>
          <a
            href="https://github.com/SantoshAdhikar"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/santosh-adhikari-2043-sant"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="/Santosh Adhikari Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}