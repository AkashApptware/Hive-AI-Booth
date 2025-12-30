import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from '@/components';
import { EmotionFallback } from '@/components/features';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
  frameNumber?: number;
}

interface BonusRoundProps {
  currentFrame?: number;
  emotionScores?: EmotionScore[];
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const BonusRound: React.FC<BonusRoundProps> = ({ currentFrame = 7, emotionScores = [], setEmotionScores, onNext }) => {
  const existingScore = emotionScores.find(score => score.frameNumber === currentFrame);
  const [hasSelected, setHasSelected] = useState(!!existingScore);
  
  useEffect(() => {
    const score = emotionScores.find(score => score.frameNumber === currentFrame);
    setHasSelected(!!score);
    if (score) {
      console.log('📋 [BonusRound] Found existing score for frame', currentFrame, ':', score);
    } else {
      console.log('📋 [BonusRound] No existing score for frame', currentFrame);
    }
  }, [currentFrame, emotionScores]);

  const handleManualEmotion = (emotion: string, confidence: number) => {
    setHasSelected(true);
    
    if (setEmotionScores) {
      const emotionData: EmotionScore = {
        emotion,
        intensity: confidence,
        timestamp: Date.now(),
        frameNumber: currentFrame
      };
      
      setEmotionScores(prev => {
        const existingIndex = prev.findIndex(score => score.frameNumber === currentFrame);
        if (existingIndex >= 0) {
          const oldScore = prev[existingIndex];
          const updated = [...prev];
          updated[existingIndex] = emotionData;
          console.log('🔄 [BonusRound] Updated emotion score:', {
            frameNumber: currentFrame,
            oldEmotion: oldScore.emotion,
            oldIntensity: oldScore.intensity,
            newEmotion: emotion,
            newIntensity: confidence,
            allScores: updated
          });
          return updated;
        } else {
          console.log('➕ [BonusRound] Added new emotion score:', {
            frameNumber: currentFrame,
            emotion,
            intensity: confidence,
            allScores: [...prev, emotionData]
          });
          return [...prev, emotionData];
        }
      });
    }

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };

  const handleCompleteAnalysis = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <motion.div
      key="frame-7"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-12"
    >
      <h2 className="text-[rgb(244,216,184)] text-[40px]">Bonus Round!</h2>
      
      <p className="text-[#D4B5C8] text-center max-w-xl -mt-4 mb-2">
        This one's about instinct — react without thinking.
      </p>

      <div className="grid grid-cols-3 gap-6 max-w-5xl">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#5A2650]/60 backdrop-blur-sm border border-[#E9A86A]/30 rounded-xl p-8 text-center cursor-pointer flex items-center justify-center min-h-[120px]"
        >
          <p className="text-[#F4D8B8] uppercase tracking-wide">Fix a typo or redesign?</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#5A2650]/60 backdrop-blur-sm border border-[#E9A86A]/30 rounded-xl p-8 text-center cursor-pointer flex items-center justify-center min-h-[120px]"
        >
          <p className="text-[#F4D8B8] uppercase tracking-wide">When pixels misalign…?</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#5A2650]/60 backdrop-blur-sm border border-[#E9A86A]/30 rounded-xl p-8 text-center cursor-pointer flex items-center justify-center min-h-[120px]"
        >
          <p className="text-[#F4D8B8] uppercase tracking-wide">Do you rename layers… ever?</p>
        </motion.div>
      </div>

      <EmotionFallback 
        emotions={['🤔 Thoughtful', '😅 Amused', '😬 Guilty']}
        onSelect={(emotion, confidence) => handleManualEmotion(emotion, confidence)}
      />

      <Button onClick={handleCompleteAnalysis} variant="primary">
        Complete Analysis
      </Button>
    </motion.div>
  );
};

export default BonusRound;

