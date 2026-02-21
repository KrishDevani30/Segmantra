"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Layers, Grid3X3, Combine } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const models = [
  {
    id: "yolov8",
    name: "YOLOv8-seg",
    category: "Instance",
    icon: Grid3X3,
    mAP: 92.1,
    fps: 38,
    params: "6.3M",
    size: "12.4MB",
    backbone: "CSPDarknet",
    head: "Decoupled Detection",
    badge: "Recommended",
    description:
      "Single-stage instance segmentation with a decoupled head architecture. Optimized for real-time inference with minimal accuracy loss via INT8 quantization.",
    architecture: [
      { label: "Input", desc: "640×640 RGB" },
      { label: "Backbone", desc: "CSPDarknet53" },
      { label: "Neck", desc: "FPN + PAN" },
      { label: "Head", desc: "Decoupled Seg" },
      { label: "Output", desc: "N × (class + mask)" },
    ],
    useCases: ["Real-time video", "Edge deployment", "Autonomous systems"],
  },
  {
    id: "deeplab",
    name: "DeepLabV3+",
    category: "Semantic",
    icon: Layers,
    mAP: 94.2,
    fps: 24,
    params: "41M",
    size: "78MB",
    backbone: "ResNet-101",
    head: "ASPP + Decoder",
    badge: "Highest mAP",
    description:
      "Atrous Spatial Pyramid Pooling architecture for dense semantic prediction. Captures multi-scale context with encoder-decoder refinement for crisp boundaries.",
    architecture: [
      { label: "Input", desc: "Variable resolution" },
      { label: "Backbone", desc: "ResNet-101 / Xception" },
      { label: "ASPP", desc: "Multi-scale atrous conv" },
      { label: "Decoder", desc: "Low-level feature fusion" },
      { label: "Output", desc: "Per-pixel class logits" },
    ],
    useCases: ["Medical imaging", "Satellite imagery", "High-precision tasks"],
  },
  {
    id: "maskrcnn",
    name: "Mask R-CNN",
    category: "Instance",
    icon: Grid3X3,
    mAP: 91.8,
    fps: 16,
    params: "44M",
    size: "85MB",
    backbone: "ResNet-50-FPN",
    head: "RoI + Mask Branch",
    badge: "Highest Precision",
    description:
      "Two-stage detector extending Faster R-CNN with a parallel mask prediction branch. Produces pixel-precise instance masks with strong overlap handling.",
    architecture: [
      { label: "Input", desc: "Variable resolution" },
      { label: "Backbone", desc: "ResNet-50 + FPN" },
      { label: "RPN", desc: "Region proposal network" },
      { label: "RoI Align", desc: "Feature alignment" },
      { label: "Output", desc: "Box + Class + Mask" },
    ],
    useCases: ["Precision annotation", "Industrial QA", "Research baseline"],
  },
  {
    id: "panformer",
    name: "PanFormer",
    category: "Panoptic",
    icon: Combine,
    mAP: 91.5,
    fps: 21,
    params: "35M",
    size: "67MB",
    backbone: "Swin-T",
    head: "Transformer Decoder",
    badge: "Unified",
    description:
      "Transformer-based panoptic segmentation using a unified query mechanism for both stuff and thing classes. End-to-end trainable without hand-crafted post-processing.",
    architecture: [
      { label: "Input", desc: "Variable resolution" },
      { label: "Backbone", desc: "Swin Transformer-T" },
      { label: "FPN", desc: "Multi-scale feature pyramid" },
      { label: "Decoder", desc: "Masked attention queries" },
      { label: "Output", desc: "Panoptic segmentation map" },
    ],
    useCases: ["Scene understanding", "Robotics", "AR/VR systems"],
  },
];

interface ComparisonRow {
  label: string;
  yolov8: string | number;
  deeplab: string | number;
  maskrcnn: string | number;
  panformer: string | number;
  [key: string]: string | number;
}

const comparisonRows: ComparisonRow[] = [
  { label: "Type", yolov8: "Instance", deeplab: "Semantic", maskrcnn: "Instance", panformer: "Panoptic" },
  { label: "mAP", yolov8: "92.1%", deeplab: "94.2%", maskrcnn: "91.8%", panformer: "91.5% PQ" },
  { label: "FPS (RTX 4090)", yolov8: "38", deeplab: "24", maskrcnn: "16", panformer: "21" },
  { label: "Parameters", yolov8: "6.3M", deeplab: "41M", maskrcnn: "44M", panformer: "35M" },
  { label: "Model Size", yolov8: "12.4 MB", deeplab: "78 MB", maskrcnn: "85 MB", panformer: "67 MB" },
  { label: "INT8 Support", yolov8: "✓", deeplab: "✓", maskrcnn: "Partial", panformer: "✓" },
  { label: "ONNX Export", yolov8: "✓", deeplab: "✓", maskrcnn: "✓", panformer: "✓" },
  { label: "Edge Capable", yolov8: "✓", deeplab: "—", maskrcnn: "—", panformer: "—" },
];

