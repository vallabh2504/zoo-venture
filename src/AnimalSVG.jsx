import React from 'react';
import { motion } from 'framer-motion';

const AnimalSVG = ({ animal, isCollected }) => {
  // Simple SVG mapping based on animal type
  // In a real app, these would be separate SVG files or more complex paths
  const getAnimalPath = (type) => {
    switch (type?.toLowerCase()) {
      case 'lion':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#F4C430" />
            <circle cx="35" cy="40" r="5" fill="#000" />
            <circle cx="65" cy="40" r="5" fill="#000" />
            <path d="M 40 70 Q 50 80 60 70" stroke="#000" strokeWidth="3" fill="none" />
            <path d="M 20 20 L 30 10 L 40 20 L 50 10 L 60 20 L 70 10 L 80 20" stroke="#D2691E" strokeWidth="5" fill="none" />
          </g>
        );
      case 'elephant':
        return (
          <g>
            <rect x="20" y="30" width="60" height="50" rx="10" fill="#A9A9A9" />
            <circle cx="35" cy="45" r="3" fill="#000" />
            <circle cx="65" cy="45" r="3" fill="#000" />
            <path d="M 50 50 L 50 80 L 40 90" stroke="#A9A9A9" strokeWidth="8" fill="none" />
            <path d="M 10 30 Q 0 40 10 50" fill="#A9A9A9" />
            <path d="M 90 30 Q 100 40 90 50" fill="#A9A9A9" />
          </g>
        );
      case 'monkey':
        return (
          <g>
            <circle cx="50" cy="50" r="35" fill="#8B4513" />
            <circle cx="40" cy="45" r="4" fill="#000" />
            <circle cx="60" cy="45" r="4" fill="#000" />
            <ellipse cx="50" cy="65" rx="10" ry="5" fill="#DEB887" />
            <circle cx="15" cy="50" r="10" fill="#8B4513" />
            <circle cx="85" cy="50" r="10" fill="#8B4513" />
          </g>
        );
      case 'penguin':
        return (
          <g>
             <ellipse cx="50" cy="50" rx="30" ry="40" fill="#000" />
             <ellipse cx="50" cy="55" rx="20" ry="30" fill="#FFF" />
             <circle cx="45" cy="40" r="3" fill="#000" />
             <circle cx="55" cy="40" r="3" fill="#000" />
             <path d="M 45 50 L 50 55 L 55 50" fill="#FFA500" />
          </g>
        );
      default:
        // Generic paw print for unknown animals
        return (
          <g>
            <circle cx="30" cy="40" r="10" fill="#555" />
            <circle cx="50" cy="30" r="10" fill="#555" />
            <circle cx="70" cy="40" r="10" fill="#555" />
            <ellipse cx="50" cy="70" rx="25" ry="20" fill="#555" />
          </g>
        );
    }
  };

  // Animation variants
  const variants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      } 
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`animal-svg-container ${isCollected ? 'collected' : 'uncollected'}`}
      initial="hidden"
      animate="visible"
      whileHover={isCollected ? "hover" : ""}
      variants={variants}
      style={{
        width: '100px',
        height: '100px',
        filter: isCollected ? 'none' : 'grayscale(100%) brightness(0.6) contrast(1.2)',
        opacity: isCollected ? 1 : 0.7,
        cursor: isCollected ? 'pointer' : 'default',
        display: 'inline-block'
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {getAnimalPath(animal?.type || animal?.name)}
      </svg>
    </motion.div>
  );
};

export default AnimalSVG;
