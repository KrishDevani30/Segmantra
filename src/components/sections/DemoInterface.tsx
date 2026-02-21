"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Layers, Grid3X3, Combine, Activity, Cpu, RefreshCw } from "lucide-react";

const models = [
  { id: "yolov8", label: "YOLOv8-seg", fps: 38, mAP: 92.1, size: "6.3M" },
  { id: "deeplab", label: "DeepLabV3+", fps: 24, mAP: 94.2, size: "41M" },
  { id: "maskrcnn", label: "Mask R-CNN", fps: 16, mAP: 91.8, size: "44M" },
];

const segModes = [
  { id: "semantic", label: "Semantic", icon: Layers },
  { id: "instance", label: "Instance", icon: Grid3X3 },
  { id: "panoptic", label: "Panoptic", icon: Combine },
];

// Simulated segmentation overlay colors (class-based)
const maskColors = [
  "rgba(201,243,29,0.25)",
  "rgba(255,255,255,0.12)",
  "rgba(143,144,152,0.2)",
  "rgba(201,243,29,0.15)",
  "rgba(255,255,255,0.08)",
];

function FPSCounter({ fps }: { fps: number }) {
  const isGood = fps >= 30;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0A0A0F]/80 border border-white/[0.08] font-mono">
      <span
        className={`w-1.5 h-1.5 rounded-full pulse-dot ${isGood ? "bg-[#C9F31D]" : "bg-[#8F9098]"}`}
      />
      <span className="text-xs text-[#8F9098]">FPS</span>
      <span className={`text-sm font-bold ${isGood ? "text-[#C9F31D]" : "text-[#8F9098]"}`}>
        {fps}
      </span>
    </div>
  );
}

