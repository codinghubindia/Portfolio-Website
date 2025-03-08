import { useEffect, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import { Github, Mail} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingAnimation from './components/TypingAnimation';
import { useImagePreload } from './hooks/useImagePreload';
import LoadingScreen from './components/LoadingScreen';
gsap.registerPlugin(ScrollTrigger);

// Lazy load components that are not immediately visible
const Timeline = lazy(() => import('./components/Timeline'));
const ProjectCard = lazy(() => import('./components/ProjectCard'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));

// Move data outside component to prevent re-creation on renders
const projects = [
  {
    title: 'Personal Finance Tracker',
    description: 'A comprehensive finance tracking application built with the MERN stack and Chart.js',
    fullDescription: 'This personal finance tracker helps users manage their finances by tracking income, expenses, and investments. It features interactive charts for visualizing spending patterns, budget planning tools, and automated categorization of transactions. The application is built with MongoDB for data storage, Express for the backend API, React for the frontend interface, and Node.js for server-side logic. Chart.js is used for data visualization, providing users with insightful graphs of their financial activities.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Chart.js', 'JWT Authentication', 'Responsive Design'],
    demo: 'https://example.com/finance-tracker',
    github: 'https://github.com/example/finance-tracker'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React and Tailwind CSS',
    image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&q=80&w=1000',
    tech: ['React', 'Tailwind CSS', 'GSAP'],
    demo: '#',
    github: '#'
  },
  {
    title: 'Windows App',
    description: 'A desktop application built with C# .NET and SQLite',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000',
    tech: ['C#', '.NET', 'WPF', 'SQLite'],
    demo: '#',
    github: '#'
  }
];

const services = [
  {
    title: 'Website Development',
    description: 'Custom websites using React, Tailwind, and MERN stack',
    price: '$1000 - $5000'
  },
  {
    title: 'Windows App Development',
    description: 'Desktop applications using C# .NET, WPF, and SQL',
    price: '$2000 - $8000'
  },
  {
    title: 'UI/UX Design',
    description: 'Modern and intuitive interface design',
    price: '$500 - $2000'
  },
  {
    title: 'Performance Optimization',
    description: 'Speed up your existing applications',
    price: '$300 - $1500'
  }
];

