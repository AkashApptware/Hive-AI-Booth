import { motion } from 'motion/react';
import { colors } from '../../utils/colors';

 const HoneycombBackground=()=> {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle hexagonal pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="100" height="87" patternUnits="userSpaceOnUse">
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Animated glow elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.secondary}33` }}
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.primary}33` }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.accent}1A` }}
      />
    </div>
  );
}
export default HoneycombBackground