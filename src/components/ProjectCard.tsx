import React, { useState } from 'react';
import { Github, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const openModal = () => {
    setShowDemo(false);
    setIsModalOpen(true);
  };

  const openDemoModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDemo(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        onClick={openModal}
        whileHover={{ y: -10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            loading="lazy"
            width="400"
            height="200"
            decoding="async"
            fetchPriority="low"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <button 
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-purple-50 transition-colors"
              onClick={openModal}
            >
              View Details <ExternalLink size={16} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-display text-heading-3 font-bold mb-2 dark:text-white">{project.title}</h3>
          <p className="text-body text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span key={i} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-body-sm dark:text-gray-300">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-body-sm dark:text-gray-300">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={openDemoModal}
              className="flex items-center gap-2 text-body text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              <Globe size={20} /> Live Demo
            </button>
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-body text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              <Github size={20} /> Code
            </a>
          </div>
        </div>
      </motion.div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project}
        showDemo={showDemo}
      />
    </>
  );
};

export default React.memo(ProjectCard); 