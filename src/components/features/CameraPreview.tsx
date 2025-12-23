import { motion } from 'motion/react';
import { RefObject, useEffect } from 'react';
import { colors } from '@/utils/colors';

interface CameraPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isActive: boolean;
}

export function CameraPreview({ videoRef, isActive }: CameraPreviewProps) {
  // Ensure video plays when stream is attached
  useEffect(() => {
    if (isActive && videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play().catch(error => {
        console.error('Video play error:', error);
      });
    }
  }, [isActive, videoRef]);

  return (
    <div 
      className="relative w-full max-w-[320px] h-[240px] sm:max-w-[400px] sm:h-[300px] md:max-w-[500px] md:h-[375px] lg:max-w-[640px] lg:h-[480px] xl:max-w-[720px] xl:h-[540px] backdrop-blur-sm rounded-xl md:rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: `${colors.surface}CC`,
        borderColor: `${colors.primary}4D`,
      }}
    >
      {/* Video preview - always render so ref can attach */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover ${isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          console.log('Video metadata loaded, playing...', {
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState,
            srcObject: !!video.srcObject
          });
          video.play().catch(error => {
            console.error('Error playing video on metadata load:', error);
          });
        }}
      />

      {/* Camera placeholder - show when video is not active */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.textMuted}33` }}
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" fill="none" viewBox="0 0 24 24" stroke={colors.textMuted}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Hexagonal grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-grid" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>

      {/* Scanning animation */}
      {isActive && (
        <motion.div
          animate={{
            y: [0, 600, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-0 right-0 top-0 h-0.5 md:h-1"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`
          }}
        />
      )}

      {/* Corner indicators */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-t-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-t-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-b-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-b-2" style={{ borderColor: colors.secondary }} />

      {/* Status indicator */}
      <div 
        className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 md:bottom-6 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full border"
        style={{
          backgroundColor: `${colors.background}CC`,
          borderColor: `${colors.primary}4D`,
        }}
      >
        <div 
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isActive ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: isActive ? colors.secondary : colors.textMuted }}
        />
        <span className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: colors.text }}>
          {isActive ? 'Scanning' : 'Ready'}
        </span>
      </div>
    </div>
  );
}

export default CameraPreview;

