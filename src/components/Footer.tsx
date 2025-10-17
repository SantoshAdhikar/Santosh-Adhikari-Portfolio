export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Santosh Adhikari. All rights reserved.
      </div>
    </footer>
  );
}
