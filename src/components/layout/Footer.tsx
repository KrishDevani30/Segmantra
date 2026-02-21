"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: [
    { label: "Overview", href: "/" },
    { label: "Live Demo", href: "/demo" },
    { label: "Models", href: "/models" },
    { label: "Benchmarks", href: "/benchmarks" },
  ],
  Capabilities: [
    { label: "Semantic Segmentation", href: "/" },
    { label: "Instance Segmentation", href: "/" },
    { label: "Panoptic Segmentation", href: "/" },
    { label: "Real-Time Inference", href: "/" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Research Paper", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 border border-[#C9F31D]/40 rounded-sm rotate-45" />
                <div className="absolute inset-[3px] bg-[#C9F31D]/10 rounded-sm rotate-45" />
              </div>
              <span className="font-semibold text-sm tracking-wider text-[#E5E7EB] uppercase">
                Segment<span className="text-[#C9F31D]">OS</span>
              </span>
            </Link>
            <p className="text-sm text-[#8F9098] leading-relaxed max-w-xs">
              Production-grade AI segmentation engine. Semantic, instance, and panoptic
              capabilities at 38 FPS with enterprise reliability.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9F31D] pulse-dot" />
              <span className="text-xs text-[#8F9098] font-mono">System operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8F9098] hover:text-[#E5E7EB] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="separator-line my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8F9098]/60 font-mono">
            © 2026 SegmentOS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#8F9098]/40 font-mono">v2.4.1-stable</span>
            <span className="text-xs text-[#8F9098]/40 font-mono">MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
