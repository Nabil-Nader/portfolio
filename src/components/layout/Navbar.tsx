import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL } from '@/data/constants';
import { useTerminal } from '@/context/TerminalContext';

// ============================================================================
// Navbar Component
// ============================================================================
// Features: 
// - Smooth glassmorphism backing (`backdrop-filter`)
// - Active state tracking based on scroll position
// - Terminal Mode toggle button
// - Mobile responsive hamburger menu
// ============================================================================

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isTerminal, toggleTerminal } = useTerminal();

  // Handle scroll events to add background blur & track active section
  useEffect(() => {
    const handleScroll = () => {
      // Toggle glassmorphism background when scrolled past top
      setIsScrolled(window.scrollY > 50);

      // Track active section for highlight
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset by 150px to trigger slightly before the section hits top
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.25rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // Glassmorphism effect:
        background: isScrolled ? 'rgba(7, 9, 15, 0.7)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Brand / Logo */}
      <a 
        href="#" 
        style={{ 
          fontFamily: 'var(--ff-head)', 
          fontSize: '1.25rem', 
          color: 'var(--gold)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '32px', 
          height: '32px', 
          border: '1px solid var(--gold)',
          borderRadius: '4px'
        }}>
          NN
        </span>
        <span className="hide-mobile" style={{ color: '#fff', fontSize: '1rem' }}>
          {PERSONAL.name}
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <div className="nav-links hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '0.875rem',
              color: activeSection === link.href.substring(1) ? 'var(--gold)' : 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={(e) => e.currentTarget.style.color = activeSection === link.href.substring(1) ? 'var(--gold)' : 'rgba(255, 255, 255, 0.6)'}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Controls: Terminal Toggle & Availability Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {PERSONAL.available && (
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--emerald)',
                boxShadow: '0 0 10px var(--emerald)',
                animation: 'pulse 2s infinite'
              }}
            />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--emerald)' }}>
              AVAILABLE
            </span>
          </div>
        )}

        {/* Terminal Toggle Button */}
        <button
          onClick={toggleTerminal}
          aria-label="Toggle Terminal Mode"
          title="Terminal Mode (Press T)"
          style={{
            background: isTerminal ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            border: isTerminal ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: isTerminal ? 'var(--gold)' : 'rgba(255, 255, 255, 0.7)',
            padding: '0.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!isTerminal) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={(e) => {
            if (!isTerminal) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }
          }}
        >
          <Terminal size={18} />
        </button>

        {/* Mobile Hamburger */}
        <button 
          className="show-mobile"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '1rem 5%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              overflow: 'hidden'
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--ff-mono)',
                  fontSize: '1rem',
                  color: '#fff',
                  textDecoration: 'none'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
