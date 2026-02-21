"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Grid3X3, Combine } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const segTypes = [
    {
        icon: Layers,
        title: "Semantic",
        tag: "SEG-01",
        description:
            "Assigns a class label to every pixel in the image. Ideal for scene understanding, autonomous driving, and medical imaging where category boundaries matter.",
        features: ["Per-pixel classification", "Scene parsing", "Background separation"],
        accuracy: "94.2% IoU",
        model: "DeepLabV3+",
    },
    {
        icon: Grid3X3,
        title: "Instance",
        tag: "SEG-02",
        description:
            "Detects and delineates each individual object instance with unique masks. Handles overlapping objects with fine-grained boundary precision.",
        features: ["Object-level masks", "Overlap handling", "Bounding box fusion"],
        accuracy: "92.8% mAP",
        model: "Mask R-CNN",
    },
    {
        icon: Combine,
        title: "Panoptic",
        tag: "SEG-03",
        description:
            "Unifies semantic and instance segmentation into a coherent scene representation. Every pixel is classified and every instance is identified.",
        features: ["Unified representation", "Stuff + things", "Coherent scene graph"],
        accuracy: "91.5% PQ",
        model: "YOLOv8-seg",
    },
];

function SegCard({ item, index }: { item: typeof segTypes[0]; index: number }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
    };

    const Icon = item.icon;

    return (
        <ScrollReveal
            variant="zoom"
            duration={0.8}
            delay={index * 0.12}
            margin="-50px"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setHovered(true)}
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.1s ease",
                }}
                className="relative h-full p-8 rounded-xl bg-[#111114] border border-white/[0.07] cursor-default group overflow-hidden"
            >
                {/* Hover glow */}
                <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,243,29,0.04) 0%, transparent 70%)",
                    }}
                />

                {/* ... (rest of card content same) */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest">
                        {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[#C9F31D]/60 uppercase tracking-widest">
                        {item.model}
                    </span>
                </div>

                <div className="w-12 h-12 rounded-lg bg-[#18181C] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-[#C9F31D]/25 transition-colors duration-300">
                    <Icon size={20} className="text-[#C9F31D]" />
                </div>

                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3 tracking-tight">
                    {item.title}
                    <span className="block text-sm font-normal text-[#8F9098] mt-1">Segmentation</span>
                </h3>

                <p className="text-sm text-[#8F9098] leading-relaxed mb-6">
                    {item.description}
                </p>

                <ul className="space-y-2 mb-6">
                    {item.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-[#8F9098]">
                            <span className="w-1 h-1 rounded-full bg-[#C9F31D]/60" />
                            {feat}
                        </li>
                    ))}
                </ul>

                <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8F9098]/60 font-mono uppercase tracking-wide">
                            Accuracy
                        </span>
                        <span className="text-sm font-semibold text-[#C9F31D]">{item.accuracy}</span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}

export function SegmentationTypes() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollReveal variant="slideUp" margin="-100px" className="mb-16">
                    <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
                        Capabilities
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] tracking-tight max-w-lg">
                            Three modes of
                            <span className="text-gradient-lime"> understanding</span>
                        </h2>
                        <p className="text-sm text-[#8F9098] max-w-sm">
                            Each segmentation paradigm serves distinct computer vision use cases.
                            All three run on a unified inference stack.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {segTypes.map((item, i) => (
                        <SegCard key={item.title} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
