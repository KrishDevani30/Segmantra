import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BenchmarksContent } from "@/components/sections/BenchmarksContent";

export default function BenchmarksPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main>
        <BenchmarksContent />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
