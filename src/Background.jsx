import React from 'react';
import { motion } from 'framer-motion';

const FloatingSafari = () => {
  // Fireflies (Yellow particles)
  const fireflies = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    duration: Math.random() * 10 + 10,
  }));

  // Leaves (Green particles)
  const leaves = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10, // Start above screen
    rotation: Math.random() * 360,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-orange-100 to-green-100 opacity-80" />

      {/* Fireflies */}
      {fireflies.map((fly) => (
        <motion.div
          key={`fly-${fly.id}`}
          className="absolute rounded-full bg-yellow-400 blur-sm mix-blend-screen"
          style={{
            width: fly.size,
            height: fly.size,
            left: `${fly.x}%`,
            top: `${fly.y}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: -20,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [leaf.rotation, leaf.rotation + 360],
            x: [0, 50, -50, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12 21 3 14 3 8C3 4.68629 5.68629 2 9 2C10.6569 2 12 3.5 12 3.5C12 3.5 13.3431 2 15 2C18.3137 2 21 4.68629 21 8C21 14 12 21 12 21Z" fill="#4ADE80" stroke="#166534" strokeWidth="2"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSafari;
