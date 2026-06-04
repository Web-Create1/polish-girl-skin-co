"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const handler = () => setReduce(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);
  return reduce;
}

/** Drifting motes of warm light — like dust caught in morning sun. */
function Motes({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1.5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.025;
    ref.current.position.y = Math.sin(t * 0.18) * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#dca08f"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** A pearlescent, gently-distorting droplet. */
function Blob({
  position,
  color,
  scale = 1,
  speed = 1,
  distort = 0.35,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.7} floatIntensity={1.3}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.18}
          metalness={0.22}
          envMapIntensity={1.1}
          distort={distort}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function SceneContent({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x;
    const y = state.pointer.y;
    // soft mouse parallax
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.35,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.22,
      0.04
    );
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} />
      <directionalLight position={[-6, -2, -3]} intensity={0.5} color="#d98c82" />

      <group ref={group}>
        {/* glass centrepiece — a serum droplet */}
        <Float speed={reduce ? 0 : 1.1} rotationIntensity={0.5} floatIntensity={1.4}>
          <mesh>
            <sphereGeometry args={[1.25, 64, 64]} />
            <meshPhysicalMaterial
              transmission={1}
              thickness={1.6}
              roughness={0.06}
              ior={1.35}
              iridescence={0.85}
              iridescenceIOR={1.3}
              color="#ffdccf"
              attenuationColor="#f6b6a9"
              attenuationDistance={2.4}
              clearcoat={1}
              clearcoatRoughness={0.12}
              metalness={0}
              envMapIntensity={1.2}
            />
          </mesh>
        </Float>

        <Blob position={[-2.8, 1.2, -1]} color="#efc9c2" scale={0.72} speed={1.2} distort={0.4} />
        <Blob position={[2.9, -0.7, -0.6]} color="#d98c82" scale={0.95} speed={0.9} distort={0.32} />
        <Blob position={[2.2, 1.8, -2.2]} color="#e7c391" scale={0.5} speed={1.4} distort={0.45} />
        <Blob position={[-2.3, -1.5, -1.6]} color="#7d5063" scale={0.62} speed={1.05} distort={0.36} />
        <Blob position={[0.4, -2.2, -1.2]} color="#b9c6a9" scale={0.42} speed={1.3} distort={0.5} />

        <Motes count={reduce ? 90 : 240} />
      </group>

      {/* studio reflections without an external HDRI */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[0, 2.5, 4]} scale={[7, 7, 1]} color="#fff2e8" />
        <Lightformer intensity={1.6} position={[-4, -1, 3]} scale={[4, 4, 1]} color="#efc9c2" />
        <Lightformer intensity={1.2} position={[4, 1, 2]} scale={[3, 5, 1]} color="#e7c391" />
        <Lightformer intensity={1} position={[0, -3, 2]} scale={[6, 3, 1]} color="#d98c82" />
      </Environment>
    </>
  );
}

export default function Scene3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 38 }}
      >
        <SceneContent reduce={reduce} />
      </Canvas>
    </div>
  );
}
