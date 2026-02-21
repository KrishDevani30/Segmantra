import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SegmentOS — AI Computer Vision Segmentation Engine",
  description:
    "Semantic, Instance, and Panoptic segmentation at 38 FPS with 92% mAP. Enterprise-grade AI vision platform for production environments.",
  keywords: ["computer vision", "segmentation", "AI", "deep learning", "real-time inference"],
  openGraph: {
    title: "SegmentOS — AI Segmentation Engine",
    description: "Real-time AI computer vision segmentation platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
