import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/caseStudies';
import { Footer } from '@/components/layout/Footer';

// ============================================================================
// CaseStudyPage
// ============================================================================
// A deep dive template for specific engineering problems.
// Dynamically renders content based on the :slug URL parameter.
// Uses a 3-tab layout (Problem, Approach, Outcomes) to structure the data.
// ============================================================================

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // In a real app, you might want to show a 404 component here instead
  const study = caseStudies.find(c => c.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Tab State
  const [activeTab, setActiveTab] = React.useState<'problem' | 'approach' | 'outcomes'>('problem');

  if (!study) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <h1>404 - Case Study Not Found</h1>
        <Link to="/" style={{ color: 'var(--gold)', marginTop: '1rem' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top minimal nav */}
      <nav style={{ padding: '2rem 5%', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'rgba(255,255,255,0.6)', 
            textDecoration: 'none',
            fontFamily: 'var(--ff-mono)',
            fontSize: '0.875rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 5%', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ 
            fontFamily: 'var(--ff-mono)', 
            color: study.color, // Branding color of the company
            marginBottom: '1rem',
            fontSize: '0.875rem'
           }}>
            {study.company} • {study.period}
          </div>
          <h1 style={{ 
            fontFamily: 'var(--ff-head)', 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            color: '#fff',
            lineHeight: '1.2',
            marginBottom: '1.5rem'
          }}>
            {study.title}
          </h1>
          <p style={{
            fontFamily: 'var(--ff-body)',
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.6'
          }}>
            {study.subtitle}
          </p>
        </motion.div>

        {/* Custom Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid rgba(255,255,255,0.1)', 
          marginBottom: '3rem',
          fontFamily: 'var(--ff-mono)',
          overflowX: 'auto',
          scrollbarWidth: 'none' // Hide scrollbar for neatness
        }}>
          {['problem', 'approach', 'outcomes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                position: 'relative',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                letterSpacing: '0.05em'
              }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="tab-indicator"
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: study.color
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab} // Forces re-render animation when tab changes
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ minHeight: '400px' }}
        >
          {/* PROBLEM TAB */}
          {activeTab === 'problem' && (
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', lineHeight: '1.8' }}>
              {study.problem.split('\n').map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* APPROACH TAB */}
          {activeTab === 'approach' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {study.approach.map((step, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'var(--bg1)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '2rem',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: study.color }} />
                  <div style={{ fontFamily: 'var(--ff-mono)', color: study.color, fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    PHASE 0{step.step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--ff-head)', color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    {step.description}
                  </p>
                  
                  {/* Tools used in this specific step */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {step.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', padding: '0.2rem 0.5rem',
                        background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.5)', borderRadius: '4px'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* OUTCOMES TAB */}
          {activeTab === 'outcomes' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {study.outcomes.map((outcome, index) => (
                <div key={index} style={{
                  background: 'var(--bg1)',
                  padding: '2rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{ fontFamily: 'var(--ff-head)', fontSize: '2.5rem', color: outcome.positive ? 'var(--emerald)' : study.color, lineHeight: 1 }}>
                    {outcome.value}
                  </div>
                  <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.875rem', color: '#fff', textTransform: 'uppercase' }}>
                    {outcome.metric}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: 'auto', paddingTop: '1rem' }}>
                    {outcome.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};
