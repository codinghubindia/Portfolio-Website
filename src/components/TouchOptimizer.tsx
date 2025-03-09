import { useEffect } from 'react';

// Declare scrollTimeout on window to fix TypeScript errors
declare global {
  interface Window {
    scrollTimeout: ReturnType<typeof setTimeout>;
  }
}

export const TouchOptimizer: React.FC = () => {
  useEffect(() => {
    // Detect low-end devices
    const isLowEndDevice = 
      navigator.hardwareConcurrency <= 4 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
      // Add a class to the body for CSS optimizations
      document.body.classList.add('low-end-device');
    }

    // Prevent double-tap zoom on mobile
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Optimize scroll performance with throttling
    let lastScrollTime = 0;
    const scrollThreshold = 16; // ~60fps

    document.addEventListener('scroll', () => {
      const now = performance.now();
      if (now - lastScrollTime > scrollThreshold) {
        lastScrollTime = now;
        // Any scroll-based updates can go here
      }
      
      // Add scrolling class during scroll
      document.body.classList.add('scrolling');
      
      // Remove scrolling class after scroll stops
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 100);
      
    }, { passive: true });

    // Optimize touch events
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // Add viewport height fix for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    
    // Optimize initial load
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Preload critical components after initial render
        import('../components/Timeline');
        import('../components/ProjectCard');
        import('../components/SkillsSection');
      });
    }

    return () => {
      window.removeEventListener('resize', setVh);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return null;
}; 