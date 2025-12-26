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
}

interface FigmaCrashedProps {
  emotionScores?: EmotionScore[];
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  onNext?: () => void;
}

const FigmaCrashed: React.FC<FigmaCrashedProps> = ({ setEmotionScores, onNext }) => {
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
  useEffect(() => {
    if (cameraEnabled && videoRef.current) {
      detectEmotion(videoRef.current, handleEmotionDetected);
    }
  }, [cameraEnabled, videoRef]);

  const handleReactionSelect = (reaction: string, confidence: number) => {
    if (hasSelected) return;
    
    setHasSelected(true);
    setCurrentEmotion(reaction);
    
    if (setEmotionScores) {
      const emotionData: EmotionScore = {
        emotion: reaction,
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
          disabled={hasSelected}
        />
      </motion.div>
    </div>
  );
};

export default FigmaCrashed;
