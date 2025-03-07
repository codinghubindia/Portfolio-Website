import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypingAnimationProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 2000,
  loop = true,
  className = "font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<any>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        cursorChar: '',
        autoInsertCss: false,
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop]);

  return <span ref={el} className={className}></span>;
};

export default TypingAnimation; 