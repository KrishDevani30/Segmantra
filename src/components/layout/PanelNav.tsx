"use client";

import { motion } from "framer-motion";
import { useScrollTimeline } from "./ScrollTimeline";

interface Props {
  count: number;
  labels?: string[];
}

export function PanelNav({ count, labels = [] }: Props) {
  const { activeIndex } = useScrollTimeline();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={labels[i] ?? `Section ${i + 1}`}
          onClick={() => {
            const target = i * window.innerHeight;
            window.scrollTo({ top: target, behavior: "smooth" });
          }}
          className="group relative flex items-center gap-3 justify-end"
        >
          {/* Label tooltip */}
          {labels[i] && (
            <span className="absolute right-5 text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {labels[i]}
            </span>
          )}

          {/* Dot */}
          <div className="relative w-1.5 h-1.5 flex items-center justify-center">
            <motion.div
              animate={{
                scale: activeIndex === i ? 1.6 : 1,
                backgroundColor: activeIndex === i ? "#C9F31D" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
