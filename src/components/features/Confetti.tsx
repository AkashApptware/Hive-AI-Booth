import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { colors } from '@/utils/colors';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  delay: number;
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const confettiColors = [colors.secondary, colors.primary, colors.accent, colors.textMuted];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -20,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: '-20px',
            rotate: particle.rotation,
            opacity: 1
          }}
          animate={{
            y: '120vh',
            rotate: particle.rotation + 720,
            opacity: 0
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: 'linear'
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: particle.color }}
        />
      ))}
    </div>
  );
}