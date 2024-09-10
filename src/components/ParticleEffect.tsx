import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleExplosion = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const [positions] = useState(() => {
    const positions = [];
    const numParticles = 1000; // Increase for a more intense effect

    for (let i = 0; i < numParticles; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  });

  // Function to convert HSL to RGB (for smooth rainbow effect)
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // Achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 3) return q;
        if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return new THREE.Color(r, g, b);
  };

  // Animation loop for particles and color cycling
  useFrame((state, delta) => {
    const hue = (state.clock.getElapsedTime() * 0.05) % 1; // Slower and smoother hue cycling
    const color = hslToRgb(hue, 1, 0.5); // Convert HSL to RGB
    if (materialRef.current) {
      materialRef.current.color = color; // Update the particle color smoothly
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.2; // Rotate particles
      particlesRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.1} />
    </points>
  );
};

const ParticleEffect: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Ensure interaction with elements below the canvas
      }}
    >
      <ambientLight />
      <ParticleExplosion />
    </Canvas>
  );
};

export default ParticleEffect;
