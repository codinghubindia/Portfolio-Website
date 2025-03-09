import { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastActiveSection = useRef(activeSection);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Throttle scroll event for better performance
  const handleScroll = useCallback(() => {
    // Only update active section if not scrolling rapidly
    if (document.body.classList.contains('scrolling')) return;
    
    // Update active section based on scroll position
    const sections = ['home', 'portfolio', 'services', 'timeline', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (current && current !== lastActiveSection.current) {
      setActiveSection(current);
      lastActiveSection.current = current;
    }
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Add class to optimize navbar during scroll
    const handleScrollStart = () => {
      document.querySelector('nav')?.classList.add('scrolling-nav');
    };
    
    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        document.querySelector('nav')?.classList.remove('scrolling-nav');
      }, 100);
    };
    
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollStart);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const navItems = ['Home', 'Portfolio', 'Services', 'Timeline', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg py-2`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              MN
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-nav relative group ${
                  activeSection === item.toLowerCase()
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transform origin-left transition-transform duration-300 ${
                  activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-nav ${
                    activeSection === item.toLowerCase()
                      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;