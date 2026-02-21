
import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartHandshake,  // Using a generic icon for some animals, will replace as needed
  Dog, Cat, Monkey, Penguin, Frog, Shell,  // Shell for Whale placeholder
  Bird, Bee, Snake,  // Snake, Bee, Frog, Penguin, Cat, Dog are direct
  Leaf, // for Giraffe (neck/leaf eating)
  Feather, // For Chicken
  Droplet, // For Cow (milk)
  PawPrint, // For Lion, Tiger
  TreePine, // For Elephant
  Tent, // For Owl (night/eyes)
  Fish, // for Penguin (fish icon for its food)
} from 'lucide-react';

// Custom SVG for Whale (simplified, can be more complex)
const WhaleSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 11.5a10 10 0 0 1 18 0v.5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-.5a8 8 0 0 0-10-8Z"/>
    <path d="M17 14c-.3-.8-.5-1.6-.5-2.5"/>
    <path d="M16 17a5 5 0 0 1-5 5H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h5a5 5 0 0 1 5 5Z"/>
    <path d="M22 12c0 2.76-3.13 5-7 5s-7-2.24-7-5"/>
  </svg>
);

// Custom SVG for Snake (simplified S-curve path)
const SnakeSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15c1.5-1.5 3.5-2 5-2 3 0 5 2 8 2s5-2 5-2" />
    <path d="M20 7c-1.5 1.5-3.5 2-5 2-3 0-5-2-8-2s-5 2-5 2" />
  </svg>
);

// Custom SVG for Frog (simplified)
const FrogSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="3" />
    <path d="M9 11l-2-2m6 0l2-2"/>
    <path d="M9 17l-1 2m6 0l1-2"/>
    <path d="M5 14h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1"/>
    <path d="M19 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/>
  </svg>
);

// Custom SVG for Bee (simplified)
const BeeSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
    <path d="M12 2v2m0 16v2"/>
    <path d="M5 9l-1 1m16-1l1 1"/>
    <path d="M4 14l1 1m16-1l-1 1"/>
    <path d="M8 8a6 6 0 0 1 8 0"/>
    <path d="M8 16a6 6 0 0 0 8 0"/>
  </svg>
);

// Custom SVG for Monkey (simplified, for swinging)
const MonkeySVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M8 12c-2.5 0-4 1-4 3s1.5 3 4 3"/>
    <path d="M16 12c2.5 0 4 1 4 3s-1.5 3-4 3"/>
    <path d="M10 14h4"/>
  </svg>
);

// Custom SVG for Owl (simplified)
const OwlSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L6 8h12z"/>
    <circle cx="9" cy="13" r="2"/>
    <circle cx="15" cy="13" r="2"/>
    <path d="M12 15s-2 2-2 4 2 3 2 3 2-1 2-3-2-4-2-4z"/>
    <path d="M2 16h20"/>
  </svg>
);

// Custom SVG for Chicken (simplified)
const ChickenSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12s-1 1-1 3 1 3 1 3h3s1-1 1-3-1-3-1-3z"/>
    <path d="M18 12s1 1 1 3-1 3-1 3h-3s-1-1-1-3 1-3 1-3z"/>
    <path d="M12 4v8m-3-4l-1-2m4 2l1-2"/>
    <path d="M12 16s-2 2-2 4 2 2 2 2 2-2 2-4-2-2-2-2z"/>
  </svg>
);

// Custom SVG for Cow (simplified)
const CowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeStrokeLinejoin="round">
    <path d="M10 9l-2-2-2 2"/>
    <path d="M14 9l2-2 2 2"/>
    <circle cx="8" cy="12" r="2"/>
    <circle cx="16" cy="12" r="2"/>
    <path d="M12 14v4m-2 0h4m-2-4v0a2 2 0 0 0 2 2 2 2 0 0 0 2-2"/>
    <path d="M12 2L8 5h8z"/>
  </svg>
);


