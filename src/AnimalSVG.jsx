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
      case 'giraffe':
        return (
          <g>
            <rect x="40" y="10" width="20" height="70" fill={animal?.color || '#FFD700'} />
            <circle cx="45" cy="30" r="4" fill="#8B4513" />
            <circle cx="55" cy="50" r="4" fill="#8B4513" />
            <circle cx="45" cy="70" r="4" fill="#8B4513" />
            <circle cx="50" cy="80" r="15" fill={animal?.color || '#FFD700'} />
          </g>
        );
      case 'zebra':
        return (
          <g>
            <rect x="20" y="20" width="60" height="60" rx="10" fill={animal?.color || '#FFF'} />
            <rect x="20" y="20" width="10" height="60" fill="#000" />
            <rect x="40" y="20" width="10" height="60" fill="#000" />
            <rect x="60" y="20" width="10" height="60" fill="#000" />
          </g>
        );
      case 'tiger':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill={animal?.color || '#FFA500'} />
            <path d="M 30 20 L 40 10 L 50 20 L 60 10 L 70 20" stroke="#000" strokeWidth="3" />
            <path d="M 25 40 L 35 30 L 45 40" stroke="#000" strokeWidth="3" />
            <path d="M 55 40 L 65 30 L 75 40" stroke="#000" strokeWidth="3" />
            <path d="M 30 70 Q 50 85 70 70" stroke="#000" strokeWidth="3" fill="none" />
          </g>
        );
      case 'kangaroo':
        return (
          <g>
            <ellipse cx="50" cy="60" rx="25" ry="35" fill={animal?.color || '#8B4513'} />
            <circle cx="50" cy="30" r="20" fill={animal?.color || '#8B4513'} />
            <circle cx="45" cy="25" r="3" fill="#000" />
            <circle cx="55" cy="25" r="3" fill="#000" />
            <ellipse cx="50" cy="40" rx="8" ry="4" fill="#DEB887" />
          </g>
        );
      case 'panda':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill={animal?.color || '#FFF'} />
            <circle cx="30" cy="30" r="15" fill="#000" />
            <circle cx="70" cy="30" r="15" fill="#000" />
            <circle cx="35" cy="40" r="5" fill="#FFF" />
            <circle cx="65" cy="40" r="5" fill="#FFF" />
            <path d="M 40 65 Q 50 75 60 65" stroke="#000" strokeWidth="3" fill="none" />
          </g>
        );
      case 'koala':
        return (
          <g>
            <ellipse cx="50" cy="55" rx="30" ry="35" fill={animal?.color || '#B0C4DE'} />
            <circle cx="30" cy="30" r="15" fill={animal?.color || '#B0C4DE'} />
            <circle cx="70" cy="30" r="15" fill={animal?.color || '#B0C4DE'} />
            <circle cx="45" cy="50" r="4" fill="#000" />
            <circle cx="55" cy="50" r="4" fill="#000" />
            <ellipse cx="50" cy="65" rx="8" ry="5" fill="#36454F" />
          </g>
        );
      case 'hippo':
        return (
          <g>
            <rect x="20" y="40" width="60" height="30" rx="15" fill={animal?.color || '#778899'} />
            <ellipse cx="50" cy="35" rx="30" ry="20" fill={animal?.color || '#778899'} />
            <circle cx="35" cy="30" r="3" fill="#000" />
            <circle cx="65" cy="30" r="3" fill="#000" />
            <path d="M 40 70 L 40 80 L 60 80 L 60 70" fill={animal?.color || '#778899'} />
          </g>
        );
      case 'rhino':
        return (
          <g>
            <rect x="20" y="40" width="60" height="30" rx="10" fill={animal?.color || '#808080'} />
            <path d="M 40 40 L 50 20 L 60 40 Z" fill="#555" />
            <circle cx="35" cy="50" r="3" fill="#000" />
            <circle cx="65" cy="50" r="3" fill="#000" />
            <path d="M 20 50 Q 10 60 20 70" fill={animal?.color || '#808080'} />
          </g>
        );
      case 'crocodile':
        return (
          <g>
            <rect x="10" y="40" width="80" height="20" rx="5" fill={animal?.color || '#228B22'} />
            <path d="M 10 40 L 0 35 L 10 30 L 20 35 L 30 30 L 40 35 L 50 30 L 60 35 L 70 30 L 80 35 L 90 30 L 80 40 Z" fill="#228B22" />
            <circle cx="15" cy="45" r="2" fill="#000" />
            <circle cx="25" cy="45" r="2" fill="#000" />
          </g>
        );
      case 'snake':
        return (
          <g>
            <path d="M 20 80 Q 50 20 80 80" stroke={animal?.color || '#32CD32'} strokeWidth="10" fill="none" />
            <circle cx="80" cy="80" r="5" fill="#32CD32" />
            <circle cx="78" cy="78" r="1" fill="#000" />
            <circle cx="82" cy="78" r="1" fill="#000" />
          </g>
        );
      case 'parrot':
        return (
          <g>
            <circle cx="50" cy="40" r="25" fill={animal?.color || '#FF4500'} />
            <polygon points="50,65 30,80 70,80" fill="#32CD32" />
            <circle cx="45" cy="35" r="3" fill="#000" />
            <circle cx="55" cy="35" r="3" fill="#000" />
            <path d="M 50 45 L 50 50 L 55 47 Z" fill="#FFA500" />
          </g>
        );
      default:
        // Generic paw print for unknown animals
        console.warn("AnimalSVG: Fallback triggered for", animal);
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
