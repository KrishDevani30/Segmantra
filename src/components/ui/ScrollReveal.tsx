"use client";

import { motion, useInView, Variant, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoom" | "none";
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    margin?: string;
    className?: string;
    staggerChildren?: number;
    staggerDelay?: number;
}

export function ScrollReveal({
    children,
    variant = "slideUp",
    delay = 0,
    duration = 0.8,
    distance = 30,
    once = true,
    margin = "-100px",
    className = "",
    staggerChildren = 0,
    staggerDelay = 0,
}: ScrollRevealProps) {
    const ref = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInView = useInView(ref, { once, margin: margin as any });

    const getVariants = (): Variants => {
        switch (variant) {
            case "fade":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                };
            case "slideUp":
                return {
                    hidden: { opacity: 0, y: distance },
                    visible: { opacity: 1, y: 0 },
                };
            case "slideDown":
                return {
                    hidden: { opacity: 0, y: -distance },
                    visible: { opacity: 1, y: 0 },
                };
            case "slideLeft":
                return {
                    hidden: { opacity: 0, x: distance },
                    visible: { opacity: 1, x: 0 },
                };
            case "slideRight":
                return {
                    hidden: { opacity: 0, x: -distance },
                    visible: { opacity: 1, x: 0 },
                };
            case "zoom":
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                };
            case "none":
                return {
                    hidden: {},
                    visible: {},
                };
            default:
                return {
                    hidden: { opacity: 0, y: distance },
                    visible: { opacity: 1, y: 0 },
                };
        }
    };

    const variants = getVariants();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: variants.hidden,
                visible: {
                    ...variants.visible,
                    transition: {
                        duration,
                        delay: delay + staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                        staggerChildren: staggerChildren > 0 ? staggerChildren : undefined,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
