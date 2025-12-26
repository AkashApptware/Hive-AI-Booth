import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock } from 'lucide-react';
import { EmotionDetectionDisplay, EmotionFallback } from '@/components/features';
import { useCamera } from '@/hooks';
import { detectEmotion } from '@/utils/emotionDetection';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
}

interface DeadlineExtendedProps {
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const DeadlineExtended: React.FC<DeadlineExtendedProps> = ({ setEmotionScores, onNext }) => {
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

  const handleManualEmotion = (emotion: string, confidence: number) => {
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
  useEffect(() => {
    if (cameraEnabled && videoRef.current && !hasSelected) {
      detectEmotion(videoRef.current, handleEmotionDetected);
    }
  }, [cameraEnabled, videoRef, hasSelected]);

  return (
    <motion.div
      key="frame-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8"
    >
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Clock className="w-48 h-48 text-[#1E88E5]" />
      </motion.div>

      <div className="text-center">
        <h2 className="text-[#F3E9D2] mb-4 text-[40px]">
          Deadline extended by a week!
        </h2>
        <p className="text-[#D4B5C8] text-center max-w-xl">
          Let your face respond to unexpected good news.
        </p>
      </div>

      {currentEmotion && (
        <EmotionDetectionDisplay currentEmotion={currentEmotion} />
      )}

      <EmotionFallback
        emotions={['😌 Relaxed', '😁 Happy', '😐 Stoic']}
        onSelect={(emotion, confidence) => handleManualEmotion(emotion, confidence)}
        disabled={hasSelected}
      />
    </motion.div>
  );
};

export default DeadlineExtended;

