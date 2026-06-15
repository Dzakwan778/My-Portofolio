import { motion } from "motion/react";
import LucideIcon from "./LucideIcon";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-black border-t border-zinc-900/45 py-12 relative overflow-hidden">
      {/* Footer Glow reflection */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-red-950/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left side info */}
        <div className="text-center md:text-left">
          <p className="text-sm font-bold text-white tracking-widest uppercase">
            WAN<span className="text-red-500 font-extrabold">MA2</span>
          </p>
          <p className="text-zinc-600 text-xs mt-1.5 font-light leading-relaxed font-mono">
            ENGINEERED PRECISION // WEB CREATIVE FOR THE NEXT REALM
          </p>
        </div>

        {/* Center disclaimer / custom heart design */}
        <div className="flex items-center gap-1 text-zinc-500 text-xs font-mono">
          <span>Crafted with</span>
          <LucideIcon name="Heart" className="w-3.5 h-3.5 text-rose-600 fill-rose-600 animate-pulse" />
          <span>in Sukamaju, Jakarta</span>
        </div>

        {/* Right side interactions (Copyright & Back to Top) */}
        <div className="flex items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} WanMa2. All rights reserved.
          </p>
          
          {/* Animated Scroll to Top trigger */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-red-500/20 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer shadow-lg shadow-black/50"
            title="Return to Flight Deck"
          >
            <LucideIcon name="ArrowUpRight" className="w-4 h-4 transform -rotate-45" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