const AnimalSVG = ({ animalName, isRevealed, discoMode }) => {
  const commonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    disco: {
      scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
      rotate: [0, 10, -10, 5, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const animationProps = (customVariants) => ({
    variants: { ...commonVariants, ...customVariants },
    initial: "hidden",
    animate: isRevealed ? (discoMode ? "disco" : "visible") : "hidden",
    whileHover: { scale: 1.1, rotate: 5 },
  });

  const getAnimalComponent = () => {
    switch (animalName) {
      case 'Lion':
      case 'Tiger':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, y: [0, -10, 0], transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <PawPrint size={64} />
          </motion.div>
        );
      case 'Elephant':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, x: [0, 5, -5, 0], transition: { duration: 1, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <TreePine size={64} /> {/* Placeholder for elephant head/trunk */}
          </motion.div>
        );
      case 'Giraffe':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, y: [0, -15, 0], transition: { duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeOut" } }
          })}>
            <Leaf size={64} /> {/* Placeholder for giraffe neck */}
          </motion.div>
        );
      case 'Dog':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, rotate: [0, 5, -5, 0], transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <Dog size={64} />
          </motion.div>
        );
      case 'Cat':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, x: [0, 3, -3, 0], transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <Cat size={64} />
          </motion.div>
        );
      case 'Monkey':
        // Swinging animation
        return (
          <motion.div
            {...animationProps({
              visible: {
                ...commonVariants.visible,
                rotate: [0, 20, -20, 0],
                x: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }
            })}
            style={{ originY: 0 }} // Swing from the top
          >
            <MonkeySVG size={64} />
          </motion.div>
        );
      case 'Penguin':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, y: [0, -5, 0], rotate: [0, 2, -2, 0], transition: { duration: 0.9, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <Penguin size={64} />
          </motion.div>
        );
      case 'Frog':
        // Jump/Leap animation
        return (
          <motion.div {...animationProps({
            visible: {
              ...commonVariants.visible,
              y: [0, -40, 0], // Jump up
              scaleY: [1, 0.8, 1.2, 1], // Squish and stretch
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeOut"
              }
            }
          })}>
            <FrogSVG size={64} />
          </motion.div>
        );
      case 'Owl':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, rotate: [0, -5, 5, 0], transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <OwlSVG size={64} />
          </motion.div>
        );
      case 'Bee':
        // Vibration/Flight path
        return (
          <motion.div {...animationProps({
            visible: {
              ...commonVariants.visible,
              x: [0, 10, -10, 5, -5, 0],
              y: [0, -5, 5, -3, 3, 0],
              rotate: [0, 5, -5, 3, -3, 0],
              transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          })}>
            <BeeSVG size={64} />
          </motion.div>
        );
      case 'Snake':
        // Realistic slither path (S-curve)
        return (
          <motion.div {...animationProps({
            visible: {
              ...commonVariants.visible,
              x: [0, 10, -10, 0],
              rotate: [0, 10, -10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }
          })}>
            <SnakeSVG size={64} />
          </motion.div>
        );
      case 'Whale':
        // Floating/swimming motion
        return (
          <motion.div {...animationProps({
            visible: {
              ...commonVariants.visible,
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }
          })}>
            <WhaleSVG size={64} />
          </motion.div>
        );
      case 'Chicken':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, y: [0, -8, 0], rotate: [0, 3, -3, 0], transition: { duration: 0.7, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <ChickenSVG size={64} />
          </motion.div>
        );
      case 'Cow':
        return (
          <motion.div {...animationProps({
            visible: { ...commonVariants.visible, rotate: [0, -2, 2, 0], transition: { duration: 1.8, repeat: Infinity, repeatType: "reverse" } }
          })}>
            <CowSVG size={64} />
          </motion.div>
        );
      default:
        return (
          <motion.div {...animationProps()}>
            <HeartHandshake size={64} /> {/* Default fallback icon */}
          </motion.div>
        );
    }
  };

  return getAnimalComponent();
};

export default AnimalSVG;
