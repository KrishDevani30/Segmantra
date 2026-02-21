import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { DemoInterface } from "@/components/sections/DemoInterface";
import { DemoCharts } from "@/components/sections/DemoCharts";

export default function DemoPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="text-xs font-mono text-[#C9F31D]/70 uppercase tracking-widest mb-3">
              Interactive Demo
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] tracking-tight">
                Live Segmentation
                <span className="text-[#8F9098]"> Engine</span>
              </h1>
              <p className="text-sm text-[#8F9098] max-w-sm">
                Real-time inference with configurable models, modes, and performance monitoring.
              </p>
            </div>
          </div>

          <DemoInterface />
          <DemoCharts />
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
