import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AmbientScene - Subtle 3D ambient layer for all pages
 * Provides consistent depth and immersion without distraction
 */
export default function AmbientScene({ mode, accent }) {
  const meshRef = useRef();
  const particlesRef = useRef();

  // Create subtle particle grid
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    
    return positions;
  }, []);

  // Gentle animation
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const accentColor = new THREE.Color(accent || '#00f0ff');
  const particleColor = mode === 'light' ? new THREE.Color('#000000') : new THREE.Color('#ffffff');

  return (
    <>
      {/* Subtle ambient light */}
      <ambientLight intensity={mode === 'light' ? 0.6 : 0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color={accentColor} />

      {/* Ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={particleColor}
          opacity={mode === 'light' ? 0.08 : 0.15}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating wire cube */}
      <mesh ref={meshRef} position={[0, 0, -4]} scale={0.8}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          opacity={mode === 'light' ? 0.1 : 0.15}
          transparent
        />
      </mesh>
    </>
  );
}
