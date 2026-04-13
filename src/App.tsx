// @ts-nocheck
import { useEffect, useState } from "react";
import BlueShaderBackground from "./components/BlueShaderBackground";
import IntroSplash3D from "./components/IntroSplash3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import LookingFor from "./components/LookingFor";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProfileMode from "./components/ProfileMode";
import "./index.css";
import JobBanner from "./components/JobBanner";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) {
      document.getElementById("home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showIntro]);

  return (
    <div className="relative min-h-screen">
      <BlueShaderBackground />

      <IntroSplash3D
        show={showIntro}
        onDone={() => setShowIntro(false)}
        durationMs={3000}
        name="SANTOSH ADHIKARI"
      />

      <div className="relative z-10 text-white">
        <Navbar />
        <main>
          <JobBanner />
          <Hero />
          <LookingFor />
          <ProfileMode />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}