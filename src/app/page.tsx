import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SegmentationTypes } from "@/components/sections/SegmentationTypes";
import { FeatureSections } from "@/components/sections/FeatureSections";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
    return (
        <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main>
                <HeroSection />
                <StatsSection />
                <SegmentationTypes />
                <FeatureSections />
                <CTASection />
            </main>
            <Footer />
        </SmoothScroll>
    );
}
