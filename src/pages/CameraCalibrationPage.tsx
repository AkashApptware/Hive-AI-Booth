import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground,
  Button, 
  CameraPreview, 
  CameraPermissionInfo, 
  HintChip 
} from '@/components';
import { useCamera } from '@/hooks';
import { captureImageFromVideo } from '@/utils';

const CameraCalibrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const {
    videoRef,
    cameraEnabled,
    cameraPermission,
    useFallback,
    startCamera,
    setUseFallback,
    setCameraPermission,
  } = useCamera();

  const handleCapture = () => {
    if (!videoRef.current || !cameraEnabled) return;

    const base64 = captureImageFromVideo(videoRef.current);
    if (base64) {
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      setCapturedImage(dataUrl);
    }
  };

  const handleTryDemo = () => {
    if (!cameraEnabled) {
      setUseFallback(true);
      setCameraPermission('denied');
    }
  };

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={2} />

      <motion.div
        key="frame-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8"
      >
        {cameraPermission !== 'none' && cameraPermission !== 'granted' && (
          <div className="mb-2 md:mb-4">
            <CameraPermissionInfo mode={cameraPermission} />
          </div>
        )}

        <div className="w-full flex items-center justify-center mb-2 md:mb-4">
          {capturedImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[320px] h-[240px] sm:max-w-[400px] sm:h-[300px] md:max-w-[500px] md:h-[375px] lg:max-w-[640px] lg:h-[480px] xl:max-w-[720px] xl:h-[540px] backdrop-blur-sm rounded-xl md:rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: '#5A2650CC',
                borderColor: '#E9A86A4D',
              }}
            >
              {/* Captured Image */}
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Corner indicators */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-t-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-t-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-b-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-b-2" style={{ borderColor: '#E9A86A' }} />

              {/* Status indicator */}
              <div 
                className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 md:bottom-6 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full border"
                style={{
                  backgroundColor: '#4A1F3ECC',
                  borderColor: '#E9A86A4D',
                }}
              >
                <div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: '#E9A86A' }}
                />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: '#F4D8B8' }}>
                  Captured
                </span>
              </div>
            </motion.div>
          ) : (
            <CameraPreview videoRef={videoRef} isActive={cameraEnabled} />
          )}
        </div>

        <div className="text-center px-4">
          <h2 className="text-[#F4D8B8] mb-2 md:mb-3 lg:mb-4 uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Ready?
          </h2>
          <div className="mb-2 md:mb-3">
            <HintChip text="Camera Access Required" />
          </div>
          {useFallback && (
            <p className="text-[#D4B5C8] text-xs sm:text-sm md:text-base mt-3 md:mt-4 uppercase tracking-wide">
              Demo Mode Active
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-4 lg:gap-6 mb-4 md:mb-6 w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
          {!cameraEnabled && !useFallback && (
            <Button onClick={startCamera} variant="primary" className="w-full sm:w-auto">
              Allow
            </Button>
          )}
          {cameraEnabled && !useFallback && !capturedImage && (
            <Button onClick={handleCapture} variant="primary" className="w-full sm:w-auto">
              Capture
            </Button>
          )}
          {capturedImage && (
            <>
              <Button onClick={handleTryDemo} variant="primary" className="w-full sm:w-auto">
                Continue
              </Button>
            </>
          )}
          <Button onClick={() => navigate('/framepage')} variant="secondary" className="w-full sm:w-auto">
            Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CameraCalibrationPage;
