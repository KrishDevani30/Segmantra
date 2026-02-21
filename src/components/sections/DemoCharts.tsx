"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const fpsAccuracyData = [
  { fps: 8, mAP: 95.1, name: "Mask R-CNN" },
  { fps: 16, mAP: 91.8, name: "Mask R-CNN" },
  { fps: 24, mAP: 94.2, name: "DeepLabV3+" },
  { fps: 30, mAP: 93.4, name: "YOLOv8-l" },
  { fps: 38, mAP: 92.1, name: "YOLOv8-seg" },
  { fps: 52, mAP: 88.7, name: "YOLOv8-n" },
  { fps: 68, mAP: 85.2, name: "Fast-SAM" },
];

const modelSizeData = [
  { model: "YOLOv8-n", size: 3.2, mAP: 85.2 },
  { model: "YOLOv8-seg", size: 6.3, mAP: 92.1 },
  { model: "YOLOv8-l", size: 22.4, mAP: 93.4 },
  { model: "Mask R-CNN", size: 44.0, mAP: 91.8 },
  { model: "DeepLabV3+", size: 41.0, mAP: 94.2 },
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
        <p className="text-[#8F9098] mb-1">{label || (payload[0]?.payload?.name as string)}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}
            {p.name === "mAP" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DemoCharts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* FPS vs Accuracy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 rounded-xl bg-[#111114] border border-white/[0.07]"
      >
        <div className="mb-4">
          <div className="text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest mb-1">
            Speed vs Accuracy
          </div>
          <div className="text-sm font-semibold text-[#E5E7EB]">FPS ↔ mAP Trade-off</div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={fpsAccuracyData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="fps"
              tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              label={{ value: "FPS", position: "insideRight", fill: "#8F9098", fontSize: 10, offset: 10 }}
            />
            <YAxis
              tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              domain={[80, 97]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="mAP"
              stroke="#C9F31D"
              strokeWidth={1.5}
              dot={{ fill: "#C9F31D", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 4, fill: "#C9F31D" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Model Size vs mAP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 rounded-xl bg-[#111114] border border-white/[0.07]"
      >
        <div className="mb-4">
          <div className="text-[10px] font-mono text-[#8F9098]/50 uppercase tracking-widest mb-1">
            Efficiency
          </div>
          <div className="text-sm font-semibold text-[#E5E7EB]">Model Size vs mAP</div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={modelSizeData} margin={{ top: 5, right: 10, bottom: 30, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="model"
              tick={{ fill: "#8F9098", fontSize: 9, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              angle={-25}
              textAnchor="end"
              height={45}
            />
            <YAxis
              tick={{ fill: "#8F9098", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              domain={[80, 97]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="mAP" fill="#C9F31D" opacity={0.8} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
