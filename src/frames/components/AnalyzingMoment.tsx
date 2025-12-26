import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HintChip, ProgressBar } from '@/components';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
}

interface AnalyzingMomentProps {
  emotionScores?: EmotionScore[];
  onNext?: () => void;
}

const AnalyzingMoment: React.FC<AnalyzingMomentProps> = ({ emotionScores = [], onNext }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setAnalyzing(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          if (onNext) {
            onNext();
          }
        }, 1000);
      } else {
        setProgress(currentProgress);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <motion.div
      key="frame-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-12"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
        className="w-64 h-64 relative"
      >
        <div className="absolute inset-0 border-4 border-[#FFB347]/30 rounded-full" />
        <div className="absolute inset-8 border-4 border-[#1E88E5]/30 rounded-full" />
        <div className="absolute inset-16 border-4 border-[#FFB347]/30 rounded-full" />
      </motion.div>

      <div className="text-center">
        <h2 className="text-[#F4D8B8] mb-8 uppercase tracking-tight text-4xl text-[40px]">
          Analyzing
        </h2>
        <HintChip text="Processing DNA" />
        <p className="text-[#D4B5C8] text-sm mt-6 uppercase tracking-wider">
          {emotionScores.length} Data Points
        </p>
      </div>

      <ProgressBar progress={analyzing ? progress : 0} />
    </motion.div>
  );
};

export default AnalyzingMoment;

