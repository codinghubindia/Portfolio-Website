import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomTypingHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
      >
        <span>Hi 👋, I'm</span>
        <span className="font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Manjunatha N
        </span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300"
      >
        Full Stack Developer | Building Digital Solutions
      </motion.div>
    </div>
  );
};

export default CustomTypingHeader; 