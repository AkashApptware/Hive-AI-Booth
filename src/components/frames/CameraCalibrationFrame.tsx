import { motion } from 'motion/react';
import { RefObject } from 'react';
import { Button, CameraPreview, CameraPermissionInfo, HintChip } from '@/components';

interface CameraCalibrationFrameProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  cameraEnabled: boolean;
  cameraPermission: 'none' | 'requesting' | 'denied' | 'granted';
  useFallback: boolean;
  onStartCamera: () => void;
  onTryDemo: () => void;
}

export function CameraCalibrationFrame({
  videoRef,
  cameraEnabled,
  cameraPermission,
  useFallback,
  onStartCamera,
  onTryDemo,
}: CameraCalibrationFrameProps) {
  return (
    <motion.div
      key="frame-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-12"
    >
      {/* Camera permission status */}
      {cameraPermission !== 'none' && cameraPermission !== 'granted' && (
        <CameraPermissionInfo mode={cameraPermission} />
      )}

      <CameraPreview videoRef={videoRef} isActive={cameraEnabled} />

      <div className="text-center">
        <h2 className="text-[#F4D8B8] mb-2 uppercase tracking-tight">
          Ready?
        </h2>
        <HintChip text="Camera Access Required" />
        {useFallback && (
          <p className="text-[#D4B5C8] text-sm mt-4 uppercase tracking-wide">
            Demo Mode Active
          </p>
        )}
      </div>
      <div className="flex gap-4 mb-4">
        {!useFallback && (
          <Button onClick={onStartCamera} variant="primary">
            Allow
          </Button>
        )}
        <Button onClick={onTryDemo} variant={useFallback ? "primary" : "secondary"}>
          {useFallback ? 'Continue' : 'Demo'}
        </Button>
      </div>
    </motion.div>
  );
}

export default CameraCalibrationFrame;

