import React from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { motion } from 'framer-motion';

// ============================================================================
// AnimatedCounter UI Component
// ============================================================================
// An interactive stat card. When scrolled into view, the number smoothly
// counts up. Highly effective for emphasizing backend engineering metrics 
// (e.g. 50+ Microservices).
// ============================================================================

interface StatType {
  value: number;
  suffix?: string;
  label: string;
}

interface Props {
  stat: StatType;
  delay?: number;
}

export const AnimatedCounter: React.FC<Props> = ({ stat, delay = 0 }) => {
  // Hook manages the counting logic via requestAnimationFrame
  const { count, elementRef } = useAnimatedCounter(stat.value, 2000);

  return (
    <motion.div 
      // @ts-ignore
      ref={elementRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '2rem 1.5rem',
        background: 'var(--bg1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
    >
      <div 
        className="stat-value"
        style={{
          fontFamily: 'var(--ff-head)',
          fontSize: '3rem',
          lineHeight: '1',
          color: 'var(--gold)'
        }}
      >
        {count}{stat.suffix}
      </div>
      <div 
        className="stat-label"
        style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'rgba(255, 255, 255, 0.6)'
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
};
