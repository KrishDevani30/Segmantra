"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralSphereProps {
  mouseX?: number;
  mouseY?: number;
}

export function NeuralSphere({ mouseX = 0, mouseY = 0 }: NeuralSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Generate random node positions on sphere surface
  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.05;
      positions.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08 + mouseX * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.12 + mouseY * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.06 - mouseX * 0.15;
      wireRef.current.rotation.x = Math.sin(t * 0.04) * 0.1 - mouseY * 0.1;
    }
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y = t * 0.1 + mouseX * 0.25;
      nodesGroupRef.current.rotation.x = mouseY * 0.15;
    }
  });

  return (
    <group>
      {/* Core matte sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1a1a20"
          roughness={0.9}
          metalness={0.1}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.01, 20, 20]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Secondary wireframe (denser) */}
      <mesh rotation={[0.3, 0.5, 0]}>
        <sphereGeometry args={[1.015, 32, 32]} />
        <meshBasicMaterial
          color="#C9F31D"
          wireframe
          transparent
          opacity={0.015}
        />
      </mesh>

      {/* Nodes */}
      <group ref={nodesGroupRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial
              color={i % 5 === 0 ? "#C9F31D" : "#ffffff"}
              transparent
              opacity={i % 5 === 0 ? 0.7 : 0.25}
            />
          </mesh>
        ))}
      </group>

      {/* Outer atmospheric ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.003, 16, 100]} />
        <meshBasicMaterial color="#C9F31D" transparent opacity={0.12} />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[1.25, 0.002, 16, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}
