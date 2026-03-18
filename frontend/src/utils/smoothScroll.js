import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll - Implements buttery-smooth scroll with Lenis
 * Respects prefers-reduced-motion
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Respect user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis globally for anchor links
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
};

/**
 * scrollToSection - Smooth scroll to a section ID
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element && window.lenis) {
    window.lenis.scrollTo(element, {
      offset: -100,
      duration: 1.5,
    });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
