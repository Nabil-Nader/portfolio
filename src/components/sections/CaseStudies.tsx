import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { caseStudies } from '@/data/caseStudies';

// ============================================================================
// CaseStudies Section
// ============================================================================
// Previews major architectural problems solved.
// Cards act as entry points to deeper technical pages (`/case-study/:slug`).
// ============================================================================

export const CaseStudies: React.FC = () => {
  return (
    <section 
      id="work"
      style={{
        padding: '8rem 5%',
        background: 'var(--bg)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionLabel number="04" label="Deep Dives & Case Studies" />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Note: In a real app with HashRouter or BrowserRouter configured in main.tsx 
                  We use <Link to={...}> to maintain SPA state. */}
              <Link 
                to={`/case-study/${study.slug}`} 
                style={{ textDecoration: 'none' }}
                className="case-study-card"
              >
                <div style={{
                  position: 'relative',
                  background: 'var(--bg1)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                  overflow: 'hidden'
                }}>
                  {/* Left Color Accent Line with Glow */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: study.color,
                    boxShadow: `0 0 15px ${study.color}`
                  }} />

                  {/* Metadata Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.875rem', color: study.color }}>
                      {study.companyShort} — {study.period}
                    </div>
                    <ArrowUpRight style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s ease' }} className="study-icon" size={20} />
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ fontFamily: 'var(--ff-head)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', lineHeight: '1.2' }}>
                    {study.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2rem', flex: 1 }}>
                    {study.subtitle}
                  </p>

                  {/* Tag Preview */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {study.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--ff-mono)',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '4px'
                      }}>
                        {tag}
                      </span>
                    ))}
                    {study.tags.length > 3 && (
                      <span style={{
                        fontFamily: 'var(--ff-mono)',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        color: 'rgba(255, 255, 255, 0.3)'
                      }}>
                        +{study.tags.length - 3}
                      </span>
                    )}
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inject custom CSS for hover effects since we are using inline styles mostly */}
      <style>{`
        .case-study-card > div:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: var(--emerald) !important;
          box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
        }
        .case-study-card:hover .study-icon {
          color: var(--emerald) !important;
          transform: translate(4px, -4px) scale(1.1);
        }
      `}</style>
    </section>
  );
};
