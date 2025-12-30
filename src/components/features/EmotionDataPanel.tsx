import React from "react";
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
  frameNumber?: number;
}

interface EmotionDataPanelProps {
  emotionScores: EmotionScore[];
}

const EmotionDataPanel: React.FC<EmotionDataPanelProps> = ({ emotionScores }) => {
  if (emotionScores.length === 0) return null;

  // Sort by frame number to display in order
  const sortedScores = [...emotionScores].sort((a, b) => {
    const frameA = a.frameNumber || 0;
    const frameB = b.frameNumber || 0;
    return frameA - frameB;
  });

  // Map frame number to test number (Frame 3 = Test 1, Frame 4 = Test 2, etc.)
  const getTestNumber = (frameNumber?: number): number => {
    if (!frameNumber) return 0;
    return frameNumber - 2; // Frame 3 -> Test 1, Frame 4 -> Test 2, etc.
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-24 right-6 bg-[#5A2650]/90 backdrop-blur-md border-2 border-[#E9A86A]/40 rounded-xl p-6 text-[#D4B5C8] max-w-sm shadow-2xl z-50"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E9A86A]/20">
        <Eye className="w-4 h-4 text-[#E9A86A]" />
        <h4 className="text-[#E9A86A] uppercase tracking-wide text-sm">Emotion Data</h4>
      </div>
      
      <div className="space-y-3">
        {sortedScores.map((score, i) => {
          const testNumber = getTestNumber(score.frameNumber);
          return (
            <div key={`frame-${score.frameNumber}`} className="bg-[#4A1F3E]/40 rounded-lg p-3 border border-[#6B2D5C]/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#F4D8B8] uppercase tracking-wide text-xs">Test {testNumber}</span>
                <span className="text-[#E9A86A] text-xs">{(score.intensity * 100).toFixed(0)}%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#4A1F3E] rounded-full overflow-hidden">
                  <motion.div 
                    key={`${score.frameNumber}-${score.intensity}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score.intensity * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#E9A86A] to-[#6B2D5C] rounded-full"
                  />
                </div>
              </div>
              
              <p className="text-[#D4B5C8] text-xs mt-2 capitalize">{score.emotion}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EmotionDataPanel;