function App() {
  const [positions, setPositions] = useState<Array<{ x: number, y: number }>>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isLoading, setIsLoading] = useState(true);
  const [typingPhase, setTypingPhase] = useState(1);
  const [staticText, setStaticText] = useState('');

  const criticalImages = [
    // Add your critical image URLs here
    projects[0].image,
    projects[1].image
  ];
  
  const imagesLoaded = useImagePreload(criticalImages);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const calculatePositions = () => {
      const pos: Array<{ x: number, y: number }> = [];
      const keywords = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'];
      
      // Generate positions for keywords
      keywords.forEach(() => {
        const newPos = generateRandomPosition(pos, 150, 100, windowDimensions);
        pos.push(newPos);
      });
      
      // Generate positions for shapes
      for (let i = 0; i < 8; i++) {
        const newPos = generateRandomPosition(pos, 80, 60, windowDimensions);
        pos.push(newPos);
      }

      // Add position for code snippet
      pos.push(generateRandomPosition(pos, 200, 100, windowDimensions));
      
      setPositions(pos);
    };

    calculatePositions();
  }, [windowDimensions]);

  const generateRandomPosition = (
    existingPositions: Array<{ x: number, y: number }>,
    elementSize: number = 100,
    margin: number = 50,
    dimensions: { width: number, height: number }
  ) => {
    const maxAttempts = 50;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * (dimensions.width - elementSize - margin * 2) + margin;
      const y = Math.random() * (dimensions.height - elementSize - margin * 2) + margin;
      
      const hasOverlap = existingPositions.some(pos => {
        const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
        return distance < (elementSize + margin);
      });
      
      if (!hasOverlap) {
        return { x, y };
      }
      attempts++;
    }
    
    return {
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height
    };
  };

  useEffect(() => {
    // Initialize animations after content is definitely loaded
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach((section) => {
        // Make sections visible first
        (section as HTMLElement).style.opacity = '1';
        
        gsap.from(section, {
          y: 50,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Promise.all([
      document.fonts.ready,
      new Promise(resolve => setTimeout(resolve, 1500)), // Slightly longer minimum time for smoother transition
      // Add other critical resources here
    ]).then(() => {
      if (imagesLoaded) {
        setIsLoading(false);
      }
    });
  }, [imagesLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ProgressBar />
      <Navbar />

      {/* Hero Section - Enhanced with Advanced Animations */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        {/* Abstract Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Gradient Circle */}
          <motion.div
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Code Snippets */}
          {positions.length > 13 && (
            <motion.div 
              className="absolute opacity-20 blur-sm transform -rotate-12 dark:opacity-10"
              style={{
                left: positions[13].x,
                top: positions[13].y,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <pre className="text-purple-600 dark:text-purple-400 text-sm">
                {`const developer = {
  name: "Manjunatha",
  skills: ["React", "Node"]
};`}
              </pre>
            </motion.div>
          )}
          
          {/* Tech Keywords */}
          {positions.length > 0 && ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express'].map((tech, index) => (
            <motion.div
              key={tech}
              className="absolute text-2xl font-bold text-gray-200/20 dark:text-gray-700/20 blur-[2px]"
              style={{
                left: positions[index].x,
                top: positions[index].y,
                width: '150px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {tech}
            </motion.div>
          ))}

          {/* Geometric Shapes */}
          {positions.length > 5 && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 border-2 border-purple-500/20 rounded-lg blur-[1px]"
              style={{
                left: positions[i + 5].x,
                top: positions[i + 5].y,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Animated Lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm"
                style={{
                  width: '100%',
                  top: `${(i + 1) * 20}%`,
                }}
                animate={{
                  x: [-100, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Keep existing background elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Floating Particles with enhanced depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particles-container">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full blur-${Math.random() > 0.5 ? 'sm' : 'md'}`}
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  background: `rgba(${
                    Math.random() > 0.5 ? '124, 58, 237' : '59, 130, 246'
                  }, ${Math.random() * 0.3 + 0.1})`,
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full animate-section relative flex-1 flex flex-col justify-center z-10">
          <div className="flex flex-col items-center justify-center h-full">
            {/* Animated Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-sm md:text-base text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                Welcome to my portfolio
              </div>
            </motion.div>

            {/* Main Typing Animation with Enhanced Design */}
            <motion.div 
              className="relative mb-12 min-h-[8rem] flex items-center justify-center w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                        typeSpeed={50}
                        backSpeed={30}
                        loop={false}
                        showCursor={true}
                        onComplete={() => setTypingPhase(2)}
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
                        typeSpeed={50}
                        backSpeed={30}
                        loop={false}
                        showCursor={true}
                        onComplete={() => setTypingPhase(3)}
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
                          "Building Digital Experiences",
                          "Creating Modern Solutions",
                          "Transforming Ideas into Reality"
                        ]}
                        typeSpeed={50}
                        backSpeed={30}
                        backDelay={2000}
                        loop={true}
                        startDelay={500}
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
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
                className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
              >
                Transforming ideas into exceptional digital solutions
              </motion.p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.a
                href="#portfolio"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-lg text-white overflow-hidden rounded-full"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)" }}
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
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-lg overflow-hidden rounded-full border-2 border-purple-600 dark:border-purple-400"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Let's Connect
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 1.5 }
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-purple-500 rounded-full p-1"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
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

      {/* Portfolio Section - Redesigned */}
      <section id="portfolio" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto animate-section" style={{ opacity: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explore some of my recent projects that showcase my expertise in web development
              and problem-solving abilities.
            </p>
          </motion.div>

          {/* Portfolio Section */}
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section id="services" className="py-24 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto animate-section" style={{ opacity: 1 }}>
          <h2 className="font-display text-heading-1 font-bold text-center mb-12 dark:text-white">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-display text-heading-3 font-bold mb-4 dark:text-white">{service.title}</h3>
                <p className="text-body text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-6">{service.price}</p>
                <motion.a
                  href="#contact"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </motion.a>
              </div>
            ))}
          </div>
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

      {/* Contact Section - Redesigned */}
      <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto animate-section" style={{ opacity: 1 }}>
          <h2 className="font-display text-heading-1 font-bold text-center mb-12 dark:text-white">Let's Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
            <div>
                <h3 className="font-display text-heading-3 font-bold mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                  <a href="mailto:manjun2412@gmail.com" className="flex items-center gap-3 text-body text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  <Mail size={24} />
                    manjun2412@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-display text-heading-3 font-bold mb-6 dark:text-white">Social Links</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/codinghubindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={28} />
                  </motion.a>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-body-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-body-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-body-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;