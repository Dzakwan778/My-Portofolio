import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data";
import LucideIcon from "./LucideIcon";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative w-full flex items-center justify-center overflow-hidden bg-black pt-20 scroll-mt-20"
    >
      {/* Premium Ambient Background Styling Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,10,10,1)_0%,rgba(0,0,0,1)_100%)] z-0" />

      {/* Cyber Grid Pattern Accent */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #3f0909 1px, transparent 1px), linear-gradient(to bottom, #3f0909 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Deep Red Radial Glow Globes (Floating light source) */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-red-950/30 to-rose-900/10 blur-[130px] -translate-x-1/2 -translate-y-1/2 z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-red-600/5 to-rose-600/0 blur-[110px] z-0"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Interactive Micro Engine Piston Particle Nodes (Framer Motion) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-600/30 blur-[2px]"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
            animate={{
              y: ["0px", "-120px", "0px"],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Hero Outer Wrapper */}
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* Elite Automotive & Gamer Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-zinc-950/90 border border-red-500/30 px-4 py-2 rounded-full mb-8 shadow-md shadow-red-950/25 group backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase transition-colors group-hover:text-red-400">
            {PERSONAL_INFO.major} // GAMING ENTHUSIAST
          </span>
        </motion.div>

        {/* Dynamic Massive Typographical Layout */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-display mb-6 uppercase text-center leading-none"
        >
          Mechanical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.2)] font-black">Precision</span>
          <br /> Meets Futuristic <span className="relative inline-block text-white">Code</span>.
        </motion.h1>

        {/* Professional Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-zinc-400 text-base md:text-xl max-w-2xl font-light leading-relaxed mb-10 text-center px-4"
        >
          Hello, I am <span className="text-white font-semibold">{PERSONAL_INFO.nickname}</span>, a 21-year-old creative technologist based in Jakarta. I engineer digital interfaces with the meticulous rigor of elite automotive tuning and eSports tactics.
        </motion.p>

        {/* CTA Premium Custom Glass Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
        >
          {/* Main Primary Button - Contact Me */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-gradient-to-r from-red-600 via-red-500 to-rose-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-red-950/40 hover:scale-105 active:scale-95 transition-all outline-none duration-200"
          >
            {/* Hover light reflection effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
            <span className="flex items-center justify-center gap-2">
              <span>Initiate Contact</span>
              <LucideIcon name="MessageSquareText" className="w-4 h-4" />
            </span>
          </button>

          {/* Secondary Outline Glass Premium Button */}
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto overflow-hidden hover:scale-105 active:scale-95 transition-all text-sm font-bold uppercase tracking-widest text-zinc-300 border border-zinc-800 hover:border-red-500/40 hover:text-white px-8 py-4 rounded-full backdrop-blur-sm bg-zinc-950/30 flex items-center justify-center gap-2 group duration-200"
          >
            <span>View Projects</span>
            <LucideIcon name="ArrowUpRight" className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </button>
        </motion.div>

        {/* Floating Mouse Down Wheel indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer z-10"
          onClick={() => handleScrollTo("about")}
        >
          <span className="text-zinc-600 text-[10px] uppercase font-mono tracking-widest select-none">Scroll to Scan</span>
          <div className="w-6 h-10 border border-zinc-800 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-2 bg-red-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Elegant Ambient Floor Gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />
    </section>
  );
}
