import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { experiences } from '@/data/experience';

// ============================================================================
// Experience Section
// ============================================================================
// A vertical timeline displaying career history.
// Clicking an entry expands it smoothly using Framer Motion to reveal
// bullet points and detailed technical stack tags.
// ============================================================================

export const Experience: React.FC = () => {
  // Track which timeline item is expanded
  const [expandedId, setExpandedId] = useState<string>(experiences[0].id);

  return (
    <section 
      id="experience"
      style={{
        padding: '8rem 5%',
        background: 'var(--bg)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SectionLabel number="03" label="Engineering Experience" />

        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            
            return (
              <div key={exp.id} style={{ display: 'flex', gap: '1.5rem' }}>
                
                {/* 1. Timeline Graphic (Left side) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Circle */}
                  <div 
                    style={{ 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      border: `2px solid ${exp.color}`,
                      background: isExpanded ? exp.color : 'var(--bg)',
                      transition: 'background 0.3s ease',
                      marginTop: '0.25rem',
                      zIndex: 2
                    }} 
                  />
                  {/* Connecting Line */}
                  <div 
                    style={{
                      width: '2px',
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.1)',
                      marginTop: '0.5rem',
                      marginBottom: '-1.5rem' // Connect to next item
                    }}
                  />
                </div>

                {/* 2. Content Card (Right side) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  style={{ 
                    flex: 1, 
                    background: 'var(--bg1)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}
                  onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `rgba(255,255,255,0.15)`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.05)`}
                >
                  {/* Card Header (Always Visible) */}
                  <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ 
                        fontFamily: 'var(--ff-mono)', 
                        fontSize: '0.875rem', 
                        color: exp.color,
                        marginBottom: '0.5rem'
                      }}>
                        {exp.period}
                      </div>
                      <h3 style={{ 
                        fontFamily: 'var(--ff-head)', 
                        fontSize: '1.25rem', 
                        color: '#fff', 
                        marginBottom: '0.25rem' 
                      }}>
                        {exp.role} <span style={{ opacity: 0.5 }}>@</span> {exp.company}
                      </h3>
                      <div style={{ 
                        fontFamily: 'var(--ff-body)', 
                        fontSize: '0.9rem', 
                        color: 'rgba(255, 255, 255, 0.5)' 
                      }}>
                        {exp.domain}
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>

                  {/* High-Level Metrics (Always visible to tease impact) */}
                  {!isExpanded && exp.metrics && (
                    <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {exp.metrics.slice(0, 3).map((m, i) => (
                        <div key={i} style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.5rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)' }}>
                          <span style={{ color: '#fff', fontWeight: 600 }}>{m.value}</span> {m.label}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Content (Bullets & Tags) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1.5rem' }}>
                          
                          {/* Bullet Points */}
                          <ul style={{ 
                            listStyle: 'none', 
                            padding: 0, 
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                          }}>
                            {exp.bullets.map((bullet, i) => (
                              <li key={i} style={{ 
                                display: 'flex', 
                                gap: '1rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                lineHeight: '1.6',
                                fontSize: '0.95rem'
                              }}>
                                <span style={{ color: exp.color, marginTop: '2px' }}>▹</span>
                                <span dangerouslySetInnerHTML={{ __html: bullet }} />
                              </li>
                            ))}
                          </ul>

                          {/* Tech Stack Tags specific to this role */}
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '0.5rem',
                            marginTop: '2rem'
                          }}>
                            {exp.tags.map(tag => (
                              <span key={tag} style={{
                                fontFamily: 'var(--ff-mono)',
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.75rem',
                                background: `${exp.color}15`,
                                color: exp.color,
                                borderRadius: '100px'
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
