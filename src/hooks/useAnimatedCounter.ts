import { useEffect, useState, useRef } from 'react';

// ============================================================================
// useAnimatedCounter Hook
// ============================================================================
// Uses requestAnimationFrame combined with an IntersectionObserver to count
// from 0 to a target number smoothly ONLY when the element enters the viewport.
// ============================================================================

export function useAnimatedCounter(
  targetValue: number, 
  durationMs: number = 2000
) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, targetValue]);

  const startAnimation = () => {
    let startTimestamp: number | null = null;
    
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      
      const easedProgress = easeOutExpo(progress);
      setCount(Math.floor(easedProgress * targetValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue); // Ensure we end exactly on the target
      }
    };

    window.requestAnimationFrame(step);
  };

  return { count, elementRef };
}
