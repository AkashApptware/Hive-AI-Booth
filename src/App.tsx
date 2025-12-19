import React, { useState } from "react";
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground,
  Navigation
} from '@/components';
import { WelcomeFrame } from '@/components/frames';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 12;

  const handleNext = () => {
    console.log('Begin clicked');
  };

  const nextFrame = () => {
    setCurrentFrame(prev => Math.min(prev + 1, totalFrames - 1));
  };

  const prevFrame = () => {
    setCurrentFrame(prev => Math.max(prev - 1, 0));
  };

  const goToFrame = (frame: number) => {
    setCurrentFrame(frame);
  };

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={currentFrame} />
      
      <WelcomeFrame onNext={handleNext} />

      <Navigation 
        currentFrame={currentFrame}
        totalFrames={totalFrames}
        onPrevious={prevFrame}
        onNext={nextFrame}
        onFrameChange={goToFrame}
      />
    </div>
  );
};

export default App;
