import React from 'react';
import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
  iconUrls: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "Python", "JavaScript", "HTML", "CSS"],
    iconUrls: ["c", "cpp", "python", "javascript", "html", "css"]
  },
  {
    title: "Frameworks",
    skills: ["React", "Node.js", "Express", "Tailwind"],
    iconUrls: ["react", "nodejs", "express", "tailwind"]
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL"],
    iconUrls: ["mongodb", "mysql"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
    iconUrls: ["git", "github", "vscode"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const SkillsSection: React.FC = () => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="text-center">
            <h3 className="font-display text-lg font-semibold mb-4 dark:text-white">
              {category.title}
            </h3>
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {category.iconUrls.map((icon, i) => (
                <motion.div 
                  key={i} 
                  className="group"
                  variants={item}
                  whileHover={{ y: -3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 transition-all duration-300 group-hover:shadow-md">
                    <img 
                      src={`https://skillicons.dev/icons?i=${icon}`} 
                      alt={category.skills[i]} 
                      className="w-10 h-10"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection; 