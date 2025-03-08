import { useEffect } from 'react';

export const TouchOptimizer: React.FC = () => {
  useEffect(() => {
    // Prevent double-tap zoom on mobile
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Optimize scroll performance
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Handle scroll updates
          ticking = false;
        });
        ticking = true;
      }
    });

    // Optimize touch events
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }, []);

  return null;
}; 