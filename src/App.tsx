// @ts-nocheck
import { useEffect, useState } from "react";
import BlueShaderBackground from "./components/BlueShaderBackground";
import IntroSplash3D from "./components/IntroSplash3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import GallerySection from "./components/GallerySection";  // <-- ADD
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!showIntro) {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <Hero />
          <About />
          <Projects />
          <Contact />
          <GallerySection /> {/* <-- HERE: after Contact */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
