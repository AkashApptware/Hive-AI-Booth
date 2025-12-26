import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import FramePage from '@/frames/FramePage';
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground,
  Navigation
} from '@/components';
import { EmotionDataPanel } from '@/components/features';
import { TOTAL_FRAMES } from '@/constants';
import { getFrameFromRoute, getRouteFromFrame } from '@/utils/routes';

interface EmotionScore {
  emotion: string;
  intensity: number;
  timestamp?: number;
}

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

const calculateArchetype = (emotionScores: EmotionScore[]): Archetype | null => {
  if (emotionScores.length === 0) return null;
  
  const mockArchetypes: Archetype[] = [
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
    }
  ];

  const index = emotionScores.length % mockArchetypes.length;
  return mockArchetypes[index];
};

const FrameContainerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentFrame, setCurrentFrame] = useState(() => getFrameFromRoute(location.pathname, location.search) || 3);
  const [emotionScores, setEmotionScores] = useState<EmotionScore[]>([]);
  
  const selectedArchetype = useMemo(() => calculateArchetype(emotionScores), [emotionScores]);
  useEffect(() => {
    const frameFromRoute = getFrameFromRoute(location.pathname, location.search);
    if (frameFromRoute !== currentFrame && frameFromRoute >= 3 && frameFromRoute <= 11) {
      setCurrentFrame(frameFromRoute);
    }
  }, [location.pathname, location.search, currentFrame]);

  const handlePrevious = () => {
    if (currentFrame > 0) {
      const newFrame = currentFrame - 1;
      setCurrentFrame(newFrame);
      navigate(getRouteFromFrame(newFrame));
    }
  };

  const handleNext = () => {
    if (currentFrame < 11) {
      const newFrame = currentFrame + 1;
      setCurrentFrame(newFrame);
      navigate(getRouteFromFrame(newFrame));
    }
  };

  const handleReset = () => {
    setEmotionScores([]);
    navigate('/');
  };

  const handleFrameChange = (frame: number) => {
    setCurrentFrame(frame);
    navigate(getRouteFromFrame(frame));
  };

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={currentFrame} />

      <FramePage 
        currentFrame={currentFrame}
        emotionScores={emotionScores}
        setEmotionScores={setEmotionScores}
        selectedArchetype={selectedArchetype}
        onNext={handleNext}
        onReset={handleReset}
      />

      <EmotionDataPanel emotionScores={emotionScores} />

      <Navigation
        currentFrame={currentFrame}
        totalFrames={TOTAL_FRAMES}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFrameChange={handleFrameChange}
      />
    </div>
  );
};

export default FrameContainerPage;

