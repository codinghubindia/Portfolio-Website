import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [navHeight, setNavHeight] = useState(64); // Default height

  useEffect(() => {
    // Get navbar height
    const updateNavHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    // Initial calculation
    const calculateProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(scrolled);
    };

    // Calculate on mount
    calculateProgress();
    updateNavHeight();

    // Add event listeners
    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('resize', updateNavHeight);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  return (
    <div 
      className="fixed left-0 w-full h-1 z-40"
      style={{ top: `${navHeight}px` }}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;