import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypingAnimationProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1000,
  loop = false,
  startDelay = 0,
  className = "font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent",
  showCursor = true,
  onComplete
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      // Add custom cursor only if showCursor is true
      if (showCursor) {
        const cursorElement = document.createElement('span');
        cursorElement.className = 'custom-typed-cursor';
        el.current.parentElement?.appendChild(cursorElement);
      }

      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        startDelay,
        onComplete: onComplete || (() => {}),
        smartBackspace: false,
        showCursor: false, // Keep this false as we're using custom cursor
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
      // Remove custom cursor if it exists
      if (showCursor) {
        const cursor = document.querySelector('.custom-typed-cursor');
        if (cursor) cursor.remove();
      }
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop, startDelay, onComplete, showCursor]);

  return (
    <div className="relative inline-block">
      <span ref={el} className={className}></span>
    </div>
  );
};

export default TypingAnimation; 