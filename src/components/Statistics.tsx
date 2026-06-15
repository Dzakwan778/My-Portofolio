import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { STATS_DATA } from "../data";
import LucideIcon from "./LucideIcon";

interface TickerProps {
  value: number;
  suffix: string;
}

function Ticker({ value, suffix }: TickerProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Smooth counting speed easing
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(percentage);
      
      setCurrentValue(Math.floor(easedProgress * value));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  // Format big numbers cleanly
  const formattedNumber = currentValue.toLocaleString();

  return (
    <span ref={ref} className="font-mono text-4xl md:text-6xl font-black text-white tracking-tighter">
      {formattedNumber}
      <span className="text-red-500 font-sans tracking-normal">{suffix}</span>
    </span>
  );
}

export default function Statistics() {
  return (
    <section id="statistics" className="py-20 relative overflow-hidden bg-[#050505] border-t border-b border-zinc-900/60">
      {/* Absolute linear scanlines representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(220,38,38,0.02)_95%)] bg-[size:100%_20px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.id}
              className="bg-zinc-950/20 border border-zinc-900 p-8 rounded-3xl backdrop-blur-md hover:border-red-500/20 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Corner tech notch accent */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-red-500/20 group-hover:bg-red-500/50 transition-colors" />
              <div className="absolute top-0 right-0 w-[1px] h-8 bg-red-500/20 group-hover:bg-red-500/50 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Icon wrap */}
                  <div className="w-12 h-12 rounded-2xl bg-red-950/15 border border-red-900/20 text-red-500 flex items-center justify-center shrink-0">
                    <LucideIcon name={item.iconName} className="w-5 h-5" />
                  </div>
                  
                  {/* Decorative telemetry hex serial */}
                  <span className="text-[8px] font-mono tracking-widest text-zinc-600 block pl-4 text-right">
                    TEL_IDX // 0{index + 1}
                  </span>
                </div>

                {/* Animated counter display */}
                <div className="mb-2">
                  <Ticker value={item.value} suffix={item.suffix} />
                </div>

                {/* Stat label banner */}
                <h3 className="text-sm font-bold text-zinc-200 uppercase font-display tracking-widest mb-2 mt-1">
                  {item.label}
                </h3>
              </div>

              {/* Sub description */}
              <p className="text-zinc-500 text-xs font-light leading-relaxed mt-4 border-t border-zinc-900/80 pt-4">
                {item.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
