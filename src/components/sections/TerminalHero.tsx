import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/data/constants';
import { useTerminal } from '@/context/TerminalContext';

// ============================================================================
// TerminalHero Component
// ============================================================================
// Displayed conditionally when `isTerminal` context is true.
// Simulates a command-line interface execution of the user's details.
// Extremely effective at establishing immediate engineering credibility.
// ============================================================================

const COMMANDS = [
  { 
    cmd: '> whoami', 
    out: `  ${PERSONAL.name.toLowerCase().replace(' ', '-')}` 
  },
  { 
    cmd: '> cat summary.txt', 
    out: `  Senior Backend Engineer specializing in Java 21 & Spring Boot.\n  5+ years across FinTech, Retail and Global Insurance.` 
  },
  { 
    cmd: '> cat experience.txt', 
    out: `  [+] Senior Software Engineer @ DXC Technology (Aug 2024 – Present)\n  [+] Backend Developer @ Kazyon (Apr 2023 – Jul 2024)\n  [+] Backend Developer @ KIWE (Jan 2021 – Mar 2023)` 
  },
  { 
    cmd: '> cat tech_stack.txt', 
    out: `  Java 21 | Spring Boot 3.5 | AWS SQS/SNS | Keycloak | JUnit 5 | Microservices` 
  },
  { 
    cmd: '> echo $STATUS', 
    out: `  ${PERSONAL.available ? 'Available for hire / consultations' : 'Currently engaged'}` 
  }
];

export const TerminalHero: React.FC = () => {
  const { toggleTerminal } = useTerminal();
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Progressive reveal effect for the terminal commands
  useEffect(() => {
    if (visibleLines < COMMANDS.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 800); // 800ms delay between command outputs
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <section 
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5%',
        fontFamily: 'var(--ff-mono)',
        color: 'var(--gold)', // Note: This will be #00FF41 due to global CSS overrides in terminal mode
        backgroundColor: '#000'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {/* Terminal Header Info */}
        <div style={{ opacity: 0.5, marginBottom: '2rem', fontSize: '0.875rem' }}>
          Welcome to KiroOS v2.0.26<br />
          System: Backend Engineering Mainframe<br />
          Date: {new Date().toUTCString()}
        </div>

        {/* Command Outputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
          {COMMANDS.slice(0, visibleLines).map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div>{item.cmd}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap' }}>
                {item.out}
              </div>
            </motion.div>
          ))}

          {/* Prompt line with blinking cursor */}
          {visibleLines >= COMMANDS.length && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
            >
              <span>{`> `}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ display: 'inline-block', width: '10px', height: '1.2em', background: 'var(--gold)', marginLeft: '8px' }}
              />
            </motion.div>
          )}
        </div>

        {/* Instructions to exit out of terminal mode */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleLines >= COMMANDS.length ? 0.3 : 0 }}
          transition={{ delay: 1 }}
          style={{ marginTop: '4rem', fontSize: '0.75rem', cursor: 'pointer' }}
          onClick={toggleTerminal}
        >
          [Press 'T' or click here to return to UI mode]
        </motion.div>
      </div>
    </section>
  );
};
