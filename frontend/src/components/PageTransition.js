import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition - Wraps page content with enter/exit animations
 * Provides smooth transitions between routes
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // easeOutCubic
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1], // easeInCubic
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
