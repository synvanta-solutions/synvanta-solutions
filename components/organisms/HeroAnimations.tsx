"use client";

// HeroAnimations.tsx — Client Component
// Contains ONLY the JS-dependent visual effects (moving orbs, random particles).
// Kept separate so Hero.tsx (with the h1) stays a Server Component.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function HeroAnimations() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-primary/40 to-secondary/40 rounded-full filter blur-3xl opacity-30"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-secondary/30 to-primary/30 rounded-full filter blur-3xl opacity-20"
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 2 === 0 ? "bg-primary" : "bg-secondary"
            }`}
            initial={{ x: particle.x, y: particle.y }}
            animate={{ y: [null, -100, -200], opacity: [0, 1, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
