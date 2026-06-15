import { motion } from "motion/react";
import { TIMELINE_DATA } from "../data";
import LucideIcon from "./LucideIcon";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black scroll-mt-20">
      {/* Absolute ambient lights behind timeline */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-950/5 blur-[140px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-950/50 rounded-full mb-4">
            <LucideIcon name="Activity" className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">SPEC: PATH_RECORDS_04</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-transparent mt-4 rounded-full mx-auto" />
          <p className="text-zinc-500 text-sm mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Trace the evolutionary phases of a mechanical specialist refining his vision into a senior-grade web creative.
          </p>
        </div>

        {/* Timeline Component Layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central glowing track vertical line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-red-900 via-zinc-800 to-red-950 z-0 opacity-80" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing central node point */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-red-500 shadow-md shadow-red-950 flex items-center justify-center text-red-500 group cursor-pointer"
                    >
                      <LucideIcon name={item.iconName} className="w-4 h-4 transition-transform group-hover:scale-125 duration-300" />
                    </motion.div>
                  </div>

                  {/* Left / Right Card Wrap Spacer Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`bg-zinc-950/40 hover:bg-zinc-950/70 border border-zinc-900 hover:border-red-500/20 p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all duration-300 relative group`}
                    >
                      {/* Active indicator triangle for pointers (Desktop only) */}
                      <div className={`hidden md:block absolute top-[18px] w-3 h-3 bg-zinc-950 border-t border-l border-zinc-900 group-hover:border-red-500/20 transform rotate-45 ${
                        isEven ? "right-[-7px] rotate-135" : "left-[-7px] -rotate-45"
                      }`} />

                      {/* Header Line Info */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-xl md:text-2xl font-black font-mono text-red-500 tracking-wider">
                          {item.year}
                        </span>
                        <span className="bg-red-950/30 border border-red-900/30 text-red-400 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>

                      {/* Title block */}
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium mb-4">
                        {item.subtitle}
                      </p>

                      {/* Description Narrative text */}
                      <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
