import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Statistics from "./components/Statistics";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { loadSkills, loadProjects } from "./lib/storage";
import { Skill, Project } from "./types";

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [skills, setSkills] = useState<Skill[]>(() => loadSkills());
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());

  // Listen to hash change to switch from Portfolio View to Dashboard View
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener("hashchange", handleHashChange);
    
    // Inject smooth scrolling configuration globally
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleDataChange = () => {
    setSkills(loadSkills());
    setProjects(loadProjects());
  };

  const isDashboardActive = currentHash === "#dashboard";

  if (isDashboardActive) {
    return <Dashboard onDataChange={handleDataChange} />;
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-650 selection:text-white antialiased overflow-x-hidden relative">
      {/* Top Red Laser Grid Accent Header Line */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-800 z-[999]" />

      {/* Global Navbar navigation */}
      <Navbar />

      {/* Layout elements sequentially */}
      <main className="relative">
        {/* 1. Fullscreen Hero welcoming fold */}
        <Hero />

        {/* 2. Structured profile specs & bio */}
        <About />

        {/* 3. Specialized skill categories & progress maps with dynamic data */}
        <Skills skills={skills} />

        {/* 4. Telemetry, esports, & automotive diagnostics vector projects with dynamic data */}
        <Projects projects={projects} />

        {/* 5. Fluid custom timeline showing milestones */}
        <Experience />

        {/* 6. Dynamic telemetry numbers counter board */}
        <Statistics />

        {/* 7. WhatsApp linkages, messaging center with terminal feedback logs */}
        <Contact />
      </main>

      {/* 8. Modern minimalist luxury footer */}
      <Footer />
    </div>
  );
}
