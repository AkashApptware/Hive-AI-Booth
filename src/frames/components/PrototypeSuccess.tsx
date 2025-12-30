import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from 'lucide-react';
import { EmotionDetectionDisplay, EmotionFallback } from '@/components/features';
import { Button } from '@/components';
import { useCamera } from '@/hooks';
import { detectEmotion } from '@/utils/emotionDetection';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
  frameNumber?: number;
}

interface PrototypeSuccessProps {
  currentFrame?: number;
  emotionScores?: EmotionScore[];
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const PrototypeSuccess: React.FC<PrototypeSuccessProps> = ({ currentFrame = 6, emotionScores = [], setEmotionScores, onNext }) => {
  const existingScore = emotionScores.find(score => score.frameNumber === currentFrame);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(existingScore?.emotion || null);
  const [hasSelected, setHasSelected] = useState(!!existingScore);
  
  useEffect(() => {
    const score = emotionScores.find(score => score.frameNumber === currentFrame);
    if (score) {
      setCurrentEmotion(score.emotion);
      setHasSelected(true);
      console.log('📋 [PrototypeSuccess] Found existing score for frame', currentFrame, ':', score);
    } else {
      setCurrentEmotion(null);
      setHasSelected(false);
      console.log('📋 [PrototypeSuccess] No existing score for frame', currentFrame);
    }
  }, [currentFrame, emotionScores]);

  const {
    videoRef,
    cameraEnabled,
  } = useCamera();

  const updateEmotionScore = (emotion: string, intensity: number) => {
    if (setEmotionScores) {
      const emotionData: EmotionScore = {
        emotion,
        intensity,
        timestamp: Date.now(),
        frameNumber: currentFrame
      };
      
      setEmotionScores(prev => {
        const existingIndex = prev.findIndex(score => score.frameNumber === currentFrame);
        if (existingIndex >= 0) {
          const oldScore = prev[existingIndex];
          const updated = [...prev];
          updated[existingIndex] = emotionData;
          console.log('🔄 [PrototypeSuccess] Updated emotion score:', {
            frameNumber: currentFrame,
            oldEmotion: oldScore.emotion,
            oldIntensity: oldScore.intensity,
            newEmotion: emotion,
            newIntensity: intensity,
            allScores: updated
          });
          return updated;
        } else {
          console.log('➕ [PrototypeSuccess] Added new emotion score:', {
            frameNumber: currentFrame,
            emotion,
            intensity,
            allScores: [...prev, emotionData]
          });
          return [...prev, emotionData];
        }
      });
    }
  };

  const handleEmotionDetected = (emotion: string, confidence: number) => {
    setHasSelected(true);
    setCurrentEmotion(emotion);
    updateEmotionScore(emotion, confidence);

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };

  const handleManualEmotion = (emotion: string, confidence: number) => {
    setHasSelected(true);
    setCurrentEmotion(emotion);
    updateEmotionScore(emotion, confidence);

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
      key="frame-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <Sparkles className="w-48 h-48 text-[#FFB347]" />
      </motion.div>

      <div className="text-center">
        <h2 className="text-[#F4D8B8] mb-4 text-[40px]">
          Prototype Works!
        </h2>
        <p className="text-[#D4B5C8] text-center max-w-xl">
          Express how it feels when your hard work finally pays off.
        </p>
      </div>

      {currentEmotion && (
        <EmotionDetectionDisplay currentEmotion={currentEmotion} />
      )}

      <EmotionFallback
        emotions={['👏 Excited', '😄 Happy', '😶 Focused']}
        onSelect={(emotion, confidence) => handleManualEmotion(emotion, confidence)}
      />
      {cameraEnabled && videoRef.current && !hasSelected && (
        <div className="absolute bottom-24">
          <Button 
            onClick={() => {
              detectEmotion(videoRef.current!, handleEmotionDetected);
            }} 
            variant="ghost"
          >
            Scan Expression
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default PrototypeSuccess;

