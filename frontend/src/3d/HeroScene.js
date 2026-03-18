import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * HeroScene - Immersive 3D particle field with floating geometric shapes
 * For the homepage hero section
 */
export default function HeroScene({ mode, accent, intensity }) {
  const particlesRef = useRef();
  const sphereRef = useRef();

  // Create particle field
  const particles = useMemo(() => {
    const count = intensity === 'subtle' ? 500 : 1000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  // Animate particles
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const accentColor = new THREE.Color(accent || '#00f0ff');
  const particleColor = mode === 'light' ? new THREE.Color('#000000') : new THREE.Color('#ffffff');

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={mode === 'light' ? 0.8 : 0.3} />
      <pointLight position={[10, 10, 10]} intensity={mode === 'light' ? 0.5 : 0.8} color={accentColor} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color={accentColor} />

      {/* Particle field */}
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
          size={0.05}
          color={particleColor}
          opacity={mode === 'light' ? 0.15 : 0.25}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating distorted sphere */}
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Sphere ref={sphereRef} args={[1, 64, 64]} position={[3, 0, -2]} scale={1.5}>
          <MeshDistortMaterial
            color={accentColor}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            opacity={mode === 'light' ? 0.15 : 0.25}
            transparent
          />
        </Sphere>
      </Float>

      {/* Secondary floating geometry */}
      <Float
        speed={2}
        rotationIntensity={0.8}
        floatIntensity={0.3}
      >
        <mesh position={[-3, -1, -3]} scale={0.8}>
          <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.9}
            roughness={0.1}
            opacity={mode === 'light' ? 0.2 : 0.3}
            transparent
          />
        </mesh>
      </Float>
    </>
  );
}
