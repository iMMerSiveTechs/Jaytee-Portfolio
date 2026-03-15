import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../contexts/ThemeContext';

// Lazy load 3D scenes for performance
const HeroScene = lazy(() => import('../3d/HeroScene'));
const AmbientScene = lazy(() => import('../3d/AmbientScene'));

/**
 * ThreeDCanvas - Main 3D canvas wrapper for progressive 3D experiences
 * @param {string} scene - Scene type: 'hero', 'ambient', 'project', 'tools'
 * @param {boolean} enabled - Enable/disable 3D (for reduced motion)
 */
export const ThreeDCanvas = ({ scene = 'ambient', className = '', style = {}, enabled = true }) => {
  const { mode, accent } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && webGLSupported && enabled) {
      setIsVisible(true);
    }
  }, [webGLSupported, enabled]);

  if (!isVisible || !webGLSupported) {
    return null; // Fallback to 2D experience
  }

  const SceneComponent = scene === 'hero' ? HeroScene : AmbientScene;

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, ...style }}
      data-testid="three-d-canvas"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <SceneComponent mode={mode} accent={accent.accent} />
        </Canvas>
      </Suspense>
    </div>
  );
};
