import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, ChevronDown } from 'lucide-react';
import { PERSONAL, ROLES } from '@/data/constants';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useTerminal } from '@/context/TerminalContext';
import { TerminalHero } from '@/components/sections/TerminalHero';

// ============================================================================
// Hero Section
// ============================================================================
// The majestic entrance of the portfolio. 
// Features:
// 1. Mouse-tracking radial gradient glow effect
// 2. Animated typewriter for role titles
// 3. Staggered Framer Motion entrance
// ============================================================================

// Framer Motion Variants for staggered entrance with spring physics
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring" as any, 
      stiffness: 100, 
      damping: 15,
      mass: 1 
    } 
  }
};

export const Hero: React.FC = () => {
  const { isTerminal } = useTerminal();
  const currentRole = useTypewriter(ROLES, 80, 50, 2500);
  
  // Interactive Cursor Tracking State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // If globally toggled, render the raw CLI experience instead.
  if (isTerminal) {
    return <TerminalHero />;
  }

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5%',
        overflow: 'hidden' // contain the glow
      }}
    >
      {/* 1. Dynamic Cursor Glow Effect (Vibrant Version) */}
      <div 
        className="cursor-glow"
        style={{
          position: 'fixed',
          top: mousePosition.y - 400,
          left: mousePosition.x - 400,
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* 2. Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}
      >
        {/* Availability Badge */}
        {PERSONAL.available && (
          <motion.div 
            variants={itemVariants as any}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '100px',
              marginBottom: '2rem'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald)' }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Available for hire
            </span>
          </motion.div>
        )}

        {/* Huge Name Header */}
        <motion.h1 
          variants={itemVariants as any}
          style={{
            fontFamily: 'var(--ff-head)',
            fontSize: 'clamp(3rem, 8vw, 6rem)', // Responsive scaling
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0',
            color: '#ffffff'
          }}
        >
          {PERSONAL.name.toUpperCase()}
        </motion.h1>

        {/* Animated Typewriter Role */}
        <motion.p 
          variants={itemVariants as any}
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            color: 'var(--gold)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          {currentRole}
          {/* Blinking fake cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ width: '12px', height: '1.2em', background: 'var(--gold)', display: 'inline-block' }}
          />
        </motion.p>

        {/* Tech Stack Highlights */}
        <motion.p 
          variants={itemVariants as any}
          style={{
            fontFamily: 'var(--ff-mono)',
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}
        >
          Java 21 · Spring Boot 3.5 · Microservices · Event-Driven Architecture · AWS Cloud
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          variants={itemVariants as any}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
        >
          {/* Primary Button: View Work */}
          <a 
            href="#work"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'var(--gold)',
               color: '#000',
               fontFamily: 'var(--ff-head)',
               fontSize: '1.125rem',
               fontWeight: 700,
               textDecoration: 'none',
               borderRadius: '4px',
               boxShadow: '0 0 20px rgba(255, 184, 0, 0.3)',
               transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
               e.currentTarget.style.background = '#FFC833';
               e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 184, 0, 0.6)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0) scale(1)';
               e.currentTarget.style.background = 'var(--gold)';
               e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 184, 0, 0.3)';
             }}
          >
            Explore Work <ArrowRight size={18} />
          </a>

          {/* Secondary Button: Download CV */}
          <a 
            href={PERSONAL.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'var(--ff-mono)',
              fontSize: '0.875rem',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 0 rgba(0, 240, 255, 0)'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
               e.currentTarget.style.borderColor = 'var(--emerald)';
               e.currentTarget.style.color = 'var(--emerald)';
               e.currentTarget.style.transform = 'translateY(-4px)';
               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 240, 255, 0.2)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.background = 'transparent';
               e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
               e.currentTarget.style.color = '#fff';
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = 'none';
             }}
          >
            Download CV <Download size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* 3. Scroll Indicator Arrow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.3)',
          zIndex: 10
        }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};
