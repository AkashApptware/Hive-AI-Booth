import React from "react";
import { motion } from "motion/react";
import { Button } from '@/components';
import { ArchetypeBadge } from '@/components/features';
import { colors } from '@/utils/colors';

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

interface HiveWallProps {
  selectedArchetype?: Archetype | null;
  onReset?: () => void;
}

const allArchetypes: Archetype[] = [
  {
    name: "The Perfectionist",
    emoji: "🎯",
    description: "You obsess over every pixel and detail. Nothing escapes your critical eye.",
    color: "#FFB347"
  },
  {
    name: "The Innovator",
    emoji: "💡",
    description: "You break boundaries and create something entirely new every time.",
    color: "#1E88E5"
  },
  {
    name: "The Collaborator",
    emoji: "🤝",
    description: "You thrive in team environments and bring out the best in others.",
    color: "#E9A86A"
  },
  {
    name: "The Minimalist",
    emoji: "✨",
    description: "Less is more. You strip away everything unnecessary to reveal pure beauty.",
    color: "#6B2D5C"
  },
  {
    name: "The Chaos Tamer",
    emoji: "🎨",
    description: "You thrive in creative chaos and turn it into order.",
    color: "#FF6B9D"
  },
  {
    name: "The Pixel Perfect",
    emoji: "🧩",
    description: "Precision is your superpower. Every detail matters.",
    color: "#4ECDC4"
  }
];

const HiveWall: React.FC<HiveWallProps> = ({ selectedArchetype, onReset }) => {
  return (
    <motion.div
      key="frame-11"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h2 className="text-[#E9A86A] mb-2 uppercase tracking-tight text-5xl">
          The Hive
        </h2>
        <p className="text-[#D4B5C8] uppercase tracking-wider text-sm">Designer Archetypes</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-x-16 gap-y-12 w-full max-w-5xl mb-6 -mt-15">
        {allArchetypes.map((archetype, index) => {
          const isUserArchetype = selectedArchetype?.name === archetype.name;
          
          return (
            <motion.div
              key={archetype.name}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative flex flex-col items-center justify-center"
            >
              <ArchetypeBadge archetype={archetype} size="medium" />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                className="text-center -mt-2"
              >
                <span 
                  className="text-xs uppercase tracking-wider"
                  style={{ color: colors.text }}
                >
                  {archetype.name}
                </span>
              </motion.div>
              
              {isUserArchetype && (
                <motion.div
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  className="mt-3 bg-[#E9A86A] px-5 py-1.5 rounded-full border-2 border-[#F4D8B8] shadow-lg"
                >
                  <span className="text-[#4A1F3E] text-xs uppercase tracking-wider">You</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Reset Button */}
      {onReset && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Button onClick={onReset} variant="secondary">
            Reset
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HiveWall;

