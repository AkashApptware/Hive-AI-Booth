import { motion } from 'motion/react';
import { RefObject } from 'react';
import { colors } from '@/utils/colors';

interface CameraPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isActive: boolean;
}

export function CameraPreview({ videoRef, isActive }: CameraPreviewProps) {
  return (
    <div 
      className="relative w-[640px] h-[480px] backdrop-blur-sm rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: `${colors.surface}CC`,
        borderColor: `${colors.primary}4D`,
      }}
    >
      {/* Video preview */}
      {isActive && videoRef.current && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Camera placeholder */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${colors.textMuted}33` }}
          >
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke={colors.textMuted}>
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
            y: [0, 480, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-0 right-0 h-1"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`
          }}
        />
      )}

      {/* Corner indicators */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: colors.secondary }} />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: colors.secondary }} />

      {/* Status indicator */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border"
        style={{
          backgroundColor: `${colors.background}CC`,
          borderColor: `${colors.primary}4D`,
        }}
      >
        <div 
          className={`w-2 h-2 rounded-full ${isActive ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: isActive ? colors.secondary : colors.textMuted }}
        />
        <span className="text-xs uppercase tracking-wider" style={{ color: colors.text }}>
          {isActive ? 'Scanning' : 'Ready'}
        </span>
      </div>
    </div>
  );
}

export default CameraPreview;

