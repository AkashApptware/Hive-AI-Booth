import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components';
import { Confetti, ArchetypeBadge } from '@/components/features';

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
}

interface ResultRevealProps {
  emotionScores?: EmotionScore[];
  selectedArchetype?: Archetype | null;
  onReset?: () => void;
  onNext?: () => void;
}

const ResultReveal: React.FC<ResultRevealProps> = ({ emotionScores = [], selectedArchetype: propArchetype, onReset, onNext }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const selectedArchetype = propArchetype || (emotionScores.length > 0 ? {
    name: "The Perfectionist",
    emoji: "🎯",
    description: "You obsess over every pixel and detail. Nothing escapes your critical eye.",
    color: "#FFB347"
  } : null);

  useEffect(() => {
    if (selectedArchetype) {
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      const autoNavigateTimer = setTimeout(() => {
        if (onNext) {
          onNext();
        }
      }, 4000);
      
      return () => clearTimeout(autoNavigateTimer);
    }
  }, [selectedArchetype, onNext]);

  if (!selectedArchetype) {
    return null;
  }

  return (
    <motion.div
      key="frame-9"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8"
    >
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <ArchetypeBadge archetype={selectedArchetype} size="large" />
      </motion.div>

      <div className="text-center max-w-2xl">
        <h2 className="text-[#FFB347] mb-4">
          You are the {selectedArchetype.name}!
        </h2>
        <p className="text-[#F3E9D2] text-xl">
          {selectedArchetype.description}
        </p>
      </div>

      <div className="flex gap-4">
        <Button 
          onClick={() => {
            if (onNext) {
              onNext();
            }
          }} 
          variant="primary"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Badge
        </Button>
        <Button 
          onClick={onReset ? onReset : () => {}} 
          variant="secondary"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Retry
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultReveal;

