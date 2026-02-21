"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="separator-line mb-32" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201,243,29,0.06) 0%, transparent 70%)",
                    }}
                />

                <ScrollReveal variant="zoom" duration={1} margin="-100px">
                    <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-6">
                        Get Started
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-[#E5E7EB] tracking-tight mb-6">
                        Deploy segmentation
                        <br />
                        <span className="text-gradient-lime">in minutes</span>
                    </h2>
                    <p className="text-[#8F9098] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        From model selection to production deployment. No infrastructure complexity.
                        Start with the live demo.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            href="/demo"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#C9F31D] text-[#0A0A0F] text-sm font-semibold rounded-md hover:bg-[#d4f530] transition-all duration-200 hover:scale-[1.03] shadow-lg shadow-[#C9F31D]/10"
                        >
                            Launch Demo
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/benchmarks"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-white/[0.12] text-[#E5E7EB] text-sm font-medium rounded-md hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-200 hover:scale-[1.03]"
                        >
                            View Benchmarks
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
