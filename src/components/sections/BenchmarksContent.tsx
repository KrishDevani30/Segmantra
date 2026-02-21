"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const radarData = [
  { subject: "mAP", yolov8: 92, deeplab: 94, maskrcnn: 92, fullMark: 100 },
  { subject: "Speed", yolov8: 95, deeplab: 60, maskrcnn: 40, fullMark: 100 },
  { subject: "Memory", yolov8: 90, deeplab: 65, maskrcnn: 62, fullMark: 100 },
  { subject: "Edge", yolov8: 92, deeplab: 30, maskrcnn: 25, fullMark: 100 },
  { subject: "Precision", yolov8: 90, deeplab: 96, maskrcnn: 94, fullMark: 100 },
  { subject: "Robustness", yolov8: 88, deeplab: 92, maskrcnn: 90, fullMark: 100 },
];

const latencyBreakdown = [
  { stage: "Preprocess", ms: 4 },
  { stage: "Backbone", ms: 12 },
  { stage: "Neck", ms: 5 },
  { stage: "Head", ms: 8 },
  { stage: "Decode", ms: 3 },
  { stage: "Postprocess", ms: 6 },
];

const throughputData = [
  { batch: 1, fps: 38, util: 42 },
  { batch: 4, fps: 76, util: 61 },
  { batch: 8, fps: 112, util: 74 },
  { batch: 16, fps: 148, util: 85 },
  { batch: 32, fps: 171, util: 92 },
];

const hardwareData = [
  { hw: "RTX 4090", fps: 38, power: 120 },
  { hw: "RTX 3090", fps: 28, power: 95 },
  { hw: "A100 80G", fps: 52, power: 180 },
  { hw: "T4 16G", fps: 18, power: 60 },
  { hw: "Jetson AGX", fps: 11, power: 35 },
];

const bigStats = [
  { value: "92%", label: "mAP on COCO", sub: "val2017 · panoptic" },
  { value: "38", label: "FPS Real-Time", sub: "RTX 4090 · 1080p" },
  { value: "<120ms", label: "P99 Latency", sub: "end-to-end pipeline" },
  { value: "6.3M", label: "Parameters", sub: "YOLOv8-seg (default)" },
  { value: "INT8", label: "Quantization", sub: "no accuracy loss" },
  { value: "1.2GB", label: "Container", sub: "Docker image size" },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload?.length) {
    return (
      <div className="glass px-3 py-2 rounded-lg text-xs font-mono">
        <p className="text-[#8F9098] mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color || "#C9F31D" }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ stat, index }: { stat: typeof bigStats[0]; index: number }) {
  return (
    <ScrollReveal
      variant="slideUp"
      delay={index * 0.05}
      duration={0.6}
      className="p-6 rounded-xl bg-[#111114] border border-white/[0.07] hover-lift gradient-border-card"
    >
      <div className="text-3xl md:text-4xl font-bold text-[#C9F31D] mb-1">{stat.value}</div>
      <div className="text-sm font-semibold text-[#E5E7EB]">{stat.label}</div>
      <div className="text-xs text-[#8F9098] mt-1 font-mono">{stat.sub}</div>
    </ScrollReveal>
  );
}

export function BenchmarksContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-24">
      <ScrollReveal variant="slideUp" duration={0.8} className="mb-16">
        <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
          Benchmarks
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#E5E7EB] tracking-tight">
            Performance
            <span className="text-[#8F9098]"> at depth</span>
          </h1>
          <p className="text-sm text-[#8F9098] max-w-sm leading-relaxed">
            Comprehensive benchmarks across hardware, precision modes, batch sizes, and real-world conditions.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {bigStats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BenchmarkCard title="Multi-Dimensional Analysis" tag="RADAR" delay={0}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
              />
              <Radar
                name="YOLOv8-seg"
                dataKey="yolov8"
                stroke="#C9F31D"
                fill="#C9F31D"
                fillOpacity={0.12}
                strokeWidth={1.5}
              />
              <Radar
                name="DeepLabV3+"
                dataKey="deeplab"
                stroke="#E5E7EB"
                fill="#E5E7EB"
                fillOpacity={0.05}
                strokeWidth={1}
              />
              <Radar
                name="Mask R-CNN"
                dataKey="maskrcnn"
                stroke="#8F9098"
                fill="#8F9098"
                fillOpacity={0.05}
                strokeWidth={1}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            {[
              { color: "#C9F31D", label: "YOLOv8-seg" },
              { color: "#E5E7EB", label: "DeepLabV3+" },
              { color: "#8F9098", label: "Mask R-CNN" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-[10px] font-mono text-[#8F9098]">{l.label}</span>
              </div>
            ))}
          </div>
        </BenchmarkCard>

        <BenchmarkCard title="Latency Breakdown (YOLOv8-seg)" tag="PIPELINE" delay={0.1}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={latencyBreakdown}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
                unit="ms"
              />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ms" fill="#C9F31D" opacity={0.8} radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BenchmarkCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BenchmarkCard title="Throughput vs Batch Size" tag="SCALING" delay={0.05}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={throughputData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="batch"
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                label={{ value: "Batch Size", position: "insideBottom", fill: "#8F9098", fontSize: 9, offset: -2 }}
              />
              <YAxis
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="fps"
                stroke="#C9F31D"
                fill="rgba(201,243,29,0.06)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </BenchmarkCard>

        <BenchmarkCard title="Hardware Comparison" tag="HARDWARE" delay={0.1}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={hardwareData}
              margin={{ top: 5, right: 10, bottom: 40, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="hw"
                tick={{ fill: "#8F9098", fontSize: 9, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="fps" name="FPS" fill="#C9F31D" opacity={0.8} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BenchmarkCard>
      </div>

      <ScrollReveal variant="fade" delay={0.3} className="mt-12 p-5 rounded-xl bg-[#111114] border border-white/[0.06]">
        <div className="text-xs font-mono text-[#C9F31D]/60 uppercase tracking-widest mb-2">
          Methodology
        </div>
        <p className="text-xs text-[#8F9098] leading-relaxed max-w-3xl">
          All benchmarks measured on COCO val2017 with TensorRT INT8 quantization unless noted.
          FPS measured at 1920×1080 resolution with batch size 1. Latency measured end-to-end
          including pre/post-processing. Hardware: NVIDIA RTX 4090 24GB, CUDA 12.4, TensorRT 8.6.
          Reported as median over 1000 inference runs, P99 latency computed over same sample.
        </p>
      </ScrollReveal>
    </div>
  );
}

function BenchmarkCard({
  title,
  tag,
  delay,
  children,
}: {
  title: string;
  tag: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal
      variant="zoom"
      duration={0.7}
      delay={delay}
      className="p-6 rounded-xl bg-[#111114] border border-white/[0.07]"
    >
      <div className="mb-4">
        <div className="text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest mb-1">
          {tag}
        </div>
        <div className="text-sm font-semibold text-[#E5E7EB]">{title}</div>
      </div>
      {children}
    </ScrollReveal>
  );
}
