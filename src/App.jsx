import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { Volume2, ArrowRight, ArrowLeft } from 'lucide-react';
import { animals } from './data';
import FloatingSafari from './Background';

// --- MOTION MANIFEST: PHYSICS CONFIG ---
const expertSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1
};

const tapPhysics = { scale: 0.95 };
const hoverPhysics = { 
  scale: 1.05, 
  rotate: 2, 
  y: -5,
  boxShadow: "0px 15px 0px rgba(0,0,0,0.2)" // Hard shadow lift
};

const App = () => {
  // --- STATE ---
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(() => {
      const saved = localStorage.getItem('zoo-state');
      return saved ? JSON.parse(saved).currentAnimalIndex || 0 : 0;
  });
  const [direction, setDirection] = useState(0);
  const [gameState, setGameState] = useState('hidden'); // hidden, reveal, success
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [discoMode, setDiscoMode] = useState(false);
  const [titleTapCount, setTitleTapCount] = useState(0);

  const currentAnimal = animals[currentAnimalIndex];

  // --- LOGIC ENGINE: AUDIO & PERSISTENCE ---
  const [play, { stop }] = useSound(currentAnimal.soundUrl, { volume: 0.5 });

  // Persistence (Simulating .panodu/state.json anchor via localStorage for now)
  useEffect(() => {
    const state = { currentAnimalIndex, discoMode, gameState };
    localStorage.setItem('zoo-state', JSON.stringify(state));
    // In a real backend environment, we'd POST to an API to write to .panodu/state.json
    console.log('[State Anchor] Synced:', state); 
  }, [currentAnimalIndex, discoMode, gameState]);

  useEffect(() => {
    stop();
    setGameState('hidden');
  }, [currentAnimalIndex, stop]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (titleTapCount >= 5) {
      setDiscoMode(true);
      setTitleTapCount(0);
    }
  }, [titleTapCount]);


  // --- HANDLERS ---
  const handleNext = () => {
    setDirection(1);
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };
  
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentAnimalIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const handleReveal = () => {
    setGameState('reveal');
    play();
    setTimeout(() => setGameState('success'), 500);
  };

  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // --- ANIMATION VARIANTS ---
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? 20 : -20
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? -20 : 20
    })
  };

  // --- STICKINESS HACKS (v1.1 RE-INTEGRATION) ---
  const getAnimalAnimation = (id, state) => {
    if (state !== 'reveal' && state !== 'success') return {};
    
    switch(id) {
      case 'lion': // Screen Shake
        return {
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 }
        };
      case 'giraffe': // Neck Stretch
        return {
          scaleY: [1, 1.5, 1],
          originY: 1,
          transition: { type: "spring", stiffness: 300 }
        };
      case 'dog': // Bouncing
        return {
          y: [0, -30, 0, -15, 0],
          transition: { duration: 0.6, ease: "easeOut" }
        };
      default:
        return { 
          rotate: [0, -10, 10, 0], 
          scale: [1, 1.2, 1],
          transition: { duration: 0.5 }
        };
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center font-sans select-none ${discoMode ? 'bg-purple-900' : 'bg-orange-50'}`}>
      
      {/* 1. BACKGROUND ENGINE */}
      <FloatingSafari />
      {gameState === 'success' && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}

      {/* 2. MAIN LAYOUT */}
      <LayoutGroup>
        <motion.div 
          layout
          className="relative z-10 w-full max-w-md flex flex-col items-center gap-8 p-4"
          animate={currentAnimal.id === 'lion' && (gameState === 'reveal' || gameState === 'success') ? { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } } : {}}
        >
          
          {/* Header */}
          <motion.h1 
            layoutId="header-title"
            className={`text-5xl font-extrabold tracking-tight drop-shadow-md cursor-pointer ${discoMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500' : 'text-green-800'}`}
            onClick={() => setTitleTapCount(prev => prev + 1)}
            whileTap={{ scale: 0.9 }}
          >
            {discoMode ? '🕺 ZOO DISCO 💃' : 'Zoo-Venture'}
          </motion.h1>

          {/* 3. SQUISHY 3D CARD */}
          <div className="relative w-72 h-96 perspective-1000">
            <AnimatePresence mode='popLayout' custom={direction}>
              <motion.div
                key={currentAnimal.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={expertSpring}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) handleNext();
                  else if (swipe > swipeConfidenceThreshold) handlePrevious();
                }}
                className={`absolute inset-0 rounded-3xl flex flex-col items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing border-4 border-white/20 backdrop-blur-sm bg-gradient-to-br ${currentAnimal.color}`}
                style={{ 
                  boxShadow: "0px 10px 0px rgba(0,0,0,0.15)" // Squishy 3D Shadow base
                }}
                whileHover={hoverPhysics}
                whileTap={tapPhysics}
                onClick={() => {
                    if (gameState === 'hidden') handleReveal();
                    else play();
                }}
              >
                
                {/* Animal Icon */}
                <motion.div 
                  layoutId={`animal-icon-${currentAnimal.id}`}
                  className="text-9xl filter drop-shadow-lg z-20 relative"
                  animate={getAnimalAnimation(currentAnimal.id, gameState)}
                >
                  {currentAnimal.icon}

                  {/* Elephant Water Particles */}
                  {currentAnimal.id === 'elephant' && (gameState === 'reveal' || gameState === 'success') && (
                    <motion.svg 
                      viewBox="0 0 100 100" 
                      className="absolute -top-10 -right-10 w-24 h-24 pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.circle 
                          key={i}
                          cx="50" cy="50" r="5" 
                          fill="#60a5fa"
                          initial={{ x: 0, y: 0 }}
                          animate={{ 
                            x: (Math.random() - 0.5) * 100, 
                            y: -Math.random() * 100,
                            opacity: [1, 0]
                          }}
                          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                        />
                      ))}
                    </motion.svg>
                  )}

                  {/* Cat Yarn Ball */}
                  {currentAnimal.id === 'cat' && (gameState === 'reveal' || gameState === 'success') && (
                    <motion.div
                       className="absolute -bottom-2 -right-4 text-4xl"
                       initial={{ x: -50, rotate: 0 }}
                       animate={{ x: 0, rotate: 360 }}
                       transition={{ duration: 1, type: 'spring' }}
                    >
                      🧶
                    </motion.div>
                  )}
                </motion.div>

                {/* Name Reveal */}
                <AnimatePresence>
                  {(gameState === 'reveal' || gameState === 'success') && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute bottom-8 bg-white px-6 py-2 rounded-full shadow-lg border-2 border-green-100"
                    >
                      <h2 className="text-3xl font-black text-gray-800 tracking-wide">{currentAnimal.name}</h2>
                    </motion.div>
                  )}
                </AnimatePresence>

                 {/* Tap Hint Overlay (when hidden) */}
                 {gameState === 'hidden' && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-3xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-white font-bold text-xl drop-shadow-md">Tap to Reveal!</span>
                    </motion.div>
                 )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4. CONTROLS */}
          <motion.div 
            layout 
            className="flex items-center gap-6 mt-4 z-20"
          >
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="p-4 rounded-full bg-white/80 shadow-lg text-green-700 hover:text-green-900 transition-colors border-b-4 border-green-200 active:border-b-0 active:translate-y-1"
            >
              <ArrowLeft size={24} strokeWidth={3} />
            </motion.button>

            <motion.button
              layoutId="play-button"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => play()}
              className="p-6 rounded-full bg-green-500 shadow-xl text-white border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
            >
              <Volume2 size={32} strokeWidth={3} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-4 rounded-full bg-white/80 shadow-lg text-green-700 hover:text-green-900 transition-colors border-b-4 border-green-200 active:border-b-0 active:translate-y-1"
            >
              <ArrowRight size={24} strokeWidth={3} />
            </motion.button>
          </motion.div>

          <motion.p 
            layout
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.6 }}
            className="text-green-900 font-semibold text-sm bg-white/40 px-4 py-1 rounded-full"
          >
            {gameState === 'hidden' ? 'Tap the card to reveal!' : 'Listen & Learn!'}
          </motion.p>

        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default App;
