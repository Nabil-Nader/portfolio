import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PERSONAL } from '@/data/constants';

// ============================================================================
// Contact Section
// ============================================================================
// A strong final call to action designed for recruitment or technical
// consultations. Includes micro-interactions on the email button for a
// premium feel.
// ============================================================================

export const Contact: React.FC = () => {
  return (
    <section 
      id="contact"
      style={{
        padding: '8rem 5% 10rem',
        background: 'var(--bg)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <SectionLabel number="05" label="What's Next?" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{ 
            fontFamily: 'var(--ff-head)', 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Get In Touch
          </h2>
          
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Whether you are building the next generation of enterprise fintech 
            or modernizing legacy monoliths, I'm currently 
            {PERSONAL.available ? ' open to senior backend roles and architectural consultations.' : ' focused on my current role, but my inbox is always open.'}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Primary Action */}
            <a 
              href={`mailto:${PERSONAL.email}`}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: 'var(--gold)',
                color: '#000',
                fontFamily: 'var(--ff-head)',
                fontSize: '1.125rem',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-4px)';
                 e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(245, 158, 11, 0.5)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = 'none';
               }}
            >
              <MessageSquare size={20} /> Say Hello
            </a>

            {/* Resume Download */}
            <a 
              href={PERSONAL.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'var(--ff-mono)',
                fontSize: '1rem',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                 e.currentTarget.style.borderColor = '#fff';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
               }}
            >
              Get Resume
            </a>
          </div>

          {/* Minimal Social Links row */}
          <div style={{ 
            marginTop: '4rem', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem' 
          }}>
            <SocialIcon href={PERSONAL.github} icon={<Github />} label="GitHub" />
            <SocialIcon href={PERSONAL.linkedin} icon={<Linkedin />} label="LinkedIn" />
            <SocialIcon href={`mailto:${PERSONAL.email}`} icon={<Mail />} label="Email" />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// Subcomponent for social icons in contact area
interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      color: 'rgba(255, 255, 255, 0.5)',
      padding: '0.75rem',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'inline-flex',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = 'var(--gold)';
      e.currentTarget.style.borderColor = 'var(--gold)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {icon}
  </a>
);
