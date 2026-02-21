"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      setMousePos({ x: nx * 0.5, y: ny * 0.3 });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const words = ["Semantic", "Instance", "Panoptic", "Real-Time"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,243,29,0.05) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(255,255,255,0.015) 0%, transparent 55%)",
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

      {/* 3D Canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        <HeroScene mouseX={mousePos.x} mouseY={mousePos.y} scrollY={scrollY} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <ScrollReveal variant="fade" delay={0.2} duration={0.8}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs font-mono text-[#8F9098] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F31D] pulse-dot" />
              Model v2.4 · Production Ready
            </div>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal variant="slideUp" delay={0.35} duration={1}>
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold tracking-tight leading-[0.9] text-[#E5E7EB] mb-6">
            AI{" "}
            <span className="text-gradient-lime">Segmentation</span>
            <br />
            Engine
          </h1>
        </ScrollReveal>

        {/* Subtext */}
        <ScrollReveal variant="fade" delay={0.55} duration={0.8}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {words.map((word, i) => (
              <span
                key={word}
                className="text-sm font-mono text-[#8F9098] tracking-widest uppercase"
              >
                {word}
                {i < words.length - 1 && (
                  <span className="ml-3 text-[#C9F31D]/30">·</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal variant="zoom" delay={0.75} duration={0.8}>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#C9F31D] text-[#0A0A0F] text-sm font-semibold rounded-md hover:bg-[#d4f530] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-[#C9F31D]/10"
            >
              <Play size={14} className="group-hover:translate-x-0.5 transition-transform" />
              Live Demo
            </Link>
            <Link
              href="/models"
              className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white/[0.05] border border-white/[0.12] text-[#E5E7EB] text-sm font-medium rounded-md hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              View Architecture
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8F9098]/40"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
