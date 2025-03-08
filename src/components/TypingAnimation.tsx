import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 2000,
  loop = true,
  startDelay = 0,
  className = "font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent",
  onComplete,
  showCursor = true
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<any>(null);

  useEffect(() => {
    if (el.current) {
      // Add custom cursor
      const cursorElement = document.createElement('span');
      cursorElement.className = 'custom-typed-cursor';
      el.current.parentElement?.appendChild(cursorElement);

      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        startDelay,
        onComplete: onComplete || (() => {}), // Provide default empty function
        smartBackspace: false,
        showCursor: false, // Hide default cursor
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
      // Remove custom cursor
      const cursor = document.querySelector('.custom-typed-cursor');
      if (cursor) cursor.remove();
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop, startDelay, onComplete]);

  return (
    <div className="relative inline-block">
      <span ref={el} className={className}></span>
    </div>
  );
};

export default TypingAnimation; 