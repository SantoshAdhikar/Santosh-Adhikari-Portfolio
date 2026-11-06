import { useCallback, useEffect, useState } from "react";
import BlueShaderBackground from "./components/BlueShaderBackground";
import IntroSplash3D from "./components/IntroSplash3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProfileMode from "./components/ProfileMode";
import "./index.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.location.hash) return false;
    try {
      return sessionStorage.getItem("portfolio-intro-seen") !== "true";
    } catch {
      return true;
    }
  });
  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("portfolio-intro-seen", "true");
    } catch {
      // Session storage may be unavailable.
    }
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [showIntro, finishIntro]);

  return (
    <div className="relative min-h-screen bg-[#06162b]">
      <BlueShaderBackground />
      <IntroSplash3D show={showIntro} onDone={finishIntro} durationMs={2700} name="SANTOSH ADHIKARI" />
      <div className="relative z-10 text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-white focus:p-3 focus:text-slate-950">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Education />
          <ProfileMode />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
