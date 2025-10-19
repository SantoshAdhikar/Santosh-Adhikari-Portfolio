// @ts-nocheck
import "./index.css";

import BlueShaderBackground from "./components/BlueShaderBackground";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";
import Footer   from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* fixed full-screen background */}
      <BlueShaderBackground />

      {/* site content */}
      <div className="relative z-10 text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
