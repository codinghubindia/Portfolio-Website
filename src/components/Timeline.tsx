import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  // Helper function to split description into lines if it contains bullet points
  const renderDescription = (description: string) => {
    if (description.includes('•')) {
      return (
        <ul className="list-none space-y-2">
          {description.split('\n').map((line, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
              <span className="text-purple-600 dark:text-purple-400">{line.substring(0, 1)}</span>
              <span>{line.substring(2)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-600 dark:text-gray-300">{description}</p>;
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-600 via-pink-500 to-blue-500"></div>

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="timeline-item relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Content */}
            <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              {/* Year bubble */}
              <div className="flex-1 text-right">
                <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-medium">
                  {item.year}
                </div>
              </div>

              {/* Dot */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                <div className="absolute w-3 h-3 bg-white dark:bg-gray-900 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                    {item.subtitle}
                  </p>
                  {renderDescription(item.description)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;