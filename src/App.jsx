import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { animals } from './data';
import AnimalSVG from './AnimalSVG';

const App = () => {
  const [collectedAnimals, setCollectedAnimals] = useState([]);
  const [showTrophyRoom, setShowTrophyRoom] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('zooVentureCollected_v2');
    if (saved) {
      setCollectedAnimals(JSON.parse(saved));
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('zooVentureCollected_v2', JSON.stringify(collectedAnimals));
  }, [collectedAnimals]);

  const getWildAnimal = useCallback(() => {
    const uncollected = animals.filter(a => !collectedAnimals.includes(a.id));
    if (uncollected.length > 0) {
      return uncollected[Math.floor(Math.random() * uncollected.length)];
    }
    // If all collected, show any
    return animals[Math.floor(Math.random() * animals.length)];
  }, [collectedAnimals]);

  useEffect(() => {
    if (!currentAnimal && animals.length > 0) {
      setCurrentAnimal(getWildAnimal());
    }
  }, [currentAnimal, getWildAnimal]);

  const handleCollect = (id) => {
    if (celebrating) return;

    const isNew = !collectedAnimals.includes(id);
    if (isNew) {
      setCollectedAnimals(prev => [...prev, id]);
    }

    setCelebrating(true);
    
    // Play a "success" sound or just trigger animation
    setTimeout(() => {
      setCelebrating(false);
      setCurrentAnimal(getWildAnimal());
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-[#f0f9ff] font-sans text-slate-800 overflow-hidden flex flex-col">
      {celebrating && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.2}
        />
      )}

      {/* Header */}
      <header className="shrink-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <h1 className="text-xl font-black text-emerald-600 uppercase tracking-tighter">Zoo Venture</h1>
        </div>
        <button
          onClick={() => setShowTrophyRoom(!showTrophyRoom)}
          className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-2 px-6 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
        >
          {showTrophyRoom ? '🗺️ Explore' : '🏆 Trophies'}
        </button>
      </header>

      {/* Main Content */}
      <main className="grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showTrophyRoom ? (
            <motion.div
              key="trophy-room"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 p-4 md:p-8 overflow-y-auto"
            >
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 leading-none">Your Collection</h2>
                    <p className="text-slate-500 font-medium mt-2">You have spotted {collectedAnimals.length} out of {animals.length} animals!</p>
                  </div>
                  <div className="h-4 grow bg-slate-200 rounded-full overflow-hidden max-w-xs">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(collectedAnimals.length / animals.length) * 100}%` }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {animals.map(animal => {
                    const isCollected = collectedAnimals.includes(animal.id);
                    return (
                      <motion.div
                        key={animal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`relative aspect-square rounded-3xl p-4 flex flex-col items-center justify-center transition-all ${
                          isCollected 
                            ? 'bg-white shadow-xl shadow-slate-200/50 border-2 border-emerald-100' 
                            : 'bg-slate-100 border-2 border-dashed border-slate-200'
                        }`}
                      >
                        <div className="w-full h-full mb-2">
                          <AnimalSVG animal={animal} isCollected={isCollected} />
                        </div>
                        <span className={`text-sm font-bold truncate w-full text-center ${isCollected ? 'text-slate-800' : 'text-slate-400'}`}>
                          {isCollected ? animal.name : '???'}
                        </span>
                        {isCollected && (
                           <div className="absolute top-2 right-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black">
                            ✓
                           </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wild"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                  {celebrating ? "AWESOME! 🎉" : "LOOK AROUND!"}
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium">
                  {celebrating ? "You just spotted a new friend!" : "Can you find the hidden animal?"}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {currentAnimal && !celebrating && (
                  <motion.div
                    key={currentAnimal.id}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 20 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCollect(currentAnimal.id)}
                    className="relative cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-[4rem] shadow-2xl shadow-emerald-200 border-8 border-white flex items-center justify-center p-8">
                      <AnimalSVG animal={currentAnimal} isCollected={true} />
                    </div>
                    
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -bottom-16 left-0 right-0 text-center"
                    >
                      <span className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
                        Tap to collect
                      </span>
                    </motion.div>
                  </motion.div>
                )}

                {celebrating && currentAnimal && (
                  <motion.div
                    key="celebration"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-80 h-80">
                       <AnimalSVG animal={currentAnimal} isCollected={true} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 bg-white p-6 rounded-3xl shadow-xl border-2 border-emerald-100 max-w-sm text-center"
                    >
                      <h3 className="text-2xl font-black text-emerald-600 mb-2 uppercase">{currentAnimal.name}</h3>
                      <p className="text-slate-600 font-medium italic">"{currentAnimal.fact}"</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
};

export default App;
