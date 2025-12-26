import { motion } from 'motion/react';

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

interface ArchetypeBadgeProps {
  archetype: Archetype;
  size?: 'small' | 'medium' | 'large';
}

export function ArchetypeBadge({ archetype, size = 'medium' }: ArchetypeBadgeProps) {
  const sizeStyles = {
    small: {
      container: 'w-32 h-32',
      emoji: 'text-3xl',
      hexagonSize: 90
    },
    medium: {
      container: 'w-48 h-48',
      emoji: 'text-6xl',
      hexagonSize: 140
    },
    large: {
      container: 'w-96 h-96',
      emoji: 'text-9xl',
      hexagonSize: 280
    }
  };

  const styles = sizeStyles[size];

  const createHexagonPath = (size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = size / 2 + (size / 2.3) * Math.cos(angle);
      const y = size / 2 + (size / 2.3) * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <div className={`relative ${styles.container}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 blur-3xl rounded-full"
        style={{ backgroundColor: archetype.color }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          width={styles.hexagonSize}
          height={styles.hexagonSize}
          viewBox={`0 0 ${styles.hexagonSize} ${styles.hexagonSize}`}
          className="absolute"
        >
          <motion.path
            d={createHexagonPath(styles.hexagonSize)}
            fill="none"
            stroke={archetype.color}
            strokeWidth="2"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: 'blur(6px)' }}
          />
          
          <motion.path
            d={createHexagonPath(styles.hexagonSize)}
            fill="none"
            stroke={archetype.color}
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              filter: 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.4))'
            }}
          />
          
          <motion.path
            d={createHexagonPath(styles.hexagonSize)}
            fill={`${archetype.color}08`}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          {[1, 4].map((i) => {
            const angle = (Math.PI / 3) * i;
            const x = styles.hexagonSize / 2 + (styles.hexagonSize / 2.3) * Math.cos(angle);
            const y = styles.hexagonSize / 2 + (styles.hexagonSize / 2.3) * Math.sin(angle);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2.5"
                fill={archetype.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.span 
            className={styles.emoji}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 12 }}
          >
            {archetype.emoji}
          </motion.span>
        </div>
      </div>
    </div>
  );
}