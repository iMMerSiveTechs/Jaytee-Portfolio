import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Reveal - Viewport-triggered animation component
 * Animates children when they enter the viewport with a fade-up + shimmer effect
 */
export const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  stagger = 0,
  shimmer = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: y }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: y }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // easeOutCubic
      }}
      style={{
        position: 'relative',
      }}
    >
      {shimmer && isVisible && (
        <div
          className="shimmer absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--theme-accent, #00f0ff) 50%, transparent 100%)',
            opacity: 0.3,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

/**
 * RevealStagger - Stagger animation for multiple children
 * Automatically staggers child elements with increasing delays
 */
export const RevealStagger = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  ...revealProps
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <>
      {childArray.map((child, index) => (
        <Reveal
          key={index}
          delay={initialDelay + index * staggerDelay}
          {...revealProps}
        >
          {child}
        </Reveal>
      ))}
    </>
  );
};
