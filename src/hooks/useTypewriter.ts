import { useState, useEffect } from 'react';

// ============================================================================
// useTypewriter Hook
// ============================================================================
// Simulates a typing effect by iterating over an array of strings.
// It types out a phrase, pauses, deletes it, and moves to the next.
// Perfect for hero sections to showcase multiple backend roles.
// ============================================================================

export function useTypewriter(
  phrases: string[], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000
) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: number;
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    if (isDeleting) {
      // Removing characters
      setText(prev => prev.substring(0, prev.length - 1));
      timer = window.setTimeout(() => {}, deletingSpeed);
    } else {
      // Adding characters
      setText(fullText.substring(0, text.length + 1));
      timer = window.setTimeout(() => {}, typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      // Finished typing, pause then start deleting
      timer = window.setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phrases, loopNum, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
