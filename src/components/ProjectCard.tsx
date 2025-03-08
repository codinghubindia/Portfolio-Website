import React, { useState } from 'react';
import { Github, Globe, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tech: string[];
  demo: string;
  github: string;
  fullDescription?: string;
}

const ProjectCard: React.FC<ProjectProps> = (project) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <motion.div
        className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: isExpanded ? 1.05 : 1,
          zIndex: isExpanded ? 10 : 0
        }}
        whileHover={{ y: -8 }}
        onClick={handleCardClick}
        transition={{ duration: 0.3 }}
      >
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered || isExpanded ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Desktop Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <motion.button
                className="px-4 py-2 bg-white/90 text-purple-600 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                View Details <ExternalLink size={14} />
              </motion.button>
              
              <div className="flex gap-2">
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/90 text-purple-600 rounded-full hover:bg-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={e => e.stopPropagation()}
                >
                  <Globe size={18} />
                </motion.a>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/90 text-purple-600 rounded-full hover:bg-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={e => e.stopPropagation()}
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Mobile Overlay - Shows when card is expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-white/90 text-purple-600 rounded-full font-medium text-sm flex items-center justify-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Globe size={18} />
                    View Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 bg-white/90 text-purple-600 rounded-full font-medium text-sm flex items-center justify-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Github size={18} />
                    View Source Code
                  </motion.a>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setIsExpanded(false);
                    }}
                    className="w-full px-4 py-3 bg-white/90 text-purple-600 rounded-full font-medium text-sm flex items-center justify-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ExternalLink size={18} />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
};

export default React.memo(ProjectCard); 