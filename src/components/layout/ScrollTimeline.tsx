"use client";

import { useEffect, useRef, createContext, useContext, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTimelineCtx {
  activeIndex: number;
}

const Ctx = createContext<ScrollTimelineCtx>({ activeIndex: 0 });
export const useScrollTimeline = () => useContext(Ctx);

/**
 * ScrollTimeline
 *
 * Cinematic full-page scroll system.
 *
 * • Wraps all [data-panel] children in a vertical strip.
 * • The body height is extended by (n-1) × 100vh so the browser
 *   has a natural scroll range — Lenis smooths it.
 * • GSAP ScrollTrigger translates the strip upward as you scroll,
 *   with snap-to-panel behaviour.
 * • Inside each panel, children with [data-reveal] animate in
 *   (fade + translateY) as their panel enters the viewport.
 * • Scroll progress bar at top tracks overall position.
 */
export function ScrollTimeline({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);   // the fixed viewport frame
  const stripRef = useRef<HTMLDivElement>(null);   // the tall translateY strip
  const lenisRef = useRef<Lenis | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const strip = stripRef.current;
    if (!outer || !strip) return;

    const panels = Array.from(strip.querySelectorAll<HTMLElement>("[data-panel]"));
    const n = panels.length;
    if (n === 0) return;

    // Extend document scroll height to give us a real scroll range
    // We achieve this by setting body min-height
    const totalScrollH = n * window.innerHeight;
    document.body.style.minHeight = `${totalScrollH}px`;

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function tick(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    gsap.ticker.lagSmoothing(0);

    // Master timeline: scroll 0 → totalScrollH drives strip from 0 → -(n-1)*100vh
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => `+=${(n - 1) * window.innerHeight}`,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.25, max: 0.6 },
          delay: 0.04,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (n - 1));
          setActiveIndex(idx);
        },
        invalidateOnRefresh: true,
      },
    });

    tl.to(strip, {
      y: () => -(n - 1) * window.innerHeight,
      ease: "none",
      duration: n - 1,
    });

    // Per-panel content reveals — each fires when its panel is the active one
    panels.forEach((panel, i) => {
      const reveals = Array.from(panel.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!reveals.length) return;

      // Reset to hidden
      gsap.set(reveals, { opacity: 0, y: 50, scale: 0.97 });

      // Fire reveal when panel enters (scroll progress hits this panel's fraction)
      const startFrac = i === 0 ? 0 : (i - 0.25) / (n - 1);
      const endFrac = i === 0 ? 0.05 : (i + 0.15) / (n - 1);

      tl.to(
        reveals,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "power3.out",
        },
        startFrac * (n - 1)   // position in tl (seconds = scroll units)
      );

      // Reverse on exit (panel leaves upward)
      if (i < n - 1) {
        const exitFrac = (i + 0.75) / (n - 1);
        tl.to(
          reveals,
          {
            opacity: 0,
            y: -30,
            scale: 0.98,
            stagger: { each: 0.04, from: "end" },
            duration: 0.3,
            ease: "power2.in",
          },
          exitFrac * (n - 1)
        );
      }

      // Accent lines
      const lines = Array.from(panel.querySelectorAll<HTMLElement>("[data-line]"));
      if (lines.length) {
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
        tl.to(
          lines,
          { scaleX: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
          startFrac * (n - 1) + 0.1
        );
        if (i < n - 1) {
          tl.to(
            lines,
            { scaleX: 0, duration: 0.2, stagger: 0.03, ease: "power2.in" },
            (i + 0.75) / (n - 1) * (n - 1)
          );
        }
      }

      // Counters
      const counters = Array.from(panel.querySelectorAll<HTMLElement>("[data-counter]"));
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.counter || "0");
        const isDecimal = target % 1 !== 0;
        gsap.set(el, { textContent: "0" });
        tl.to(
          el,
          {
            textContent: target,
            duration: 0.8,
            ease: "power2.out",
            snap: { textContent: isDecimal ? 0.1 : 1 },
            modifiers: {
              textContent: (v: string) => {
                const num = parseFloat(v);
                return isDecimal ? num.toFixed(1) : Math.round(num).toString();
              },
            },
          },
          startFrac * (n - 1) + 0.15
        );
      });
    });

    // Resize
    const onResize = () => {
      document.body.style.minHeight = `${n * window.innerHeight}px`;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      window.removeEventListener("resize", onResize);
      document.body.style.minHeight = "";
    };
  }, []);

  return (
    <Ctx.Provider value={{ activeIndex }}>
      {/* Fixed viewport frame */}
      <div
        ref={outerRef}
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Scrolling strip */}
        <div ref={stripRef} className="will-change-transform">
          {children}
        </div>
      </div>
    </Ctx.Provider>
  );
}
