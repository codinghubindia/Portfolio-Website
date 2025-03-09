import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Get the current theme from the document class since it's already set in index.html
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const newIsDark = !isDark;
    const newTheme = newIsDark ? 'dark' : 'light';
    
    // Update classes
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update state
    setIsDark(newIsDark);
  };

  // Listen for system theme changes when no user preference is set
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={`w-full h-full transition-all duration-200 ${isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} absolute top-0 left-0`} />
        <Moon className={`w-full h-full transition-all duration-200 ${isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} absolute top-0 left-0`} />
      </div>
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </motion.button>
  );
};

export default ThemeToggle;