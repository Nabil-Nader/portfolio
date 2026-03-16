import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { skillCategories } from '@/data/skills';

// ============================================================================
// TechStack Section
// ============================================================================
// Presents skills not as a wall of text, but as a filterable, interactive grid.
// Proficiency is visualized as a progress bar to establish immediate technical
// credibility. Uses AnimatePresence for smooth layout shifts during category
// filtering.
// ============================================================================

// Helper to determine the width and color of the proficiency bar
const getSkillData = (level: string) => {
  switch (level.toLowerCase()) {
    case 'expert':
      return { width: '90%', color: 'var(--gold)', text: 'Expert' };
    case 'proficient':
      return { width: '70%', color: 'var(--emerald)', text: 'Proficient' };
    case 'familiar':
      return { width: '40%', color: 'var(--sky)', text: 'Familiar' };
    default:
      return { width: '50%', color: '#fff', text: level };
  }
};

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Compute the skills to display based on the selected tab
  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      // Flatten all skills and remove duplicates by name
      const all = skillCategories.flatMap(c => c.skills);
      const unique = Array.from(new Map(all.map(s => [s.name, s])).values());
      // Sort strictly by proficiency (expert first) to show best foot forward
      return unique.sort((a, b) => {
        const order: Record<string, number> = { expert: 1, proficient: 2, familiar: 3 };
        return (order[a.level.toLowerCase()] || 4) - (order[b.level.toLowerCase()] || 4);
      });
    }
    return skillCategories.find(c => c.id === activeTab)?.skills || [];
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section 
      id="stack"
      style={{
        padding: '8rem 5%',
        background: 'var(--bg1)', // Alternating background color
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionLabel number="02" label="Technical Arsenal" />

        {/* Category Filters */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap', 
            marginBottom: '3rem',
            marginTop: '3rem' 
          }}
        >
          <FilterButton 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Skills
          </FilterButton>

          {skillCategories.map(cat => (
            <FilterButton 
              key={cat.id} 
              active={activeTab === cat.id} 
              onClick={() => setActiveTab(cat.id)}
            >
              <span style={{ marginRight: '0.5rem' }}>{cat.icon}</span>
              {cat.label}
            </FilterButton>
          ))}
        </div>

        {/* Smooth Auto-Height Container for Grid */}
        <motion.div layout>
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
            }}
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill) => {
                const data = getSkillData(skill.level);
                return (
                  <motion.div
                    key={skill.name}
                    layout // Required for smooth re-ordering during filtering
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'var(--bg)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--ff-head)', fontWeight: 600, color: '#fff' }}>
                        {skill.name}
                      </span>
                      <span style={{ 
                        fontFamily: 'var(--ff-mono)', 
                        fontSize: '0.75rem', 
                        color: data.color,
                        padding: '0.25rem 0.5rem',
                        background: `${data.color}15`, // Adding 15 hex (approx 8% opacity)
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {data.text}
                      </span>
                    </div>

                    {/* Minimalist Progress Bar */}
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: data.width }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        style={{ height: '100%', background: data.color, borderRadius: '2px' }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Internal Subcomponent for Filter Tabs
interface FilterBtnProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterBtnProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.5rem 1.25rem',
      background: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      border: active ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
      color: active ? '#fff' : 'rgba(255, 255, 255, 0.6)',
      borderRadius: '100px',
      fontFamily: 'var(--ff-mono)',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      }
    }}
  >
    {children}
  </button>
);
