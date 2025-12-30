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
  frameNumber?: number;
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
    },
    {
      name: "The Chaos Tamer",
      emoji: "🎨",
      description: "You thrive in creative chaos and turn it into order.",
      color: "#FF6B9D"
    },
    {
      name: "The Pixel Perfect",
      emoji: "🧩",
      description: "Precision is your superpower. Every detail matters.",
      color: "#4ECDC4"
    }
  ];

  const emotionToArchetypeWeights: { [key: string]: number[] } = {
    'happy': [0.1, 0.3, 0.4, 0.1, 0.05, 0.05],
    'amused': [0.1, 0.2, 0.2, 0.1, 0.3, 0.1],
    'excited': [0.1, 0.5, 0.2, 0.1, 0.05, 0.05],
    'neutral': [0.2, 0.15, 0.15, 0.2, 0.15, 0.15],
    'stoic': [0.15, 0.1, 0.1, 0.3, 0.15, 0.2],
    'focused': [0.15, 0.1, 0.1, 0.15, 0.35, 0.15],
    'frustrated': [0.3, 0.15, 0.1, 0.15, 0.2, 0.1],
    'frown': [0.25, 0.15, 0.15, 0.15, 0.15, 0.15],
    'surprised': [0.15, 0.3, 0.15, 0.15, 0.15, 0.1],
    'relaxed': [0.1, 0.1, 0.2, 0.15, 0.3, 0.15],
    'confused': [0.1, 0.1, 0.1, 0.1, 0.5, 0.1],
    'guilty': [0.1, 0.1, 0.15, 0.1, 0.4, 0.15],
    'smile': [0.1, 0.3, 0.4, 0.1, 0.05, 0.05],
    'eye roll': [0.2, 0.2, 0.2, 0.15, 0.15, 0.1],
    'thoughtful': [0.2, 0.2, 0.15, 0.2, 0.15, 0.1],
  };

  const archetypeScores = [0, 0, 0, 0, 0, 0];

  emotionScores.forEach(score => {
    const emotionLower = score.emotion.toLowerCase();
    let weights = [0.167, 0.167, 0.167, 0.167, 0.167, 0.167];

    for (const [key, value] of Object.entries(emotionToArchetypeWeights)) {
      if (emotionLower.includes(key)) {
        weights = value;
        break;
      }
    }

    const weightedScore = score.intensity;
    weights.forEach((weight, index) => {
      archetypeScores[index] += weight * weightedScore;
    });
  });

  const maxScore = Math.max(...archetypeScores);
  const maxIndex = archetypeScores.indexOf(maxScore);

  return mockArchetypes[maxIndex];
};

const FrameContainerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentFrame, setCurrentFrame] = useState(() => getFrameFromRoute(location.pathname, location.search) || 3);
  const [emotionScores, setEmotionScores] = useState<EmotionScore[]>([]);
  
  const selectedArchetype = useMemo(() => calculateArchetype(emotionScores), [emotionScores]);

  useEffect(() => {
    console.log('📊 [FrameContainerPage] emotionScores updated:', {
      count: emotionScores.length,
      scores: emotionScores,
      currentFrame
    });
  }, [emotionScores, currentFrame]);
  
  useEffect(() => {
    const frameFromRoute = getFrameFromRoute(location.pathname, location.search);
    if (frameFromRoute !== currentFrame && frameFromRoute >= 3 && frameFromRoute <= 11) {
      setCurrentFrame(frameFromRoute);
    }
  }, [location.pathname, location.search, currentFrame]);

  useEffect(() => {
    const FRAME_NAMES: { [key: number]: string } = {
      3: 'Figma Crashed',
      4: 'Make It Pop',
      5: 'Deadline Extended',
      6: 'Prototype Success',
      7: 'Bonus Round',
      8: 'Analyzing Moment',
      9: 'Result Reveal',
      10: 'Share Screen',
      11: 'Hive Wall',
    };
    const frameName = FRAME_NAMES[currentFrame] || 'Design Hive 2025';
    document.title = `${frameName} - Design Hive 2025`;
  }, [currentFrame]);

  const getDisplayIndex = (frame: number): number => {
    return frame - 3;
  };

  const getActualFrame = (displayIndex: number): number => {
    return displayIndex + 3;
  };

  const handlePrevious = () => {
    if (currentFrame > 3) {
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

  const handleFrameChange = (displayIndex: number) => {
    const actualFrame = getActualFrame(displayIndex);
    setCurrentFrame(actualFrame);
    navigate(getRouteFromFrame(actualFrame));
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
        currentFrame={getDisplayIndex(currentFrame)}
        totalFrames={TOTAL_FRAMES}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFrameChange={handleFrameChange}
      />
    </div>
  );
};

export default FrameContainerPage;

