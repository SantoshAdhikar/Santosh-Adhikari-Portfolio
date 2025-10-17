export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-4 text-gray-700">Best ways to reach me:</p>
        <ul className="mt-2 text-gray-700 list-disc list-inside">
          <li>Email: <a className="underline" href="mailto:santosh@example.com">santosh@example.com</a></li>
          <li>GitHub: <a className="underline" href="https://github.com/your-username" target="_blank" rel="noreferrer">github.com/your-username</a></li>
          <li>LinkedIn: <a className="underline" href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">linkedin.com/in/your-handle</a></li>
        </ul>

        {/* Optional: simple static contact form via Formspree (no backend) */}
        {/* Replace YOUR_FORM_ID below if you want a working form */}
        {/* <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="mt-6 grid gap-3 max-w-md">
          <input name="name" placeholder="Your name" className="border rounded p-2" required />
          <input type="email" name="email" placeholder="Your email" className="border rounded p-2" required />
          <textarea name="message" placeholder="Your message" className="border rounded p-2 h-28" required />
          <button className="px-4 py-2 rounded-lg border hover:bg-black hover:text-white">Send</button>
        </form> */}
      </div>
    </section>
  );
}
