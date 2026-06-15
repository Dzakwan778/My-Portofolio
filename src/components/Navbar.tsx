import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LucideIcon from "./LucideIcon";
import RotatingText from "./RotatingText";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scrolling to adjust navbar backgrounds and active section
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Using layout offsetTop calculations for complete precision
      // independent of animation-induced layout shifts
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 160; // 160px buffer covering navbar height

      // Check if user is near or at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const onScroll = () => {
      handleScroll();
    };

    window.addEventListener("scroll", onScroll);
    // Initial execution to verify correct state on reload
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    
    // Close mobile menu first to ensure layout stabilizes
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 80);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-red-950/40 py-4 shadow-lg shadow-black/80"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group cursor-pointer w-[140px] md:w-[165px] lg:w-[195px] shrink-0 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative font-bold text-lg md:text-xl lg:text-2xl tracking-wider text-white select-none inline-flex items-center">
            <RotatingText
              texts={["WanMa2", "Dzakwan", "Mr. Vloren"]}
              rotationInterval={4700}
              staggerDuration={0.05}
              staggerFrom="first"
              splitBy="characters"
              auto={true}
              loop={true}
            />
            {/* Soft pulse glow behind corporate name */}
            <span className="absolute -inset-1 rounded bg-red-600/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </span>
        </motion.a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-zinc-950/45 border border-zinc-900/80 px-1.5 py-1.5 rounded-full backdrop-blur-xl relative shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-3 lg:px-5 py-2 text-xs lg:text-sm font-medium tracking-wide transition-all z-10 select-none block shrink-0"
                style={{ color: isActive ? "#ffffff" : "#a1a1aa" }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-red-600/15 border border-red-500/30 rounded-full z-[-1] shadow-inner shadow-red-500/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button: Lets Talk */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-full hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all text-center hover:brightness-110"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect
          </motion.a>
        </div>

        {/* Mobile Toggle Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            <LucideIcon name={mobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-red-950/45 md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-lg font-medium py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-red-950/30 text-white border-l-4 border-red-600 pl-6"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-lg shadow-red-500" />}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-4 w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-center rounded-xl font-bold uppercase tracking-widest text-sm text-white"
              >
                CONNECT WITH ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
