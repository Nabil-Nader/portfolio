import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// BackgroundEffects Component
// ============================================================================
// Provides a vibrant, modern 2026 feel with slow-moving glowing orbs.
// Relies heavily on Framer Motion for smooth, continuous physics-based movement
// and CSS for deep blurs (glassmorphism base).
// ============================================================================

export const BackgroundEffects: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      background: 'var(--bg)',
      pointerEvents: 'none'
    }}>
      {/* Deep Space Grid Overlay for structure */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
      }} />

      {/* Primary Accent Orb (Gold/Amber) */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, var(--orb-1) 0%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: 0.6,
          borderRadius: '50%'
        }}
      />

      {/* Secondary Accent Orb (Purple/Pink to make it pop) */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, var(--orb-2) 0%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: 0.4,
          borderRadius: '50%'
        }}
      />

      {/* Central Blue/Cyan glow for deep contrast */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, var(--orb-3) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.3,
          borderRadius: '50%'
        }}
      />
    </div>
  );
};
