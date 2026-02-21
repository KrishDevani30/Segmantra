"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/demo", label: "Live Demo" },
  { href: "/models", label: "Models" },
  { href: "/benchmarks", label: "Benchmarks" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-subtle border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 border border-[#C9F31D]/40 rounded-sm rotate-45 group-hover:border-[#C9F31D]/70 transition-colors duration-300" />
              <div className="absolute inset-[4px] bg-[#C9F31D]/10 rounded-sm rotate-45 group-hover:bg-[#C9F31D]/20 transition-colors duration-300" />
            </div>
            <span className="font-semibold text-sm tracking-wider text-[#E5E7EB] uppercase">
              Segment<span className="text-[#C9F31D]">OS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 rounded-md ${
                    isActive
                      ? "text-[#E5E7EB]"
                      : "text-[#8F9098] hover:text-[#E5E7EB]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/[0.05] rounded-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-mono text-[#8F9098] tracking-widest uppercase opacity-60">
              v2.4.1
            </span>
            <Link
              href="/demo"
              className="px-4 py-2 text-sm font-medium bg-[#C9F31D] text-[#0A0A0F] rounded-md hover:bg-[#d4f530] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Demo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#8F9098] hover:text-[#E5E7EB] transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-subtle border-b border-white/[0.06] md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-3 text-sm rounded-md transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-[#E5E7EB] bg-white/[0.05]"
                      : "text-[#8F9098] hover:text-[#E5E7EB] hover:bg-white/[0.03]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/[0.06] mt-2">
                <Link
                  href="/demo"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-[#C9F31D] text-[#0A0A0F] rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
