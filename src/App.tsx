import { CSSProperties, useEffect, useState, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import { Github, Mail } from 'lucide-react';
import { motion, AnimatePresence, Target } from 'framer-motion';
import TypingAnimation from './components/TypingAnimation';
import { TouchOptimizer } from './components/TouchOptimizer';
import DecorativeElements from './components/DecorativeElements';
import ContactForm from './components/ContactForm';
gsap.registerPlugin(ScrollTrigger);

// Lazy load components that are not immediately visible
const Timeline = lazy(() => import('./components/Timeline'));
const ProjectCard = lazy(() => import('./components/ProjectCard'));

// Move data outside component to prevent re-creation on renders
const projects = [
  {
    title: 'ExpenseGo',
    description: 'A modern, offline-first personal finance manager built with React and Vite. Features include expense tracking, multi-currency support, and detailed analytics.',
    fullDescription: `ExpenseGo is a comprehensive personal finance management application that prioritizes privacy and data security. Built with React 18 and Vite, it offers powerful features like multi-account management, detailed analytics, and encrypted local storage.`,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    tech: ['React', 'TypeScript', 'Vite', 'Material-UI', 'IndexedDB', 'PWA'],
    features: [
      'Offline-first architecture',
      'Multi-currency support',
      'Detailed analytics & reports',
      'Data encryption',
      'PWA support',
      'Zero server dependency'
    ],
    demo: 'https://codinghubindia.github.io/ExpenseGo/',
    github: 'https://github.com/codinghubindia/ExpenseGo',
    highlights: [
      'Built with modern React 18 and Vite',
      'Implements advanced state management',
      'Features responsive Material Design',
      'Ensures complete data privacy',
      'Supports multiple accounts & currencies'
    ]
  }
];

const services = [
  {
    title: 'Modern Web Development',
    description: 'Custom, responsive websites built with React, Next.js, and Tailwind CSS. Optimized for performance and SEO with modern best practices.',
    icon: 'code',
    features: ['Component-based architecture', 'Responsive design', 'Performance optimization', 'SEO best practices']
  },
  {
    title: 'Cross-Platform App Development',
    description: 'Powerful mobile and desktop applications using Flutter and React Native. Build once, deploy everywhere for Android, iOS, and Windows.',
    icon: 'smartphone',
    features: ['Native-like performance', 'Shared codebase across platforms', 'Offline capabilities', 'Seamless updates']
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [typingPhase, setTypingPhase] = useState(1);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const initialAnimationsCompleted = useRef(false);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      // Only apply system theme if no saved theme exists
      if (!localStorage.getItem('theme')) {
        const deviceTheme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(deviceTheme);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    // Detect low-power devices
    const checkDeviceCapability = () => {
      const isLowEnd = 
        navigator.hardwareConcurrency <= 4 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsLowPowerDevice(isLowEnd);
    };
    
    checkDeviceCapability();
  }, []);

  useEffect(() => {
    // Disable animations during scroll until initial animations complete
    const handleInitialScroll = () => {
      if (!initialAnimationsCompleted.current) {
        // Temporarily pause animations during scroll
        document.body.classList.add('scrolling');
        
        // Remove class after scroll stops
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          document.body.classList.remove('scrolling');
        }, 150);
      }
    };
    
    // Apply a class immediately to prevent flash
    document.body.classList.add('initial-load');
    
    window.addEventListener('scroll', handleInitialScroll, { passive: true });
    
    // Mark animations as completed after 2.5 seconds
    const timer = setTimeout(() => {
      initialAnimationsCompleted.current = true;
      window.removeEventListener('scroll', handleInitialScroll);
      document.body.classList.remove('initial-load');
    }, 2500);
    
    return () => {
      window.removeEventListener('scroll', handleInitialScroll);
      clearTimeout(timer);
      clearTimeout(window.scrollTimeout);
      document.body.classList.remove('initial-load');
    };
  }, []);

  useEffect(() => {
    // Prevent initial animation flicker
    document.documentElement.style.setProperty('--prevent-transition', '1');

    // Add class to body to prevent scrolling during initial load
    document.body.classList.add('loading');

    // Only load critical resources initially
    Promise.all([
      document.fonts.ready,
      new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', () => resolve(true), { once: true });
        }
      })
    ]).then(() => {
      // Remove loading class and enable transitions after everything is loaded
      requestAnimationFrame(() => {
        document.body.classList.remove('loading');
        setIsLoading(false);
        
        // Enable transitions after a small delay
        setTimeout(() => {
          document.documentElement.style.removeProperty('--prevent-transition');
        }, 100);
      });
    });

    return () => {
      document.body.classList.remove('loading');
      document.documentElement.style.removeProperty('--prevent-transition');
    };
  }, []);

  // Optimize animations based on device capability
  const animationConfig = {
    duration: isLowPowerDevice ? 0.3 : 0.5,
    ease: isLowPowerDevice ? "linear" : "easeInOut"
  };

  // Optimize GSAP animations
  useEffect(() => {
    if (!isLowPowerDevice) {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach((section) => {
        (section as HTMLElement).style.opacity = '1';
        
        gsap.from(section, {
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, [isLowPowerDevice]);

  // Optimize typing animation
  const typingConfig = {
    typeSpeed: isLowPowerDevice ? 30 : 50,
    backSpeed: isLowPowerDevice ? 20 : 30
  };

  if (isLoading) return null; // Let the HTML loading screen handle initial load

  // Update the Timeline data to include certifications
  const timelineData = [
    {
      year: "2023 - 2027",
      title: "Bachelor of Engineering",
      subtitle: "Global Academy of Technology, Bangalore",
      description: "Information Science and Engineering"
    },
    {
      year: "2024",
      title: "Professional Certifications",
      subtitle: "Technical Achievements",
      description: "• Responsive Web Design - freeCodeCamp\n• Artificial Intelligence Foundation Certification\n• Operating System Fundamentals - Scaler Topics"
    },
    {
      year: "2021",
      title: "Pre-University Course (PCMB)",
      subtitle: "Janana Bharathi PU College, Kunigal",
      description: "Higher Secondary Education"
    }
  ];

  // First, add these helper functions at the top of your file
  const generateCodeSnippets = () => [
    {
      code: `const developer = {
  name: "Manjunatha",
  skills: ["React", "Node"]
};`,
      language: 'javascript'
    },
    {
      code: `function optimize() {
  return "performance";
}`,
      language: 'javascript'
    }
  ];

  const techKeywords = ['React', 'Node.js', 'TypeScript', 'Flutter', 'Next.js'];

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-screen">
          <div className="loader">
            <div className="loader-ring"></div>
            <div className="loader-text">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <TouchOptimizer />
      <DecorativeElements isLowPowerDevice={isLowPowerDevice} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50/30 to-white/30 dark:from-gray-900/30 dark:to-gray-800/30">
        <ProgressBar />
        <Navbar />

        {/* Hero Section - Optimized */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
          {/* Background Elements - Optimized */}
          <div 
            className={`absolute inset-0 pointer-events-none ${isLoading ? 'opacity-0' : 'opacity-80'} transition-opacity duration-700`}
          >
            {/* Gradient Background - More transparent */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.1, 1],
                  rotate: [0, 45, 0]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1]
                }}
              />
              <motion.div
                className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1.1, 1, 1.1],
                  rotate: [45, 0, 45]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1],
                  delay: 0.5
                }}
              />
            </div>

            {/* Decorative Elements - Conditional Rendering */}
            {!isLowPowerDevice && (
              <>
                {/* Code Snippets - Optimized */}
                <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
                  {generateCodeSnippets().map((snippet, index) => (
                    <motion.div
                      key={index}
                      className="absolute hidden md:block"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 2
                      }}
                      style={{
                        left: `${15 + index * 60}%`,
                        top: `${20 + index * 30}%`,
                        willChange: 'transform, opacity'
                      }}
                    >
                      <pre className="text-purple-600 dark:text-purple-400 text-sm">
                        {snippet.code}
                      </pre>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Keywords - Optimized */}
                <div className="absolute inset-0 overflow-hidden">
                  {techKeywords.map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      className="absolute hidden md:block text-xl font-bold text-gray-200/20 dark:text-gray-700/20 blur-[1px]"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        y: [0, -15, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.8
                      }}
                      style={{
                        left: `${10 + index * 20}%`,
                        top: `${30 + (index % 3) * 20}%`,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {keyword}
                    </motion.div>
                  ))}
                </div>

                {/* Geometric Shapes - Optimized */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(4)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="absolute hidden md:block w-12 h-12 border-2 border-purple-500/20 rounded-lg blur-[1px]"
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 1.5
                      }}
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${40 + (index % 2) * 30}%`,
                        willChange: 'transform, opacity'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)"
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Animated Welcome Text */}
              <motion.div
                initial={isLowPowerDevice ? false : { opacity: 0, y: 20 }}
                animate={isLowPowerDevice ? undefined : { opacity: 1, y: 0 }}
                transition={animationConfig}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-[1px] rounded-full -z-10" />
                <div className="text-sm md:text-base text-purple-600 dark:text-purple-400 tracking-wider uppercase px-6 py-2 relative">
                  Welcome to my portfolio
                </div>
              </motion.div>

              {/* Main Typing Animation with Enhanced Design */}
              <motion.div 
                className="relative mb-12 min-h-[8rem] flex items-center justify-center w-full"
                initial={isLowPowerDevice ? false : { opacity: 0, scale: 0.9 }}
                animate={isLowPowerDevice ? undefined : { opacity: 1, scale: 1 }}
                transition={animationConfig}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl opacity-50 rounded-full" />

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-40 h-1"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                </motion.div>

                <div className="relative">
                  <AnimatePresence mode="wait">
                    {typingPhase === 1 ? (
                      <motion.div
                        key="phase1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TypingAnimation 
                          strings={["Hello, I'm Manjunatha N.", ""]}
                          typeSpeed={typingConfig.typeSpeed}
                          backSpeed={typingConfig.backSpeed}
                          loop={false}
                          showCursor={true}
                          onComplete={() => {
                            if (typingPhase === 1) {
                              setTypingPhase(2);
                            }
                          }}
                        />
                      </motion.div>
                    ) : typingPhase === 2 ? (
                      <motion.div
                        key="phase2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TypingAnimation 
                          strings={["Full Stack Developer", ""]}
                          typeSpeed={typingConfig.typeSpeed}
                          backSpeed={typingConfig.backSpeed}
                          loop={false}
                          showCursor={true}
                          onComplete={() => {
                            if (typingPhase === 2) {
                              setTypingPhase(3);
                            }
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="phase3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TypingAnimation 
                          strings={[
                            "Building Modern Web Applications",
                            "Creating Seamless User Experiences",
                            "Transforming Ideas into Reality"
                          ]}
                          typeSpeed={typingConfig.typeSpeed}
                          backSpeed={typingConfig.backSpeed}
                          backDelay={2000}
                          loop={true}
                          showCursor={true}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Decorative Line */}
                <motion.div 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "40%", opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </motion.div>
              </motion.div>

              {/* Enhanced Tagline with Staggered Animation */}
              <motion.div
                className="mb-16 text-center max-w-3xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="text-xl md:text-2xl text-gray-500 dark:text-gray-400"
                >
                  Specializing in modern web technologies and intuitive design
                </motion.p>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-8 justify-center mb-24"
                initial={isLowPowerDevice ? false : { opacity: 0, y: 20 }}
                animate={isLowPowerDevice ? undefined : { opacity: 1, y: 0 }}
                transition={animationConfig}
              >
                <motion.a
                  href="#portfolio"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-lg text-white overflow-hidden rounded-full hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <motion.span 
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-lg overflow-hidden rounded-full border-2 border-purple-600 dark:border-purple-400 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    Let's Connect
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-20 left-10 text-6xl opacity-5 transform -rotate-12">{"<>"}</div>
            <div className="absolute bottom-20 right-10 text-6xl opacity-5 transform rotate-12">{"/>"}</div>
            
            {/* Animated Background Circles */}
            <motion.div
              className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <motion.div 
            className="max-w-6xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <div className="text-center mb-16 relative">
              <motion.h2 
                className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Technical Expertise
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Proficient in modern technologies and frameworks for building exceptional digital experiences
              </motion.p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend Development Card */}
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/20 relative group skill-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(124, 58, 237, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-700"></div>
                <div className="p-8">
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                        className="w-8 h-8"
                        alt="Frontend"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Frontend Development</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {[
                      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', progress: 90 },
                      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', progress: 85 },
                      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', progress: 95 },
                      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', progress: 90 },
                      { name: 'Tailwind CSS', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', progress: 85 }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <img src={skill.icon} className="w-6 h-6" alt={skill.name} />
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{skill.name}</span>
                        <div className="w-24">
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.progress}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Backend Development Card - Updated Skills */}
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/20 relative group skill-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                        className="w-8 h-8"
                        alt="Backend"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Backend Development</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', progress: 85 },
                      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', progress: 80 },
                      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', progress: 75 },
                      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', progress: 70 }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <img src={skill.icon} className="w-6 h-6" alt={skill.name} />
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{skill.name}</span>
                        <div className="w-24">
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.progress}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Tools & Technologies Card - Updated Skills */}
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/20 relative group skill-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(236, 72, 153, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="h-2 bg-gradient-to-r from-pink-500 to-pink-700"></div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-all">
                      <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
                        className="w-8 h-8"
                        alt="Tools"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tools & Technologies</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', progress: 85 },
                      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', progress: 80 },
                      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', progress: 90 }
                    ].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <img src={skill.icon} className="w-6 h-6" alt={skill.name} />
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{skill.name}</span>
                        <div className="w-24">
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.progress}%` }}
                              transition={{ duration: 1.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="relative py-32 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute w-[500px] h-[500px] -bottom-20 -left-20 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Explore my latest projects that showcase creative solutions and technical expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Modernized */}
        <section id="services" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto animate-section" style={{ opacity: 1 }}>
            <div className="text-center mb-16">
              <motion.h2 
                className="font-display text-heading-1 font-bold mb-4 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Professional Services
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Specialized expertise to bring your digital vision to life with quality and precision
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card with glass morphism effect */}
                  <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-gray-700/30 h-full">
                    {/* Background gradient blob */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 motion-reduce"></div>
                    
                    {/* Icon */}
                    <div className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-lg">
                      <span className="text-2xl">
                        {service.icon === 'code' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
                        {service.icon === 'smartphone' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-display font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-green-500 dark:text-green-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* CTA Button */}
                      <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Additional service information */}
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-display font-bold mb-4 dark:text-white">
                My Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                I believe in a collaborative process that puts your needs first. Every project begins with understanding your goals and ends with a solution that exceeds expectations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-md">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Transparent Communication</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-md">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Agile Development</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-md">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Quality Assurance</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-md">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Ongoing Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section - Modernized */}
        <section id="timeline" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto animate-section" style={{ opacity: 1 }}>
            <h2 className="font-display text-heading-1 font-bold text-center mb-12 dark:text-white">Education</h2>
            {/* Timeline Section */}
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
              <Timeline items={timelineData} />
            </Suspense>
          </div>
        </section>

        {/* Contact Section - Modernized */}
        <section id="contact" className="relative py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-gradient-to-r from-purple-600/5 to-blue-500/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto animate-section relative" style={{ opacity: 1 }}>
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Let's Create Together
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                Have a project in mind? I'm ready to bring your vision to life with innovative solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Contact cards - 2 columns on lg screens */}
              <div className="lg:col-span-2 space-y-6">
                {/* Social Profiles Card */}
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/30 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Connect Online</h3>
                  <div className="flex flex-wrap gap-4">
                    <motion.a 
                      href="https://github.com/codinghubindia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      href="mailto:maxx.codinghubindia@gmail.com"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com/in/manjunatha-n-codinghubindia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com/codinghubindia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </motion.a>
                    <motion.a 
                      href="https://instagram.com/codinghubindia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </motion.a>
                  </div>
                </motion.div>

                {/* Availability Card */}
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/30 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">Availability</h3>
                      <p className="text-gray-600 dark:text-gray-300">Currently available for new projects</p>
                      <div className="mt-3 flex items-center">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-green-600 dark:text-green-400 font-medium">Open to opportunities</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form - 3 columns on lg screens */}
              <motion.div 
                className="lg:col-span-3 bg-white/90 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Send a Message</h3>
                <ContactForm />
              </motion.div>
            </div>

            {/* Footer section */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Manjunatha N. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Designed and built with ❤️ using React, TypeScript, and Tailwind CSS
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}

export default App;