function ArchitectureFlow({ steps }: { steps: { label: string; desc: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-lg bg-[#18181C] border border-white/[0.08] text-center min-w-[80px]">
            <div className="text-[10px] font-mono text-[#C9F31D]/70 uppercase tracking-wide">
              {step.label}
            </div>
            <div className="text-[10px] text-[#8F9098] mt-0.5">{step.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight size={12} className="text-[#C9F31D]/30 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

function ModelCard({ model, index }: { model: typeof models[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = model.icon;

  return (
    <ScrollReveal
      variant="zoom"
      duration={0.7}
      delay={index * 0.1}
      className="rounded-xl bg-[#111114] border border-white/[0.07] overflow-hidden hover-lift gradient-border-card"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#18181C] border border-white/[0.08] flex items-center justify-center">
              <Icon size={18} className="text-[#C9F31D]" />
            </div>
            <div>
              <div className="font-bold text-[#E5E7EB] text-base">{model.name}</div>
              <div className="text-xs text-[#8F9098] mt-0.5">{model.category} Segmentation</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#C9F31D]/10 text-[#C9F31D] border border-[#C9F31D]/20">
            {model.badge}
          </span>
        </div>

        <p className="text-sm text-[#8F9098] leading-relaxed mb-5">{model.description}</p>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "mAP", value: `${model.mAP}%` },
            { label: "FPS", value: model.fps },
            { label: "Params", value: model.params },
            { label: "Size", value: model.size },
          ].map((s) => (
            <div key={s.label} className="text-center p-2 rounded-lg bg-[#18181C] border border-white/[0.05]">
              <div className="text-sm font-bold text-[#C9F31D]">{s.value}</div>
              <div className="text-[10px] text-[#8F9098] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <div className="flex flex-wrap gap-2 mt-4">
          {model.useCases.map((uc) => (
            <span
              key={uc}
              className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[#8F9098]"
            >
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable architecture */}
      <div className="border-t border-white/[0.06]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm text-[#8F9098] hover:text-[#E5E7EB] transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Architecture Flow</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="text-xs text-[#8F9098] mb-2">
                  <span className="text-[#C9F31D]">Backbone:</span> {model.backbone} ·{" "}
                  <span className="text-[#C9F31D]">Head:</span> {model.head}
                </div>
                <ArchitectureFlow steps={model.architecture} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

function ComparisonTable() {
  const cols = ["yolov8", "deeplab", "maskrcnn", "panformer"] as const;
  const colLabels = { yolov8: "YOLOv8-seg", deeplab: "DeepLabV3+", maskrcnn: "Mask R-CNN", panformer: "PanFormer" };

  return (
    <ScrollReveal
      variant="fade"
      duration={0.8}
      className="overflow-x-auto rounded-xl border border-white/[0.07]"
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-white/[0.07] bg-[#111114]">
            <th className="text-left px-5 py-4 text-xs font-mono text-[#8F9098]/50 uppercase tracking-widest w-40">
              Metric
            </th>
            {cols.map((col) => (
              <th key={col} className="text-left px-5 py-4 text-xs font-semibold text-[#E5E7EB]">
                {colLabels[col]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-white/[0.04] ${i % 2 === 0 ? "bg-[#0d0d12]" : "bg-[#111114]"} hover:bg-white/[0.02] transition-colors`}
            >
              <td className="px-5 py-3.5 text-xs font-mono text-[#8F9098]">{row.label}</td>
              {cols.map((col) => (
                <td key={col} className="px-5 py-3.5 text-sm text-[#E5E7EB]">
                  <span
                    className={
                      row[col] === "✓"
                        ? "text-[#C9F31D]"
                        : row[col] === "—"
                          ? "text-[#8F9098]/30"
                          : col === "yolov8" && row.label === "FPS (RTX 4090)"
                            ? "text-[#C9F31D] font-bold"
                            : col === "deeplab" && row.label === "mAP"
                              ? "text-[#C9F31D] font-bold"
                              : ""
                    }
                  >
                    {row[col]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollReveal>
  );
}

export function ModelsContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-24">
      {/* Header */}
      <ScrollReveal variant="slideUp" duration={0.8} className="mb-16">
        <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
          Architecture
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-3xl md:text-5xl font-bold text-[#E5E7EB] tracking-tight max-w-xl">
            Models &
            <span className="text-[#8F9098]"> Architecture</span>
          </h1>
          <p className="text-sm text-[#8F9098] max-w-sm leading-relaxed">
            Four production-grade architectures, benchmarked and optimized for enterprise deployment.
          </p>
        </div>
      </ScrollReveal>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
        {models.map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mb-12">
        <ScrollReveal variant="fade" className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-4">
          Comparison
        </ScrollReveal>
        <ScrollReveal variant="slideUp" delay={0.1} duration={0.6}>
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-8">Side-by-side metrics</h2>
        </ScrollReveal>
        <ComparisonTable />
      </div>
    </div>
  );
}
