"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Cpu, Code2, BarChart2, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
    {
        icon: Zap,
        tag: "SPEED",
        title: "Real-time inference at 38 FPS",
        description:
            "Optimized TensorRT deployment with INT8 quantization enables panoptic segmentation on standard enterprise GPUs without quality degradation.",
        metrics: [
            { label: "Throughput", value: "38 FPS" },
            { label: "Batch size", value: "32" },
            { label: "Precision", value: "INT8" },
        ],
        align: "left",
    },
    {
        icon: Shield,
        tag: "RELIABILITY",
        title: "Consistent under adversarial conditions",
        description:
            "Robust to lighting variation, motion blur, partial occlusion, and domain shift. Trained on 40+ diverse datasets with augmentation pipelines.",
        metrics: [
            { label: "Robustness", value: "92%" },
            { label: "OOD drop", value: "<3%" },
            { label: "Datasets", value: "40+" },
        ],
        align: "right",
    },
    {
        icon: Cpu,
        tag: "DEPLOYMENT",
        title: "One-click deployment anywhere",
        description:
            "ONNX export, Docker containers, Kubernetes operators. Run on-prem, in the cloud, or at the edge. CUDA, ROCm, and Apple Neural Engine supported.",
        metrics: [
            { label: "Runtimes", value: "6" },
            { label: "Container size", value: "1.2GB" },
            { label: "Cold start", value: "340ms" },
        ],
        align: "left",
    },
    {
        icon: Code2,
        tag: "INTEGRATION",
        title: "SDK for every language",
        description:
            "Python, TypeScript, Go, and Rust SDKs with identical APIs. gRPC and REST endpoints. OpenAPI spec included. Webhook support for async pipelines.",
        metrics: [
            { label: "Languages", value: "4" },
            { label: "API calls/s", value: "10k" },
            { label: "Latency P50", value: "18ms" },
        ],
        align: "right",
    },
];

function FeatureRow({ feature, index }: { feature: typeof features[0]; index: number }) {
    const isLeft = feature.align === "left";
    const Icon = feature.icon;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Text block */}
            <ScrollReveal
                variant={isLeft ? "slideRight" : "slideLeft"}
                delay={0.1}
                className={isLeft ? "md:order-1" : "md:order-2"}
            >
                <div>
                    <div className="text-[10px] font-mono text-[#C9F31D]/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Icon size={12} />
                        {feature.tag}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#E5E7EB] mb-4 tracking-tight leading-tight">
                        {feature.title}
                    </h3>
                    <p className="text-[#8F9098] text-sm leading-relaxed mb-8">
                        {feature.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                        {feature.metrics.map((m) => (
                            <div key={m.label} className="p-3 rounded-lg bg-[#18181C] border border-white/[0.06]">
                                <div className="text-lg font-bold text-[#C9F31D]">{m.value}</div>
                                <div className="text-[10px] text-[#8F9098] uppercase tracking-wide mt-0.5">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Visual block */}
            <ScrollReveal
                variant={isLeft ? "slideLeft" : "slideRight"}
                delay={0.2}
                className={isLeft ? "md:order-2" : "md:order-1"}
            >
                <div className="relative p-8 rounded-2xl bg-[#111114] border border-white/[0.07] overflow-hidden group hover-lift">
                    {/* Background grid */}
                    <div className="absolute inset-0 grid-lines opacity-30" />

                    {/* Radial glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,243,29,0.06) 0%, transparent 70%)",
                        }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center h-40">
                        <div className="relative">
                            <div className="absolute inset-[-24px] rounded-full border border-white/[0.05]" />
                            <div className="absolute inset-[-48px] rounded-full border border-white/[0.03]" />

                            <div className="w-16 h-16 rounded-2xl bg-[#18181C] border border-white/[0.1] flex items-center justify-center group-hover:border-[#C9F31D]/25 transition-colors duration-300">
                                <Icon size={28} className="text-[#C9F31D]" />
                            </div>
                        </div>
                    </div>


                    <div className="relative z-10 mt-4 p-4 rounded-lg bg-[#0A0A0F] border border-white/[0.06] font-mono text-xs">
                        <div className="text-[#8F9098]/50 mb-2">{"// "}{feature.tag.toLowerCase()}</div>
                        <div className="text-[#C9F31D]/80">
                            const result = <span className="text-[#E5E7EB]">await</span>{" "}
                            <span className="text-[#E5E7EB]">segmentos</span>
                            <span className="text-[#8F9098]">.</span>
                            <span className="text-[#E5E7EB]">run</span>
                            <span className="text-[#8F9098]">(</span>
                            frame
                            <span className="text-[#8F9098]">)</span>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}

export function FeatureSections() {
    return (
        <section className="py-24 px-6 relative">
            <div className="separator-line mb-24" />
            <div className="max-w-7xl mx-auto">
                <ScrollReveal variant="slideUp" margin="-100px" className="mb-20">
                    <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
                        Platform
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] tracking-tight">
                        Everything you need,
                        <span className="text-[#8F9098]"> nothing you don&apos;t</span>
                    </h2>
                </ScrollReveal>

                <div className="space-y-24">
                    {features.map((feature, i) => (
                        <FeatureRow key={feature.tag} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
