"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
}

export function ParticleField({ count = 120, mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  const isMobile = size.width < 768;
  const particleCount = isMobile ? Math.floor(count * 0.4) : count;

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
      sz[i] = Math.random() * 1.5 + 0.5;

      const brightness = Math.random() * 0.4 + 0.15;
      const isLime = Math.random() < 0.08;
      col[i * 3] = isLime ? 0.788 : brightness;
      col[i * 3 + 1] = isLime ? 0.953 : brightness;
      col[i * 3 + 2] = isLime ? 0.114 : brightness;
    }
    return [pos, sz, col];
  }, [particleCount]);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();

    pointsRef.current.rotation.y = t * 0.015 + mouseX * 0.04;
    pointsRef.current.rotation.x = t * 0.008 + mouseY * 0.02;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < particleCount; i++) {
      const wave = Math.sin(t * 0.3 + i * 0.1) * 0.04;
      posAttr.array[i * 3 + 1] = originalPositions[i * 3 + 1] + wave;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
