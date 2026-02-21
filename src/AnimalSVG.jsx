import React from 'react';
import { motion } from 'framer-motion';

const AnimalSVG = ({ animal, isCollected }) => {
  const getAnimalPath = (name) => {
    switch (name?.toLowerCase()) {
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
      case 'giraffe':
        return (
          <g>
            <rect x="40" y="10" width="20" height="70" fill="#FFD700" />
            <circle cx="45" cy="30" r="4" fill="#8B4513" />
            <circle cx="55" cy="50" r="4" fill="#8B4513" />
            <circle cx="45" cy="70" r="4" fill="#8B4513" />
            <circle cx="50" cy="80" r="15" fill="#FFD700" />
          </g>
        );
      case 'dog':
        return (
          <g>
            <circle cx="50" cy="50" r="35" fill="#8B4513" />
            <ellipse cx="35" cy="40" rx="5" ry="8" fill="#000" />
            <ellipse cx="65" cy="40" rx="5" ry="8" fill="#000" />
            <path d="M 45 60 Q 50 65 55 60" stroke="#000" strokeWidth="3" fill="none" />
            <path d="M 20 30 L 30 50 L 20 60" fill="#8B4513" />
            <path d="M 80 30 L 70 50 L 80 60" fill="#8B4513" />
          </g>
        );
      case 'cat':
        return (
          <g>
            <circle cx="50" cy="50" r="30" fill="#808080" />
            <polygon points="20,20 30,40 40,30" fill="#808080" />
            <polygon points="80,20 70,40 60,30" fill="#808080" />
            <circle cx="40" cy="45" r="3" fill="#000" />
            <circle cx="60" cy="45" r="3" fill="#000" />
            <path d="M 45 55 L 50 60 L 55 55" stroke="#000" strokeWidth="2" fill="none" />
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
      case 'tiger':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#FFA500" />
            <path d="M 30 20 L 40 10 L 50 20 L 60 10 L 70 20" stroke="#000" strokeWidth="3" />
            <path d="M 25 40 L 35 30 L 45 40" stroke="#000" strokeWidth="3" />
            <path d="M 55 40 L 65 30 L 75 40" stroke="#000" strokeWidth="3" />
            <path d="M 30 70 Q 50 85 70 70" stroke="#000" strokeWidth="3" fill="none" />
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
      case 'frog':
        return (
          <g>
            <circle cx="50" cy="50" r="35" fill="#32CD32" />
            <circle cx="35" cy="35" r="5" fill="#000" />
            <circle cx="65" cy="35" r="5" fill="#000" />
            <path d="M 30 60 Q 50 70 70 60" stroke="#000" strokeWidth="2" fill="none" />
          </g>
        );
      case 'owl':
        return (
          <g>
            <ellipse cx="50" cy="50" rx="30" ry="40" fill="#8B4513" />
            <circle cx="35" cy="40" r="10" fill="#FFF" />
            <circle cx="65" cy="40" r="10" fill="#FFF" />
            <circle cx="35" cy="40" r="3" fill="#000" />
            <circle cx="65" cy="40" r="3" fill="#000" />
            <polygon points="50,50 45,60 55,60" fill="#FFA500" />
          </g>
        );
      case 'bee':
        return (
          <g>
            <ellipse cx="50" cy="50" rx="30" ry="20" fill="#FFD700" />
            <line x1="30" y1="30" x2="30" y2="70" stroke="#000" strokeWidth="5" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="#000" strokeWidth="5" />
            <line x1="70" y1="30" x2="70" y2="70" stroke="#000" strokeWidth="5" />
            <ellipse cx="40" cy="30" rx="10" ry="15" fill="#ADD8E6" opacity="0.7" />
            <ellipse cx="60" cy="30" rx="10" ry="15" fill="#ADD8E6" opacity="0.7" />
          </g>
        );
      case 'snake':
        return (
          <g>
            <path d="M 20 80 Q 50 20 80 80" stroke="#32CD32" strokeWidth="10" fill="none" />
            <circle cx="80" cy="80" r="5" fill="#32CD32" />
            <circle cx="78" cy="78" r="1" fill="#000" />
            <circle cx="82" cy="78" r="1" fill="#000" />
          </g>
        );
      case 'whale':
        return (
          <g>
            <path d="M 10 50 Q 30 20 90 50 Q 70 80 10 50" fill="#1E90FF" />
            <circle cx="70" cy="45" r="3" fill="#FFF" />
            <path d="M 50 30 L 50 10 M 45 20 L 40 10 M 55 20 L 60 10" stroke="#ADD8E6" strokeWidth="2" />
          </g>
        );
      case 'chicken':
        return (
          <g>
            <circle cx="50" cy="50" r="30" fill="#FFF" stroke="#000" strokeWidth="1" />
            <path d="M 50 20 L 40 10 L 50 10 L 60 10 Z" fill="#FF0000" />
            <circle cx="45" cy="45" r="3" fill="#000" />
            <circle cx="65" cy="45" r="3" fill="#000" />
            <polygon points="55,55 55,65 65,60" fill="#FFA500" />
          </g>
        );
      case 'cow':
        return (
          <g>
            <circle cx="50" cy="50" r="35" fill="#FFF" stroke="#000" strokeWidth="1" />
            <circle cx="30" cy="40" r="5" fill="#000" />
            <circle cx="70" cy="60" r="8" fill="#000" />
            <circle cx="40" cy="45" r="3" fill="#000" />
            <circle cx="60" cy="45" r="3" fill="#000" />
            <ellipse cx="50" cy="65" rx="15" ry="10" fill="#FFC0CB" />
          </g>
        );
      default:
        console.warn("AnimalSVG: Fallback triggered for", name);
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
        {getAnimalPath(animal?.name)}
      </svg>
    </motion.div>
  );
};

export default AnimalSVG;
