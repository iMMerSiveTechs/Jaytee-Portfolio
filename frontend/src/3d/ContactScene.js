import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ContactScene - Calm, meditative 3D field with slow-moving orbs
 */
export default function ContactScene({ mode, accent, intensity }) {
  const particlesRef = useRef();
  const accentColor = new THREE.Color(accent || '#00f0ff');
  const subtle = intensity === 'subtle';

  const particles = useMemo(() => {
    const count = subtle ? 200 : 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return positions;
  }, [subtle]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  const particleColor = mode === 'light' ? new THREE.Color('#000000') : new THREE.Color('#ffffff');

  return (
    <>
      <ambientLight intensity={mode === 'light' ? 0.7 : 0.25} />
      <pointLight position={[3, 3, 5]} intensity={0.3} color={accentColor} />

      {/* Calm particle drift */}
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
          size={0.04}
          color={particleColor}
          opacity={mode === 'light' ? 0.08 : 0.12}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Slow floating accent orbs */}
      {[[-2, 1, -3], [2.5, -0.5, -4], [0, -1.5, -2]].map((pos, i) => (
        <Float key={i} speed={0.5 + i * 0.15} floatIntensity={0.3} rotationIntensity={0.1}>
          <mesh position={pos} scale={0.15 + i * 0.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              metalness={0.6}
              roughness={0.3}
              opacity={mode === 'light' ? 0.12 : 0.2}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}
