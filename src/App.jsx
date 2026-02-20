import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { animals } from './data';
import { Volume2 } from 'lucide-react';

const App = () => {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [gameState, setGameState] = useState('hidden'); // hidden, reveal, success
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const currentAnimal = animals[currentAnimalIndex];
  
  // Force re-mount of sound hook when animal changes
  const [play, { stop }] = useSound(currentAnimal.soundUrl, { volume: 0.5 });

  // Reset state when animal changes
  useEffect(() => {
    stop();
    setGameState('hidden');
  }, [currentAnimalIndex, stop]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };
  
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentAnimalIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const handleReveal = () => {
    setGameState('reveal');
    play();
    // Celebrate!
    setTimeout(() => setGameState('success'), 500);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-yellow-200 to-green-300 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {gameState === 'success' && <Confetti width={windowSize.width} height={windowSize.height} />}

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-6"
      >
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-green-900 drop-shadow-sm font-serif select-none">Zoo-Venture 🦁</h1>

        {/* Animal Card */}
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentAnimal.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrevious();
              }
            }}
            className={`w-64 h-64 rounded-2xl bg-gradient-to-tr ${currentAnimal.color} flex items-center justify-center shadow-inner relative overflow-hidden touch-none cursor-grab active:cursor-grabbing`}
            onClick={() => {
                if (gameState === 'hidden') handleReveal();
                else play();
            }}
          >
             <motion.div
               animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-9xl filter drop-shadow-lg select-none pointer-events-none"
             >
               {currentAnimal.icon}
             </motion.div>
             
             {/* Name Overlay (Hidden initially) */}
             {(gameState === 'reveal' || gameState === 'success') && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg pointer-events-none"
                >
                  <span className="text-2xl font-bold text-gray-800">{currentAnimal.name}</span>
                </motion.div>
             )}
          </motion.div>
        </AnimatePresence>

        {/* Action Area */}
        <div className="w-full text-center space-y-4 flex flex-col items-center">
           {gameState === 'hidden' && (
             <p className="text-xl text-green-800 font-medium select-none">Who is this hiding friend?</p>
           )}
           
           {(gameState === 'reveal' || gameState === 'success') && (
             <p className="text-xl text-green-800 font-bold animate-pulse select-none">Mimic the sound!</p>
           )}

           <motion.button
             whileTap={{ scale: 0.95 }}
             onClick={() => play()}
             className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors mb-6 z-10"
             aria-label="Play Sound"
           >
             <Volume2 size={32} />
           </motion.button>

           {gameState === 'hidden' && (
             <motion.button
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleReveal}
               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full shadow-md transition-colors"
             >
               Reveal
             </motion.button>
           )}

           {(gameState === 'reveal' || gameState === 'success') && (
              <p className="text-sm text-green-800/60 font-medium animate-pulse select-none mt-4">Swipe card to next animal</p>
           )}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
