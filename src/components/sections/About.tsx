import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/data/constants';

// ============================================================================
// About Section
// ============================================================================
// Uses the AnimatedCounter to prove impact with numbers, rather than just text.
// ============================================================================

export const About: React.FC = () => {
  return (
    <section 
      id="about"
      style={{
        padding: '8rem 5%',
        background: 'var(--bg)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionLabel number="01" label="About & Metrics" />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem',
          marginTop: '3rem'
        }}>
          {/* Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ 
              fontFamily: 'var(--ff-head)', 
              fontSize: '2rem', 
              color: '#fff',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Self-taught engineer who learns by solving real-world scale problems.
            </h2>
            <div style={{ 
              fontFamily: 'var(--ff-body)', 
              fontSize: '1.125rem', 
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.8',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <p>
                My approach to backend engineering focuses on building resilient, self-healing systems. I specialize in the ecosystem around <strong>Java 21 and Spring Boot</strong>, migrating monolithic legacy apps into clean, decoupled, and event-driven microservices on AWS.
              </p>
              <p>
                From maintaining 0-downtime over Gen-Z flash sales at KIWE, to spearheading enterprise-wide LDAP migrations at Kazyon, my work ensures that the frontend has a bulletproof data layer to rely on.
              </p>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem',
            alignContent: 'start'
          }}>
            {STATS.map((stat, index) => (
              <AnimatedCounter 
                key={index} 
                stat={stat} 
                delay={index * 0.1} // Stagger the counter entrances
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
