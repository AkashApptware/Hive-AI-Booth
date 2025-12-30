import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EmotionDetectionDisplay, EmotionFallback } from '@/components/features';
import { useCamera } from '@/hooks';
import { detectEmotion } from '@/utils/emotionDetection';
import figmaLogo from '@/assets/images/Figma-logo.png';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
  frameNumber?: number;
}

interface FigmaCrashedProps {
  currentFrame?: number;
  emotionScores?: EmotionScore[];
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const FigmaCrashed: React.FC<FigmaCrashedProps> = ({ currentFrame = 3, emotionScores = [], setEmotionScores, onNext }) => {
  // Check if this frame already has a score (for updating)
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  
  // Reset state when frame changes or when existing score is found
  useEffect(() => {
    const score = emotionScores.find(score => score.frameNumber === currentFrame);
    if (score) {
      setCurrentEmotion(score.emotion);
      console.log('📋 Found existing score for frame', currentFrame, ':', score);
    } else {
      setCurrentEmotion(null);
      console.log('📋 No existing score for frame', currentFrame);
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
      
      // Update existing score or add new one
      setEmotionScores(prev => {
        const existingIndex = prev.findIndex(score => score.frameNumber === currentFrame);
        if (existingIndex >= 0) {
          // Replace existing score for this frame
          const updated = [...prev];
          updated[existingIndex] = emotionData;
          console.log('🔄 Updated emotion score:', {
            frameNumber: currentFrame,
            oldScore: prev[existingIndex],
            newScore: emotionData,
            allScores: updated
          });
          return updated;
        } else {
          // Add new score
          console.log('➕ Added new emotion score:', {
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
    setCurrentEmotion(emotion);
    updateEmotionScore(emotion, confidence);

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };
  useEffect(() => {
    if (cameraEnabled && videoRef.current) {
      detectEmotion(videoRef.current, handleEmotionDetected);
    }
  }, [cameraEnabled, videoRef]);

  const handleReactionSelect = (reaction: string, confidence: number) => {
    setCurrentEmotion(reaction);
    updateEmotionScore(reaction, confidence);

    setTimeout(() => {
      if (onNext) {
        onNext();
      }
    }, 1500);
  };

  return (
    <div className="relative w-screen h-screen bg-[#4A1F3E] overflow-hidden">
      <motion.div
        key="frame-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4"
      >
        <motion.img
          src={figmaLogo}
          alt="Figma"
          animate={{
            rotate: [0, -2, 2, 0],
            scale: [0.75, 0.765, 0.735, 0.75],
          }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="mb-4"
          style={{
            width: "150px",
            height: "auto",
            filter: "drop-shadow(0 0 60px rgba(10, 207, 131, 0.3))",
          }}
        />

        <h2 className="text-[#F4D8B8] uppercase text-[40px] text-center -mt-4 tracking-tight">
          Figma Crashed
        </h2>

        <p className="text-[#D4B5C8] text-center max-w-xl -mt-2 text-base">
          React naturally to a common design frustration — there's no right or wrong expression.
        </p>

        {currentEmotion && (
          <EmotionDetectionDisplay currentEmotion={currentEmotion} />
        )}

        <EmotionFallback
          emotions={['😆 Amused', '😤 Frustrated', '😐 Neutral']}
          onSelect={(emotion, confidence) => handleReactionSelect(emotion, confidence)}
        />
      </motion.div>
    </div>
  );
};

export default FigmaCrashed;
