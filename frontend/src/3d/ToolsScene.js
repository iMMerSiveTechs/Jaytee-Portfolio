import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ToolsScene - Reactive grid with pulsing nodes ("lab chamber" aesthetic)
 */
export default function ToolsScene({ mode, accent, intensity }) {
  const gridRef = useRef();
  const pulseRef = useRef();
  const accentColor = new THREE.Color(accent || '#00f0ff');
  const subtle = intensity === 'subtle';

  // Grid of points
  const gridPoints = useMemo(() => {
    const count = subtle ? 400 : 800;
    const positions = new Float32Array(count * 3);
    const cols = Math.floor(Math.sqrt(count));
    const spacing = 0.6;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      positions[i * 3] = (col - cols / 2) * spacing;
      positions[i * 3 + 1] = (row - cols / 2) * spacing;
      positions[i * 3 + 2] = -3;
    }

    return positions;
  }, [subtle]);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const positions = gridRef.current.geometry.attributes.position.array;
      const t = clock.getElapsedTime();
      const cols = Math.floor(Math.sqrt(positions.length / 3));

      for (let i = 0; i < positions.length / 3; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions[i * 3 + 2] = -3 + Math.sin(col * 0.3 + t * 0.5) * Math.cos(row * 0.3 + t * 0.4) * 0.5;
      }
      gridRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (pulseRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
      pulseRef.current.scale.set(s, s, s);
    }
  });

  const pointOpacity = mode === 'light' ? 0.12 : 0.2;

  return (
    <>
      <ambientLight intensity={mode === 'light' ? 0.5 : 0.15} />
      <pointLight position={[0, 0, 3]} intensity={0.6} color={accentColor} distance={10} />

      {/* Reactive grid */}
      <points ref={gridRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gridPoints.length / 3}
            array={gridPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={accentColor}
          opacity={pointOpacity}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central pulse ring */}
      <mesh ref={pulseRef} position={[0, 0, -2]}>
        <ringGeometry args={[1.2, 1.3, 64]} />
        <meshBasicMaterial
          color={accentColor}
          opacity={mode === 'light' ? 0.08 : 0.15}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
