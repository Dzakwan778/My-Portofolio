import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last";
  splitBy?: "characters" | "words";
  auto?: boolean;
  loop?: boolean;
  className?: string;
}

export default function RotatingText({
  texts,
  rotationInterval = 2000,
  staggerDuration = 0.05,
  staggerFrom = "first",
  splitBy = "characters",
  auto = true,
  loop = true,
  className = ""
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === texts.length - 1) {
          return loop ? 0 : prevIndex;
        }
        return prevIndex + 1;
      });
    }, rotationInterval);

    return () => clearInterval(intervalId);
  }, [JSON.stringify(texts), rotationInterval, auto, loop]);

  const currentText = texts[index] || "";
  const parts = splitBy === "characters" ? currentText.split("") : currentText.split(" ");

  // Meticulously computed character coloring highlights to maintain branding per word:
  // "WanMa2" -> "Wan" (White), "Ma2" (Modern Red)
  // "Dzakwan" -> "Dzak" (White), "wan" (Modern Red)
  // "Mr. Vloren" -> "Mr." (White), " Vloren" (Modern Red)
  const getCharColorClass = (word: string, charIndex: number) => {
    if (word === "WanMa2") {
      return charIndex >= 3 ? "text-red-500 font-extrabold" : "text-white";
    }
    if (word === "Dzakwan") {
      return charIndex >= 4 ? "text-red-500 font-extrabold" : "text-white";
    }
    if (word === "Mr. Vloren") {
      return charIndex >= 3 ? "text-red-500 font-extrabold" : "text-white";
    }
    return "text-white";
  };

  return (
    <span className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-flex items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {parts.map((part, i) => {
            const delay = staggerFrom === "first"
              ? i * staggerDuration
              : (parts.length - 1 - i) * staggerDuration;

            const colorClass = getCharColorClass(currentText, i);

            return (
              <motion.span
                key={`${part}-${i}`}
                className={`inline-block whitespace-pre tracking-wide ${colorClass}`}
                variants={{
                  hidden: { y: 12, opacity: 0, filter: "blur(2px)" },
                  visible: {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                      delay,
                      type: "spring",
                      stiffness: 180,
                      damping: 14
                    }
                  },
                  exit: {
                    y: -12,
                    opacity: 0,
                    filter: "blur(2px)",
                    transition: {
                      delay: (parts.length - 1 - i) * staggerDuration * 0.4,
                      duration: 0.18
                    }
                  }
                }}
              >
                {part === " " ? "\u00A0" : part}
              </motion.span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
