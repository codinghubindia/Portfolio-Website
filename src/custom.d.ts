import { Target, TargetAndTransition, MotionStyle } from 'framer-motion';

declare module 'framer-motion' {
  export interface MotionStyle extends React.CSSProperties {
    willChange?: string;
    transform?: string;
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    boxShadow?: string;
    background?: string;
    width?: string | number;
    height?: string | number;
    zIndex?: number;
    scale?: number;
  }

  export interface Target {
    boxShadow?: string;
    willChange?: string;
    transform?: string;
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    zIndex?: number;
    scale?: number;
    opacity?: number;
    x?: number | string;
    y?: number | string;
    rotate?: number;
  }

  export interface TargetAndTransition extends Target {
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      repeat?: number;
      repeatType?: string;
      times?: number[];
    };
  }

  export interface AnimationControls {
    start: (definition: Target | TargetAndTransition) => Promise<any>;
  }
} 