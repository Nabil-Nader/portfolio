import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

// ============================================================================
// ScrollProgress Component
// ============================================================================
// A thin, elegant progress bar fixed to the extremely top edge of the viewport.
// It tracks how far down the user has scrolled, reinforcing the 'precise' and
// 'data-driven' aesthetic of a backend engineer.
// ============================================================================

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll(); // Framer Motion hook to track scroll %
  const [isVisible, setIsVisible] = useState(false);

  // Small UX detail: only show the progress bar after the user starts scrolling
  // so it doesn't distract from the Hero section initially.
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.05);
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px', // Ultra thin for premium feel
        background: 'var(--gold)',
        transformOrigin: '0%', // Grow from left to right
        scaleX: scrollYProgress, // Bond width directly to scroll %
        zIndex: 100, // Always on absolute top
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};
