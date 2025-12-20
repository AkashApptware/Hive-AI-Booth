import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from 'motion/react';
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground,
  Navigation
} from '@/components';
import { WelcomeFrame, CameraCalibrationFrame, IdleFrame } from '@/components/frames';

const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 12;
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'none' | 'requesting' | 'denied' | 'granted'>('none');
  const [useFallback, setUseFallback] = useState(false);
  const [proximityLevel, setProximityLevel] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleNext = () => {
    nextFrame();
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

  // Proximity simulation for frame 1
  useEffect(() => {
    if (currentFrame === 1) {
      const interval = setInterval(() => {
        setProximityLevel(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [currentFrame]);

  // Auto-advance from idle when proximity is detected
  useEffect(() => {
    if (currentFrame === 1 && proximityLevel >= 100) {
      setTimeout(() => nextFrame(), 1000);
    }
  }, [proximityLevel, currentFrame]);

  const startCamera = async () => {
    setCameraPermission('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraEnabled(true);
      setUseFallback(false);
      setCameraPermission('granted');
      nextFrame();
    } catch (error) {
      setUseFallback(true);
      setCameraPermission('denied');
      nextFrame();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={currentFrame} />
      
      {/* Hidden video element for camera */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        className="hidden"
      />

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
            onTryDemo={() => {
              setUseFallback(true);
              setCameraPermission('denied');
              nextFrame();
            }}
          />
        )}
      </AnimatePresence>

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
