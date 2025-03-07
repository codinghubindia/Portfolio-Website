import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator: React.FC = () => {
  const scrollToNextSection = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      onClick={scrollToNextSection}
      whileHover={{ scale: 1.1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
        <ChevronDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator; 