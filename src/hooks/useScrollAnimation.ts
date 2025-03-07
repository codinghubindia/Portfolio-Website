import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  selector: string;
  fromVars?: gsap.TweenVars;
  scrollTrigger?: gsap.ScrollTriggerVars;
}

export const useScrollAnimation = ({
  selector,
  fromVars = { opacity: 0, y: 50, duration: 0.8 },
  scrollTrigger = {
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  },
}: AnimationOptions) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element) => {
        gsap.from(element, {
          ...fromVars,
          scrollTrigger: {
            trigger: element,
            ...scrollTrigger,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, fromVars, scrollTrigger]);
}; 