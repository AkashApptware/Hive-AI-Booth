import { motion } from 'motion/react';
import { RefObject } from 'react';
import { Button, CameraPreview, CameraPermissionInfo, HintChip } from '@/components';

interface CameraCalibrationFrameProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraEnabled: boolean;
  cameraPermission: 'none' | 'requesting' | 'denied' | 'granted';
  useFallback: boolean;
  onStartCamera: () => void;
  onCapture: () => void;
  onTryDemo: () => void;
}

export function CameraCalibrationFrame({
  videoRef,
  cameraEnabled,
  cameraPermission,
  useFallback,
  onStartCamera,
  onCapture,
  onTryDemo,
}: CameraCalibrationFrameProps) {
  return (
    <motion.div
      key="frame-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8"
    >
      {/* Camera permission status */}
      {cameraPermission !== 'none' && cameraPermission !== 'granted' && (
        <div className="mb-2 md:mb-4">
          <CameraPermissionInfo mode={cameraPermission} />
        </div>
      )}

      <div className="w-full flex items-center justify-center mb-2 md:mb-4">
        <CameraPreview videoRef={videoRef} isActive={cameraEnabled} />
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
          <Button onClick={onStartCamera} variant="primary" className="w-full sm:w-auto">
            Allow
          </Button>
        )}
        {cameraEnabled && !useFallback && (
          <Button onClick={onCapture} variant="primary" className="w-full sm:w-auto">
            Capture
          </Button>
        )}
        <Button onClick={onTryDemo} variant={useFallback ? "primary" : "secondary"} className="w-full sm:w-auto">
          {useFallback ? 'Continue' : 'Demo'}
        </Button>
      </div>
    </motion.div>
  );
}

export default CameraCalibrationFrame;

