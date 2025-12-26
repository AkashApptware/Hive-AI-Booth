import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EmotionDetectionDisplay, EmotionFallback } from '@/components/features';
import { useCamera } from '@/hooks';
import { detectEmotion } from '@/utils/emotionDetection';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
}

interface MakeItPopProps {
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const MakeItPop: React.FC<MakeItPopProps> = ({ setEmotionScores, onNext }) => {
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  const [hasSelected, setHasSelected] = useState(false);

  const {
    videoRef,
    cameraEnabled,
  } = useCamera();

  const handleEmotionDetected = (emotion: string, confidence: number) => {
    if (hasSelected) return;
    
    setHasSelected(true);
    setCurrentEmotion(emotion);
    
    if (setEmotionScores) {
      const emotionData: EmotionScore = {
        emotion,
        intensity: confidence,
        timestamp: Date.now()
      };
      setEmotionScores(prev => [...prev, emotionData]);
    }

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };

  const handleManualEmotion = (emotion: string, intensity: number) => {
    if (hasSelected) return;
    
    setHasSelected(true);
    setCurrentEmotion(emotion);
    
    if (setEmotionScores) {
      const emotionData: EmotionScore = {
        emotion,
        intensity,
        timestamp: Date.now()
      };
      setEmotionScores(prev => [...prev, emotionData]);
    }

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };
  useEffect(() => {
    if (cameraEnabled && videoRef.current && !hasSelected) {
      detectEmotion(videoRef.current, handleEmotionDetected);
    }
  }, [cameraEnabled, videoRef, hasSelected]);

  return (
    <motion.div
      key="frame-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8"
    >
      <motion.h1
        animate={{ 
          scale: [1, 1.1, 1],
          color: ['#FFB347', '#1E88E5', '#FFB347']
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity
        }}
        className="text-9xl"
        style={{ color: '#FFB347' }}
      >
        MAKE IT POP!
      </motion.h1>

      <p className="text-[#D4B5C8] text-center max-w-xl mb-4">
        Show your honest reaction to classic client feedback.
      </p>

      {currentEmotion && (
        <EmotionDetectionDisplay currentEmotion={currentEmotion} />
      )}

      <EmotionFallback
        emotions={['🙂 Smile', '🙄 Eye roll', '😕 Confused']}
        onSelect={(emotion, confidence) => handleManualEmotion(emotion, confidence)}
        disabled={hasSelected}
      />
    </motion.div>
  );
};

export default MakeItPop;

