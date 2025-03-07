import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;