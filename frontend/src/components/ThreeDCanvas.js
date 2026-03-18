import React, { Suspense, lazy, useState, useEffect, createContext, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../contexts/ThemeContext';

// Lazy load 3D scenes for performance
const HeroScene = lazy(() => import('../3d/HeroScene'));
const AmbientScene = lazy(() => import('../3d/AmbientScene'));
const WorkScene = lazy(() => import('../3d/WorkScene'));
const ToolsScene = lazy(() => import('../3d/ToolsScene'));
const ContactScene = lazy(() => import('../3d/ContactScene'));

const SCENE_MAP = {
  hero: HeroScene,
  ambient: AmbientScene,
  work: WorkScene,
  tools: ToolsScene,
  contact: ContactScene,
};

// 3D Intensity context — Off / Subtle / Immersive
const ThreeDContext = createContext({ intensity: 'subtle' });
export const useThreeD = () => useContext(ThreeDContext);

export const ThreeDProvider = ({ children }) => {
  const [intensity, setIntensity] = useState(() => {
    return localStorage.getItem('portfolio-3d-intensity') || 'subtle';
  });

  const set3DIntensity = (val) => {
    setIntensity(val);
    localStorage.setItem('portfolio-3d-intensity', val);
  };

  return (
    <ThreeDContext.Provider value={{ intensity, set3DIntensity }}>
      {children}
    </ThreeDContext.Provider>
  );
};

/**
 * ThreeDCanvas - Main 3D canvas wrapper for progressive 3D experiences
 * @param {string} scene - Scene type: 'hero', 'ambient', 'work', 'tools', 'contact'
 * @param {boolean} enabled - Enable/disable 3D
 */
export const ThreeDCanvas = ({ scene = 'ambient', className = '', style = {}, enabled = true }) => {
  const { mode, accent } = useTheme();
  const { intensity } = useThreeD();
  const [isVisible, setIsVisible] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsVisible(!prefersReducedMotion && webGLSupported && enabled && intensity !== 'off');
  }, [webGLSupported, enabled, intensity]);

  if (!isVisible || !webGLSupported) return null;

  const SceneComponent = SCENE_MAP[scene] || AmbientScene;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ zIndex: 0, ...style }}
      data-testid="three-d-canvas"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          frameloop={intensity === 'subtle' ? 'demand' : 'always'}
        >
          <SceneComponent mode={mode} accent={accent.accent} intensity={intensity} />
        </Canvas>
      </Suspense>
    </div>
  );
};
