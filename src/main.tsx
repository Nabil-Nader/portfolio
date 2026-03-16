import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TerminalProvider } from '@/context/TerminalContext';

// Import Pages
import { Home } from '@/pages/Home';
import { CaseStudyPage } from '@/pages/CaseStudyPage';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import './index.css';

// ============================================================================
// Main Application Entry
// ============================================================================
// Wraps the entire application in the TerminalProvider so all components
// can access the `isTerminal` state and react appropriately.
// Sets up simple client-side routing.
// ============================================================================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TerminalProvider>
        <BackgroundEffects />
        <Routes>
          {/* Main Portfolio Layout */}
          <Route path="/" element={<Home />} />
          
          {/* Deep Dive Case Studies */}
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        </Routes>
      </TerminalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
