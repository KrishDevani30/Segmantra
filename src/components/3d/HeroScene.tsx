"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, AdaptiveDpr } from "@react-three/drei";
import { NeuralSphere } from "./NeuralSphere";
import { ParticleField } from "./ParticleField";
import { FloatingGeometry } from "./FloatingGeometry";

interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
  scrollY?: number;
}

export function HeroScene({ mouseX = 0, mouseY = 0, scrollY = 0 }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      style={{ background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 4, 2]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-3, -2, -2]} intensity={0.15} color="#C9F31D" />
        <pointLight position={[0, 0, 3]} intensity={0.3} color="#C9F31D" />

        <NeuralSphere mouseX={mouseX} mouseY={mouseY} />
        <ParticleField count={120} mouseX={mouseX} mouseY={mouseY} />
        <FloatingGeometry scrollY={scrollY} />
      </Suspense>
    </Canvas>
  );
}
