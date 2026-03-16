import React from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '@/context/TerminalContext';

// ============================================================================
// SectionLabel Component
// ============================================================================
// A consistent typography component to introduce new sections on the page.
// In normal mode, it provides an elegant gold line and JetBrains Mono tag.
// In terminal mode, it renders a cli-style prompt `[nabil@portfolio] ~ % section`.
// ============================================================================

interface Props {
  number?: string;
  label: string;
}

export const SectionLabel: React.FC<Props> = ({ number, label }) => {
  const { isTerminal } = useTerminal();

  // Terminal mode rendering
  if (isTerminal) {
    return (
      <div style={{ marginBottom: '2rem', fontFamily: 'var(--ff-mono)', color: 'var(--gold)' }}>
        <span style={{ opacity: 0.5 }}>[nabil@portfolio] ~ %</span> cat {label.toLowerCase().replace(/\s+/g, '_')}.txt
      </div>
    );
  }

  // Modern Portfolio rendering
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        fontFamily: 'var(--ff-mono)',
        fontSize: '0.875rem',
        color: 'var(--gold)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}
    >
      {/* Decorative Line Accelerator */}
      <span 
        style={{
          display: 'block',
          width: '40px',
          height: '2px',
          background: 'var(--gold)',
          opacity: 0.5
        }}
      />
      
      {/* Label Text */}
      <span>
        {number && <span style={{ opacity: 0.5, marginRight: '0.5rem' }}>{number}.</span>}
        {label}
      </span>
    </motion.div>
  );
};
