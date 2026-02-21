"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GeometryItem {
  type: "box" | "torus" | "octahedron" | "tetrahedron";
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  opacity: number;
}

const geometries: GeometryItem[] = [
  { type: "box", position: [-5, 2, -8], rotation: [0.2, 0.5, 0.1], scale: 0.8, speed: 0.3, opacity: 0.06 },
  { type: "torus", position: [5, -3, -10], rotation: [0.8, 0.2, 0], scale: 1.2, speed: 0.2, opacity: 0.05 },
  { type: "octahedron", position: [3, 4, -6], rotation: [0, 0.3, 0.2], scale: 0.6, speed: 0.4, opacity: 0.07 },
  { type: "box", position: [-4, -4, -9], rotation: [0.5, 0.1, 0.3], scale: 0.5, speed: 0.25, opacity: 0.04 },
  { type: "torus", position: [6, 1, -12], rotation: [0.3, 0, 0.8], scale: 0.9, speed: 0.15, opacity: 0.04 },
  { type: "octahedron", position: [-6, 3, -7], rotation: [0.1, 0.6, 0], scale: 0.7, speed: 0.35, opacity: 0.05 },
  { type: "tetrahedron", position: [1, -5, -8], rotation: [0, 0.4, 0.2], scale: 0.6, speed: 0.28, opacity: 0.06 },
  { type: "box", position: [-2, 5, -11], rotation: [0.3, 0.3, 0.3], scale: 0.4, speed: 0.22, opacity: 0.04 },
];

function FloatingObject({ item, scrollY }: { item: GeometryItem; scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = item.rotation[0] + t * item.speed * 0.5;
    meshRef.current.rotation.y = item.rotation[1] + t * item.speed;
    meshRef.current.rotation.z = item.rotation[2] + t * item.speed * 0.3;
    meshRef.current.position.y = item.position[1] + Math.sin(t * 0.4 + item.position[0]) * 0.3;
    meshRef.current.position.z = item.position[2] - scrollY * 0.008;
  });

  const mat = (
    <meshBasicMaterial
      color={item.type === "torus" ? "#C9F31D" : "#ffffff"}
      wireframe
      transparent
      opacity={item.opacity}
    />
  );

  return (
    <mesh ref={meshRef} position={item.position} scale={item.scale}>
      {item.type === "box" && <boxGeometry args={[1, 1, 1]} />}
      {item.type === "torus" && <torusGeometry args={[1, 0.3, 8, 24]} />}
      {item.type === "octahedron" && <octahedronGeometry args={[1]} />}
      {item.type === "tetrahedron" && <tetrahedronGeometry args={[1]} />}
      {mat}
    </mesh>
  );
}

export function FloatingGeometry({ scrollY = 0 }: { scrollY?: number }) {
  return (
    <group>
      {geometries.map((item, i) => (
        <FloatingObject key={i} item={item} scrollY={scrollY} />
      ))}
    </group>
  );
}
