import React from 'react';
import { motion } from 'framer-motion';

const AnimalSVG = ({ animal, isCollected }) => {
  const name = animal?.name?.toLowerCase();

  const renderAnimal = () => {
    switch (name) {
      case 'lion':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#f49c12" /> {/* Mane */}
            <circle cx="50" cy="52" r="35" fill="#f1c40f" /> {/* Face */}
            <motion.circle 
              cx="40" cy="45" r="3" fill="#2c3e50" 
              animate={{ scaleY: [1, 0.1, 1] }} 
              transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
            />
            <motion.circle 
              cx="60" cy="45" r="3" fill="#2c3e50"
              animate={{ scaleY: [1, 0.1, 1] }} 
              transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
            />
            <path d="M48 55 L52 55 L50 58 Z" fill="#e74c3c" /> {/* Nose */}
            <path d="M45 62 Q50 68 55 62" stroke="#2c3e50" strokeWidth="2" fill="none" />
          </g>
        );
      case 'elephant':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#95a5a6" />
            <circle cx="20" cy="40" r="15" fill="#7f8c8d" /> {/* Left Ear */}
            <circle cx="80" cy="40" r="15" fill="#7f8c8d" /> {/* Right Ear */}
            <circle cx="40" cy="45" r="3" fill="#2c3e50" />
            <circle cx="60" cy="45" r="3" fill="#2c3e50" />
            <motion.path 
              d="M50 55 Q50 85 65 80" 
              stroke="#95a5a6" strokeWidth="8" fill="none" strokeLinecap="round"
              animate={{ d: ["M50 55 Q50 85 65 80", "M50 55 Q50 85 45 80", "M50 55 Q50 85 65 80"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </g>
        );
      case 'giraffe':
        return (
          <g>
            <rect x="42" y="20" width="16" height="70" rx="8" fill="#f1c40f" />
            <circle cx="50" cy="25" r="15" fill="#f1c40f" />
            <circle cx="45" cy="22" r="2" fill="#2c3e50" />
            <circle cx="55" cy="22" r="2" fill="#2c3e50" />
            <circle cx="46" cy="45" r="4" fill="#d35400" />
            <circle cx="54" cy="60" r="4" fill="#d35400" />
            <circle cx="48" cy="75" r="4" fill="#d35400" />
            <motion.path 
              d="M45 12 L43 5 M55 12 L57 5" 
              stroke="#d35400" strokeWidth="3" 
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>
        );
      case 'dog':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#e67e22" />
            <motion.path 
              d="M20 30 Q15 50 25 60" fill="#d35400" 
              animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.path 
              d="M80 30 Q85 50 75 60" fill="#d35400"
              animate={{ rotate: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <circle cx="40" cy="45" r="3" fill="#2c3e50" />
            <circle cx="60" cy="45" r="3" fill="#2c3e50" />
            <ellipse cx="50" cy="55" rx="5" ry="3" fill="#2c3e50" />
            <motion.path 
              d="M48 65 Q50 70 52 65" fill="#ff7979"
              animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </g>
        );
      case 'cat':
        return (
          <g>
            <circle cx="50" cy="55" r="35" fill="#bdc3c7" />
            <path d="M25 35 L35 55 L15 55 Z" fill="#bdc3c7" />
            <path d="M75 35 L65 55 L85 55 Z" fill="#bdc3c7" />
            <circle cx="40" cy="50" r="3" fill="#2c3e50" />
            <circle cx="60" cy="50" r="3" fill="#2c3e50" />
            <circle cx="50" cy="60" r="2" fill="#ff7979" />
            <motion.path 
              d="M30 60 L10 60 M30 65 L10 70 M70 60 L90 60 M70 65 L90 70" 
              stroke="#ecf0f1" strokeWidth="1"
              animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>
        );
      case 'monkey':
        return (
          <g>
            <circle cx="20" cy="50" r="10" fill="#8e44ad" />
            <circle cx="80" cy="50" r="10" fill="#8e44ad" />
            <circle cx="50" cy="50" r="40" fill="#8e44ad" />
            <ellipse cx="50" cy="55" rx="30" ry="25" fill="#d1d8e0" />
            <circle cx="40" cy="45" r="3" fill="#2c3e50" />
            <circle cx="60" cy="45" r="3" fill="#2c3e50" />
            <motion.path 
              d="M40 65 Q50 75 60 65" stroke="#2c3e50" strokeWidth="2" fill="none"
              animate={{ scaleX: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>
        );
      case 'tiger':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#e67e22" />
            <path d="M50 10 L50 25 M30 20 L40 30 M70 20 L60 30 M20 50 L35 50 M80 50 L65 50" stroke="#2c3e50" strokeWidth="4" />
            <circle cx="40" cy="45" r="4" fill="#2c3e50" />
            <circle cx="60" cy="45" r="4" fill="#2c3e50" />
            <path d="M48 55 L52 55 L50 58 Z" fill="#2c3e50" />
            <motion.path 
              d="M40 65 Q50 75 60 65" stroke="#2c3e50" strokeWidth="2" fill="none"
              animate={{ d: ["M40 65 Q50 75 60 65", "M40 68 Q50 72 60 68", "M40 65 Q50 75 60 65"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </g>
        );
      case 'penguin':
        return (
          <g>
            <ellipse cx="50" cy="55" rx="30" ry="40" fill="#2c3e50" />
            <ellipse cx="50" cy="60" rx="20" ry="30" fill="#ecf0f1" />
            <circle cx="42" cy="40" r="3" fill="#ecf0f1" />
            <circle cx="58" cy="40" r="3" fill="#ecf0f1" />
            <motion.path 
              d="M47 50 L53 50 L50 56 Z" fill="#f39c12"
              animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.path 
              d="M20 50 Q10 60 20 70" fill="#2c3e50"
              animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.path 
              d="M80 50 Q90 60 80 70" fill="#2c3e50"
              animate={{ rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            />
          </g>
        );
      case 'frog':
        return (
          <g>
            <circle cx="50" cy="55" r="35" fill="#2ecc71" />
            <motion.circle cx="35" cy="30" r="10" fill="#2ecc71" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.circle cx="65" cy="30" r="10" fill="#2ecc71" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            <circle cx="35" cy="30" r="4" fill="#2c3e50" />
            <circle cx="65" cy="30" r="4" fill="#2c3e50" />
            <motion.path 
              d="M35 65 Q50 75 65 65" stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"
              animate={{ d: ["M35 65 Q50 75 65 65", "M30 60 Q50 85 70 60", "M35 65 Q50 75 65 65"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </g>
        );
      case 'owl':
        return (
          <g>
            <ellipse cx="50" cy="55" rx="35" ry="40" fill="#7f8c8d" />
            <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4 }}>
              <circle cx="35" cy="45" r="12" fill="#ecf0f1" />
              <circle cx="65" cy="45" r="12" fill="#ecf0f1" />
              <circle cx="35" cy="45" r="5" fill="#2c3e50" />
              <circle cx="65" cy="45" r="5" fill="#2c3e50" />
            </motion.g>
            <path d="M47 55 L53 55 L50 65 Z" fill="#e67e22" />
          </g>
        );
      case 'bee':
        return (
          <g>
            <motion.g animate={{ y: [-2, 2, -2], x: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 0.1 }}>
              <ellipse cx="50" cy="50" rx="35" ry="25" fill="#f1c40f" />
              <path d="M35 27 L35 73 M50 25 L50 75 M65 27 L65 73" stroke="#2c3e50" strokeWidth="8" />
              <circle cx="75" cy="45" r="3" fill="#2c3e50" />
              <circle cx="85" cy="45" r="3" fill="#2c3e50" />
              <motion.ellipse 
                cx="45" cy="25" rx="15" ry="10" fill="#ecf0f1" opacity="0.6"
                animate={{ rotate: [-20, -40, -20] }} transition={{ repeat: Infinity, duration: 0.1 }}
              />
              <motion.ellipse 
                cx="55" cy="25" rx="15" ry="10" fill="#ecf0f1" opacity="0.6"
                animate={{ rotate: [20, 40, 20] }} transition={{ repeat: Infinity, duration: 0.1 }}
              />
            </motion.g>
          </g>
        );
      case 'snake':
        return (
          <g>
            <motion.path 
              d="M20 70 Q35 40 50 70 T80 70" 
              stroke="#27ae60" strokeWidth="10" fill="none" strokeLinecap="round"
              animate={{ d: ["M20 70 Q35 40 50 70 T80 70", "M20 70 Q35 80 50 70 T80 70", "M20 70 Q35 40 50 70 T80 70"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <circle cx="85" cy="65" r="8" fill="#27ae60" />
            <circle cx="87" cy="63" r="1.5" fill="#2c3e50" />
            <motion.path d="M92 65 L100 65 L98 63 M100 65 L98 67" stroke="#e74c3c" strokeWidth="1" fill="none" 
              animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}
            />
          </g>
        );
      case 'whale':
        return (
          <g>
            <path d="M10 60 Q10 30 50 30 Q90 30 90 60 Q90 80 50 80 Q10 80 10 60" fill="#3498db" />
            <path d="M90 60 L100 50 L100 70 Z" fill="#2980b9" />
            <circle cx="30" cy="50" r="3" fill="#ecf0f1" />
            <motion.g animate={{ y: [-10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <path d="M50 30 L50 20 M45 25 L40 15 M55 25 L60 15" stroke="#ecf0f1" strokeWidth="2" opacity="0.6" />
            </motion.g>
          </g>
        );
      case 'chicken':
        return (
          <g>
            <circle cx="50" cy="55" r="35" fill="#ecf0f1" />
            <path d="M50 20 Q55 10 60 20" fill="#e74c3c" />
            <circle cx="40" cy="45" r="3" fill="#2c3e50" />
            <circle cx="60" cy="45" r="3" fill="#2c3e50" />
            <motion.path 
              d="M48 55 L55 55 L51 62 Z" fill="#f1c40f"
              animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            />
            <path d="M50 65 Q50 70 45 75 M55 65 Q55 70 60 75" stroke="#f1c40f" strokeWidth="2" />
          </g>
        );
      case 'cow':
        return (
          <g>
            <circle cx="50" cy="50" r="40" fill="#ecf0f1" />
            <circle cx="30" cy="35" r="10" fill="#2c3e50" />
            <circle cx="65" cy="60" r="12" fill="#2c3e50" />
            <ellipse cx="50" cy="65" rx="20" ry="15" fill="#ff7979" opacity="0.4" />
            <circle cx="45" cy="65" r="2" fill="#2c3e50" />
            <circle cx="55" cy="65" r="2" fill="#2c3e50" />
            <circle cx="40" cy="45" r="3" fill="#2c3e50" />
            <circle cx="60" cy="45" r="3" fill="#2c3e50" />
            <motion.path 
              d="M15 40 Q10 30 20 25" stroke="#bdc3c7" strokeWidth="5" fill="none"
              animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.path 
              d="M85 40 Q90 30 80 25" stroke="#bdc3c7" strokeWidth="5" fill="none"
              animate={{ rotate: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3 }}
            />
          </g>
        );
      default:
        return <text x="25" y="60" fontSize="40">❓</text>;
    }
  };

  const variants = {
    idle: { 
      y: [0, -5, 0],
      rotate: [0, 1, -1, 0],
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
    },
    hover: { scale: 1.1, rotate: 2 },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div
      variants={variants}
      animate="idle"
      whileHover="hover"
      whileTap="tap"
      className="w-full h-full flex items-center justify-center"
      style={{
        filter: isCollected ? 'none' : 'grayscale(100%) brightness(0.8)',
        opacity: isCollected ? 1 : 0.6
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {renderAnimal()}
      </svg>
    </motion.div>
  );
};

export default AnimalSVG;
