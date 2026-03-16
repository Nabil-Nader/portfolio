import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL } from '@/data/constants';

// ============================================================================
// Footer Component
// ============================================================================
// A minimal, single-line footer. It avoids visual clutter while providing
// the necessary outbound links.
// ============================================================================

export const Footer: React.FC = () => {
  return (
    <footer 
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '2rem 5%',
        background: 'var(--bg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      <div 
        style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}
      >
        Designed & Built · {PERSONAL.name} · {PERSONAL.location} · {new Date().getFullYear()}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <SocialLink href={`mailto:${PERSONAL.email}`} icon={<Mail size={20} />} ariaLabel="Email" />
        <SocialLink href={PERSONAL.linkedin} icon={<Linkedin size={20} />} ariaLabel="LinkedIn" />
        <SocialLink href={PERSONAL.github} icon={<Github size={20} />} ariaLabel="GitHub" />
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, ariaLabel }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        color: 'rgba(255, 255, 255, 0.5)',
        transition: 'color 0.2s ease, transform 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--gold)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon}
    </a>
  );
};
