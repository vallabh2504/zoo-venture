import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { animals } from './data';
import { Volume2, Check, X, RefreshCw } from 'lucide-react';

const App = () => {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [gameState, setGameState] = useState('hidden'); // hidden, reveal, success
  const [showAdmin, setShowAdmin] = useState(false);
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
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };

  const handleReveal = () => {
    setGameState('reveal');
    play(); // Play sound on reveal or button click? Let's play on reveal.
  };

  const handleSuccess = () => {
    setGameState('success');
    play(); // Play again for celebration
  };

  const handleFail = () => {
    // Just reset or shake? Let's just reset to hidden for retry.
    setGameState('hidden');
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
        <h1 className="text-4xl font-extrabold text-green-900 drop-shadow-sm font-serif">Zoo-Venture 🦁</h1>

        {/* Animal Card */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentAnimal.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`w-64 h-64 rounded-2xl bg-gradient-to-tr ${currentAnimal.color} flex items-center justify-center shadow-inner relative overflow-hidden`}
          >
             <motion.div
               animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-9xl filter drop-shadow-lg cursor-pointer"
               onClick={() => play()}
             >
               {currentAnimal.icon}
             </motion.div>
             
             {/* Name Overlay (Hidden initially) */}
             {gameState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg"
                >
                  <span className="text-2xl font-bold text-gray-800">{currentAnimal.name}</span>
                </motion.div>
             )}
          </motion.div>
        </AnimatePresence>

        {/* Action Area */}
        <div className="w-full text-center space-y-4">
           {gameState === 'hidden' && (
             <p className="text-xl text-green-800 font-medium">Who is this hiding friend?</p>
           )}
           
           {gameState === 'reveal' && (
             <p className="text-xl text-green-800 font-bold animate-pulse">Mimic the sound!</p>
           )}

           <motion.button
             whileTap={{ scale: 0.95 }}
             onClick={() => play()}
             className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors"
           >
             <Volume2 size={32} />
           </motion.button>
        </div>

        {/* Secret Admin Toggle Area (Top Right Corner invisible) */}
        <div 
          className="absolute top-4 right-4 w-10 h-10 opacity-0 cursor-default"
          onClick={() => setShowAdmin(!showAdmin)} 
        />

        {/* Admin Controls */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-white/40 rounded-xl p-4 mt-4 space-y-2 border border-white/40"
            >
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider text-center mb-2">Game Master</h3>
              
              <div className="flex gap-4 justify-center">
                {gameState === 'hidden' && (
                   <button 
                     onClick={handleReveal}
                     className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-600 flex-1"
                   >
                     Reveal Sound
                   </button>
                )}

                {gameState === 'reveal' && (
                  <>
                    <button 
                      onClick={handleFail}
                      className="bg-red-400 text-white p-3 rounded-full hover:bg-red-500 shadow-sm"
                    >
                      <X size={24} />
                    </button>
                    <button 
                      onClick={handleSuccess}
                      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 shadow-lg scale-110"
                    >
                      <Check size={24} />
                    </button>
                  </>
                )}

                {gameState === 'success' && (
                  <button 
                    onClick={handleNext}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-purple-600 flex items-center gap-2"
                  >
                    Next Animal <RefreshCw size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="absolute bottom-4 text-green-800/50 text-xs font-mono">
        Admin Toggle: Top Right Corner
      </div>
    </div>
  );
};

export default App;
