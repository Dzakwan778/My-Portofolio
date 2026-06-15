import React from "react";
import { motion } from "motion/react";
import LucideIcon from "./LucideIcon";

interface ProjectGraphicProps {
  pattern?: "telematics" | "esports" | "tachometer" | "diagnostics" | "map";
  imageName?: string;
}

export default function ProjectGraphic({ pattern, imageName }: ProjectGraphicProps) {
  if (imageName) {
    const imageModules = (import.meta as any).glob("/src/assets/images/*.{jpg,jpeg,png,svg,webp,gif,JPG,JPEG,PNG,SVG,WEBP,GIF}", { eager: true });
    const imagePath = `/src/assets/images/${imageName}`;
    const resolvedSrc = (imageModules[imagePath] as any)?.default || imagePath;

    return (
      <div className="w-full h-full relative group/img bg-zinc-950 flex items-center justify-center overflow-hidden">
        <img
          src={resolvedSrc}
          alt={imageName}
          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const placeholder = document.createElement("div");
              placeholder.className = "absolute inset-0 bg-[#080808] border border-zinc-900/60 p-6 flex flex-col justify-between font-mono";
              placeholder.innerHTML = `
                <div class="flex justify-between items-center text-[8px] text-red-500/60">
                  <span>SYSTEM_ASSET_STATUS</span>
                  <span class="text-amber-500 font-bold">⚠ PENDING_UPLOAD</span>
                </div>
                <div class="my-auto text-center px-4">
                  <div class="w-8 h-8 mx-auto text-red-500 font-bold border border-red-950 rounded-lg flex items-center justify-center text-xs bg-red-950/20 mb-3 animate-pulse">!</div>
                  <h4 class="text-xs font-black uppercase text-zinc-300 tracking-wide">${imageName}</h4>
                  <p class="text-[9px] text-zinc-500 mt-2 leading-relaxed">Upload file to <b class="text-zinc-400">/src/assets/images/</b> to display visual</p>
                </div>
                <div class="text-[8px] text-zinc-600 flex justify-between">
                  <span>FALLBACK_ACTIVE</span>
                  <span>WANMA2_PORTFOLIO</span>
                </div>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />
      </div>
    );
  }

  if (pattern === "telematics") {
    // Interactive dynamic telematics dashboard representation
    return (
      <div className="w-full h-full bg-[#080808] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        {/* Background circuit lines */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(220,38,38,0.15),transparent_70%] pointer-events-none" />
        <div className="absolute top-2 right-2 text-[8px] text-red-500/50">SYS_OBD_LIVE: READ_OK</div>
        
        {/* Tachometer arch inside thumbnail */}
        <div className="flex-1 flex items-center justify-center relative">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#16161a" strokeWidth="4" fill="transparent" />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="#ef4444"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="251"
              animate={{ strokeDashoffset: [251, 80, 160, 50, 251] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-zinc-600 text-[8px]">RPM</span>
            <span className="text-white text-xs font-bold leading-none">6,840</span>
          </div>
        </div>

        {/* Dynamic bar charts at bottom */}
        <div className="flex gap-1.5 h-6 items-end mt-2">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-red-600/80 rounded-t-xs"
              animate={{ height: ["20%", "90%", "40%", "100%", "20%"] }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (pattern === "esports") {
    // Advanced tactical esports roster interface widget representation
    return (
      <div className="w-full h-full bg-[#030303] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
        
        <div className="flex justify-between items-center text-[8px] text-zinc-500">
          <span>COMPETITIVE MATCH ROOM</span>
          <span className="text-emerald-500 animate-pulse">● SERVERS_ONLINE</span>
        </div>

        {/* Esports Team Card Mock placeholders */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 mt-2">
          <div className="bg-zinc-950/85 border border-red-500/20 px-2 py-1 rounded flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <LucideIcon name="User" className="w-3 h-3 text-red-500" />
              <span className="text-[10px] text-white font-bold">WanMa2 (Captain)</span>
            </div>
            <span className="text-[8px] text-zinc-500 font-bold bg-zinc-900 px-1 rounded">PING 14ms</span>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-900 px-2 py-1 rounded flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <LucideIcon name="Heart" className="w-3 h-3 text-red-500/60" />
              <span className="text-[10px] text-zinc-400">PacarWanMa2</span>
            </div>
            <span className="text-[8px] text-red-500/80 font-bold px-1 rounded">TEAM SUPPORTER</span>
          </div>
        </div>

        <div className="text-[8px] text-zinc-500 mt-2 flex justify-between">
          <span>ACTIVE DEPLOY: VITE_V4</span>
          <span className="text-red-500">K/D 4.2</span>
        </div>
      </div>
    );
  }

  if (pattern === "tachometer") {
    // Clean mechanical circular indicator dial representation
    return (
      <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center font-mono select-none">
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(50,5,5,0.3),transparent_75%]" />
        
        {/* Dynamic Tachometer gauge */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Arch */}
            <path
              d="M 16 56 A 40 40 0 1 1 96 56"
              fill="none"
              stroke="#111"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Custom moving accent arch in red */}
            <motion.path
              d="M 16 56 A 40 40 0 1 1 96 56"
              fill="none"
              stroke="url(#redGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="180"
              animate={{ strokeDashoffset: [180, 40, 110, 10, 180] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Indicator text */}
          <div className="absolute text-center">
            <span className="block text-[8px] text-zinc-600">ENGINE_LOAD</span>
            <span className="block text-sm font-black text-rose-500 mt-0.5 animate-pulse">REDLINE</span>
            <span className="block text-[8px] text-zinc-500">TKRO MODEL</span>
          </div>
        </div>
      </div>
    );
  }

  if (pattern === "diagnostics") {
    // OBD-II sensor diagnostics graph representation
    return (
      <div className="w-full h-full bg-zinc-950 relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-[7px] text-red-500">ECU_SERIAL_COMM</span>
        </div>

        {/* Dynamic scanning waveform */}
        <div className="flex-1 flex items-center justify-center pt-2">
          <svg className="w-full h-16 pointer-events-none" viewBox="0 0 200 64">
            <motion.path
              d="M0 32 L30 32 L40 10 L50 54 L60 32 L90 32 L100 0 L110 60 L120 32 L150 32 L155 20 L160 45 L165 32 L200 32"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="400"
              animate={{ strokeDashoffset: [400, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Diagnostic parameters print */}
        <div className="grid grid-cols-3 gap-1 mt-2 text-[8px] text-zinc-500 text-center border-t border-zinc-900 pt-1.5">
          <div>
            <p className="font-bold text-zinc-400">O2_SENS</p>
            <p className="text-red-500/90 font-mono">0.82V</p>
          </div>
          <div>
            <p className="font-bold text-zinc-400">MAF_FLOW</p>
            <p className="text-zinc-300 font-mono">4.12g/s</p>
          </div>
          <div>
            <p className="font-bold text-zinc-400">IAT_TEMP</p>
            <p className="text-zinc-300 font-mono">38°C</p>
          </div>
        </div>
      </div>
    );
  }

  // "map" pattern: Digital autonomous grid matrix representation
  return (
    <div className="w-full h-full bg-[#040404] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      <div className="absolute top-2 left-2 text-[8px] text-zinc-500">JAKARTA_EAST_SECTOR</div>
      
      {/* Abstract structural grid visualization */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute inset-4 border border-red-950/35 rounded-full animate-pulse" />
        <div className="absolute inset-10 border border-zinc-900 rounded-full" />
        
        {/* Animated grid vehicle nodes */}
        <motion.div
          className="absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-md shadow-red-500"
          animate={{
            x: [-40, 40, -40],
            y: [-25, 25, -25]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-1.5 w-1.5 rounded-full bg-zinc-400"
          animate={{
            x: [30, -30, 30],
            y: [-30, 30, -30]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="h-2 w-2 rounded-full bg-red-600/80 animate-ping absolute" />
      </div>

      <div className="text-[7px] text-zinc-600 text-right">MODEL_SCALE // 1:2500</div>
    </div>
  );
}
