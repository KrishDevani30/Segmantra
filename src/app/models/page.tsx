import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ModelsContent } from "@/components/sections/ModelsContent";

export default function ModelsPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main>
        <ModelsContent />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
