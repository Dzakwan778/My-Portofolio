import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data";
import LucideIcon from "./LucideIcon";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050505] scroll-mt-20">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-red-950/10 blur-[130px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading & Conceptual Lead */}
        <div className="text-center md:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/20 border border-red-950/50 rounded-full mb-4">
            <LucideIcon name="User" className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">SPEC: SYSTEM_IDENT_01</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-transparent mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Cinematic Avatar with HUD decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center z-10"
          >
            <div className="relative w-full max-w-[380px] aspect-square rounded-3xl p-4 bg-zinc-950/55 border border-zinc-900 shadow-2xl shadow-black/80 group">
              
              {/* Rotating outer red cyber corners */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-red-600 rounded-tl-2xl group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-red-600 rounded-br-2xl group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-zinc-700 rounded-tr-xl" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-zinc-700 rounded-bl-xl" />

              {/* Glowing animated background ring */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-red-900/10 via-transparent to-red-600/5 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Avatar Image */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative border border-zinc-800/80">
                <img
                  src={PERSONAL_INFO.avatarPath}
                  alt="WanMa2 Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Grid Overlay Screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Mini Live Status Pill inside avatar */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 border border-zinc-800/80 px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Current Core Status</p>
                    <p className="text-xs font-bold text-white tracking-wide">ACTIVE MATCH // DEPLOYED</p>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-md shadow-emerald-500" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Specific Metrics & Professional Bio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Bio Narrative Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-950/40 border border-zinc-900/80 p-6 md:p-8 rounded-3xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-950/5 via-transparent to-transparent z-0" />
              <h3 className="text-xl font-bold font-display text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <LucideIcon name="Sparkles" className="w-5 h-5 text-red-500" />
                <span>The Bio Core</span>
              </h3>
              <p className="text-zinc-300 font-light leading-relaxed mb-6">
                {PERSONAL_INFO.bio}
              </p>
              <div className="bg-red-950/10 border border-red-900/30 px-4 py-3 rounded-2xl flex items-start gap-3">
                <LucideIcon name="Milestone" className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400 leading-relaxed">
                  <strong className="text-white">Core Vision:</strong> {PERSONAL_INFO.vision}
                </p>
              </div>
            </motion.div>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Age & Location */}
              <motion.div
                initial={{ opacity: 0, rotate: 3, filter: "blur(10px)", y: 15 }}
                whileInView={{ opacity: 1, rotate: 0, filter: "blur(0px)", y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="bg-zinc-950/20 border border-zinc-900 hover:border-red-500/20 p-5 rounded-2xl transition-all hover:bg-zinc-950/45 duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-900/30 text-red-500 flex items-center justify-center shrink-0">
                  <LucideIcon name="MapPin" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Origins & Age</p>
                  <p className="text-white text-sm font-semibold mt-0.5">{PERSONAL_INFO.age} y/o // Sukamaju</p>
                  <p className="text-zinc-400 text-xs truncate max-w-[200px]" title={PERSONAL_INFO.location}>
                    Balek, DKI Jakarta
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Relationship Status (Punya Pacar ❤️) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-zinc-950/20 border border-zinc-900 hover:border-red-500/20 p-5 rounded-2xl transition-all hover:bg-zinc-950/45 duration-300 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-950/40 border border-rose-900/40 text-rose-500 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <LucideIcon name="Heart" className="w-5 h-5 fill-rose-600 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Current Status</p>
                  <p className="text-rose-400 text-sm font-semibold mt-0.5">In a Relationship</p>
                  <p className="text-zinc-400 text-xs">Punya Pacar (Devoted ❤️)</p>
                </div>
              </motion.div>

              {/* Card 3: Hobby */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-zinc-950/20 border border-zinc-900 hover:border-red-500/20 p-5 rounded-2xl transition-all hover:bg-zinc-950/45 duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-900/30 text-red-500 flex items-center justify-center shrink-0">
                  <LucideIcon name="Gamepad2" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Recreation</p>
                  <p className="text-white text-sm font-semibold mt-0.5">Competitive Gaming</p>
                  <p className="text-zinc-400 text-xs">Esports & Simulation Games</p>
                </div>
              </motion.div>

              {/* Card 4: Major / TKRO */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-zinc-950/20 border border-zinc-900 hover:border-red-500/20 p-5 rounded-2xl transition-all hover:bg-zinc-950/45 duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-900/30 text-red-500 flex items-center justify-center shrink-0">
                  <LucideIcon name="Wrench" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Major Discipline</p>
                  <p className="text-white text-sm font-semibold mt-0.5">Automotive Engineering</p>
                  <p className="text-zinc-400 text-xs">Teknik Kendaraan Ringan</p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
