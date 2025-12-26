import React from "react";
import { AnimatePresence } from "motion/react";
import FigmaCrashed from './components/FigmaCrashed';
import MakeItPop from './components/MakeItPop';
import DeadlineExtended from './components/DeadlineExtended';
import PrototypeSuccess from './components/PrototypeSuccess';
import BonusRound from './components/BonusRound';
import AnalyzingMoment from './components/AnalyzingMoment';
import ResultReveal from './components/ResultReveal';
import ShareScreen from './components/ShareScreen';
import HiveWall from './components/HiveWall';

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

interface FramePageProps {
  currentFrame?: number;
  emotionScores?: EmotionScore[];
  setEmotionScores?: React.Dispatch<React.SetStateAction<EmotionScore[]>>;
  selectedArchetype?: Archetype | null;
  onNext?: () => void;
  onReset?: () => void;
}

const FramePage: React.FC<FramePageProps> = ({ currentFrame = 3, emotionScores = [], setEmotionScores, selectedArchetype, onNext, onReset }) => {
  return (
    <AnimatePresence mode="wait">
      {/* Frame 3: Figma Crashed */}
      {currentFrame === 3 && (
        <FigmaCrashed key="frame-3" setEmotionScores={setEmotionScores} onNext={onNext} />
      )}

      {/* Frame 4: Make It Pop */}
      {currentFrame === 4 && (
        <MakeItPop key="frame-4" setEmotionScores={setEmotionScores} onNext={onNext} />
      )}

      {/* Frame 5: Deadline Extended */}
      {currentFrame === 5 && (
        <DeadlineExtended key="frame-5" setEmotionScores={setEmotionScores} onNext={onNext} />
      )}

      {/* Frame 6: Prototype Success */}
      {currentFrame === 6 && (
        <PrototypeSuccess key="frame-6" setEmotionScores={setEmotionScores} onNext={onNext} />
      )}

      {/* Frame 7: Bonus Round */}
      {currentFrame === 7 && (
        <BonusRound key="frame-7" setEmotionScores={setEmotionScores} onNext={onNext} />
      )}

      {/* Frame 8: Analyzing Moment */}
      {currentFrame === 8 && (
        <AnalyzingMoment key="frame-8" emotionScores={emotionScores} onNext={onNext} />
      )}

      {/* Frame 9: Result Reveal */}
      {currentFrame === 9 && (
        <ResultReveal key="frame-9" emotionScores={emotionScores} selectedArchetype={selectedArchetype} onReset={onReset} onNext={onNext} />
      )}

      {/* Frame 10: Share Screen */}
      {currentFrame === 10 && (
        <ShareScreen key="frame-10" selectedArchetype={selectedArchetype} onNext={onNext} />
      )}

      {/* Frame 11: Hive Wall */}
      {currentFrame === 11 && (
        <HiveWall key="frame-11" selectedArchetype={selectedArchetype} onReset={onReset} />
      )}
    </AnimatePresence>
  );
};

export default FramePage;


