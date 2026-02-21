"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        value: 92,
        suffix: "%",
        label: "mAP Score",
        description: "COCO val2017",
        mono: "COCO-2017",
    },
    {
        value: 38,
        suffix: " FPS",
        label: "Real-Time",
        description: "RTX 4090 · 1080p",
        mono: "INFERENCE",
    },
    {
        value: 120,
        prefix: "<",
        suffix: "ms",
        label: "Latency",
        description: "P99 end-to-end",
        mono: "LATENCY P99",
    },
    {
        value: 99.4,
        suffix: "%",
        label: "Uptime SLA",
        description: "30-day rolling",
        mono: "SLA",
    },
];

function StatCard({
    stat,
    index,
}: {
    stat: (typeof stats)[0];
    index: number;
}) {
    const numRef = useRef<HTMLSpanElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView || !numRef.current) return;
        const target = stat.value;
        const duration = 1.6;

        gsap.fromTo(
            numRef.current,
            { textContent: 0 },
            {
                textContent: target,
                duration,
                delay: index * 0.15 + 0.3, // Added delay to sync with reveal
                ease: "power2.out",
                snap: { textContent: target % 1 !== 0 ? 0.1 : 1 },
                modifiers: {
                    textContent: (value) => {
                        const num = parseFloat(value);
                        return target % 1 !== 0 ? num.toFixed(1) : Math.round(num).toString();
                    },
                },
            }
        );
    }, [inView, stat.value, index]);

    return (
        <ScrollReveal
            variant="slideUp"
            duration={0.8}
            delay={index * 0.1}
            margin="-50px"
        >
            <div ref={ref} className="relative group">
                <div className="p-8 border border-white/[0.07] bg-[#111114] rounded-xl hover-lift gradient-border-card">
                    {/* Mono label */}
                    <div className="text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest mb-4">
                        {stat.mono}
                    </div>

                    {/* Number */}
                    <div className="text-4xl md:text-5xl font-bold tracking-tight text-[#E5E7EB] mb-2 flex items-baseline gap-1">
                        {stat.prefix && (
                            <span className="text-[#C9F31D]">{stat.prefix}</span>
                        )}
                        <span ref={numRef}>0</span>
                        <span className="text-[#C9F31D] text-3xl">{stat.suffix}</span>
                    </div>

                    {/* Label */}
                    <div className="text-sm font-semibold text-[#E5E7EB] mb-1">{stat.label}</div>
                    <div className="text-xs text-[#8F9098]">{stat.description}</div>

                    {/* Accent bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.12 + 0.5, ease: "easeOut" }}
                        className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#C9F31D]/40 to-transparent origin-left"
                    />
                </div>
            </div>
        </ScrollReveal>
    );
}

export function StatsSection() {
    return (
        <section className="py-24 px-6 relative">
            <div className="separator-line mb-24" />
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal variant="slideUp" margin="-100px" className="mb-16">
                    <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
                        Performance Metrics
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] tracking-tight">
                        Built for production
                        <span className="text-[#8F9098]"> at scale</span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
