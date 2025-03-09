import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DecorativeElementsProps {
  isLowPowerDevice: boolean;
}

// Add type for position
interface Position {
  x: number;
  y: number;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({ isLowPowerDevice }) => {
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  // Adjust number of elements based on screen size
  const getElementCount = () => {
    if (windowSize.width < 640) return 3; // Mobile
    if (windowSize.width < 1024) return 5; // Tablet
    return 8; // Desktop
  };

  // Generate random positions that don't overlap
  const generatePositions = (count: number) => {
    const positions: Position[] = [];
    const minDistance = windowSize.width * 0.1; // Minimum distance between elements
    
    for (let i = 0; i < count; i++) {
      let position: Position;
      let attempts = 0;
      
      do {
        position = {
          x: Math.random() * 80 + 10, // Keep within 10-90% of viewport
          y: Math.random() * 80 + 10,
        };
        attempts++;
      } while (
        positions.some(p => 
          Math.sqrt(Math.pow(p.x - position.x, 2) + Math.pow(p.y - position.y, 2)) < minDistance
        ) && 
        attempts < 50
      );
      
      positions.push(position);
    }
    
    return positions;
  };

  const elementCount = getElementCount();
  const positions = generatePositions(elementCount);


  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${isLowPowerDevice ? 'low-end-device' : ''}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] dark:opacity-[0.12]" />

      {/* Floating Shapes */}
      <div className="particles-container absolute inset-0">
        {positions.map((pos, index) => (
          <motion.div
            key={index}
            className={`shape ${index % 2 === 0 ? 'shape-circle' : 'shape-square'}`}
            style={{
              width: `${Math.random() * 40 + 40}px`,
              height: `${Math.random() * 40 + 40}px`,
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              willChange: 'transform, opacity',
              background: index % 2 === 0 
                ? 'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))'
                : 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: isLowPowerDevice ? 10 : 20,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          />
        ))}
      </div>

      {/* Gradient Blobs */}
      {!isLowPowerDevice && (
        <>
          <motion.div
            className="decorative-blob absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))',
              top: '10%',
              right: '-10%',
              willChange: 'transform, opacity',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="decorative-blob absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))',
              bottom: '10%',
              left: '-10%',
              willChange: 'transform, opacity',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: 15,
            }}
          />
        </>
      )}

      {/* Code Snippets */}
      {!isLowPowerDevice && (
        <div className="absolute inset-0 overflow-hidden">
          {[
            { top: '20%', left: '15%', rotate: -15 },
            { top: '60%', right: '15%', rotate: 15 },
          ].map((position, index) => (
            <motion.div
              key={`code-${index}`}
              className="code-snippet absolute hidden lg:block"
              style={{
                ...position,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 4,
              }}
            >
              <pre className="text-xs text-purple-600/70 dark:text-purple-400/70">
                {index === 0 ? 
                  `const enhance = (depth) => {\n  return depth + 1;\n}` :
                  `function animate() {\n  requestFrame();\n}`
                }
              </pre>
            </motion.div>
          ))}
        </div>
      )}

      {/* Geometric Patterns */}
      {!isLowPowerDevice && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={`geo-${index}`}
              className="absolute w-16 h-16 border-2 border-purple-500/20 dark:border-purple-400/30 rounded-lg"
              style={{
                left: `${20 + index * 25}%`,
                top: `${40 + (index % 2) * 30}%`,
                willChange: 'transform, opacity',
              }}
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: isLowPowerDevice ? 10 : 20,
                repeat: Infinity,
                ease: "linear",
                delay: index * 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DecorativeElements; 