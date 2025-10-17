import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";


export default function App() {
  return (
    <div className="text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