function LatencyBar({ ms }: { ms: number }) {
  const ratio = Math.min(ms / 200, 1);

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs text-[#8F9098] w-14">Latency</span>
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-[#C9F31D] rounded-full"
        />
      </div>
      <span className="text-xs font-mono text-[#C9F31D] w-12 text-right">{ms}ms</span>
    </div>
  );
}

// Simulated mask overlay on canvas
function SegmentationMask({
  active,
  mode,
}: {
  active: boolean;
  mode: string;
}) {
  const shapes =
    mode === "instance"
      ? [
          { x: "15%", y: "25%", w: "28%", h: "45%", color: maskColors[0], label: "Person #1" },
          { x: "55%", y: "30%", w: "25%", h: "42%", color: maskColors[3], label: "Person #2" },
          { x: "30%", y: "55%", w: "40%", h: "25%", color: maskColors[1], label: "Vehicle" },
        ]
      : mode === "semantic"
      ? [
          { x: "0%", y: "0%", w: "100%", h: "45%", color: maskColors[4], label: "Sky" },
          { x: "0%", y: "45%", w: "100%", h: "55%", color: maskColors[2], label: "Ground" },
          { x: "20%", y: "15%", w: "60%", h: "70%", color: maskColors[0], label: "Objects" },
        ]
      : [
          { x: "10%", y: "20%", w: "35%", h: "50%", color: maskColors[0], label: "Thing #1" },
          { x: "50%", y: "25%", w: "40%", h: "45%", color: maskColors[3], label: "Thing #2" },
          { x: "0%", y: "60%", w: "100%", h: "40%", color: maskColors[2], label: "Stuff" },
        ];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none"
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={`${mode}-${i}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                position: "absolute",
                left: shape.x,
                top: shape.y,
                width: shape.w,
                height: shape.h,
                background: shape.color,
                border: `1px solid ${shape.color.replace(/[\d.]+\)$/, "0.5)")}`,
                borderRadius: "4px",
                backdropFilter: "blur(1px)",
              }}
            >
              <span
                className="absolute top-1 left-1 text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: shape.color.replace(/[\d.]+\)$/, "0.9)"), color: "#fff" }}
              >
                {shape.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DemoInterface() {
  const [activeModel, setActiveModel] = useState(models[0]);
  const [segMode, setSegMode] = useState(segModes[0]);
  const [segActive, setSegActive] = useState(true);
  const [fps, setFps] = useState(38);
  const [latency, setLatency] = useState(84);
  const [gpuUtil, setGpuUtil] = useState(67);
  const [cameraOn, setCameraOn] = useState(false);

  // Simulate live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.round(activeModel.fps + (Math.random() - 0.5) * 4));
      setLatency(Math.round(1000 / activeModel.fps + Math.random() * 20));
      setGpuUtil(Math.round(60 + Math.random() * 25));
    }, 800);
    return () => clearInterval(interval);
  }, [activeModel]);

  const handleModelChange = (model: typeof models[0]) => {
    setActiveModel(model);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main viewport */}
      <div className="xl:col-span-2 space-y-4">
        {/* Viewport */}
        <div className="relative rounded-2xl bg-[#111114] border border-white/[0.08] overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#8F9098]/60 uppercase tracking-widest">
                Input Stream
              </span>
              {cameraOn && (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#C9F31D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9F31D] pulse-dot" />
                  LIVE
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <FPSCounter fps={segActive ? fps : 0} />
            </div>
          </div>

          {/* Canvas area */}
          <div className="relative aspect-video bg-[#0A0A0F] overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-lines opacity-20" />

            {/* Placeholder visual — simulated camera feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {cameraOn ? (
                <div className="w-full h-full relative">
                  {/* Simulated scene */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d12] via-[#111114] to-[#0A0A0F]" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(201,243,29,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 40%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                    }}
                  />
                  {/* Scene shapes */}
                  <div className="absolute left-[18%] top-[20%] w-[20%] h-[55%] rounded-xl bg-[#18181C] border border-white/[0.04]" />
                  <div className="absolute left-[50%] top-[25%] w-[22%] h-[50%] rounded-xl bg-[#1a1a20] border border-white/[0.04]" />
                  <div className="absolute left-[0%] bottom-[0%] w-full h-[28%] bg-[#18181C] border-t border-white/[0.04]" />

                  <SegmentationMask active={segActive} mode={segMode.id} />

                  {/* Scan line animation */}
                  {segActive && (
                    <motion.div
                      animate={{ y: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9F31D]/20 to-transparent pointer-events-none"
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#18181C] border border-white/[0.06] flex items-center justify-center">
                    <Camera size={24} className="text-[#8F9098]/40" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8F9098] mb-1">No input stream</p>
                    <p className="text-xs text-[#8F9098]/50">
                      Enable camera or load a sample
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C9F31D]/30" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C9F31D]/30" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#C9F31D]/30" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C9F31D]/30" />
          </div>

          {/* Footer bar */}
          <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCameraOn(!cameraOn)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 ${
                  cameraOn
                    ? "bg-[#C9F31D]/10 border-[#C9F31D]/30 text-[#C9F31D]"
                    : "bg-white/[0.04] border-white/[0.08] text-[#8F9098] hover:text-[#E5E7EB]"
                }`}
              >
                {cameraOn ? <Camera size={12} /> : <CameraOff size={12} />}
                {cameraOn ? "Camera On" : "Enable Camera"}
              </button>

              <button
                onClick={() => setCameraOn(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border border-white/[0.08] bg-white/[0.04] text-[#8F9098] hover:text-[#E5E7EB] transition-colors"
              >
                <RefreshCw size={12} />
                Load Sample
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8F9098]/50 font-mono">{activeModel.label}</span>
            </div>
          </div>
        </div>

        {/* Segmentation mode selector */}
        <div className="grid grid-cols-3 gap-3">
          {segModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = segMode.id === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSegMode(mode)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#C9F31D]/10 border-[#C9F31D]/30 text-[#C9F31D]"
                    : "bg-[#111114] border-white/[0.07] text-[#8F9098] hover:text-[#E5E7EB] hover:border-white/[0.14]"
                }`}
              >
                <Icon size={16} />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="space-y-4">
        {/* Segmentation toggle */}
        <div className="p-5 rounded-xl bg-[#111114] border border-white/[0.07]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-[#E5E7EB]">Segmentation</span>
            <button
              onClick={() => setSegActive(!segActive)}
              className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                segActive ? "bg-[#C9F31D]" : "bg-white/[0.1]"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0A0A0F] transition-all duration-200 ${
                  segActive ? "left-5.5" : "left-0.5"
                }`}
                style={{ left: segActive ? "calc(100% - 18px)" : "2px" }}
              />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8F9098]">Opacity</span>
              <span className="text-xs font-mono text-[#C9F31D]">0.65</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-[#C9F31D] rounded-full" />
            </div>
          </div>
        </div>

        {/* Model selector */}
        <div className="p-5 rounded-xl bg-[#111114] border border-white/[0.07]">
          <div className="text-xs font-mono text-[#8F9098]/50 uppercase tracking-widest mb-4">
            Model
          </div>
          <div className="space-y-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelChange(model)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-all duration-200 ${
                  activeModel.id === model.id
                    ? "bg-[#C9F31D]/10 border-[#C9F31D]/25 text-[#E5E7EB]"
                    : "bg-[#18181C] border-white/[0.06] text-[#8F9098] hover:text-[#E5E7EB] hover:border-white/[0.12]"
                }`}
              >
                <span className="font-medium">{model.label}</span>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#8F9098]/60">{model.mAP}%</span>
                  <span
                    className={
                      activeModel.id === model.id ? "text-[#C9F31D]" : "text-[#8F9098]/40"
                    }
                  >
                    {model.fps}fps
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Performance panel */}
        <div className="p-5 rounded-xl bg-[#111114] border border-white/[0.07]">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={14} className="text-[#C9F31D]" />
            <span className="text-xs font-mono text-[#8F9098]/50 uppercase tracking-widest">
              Performance
            </span>
          </div>

          <div className="space-y-4">
            <LatencyBar ms={latency} />

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8F9098] w-14">GPU</span>
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${gpuUtil}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-[#8F9098] rounded-full"
                />
              </div>
              <span className="text-xs font-mono text-[#8F9098] w-12 text-right">
                {gpuUtil}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8F9098] w-14">mAP</span>
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9F31D] rounded-full transition-all duration-500"
                  style={{ width: `${activeModel.mAP}%` }}
                />
              </div>
              <span className="text-xs font-mono text-[#C9F31D] w-12 text-right">
                {activeModel.mAP}%
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/[0.06]">
            {[
              { label: "Params", value: activeModel.size },
              { label: "Mode", value: segMode.label },
              { label: "Backend", value: "TRT" },
              { label: "Precision", value: "INT8" },
            ].map((s) => (
              <div key={s.label} className="p-2.5 rounded-lg bg-[#18181C] border border-white/[0.05]">
                <div className="text-[10px] text-[#8F9098]/50 uppercase tracking-wide mb-1">
                  {s.label}
                </div>
                <div className="text-xs font-mono font-semibold text-[#E5E7EB]">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CPU indicator */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111114] border border-white/[0.07]">
          <Cpu size={14} className="text-[#8F9098]" />
          <div className="flex-1">
            <div className="text-xs text-[#8F9098] mb-1">System</div>
            <div className="text-xs font-mono text-[#E5E7EB]">RTX 4090 · CUDA 12.4</div>
          </div>
          <div className="text-xs font-mono text-[#C9F31D]">Optimal</div>
        </div>
      </div>
    </div>
  );
}
