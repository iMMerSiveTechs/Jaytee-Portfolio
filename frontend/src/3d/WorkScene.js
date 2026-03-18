import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * WorkScene - Floating interconnected nodes representing system architecture
 */
export default function WorkScene({ mode, accent, intensity }) {
  const groupRef = useRef();
  const accentColor = new THREE.Color(accent || '#00f0ff');
  const subtle = intensity === 'subtle';

  const nodes = useMemo(() => [
    { pos: [-3, 1.5, -2], scale: 0.3 },
    { pos: [2, 2, -3], scale: 0.25 },
    { pos: [-1, -1.5, -1], scale: 0.35 },
    { pos: [3, -1, -2], scale: 0.2 },
    { pos: [0, 0.5, -4], scale: 0.28 },
    { pos: [-2.5, -0.5, -3], scale: 0.22 },
  ], []);

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i].pos).distanceTo(new THREE.Vector3(...nodes[j].pos));
        if (dist < 5) {
          const pts = [new THREE.Vector3(...nodes[i].pos), new THREE.Vector3(...nodes[j].pos)];
          lines.push(new THREE.BufferGeometry().setFromPoints(pts));
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  const nodeOpacity = mode === 'light' ? 0.2 : 0.35;
  const lineOpacity = mode === 'light' ? 0.06 : 0.1;

  return (
    <>
      <ambientLight intensity={mode === 'light' ? 0.6 : 0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={accentColor} />

      <group ref={groupRef}>
        {nodes.map((node, i) => (
          <Float key={i} speed={1 + i * 0.2} floatIntensity={subtle ? 0.2 : 0.4} rotationIntensity={0.3}>
            <mesh position={node.pos} scale={node.scale}>
              <icosahedronGeometry args={[1, 1]} />
              <meshStandardMaterial
                color={accentColor}
                metalness={0.8}
                roughness={0.2}
                opacity={nodeOpacity}
                transparent
                wireframe
              />
            </mesh>
          </Float>
        ))}

        {connections.map((geo, i) => (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color={accentColor} opacity={lineOpacity} transparent />
          </line>
        ))}
      </group>
    </>
  );
}
