import React, { useState, useEffect } from "react";
import { AnimatePresence } from 'motion/react';
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground
} from '@/components';
import { WelcomeFrame, CameraCalibrationFrame, IdleFrame } from '@/frames';
import { useCamera, useImageCapture } from '@/hooks';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 12;
  const [proximityLevel, setProximityLevel] = useState(0);

  // Camera logic
  const {
    videoRef,
    cameraEnabled,
    cameraPermission,
    useFallback,
    startCamera,
    setUseFallback,
    setCameraPermission,
  } = useCamera();

  const { captureImage } = useImageCapture(videoRef, cameraEnabled, cameraPermission);

  const handleNext = () => {
    nextFrame();
  };

  const nextFrame = () => {
    setCurrentFrame(prev => Math.min(prev + 1, totalFrames - 1));
  };

  useEffect(() => {
    if (currentFrame === 1) {
      const interval = setInterval(() => {
        setProximityLevel(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [currentFrame]);

  useEffect(() => {
    if (currentFrame === 1 && proximityLevel >= 100) {
      setTimeout(() => nextFrame(), 1000);
    }
  }, [proximityLevel, currentFrame]);

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={currentFrame} />

      <AnimatePresence mode="wait">
        {currentFrame === 0 && (
          <WelcomeFrame key="welcome" onNext={handleNext} />
        )}
        {currentFrame === 1 && (
          <IdleFrame 
            key="idle" 
            proximityLevel={proximityLevel}
            onNext={nextFrame}
          />
        )}
        {currentFrame === 2 && (
          <CameraCalibrationFrame 
            key="camera" 
            videoRef={videoRef}
            cameraEnabled={cameraEnabled}
            cameraPermission={cameraPermission}
            useFallback={useFallback}
            onStartCamera={startCamera}
            onCapture={captureImage}
            onTryDemo={() => {
              if (!cameraEnabled) {
                setUseFallback(true);
                setCameraPermission('denied');
                nextFrame();
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
