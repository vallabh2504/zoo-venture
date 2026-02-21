import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animals } from './data';
import AnimalSVG from './AnimalSVG';

const App = () => {
  const [collectedAnimals, setCollectedAnimals] = useState([]);
  const [showTrophyRoom, setShowTrophyRoom] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null);

  // Load progress from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zooVentureCollected');
    if (saved) {
      setCollectedAnimals(JSON.parse(saved));
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('zooVentureCollected', JSON.stringify(collectedAnimals));
  }, [collectedAnimals]);

  const handleCollect = (id) => {
    if (!collectedAnimals.includes(id)) {
      setCollectedAnimals(prev => [...prev, id]);
      // Optional: Add a celebration effect here
    }
  };

  // Find an animal that hasn't been collected yet to display in the wild
  // If all collected, show a random one
  const getWildAnimal = () => {
    const uncollected = animals.filter(a => !collectedAnimals.includes(a.id));
    if (uncollected.length > 0) {
      return uncollected[Math.floor(Math.random() * uncollected.length)];
    }
    return animals[Math.floor(Math.random() * animals.length)];
  };

  useEffect(() => {
    setCurrentAnimal(getWildAnimal());
  }, [collectedAnimals]); // Update wild animal when one is collected

  return (
    <div className="min-h-screen bg-green-100 font-sans text-gray-800 overflow-hidden relative">
      <header className="p-4 bg-green-600 text-white shadow-md flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-bold tracking-tight">Zoo-Venture 🦁</h1>
        <button
          onClick={() => setShowTrophyRoom(!showTrophyRoom)}
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded-full shadow transition-transform transform hover:scale-105"
        >
          {showTrophyRoom ? 'Go Explore' : 'Trophy Room'}
        </button>
      </header>

      <main className="container mx-auto p-4 h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {showTrophyRoom ? (
            <motion.div
              key="trophy-room"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-xl p-6 h-full overflow-y-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-green-800 border-b-2 border-green-200 pb-2">
                My TrophyRoom ({collectedAnimals.length}/{animals.length})
              </h2>
              
              {collectedAnimals.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <p className="text-xl">You haven't found any animals yet!</p>
                  <button 
                    onClick={() => setShowTrophyRoom(false)}
                    className="mt-4 text-green-600 underline"
                  >
                    Go find some!
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {animals.filter(a => collectedAnimals.includes(a.id)).map(animal => (
                    <div key={animal.id} className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
                      <div className="w-24 h-24 mb-2">
                        <AnimalSVG type={animal.type} />
                      </div>
                      <span className="font-bold text-lg capitalize">{animal.name}</span>
                      <span className="text-xs text-green-600 bg-green-200 px-2 py-1 rounded-full mt-1">{animal.rarity || 'Common'}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="wild"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center h-full relative"
            >
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <h2 className="text-4xl font-extrabold text-green-800 mb-8 z-10 drop-shadow-sm">
                Spot the Animal!
              </h2>

              {currentAnimal && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer bg-white p-8 rounded-full shadow-2xl border-4 border-yellow-400 relative z-10 group"
                  onClick={() => handleCollect(currentAnimal.id)}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64">
                    <AnimalSVG type={currentAnimal.type} />
                  </div>
                  
                  {!collectedAnimals.includes(currentAnimal.id) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-12 left-0 right-0 text-center"
                    >
                      <span className="bg-yellow-400 text-green-900 px-4 py-1 rounded-full font-bold shadow-md animate-bounce">
                        CLICK TO COLLECT!
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              <p className="mt-12 text-green-700 text-lg max-w-md text-center bg-white/80 p-4 rounded-lg shadow-sm">
                Explore the wilderness and click on animals to add them to your collection!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
