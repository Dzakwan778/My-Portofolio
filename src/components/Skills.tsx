import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILLS_DATA } from "../data";
import { Skill } from "../types";
import LucideIcon from "./LucideIcon";

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "automotive", label: "Automotive Precision" },
  { id: "backend", label: "Backend Core" },
  { id: "gaming", label: "Gaming & Others" }
];

interface SkillsProps {
  skills?: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const currentSkills = skills || SKILLS_DATA;

  const filteredSkills = currentSkills.filter(
    (skill) => selectedCategory === "all" || skill.category === selectedCategory
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black scroll-mt-20">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-red-950/5 blur-[150px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-950/50 rounded-full mb-4">
            <LucideIcon name="Cpu" className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold font-mono">SPEC: SYS_KNOWLEDGE_02</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-transparent mt-4 rounded-full mx-auto" />
          <p className="text-zinc-500 text-sm mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Meticulously tuned technical attributes, balancing client-side software creation with hardware-level engineering diagnostics.
          </p>
        </div>

        {/* Dynamic Interactive Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 max-w-2xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 pointer-events-auto select-none overflow-hidden cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "text-zinc-400 bg-zinc-950/40 border border-zinc-900/60 hover:text-white hover:bg-zinc-900/40"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {isSelected && (
                  <motion.span
                    layoutId="selectedSkillCategory"
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Responsive Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={skill.id}
                className="bg-zinc-950/30 hover:bg-zinc-950/70 border border-zinc-900 hover:border-red-500/25 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Micro Ambient background neon red radial flare on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-600/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon & Category Tag Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-950/15 border border-red-900/20 text-red-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-950/30 group-hover:border-red-500/35 transition-all duration-300">
                      <LucideIcon name={skill.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-red-400 transition-colors">
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-red-400 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Skill Description */}
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Progress bar container */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Tuning Level</span>
                    <span className="text-xs font-bold text-white font-mono">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
                    />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
