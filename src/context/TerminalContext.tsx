import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// Terminal Context (2026 Modern Portfolio Standard)
// ============================================================================
// This context manages a global "Terminal Mode" toggle that transforms the
// sophisticated UI into a raw, backend-focused CLI appearance.
// It persists the user's preference in localStorage and handles a global
// keyboard listener (pressing 'T') to quickly toggle the mode.
// ============================================================================

interface TerminalContextType {
  isTerminal: boolean;    /** Current state of Terminal Mode */
  toggleTerminal: () => void; /** Function to flip the state */
}

// 1. Create the React Context
const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

// 2. Create the Provider Component
export function TerminalProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage, defaulting to false
  const [isTerminal, setIsTerminal] = useState<boolean>(() => {
    // Wrap in try-catch to prevent SSR/hydration issues if scaled to Next.js later
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('kiro-terminal-mode');
        return saved === 'true';
      }
    } catch {
      return false;
    }
    return false;
  });

  // 3. Side-effect: When state changes, persist to storage and update DOM classes
  useEffect(() => {
    localStorage.setItem('kiro-terminal-mode', isTerminal.toString());
    
    // Add/remove a global class on the <html> element to apply terminal CSS variables
    if (isTerminal) {
      document.documentElement.classList.add('terminal-mode');
    } else {
      document.documentElement.classList.remove('terminal-mode');
    }
  }, [isTerminal]);

  // 4. Global Keyboard Listener
  // Listen for the 'T' key to toggle the terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      // Toggle on 'T' or 't'
      if (e.key.toLowerCase() === 't') {
        setIsTerminal(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTerminal = () => setIsTerminal(prev => !prev);

  return (
    <TerminalContext.Provider value={{ isTerminal, toggleTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

// 5. Custom Hook for easy consumption
export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
