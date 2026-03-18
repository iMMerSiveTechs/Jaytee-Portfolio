import React, { useEffect, useRef, useState, useCallback } from 'react';

const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-interactive]';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mq.matches);
    const handler = (e) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onMouseMove = useCallback((e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    if (!visible) setVisible(true);
  }, [visible]);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  // Hover detection via event delegation
  const onMouseOver = useCallback((e) => {
    const target = e.target;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setHovering(true);
    }
  }, []);

  const onMouseOut = useCallback((e) => {
    const target = e.relatedTarget;
    if (!target || !target.closest || !target.closest(INTERACTIVE_SELECTORS)) {
      setHovering(false);
    }
  }, []);

  // Animation loop — dot snaps, ring lerps behind
  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      // Dot snaps to mouse
      dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;

      // Ring lerps toward mouse for fluid trailing
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${hovering ? 1.5 : 1})`;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice, hovering]);

  // Attach global listeners
  useEffect(() => {
    if (isTouchDevice) return;

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'custom-cursor-global';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.body.style.cursor = '';
      const el = document.getElementById('custom-cursor-global');
      if (el) el.remove();
    };
  }, [isTouchDevice, onMouseMove, onMouseOver, onMouseOut, onMouseLeave, onMouseEnter]);

  // Don't render on touch devices or when reduced motion is preferred
  if (isTouchDevice) return null;

  const opacity = visible ? 1 : 0;

  return (
    <>
      {/* Dot — small, solid, snaps to position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '4px' : '8px',
          height: hovering ? '4px' : '8px',
          borderRadius: '50%',
          background: 'var(--theme-accent, #00f0ff)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity,
          transition: 'width 200ms ease, height 200ms ease, opacity 200ms ease',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Ring — larger, trails behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: hovering
            ? '1.5px solid var(--theme-accent, #00f0ff)'
            : '1.5px solid var(--theme-text-subtle, rgba(255,255,255,0.35))',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: opacity * (hovering ? 0.9 : 0.5),
          transition: 'border-color 200ms ease, opacity 200ms ease',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
}
