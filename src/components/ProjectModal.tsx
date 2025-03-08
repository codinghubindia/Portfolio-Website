import React, { useEffect, useRef } from 'react';
import { X, Github, Globe, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@mui/material';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    fullDescription?: string;
    image: string;
    tech: string[];
    features?: string[];
    highlights?: string[];
    demo: string;
    github: string;
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            className: 'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden',
            style: { margin: 20 }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white"
            >
              <X size={24} />
            </button>

            {/* Hero Section */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-200 max-w-2xl">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              {project.fullDescription && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">About the Project</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Highlights</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {project.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe size={20} />
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  View Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 