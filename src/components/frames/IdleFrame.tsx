import { motion } from 'motion/react';
import { Button } from '@/components';

interface IdleFrameProps {
  proximityLevel: number;
  onNext: () => void;
}

export function IdleFrame({ proximityLevel, onNext }: IdleFrameProps) {
  return (
    <motion.div
      key="frame-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-64 h-64 relative"
      >
        <div 
          className="absolute inset-0 bg-[#FFB347]/20 rounded-full blur-3xl transition-all duration-300"
          style={{ 
            transform: `scale(${1 + proximityLevel / 200})`,
            opacity: 0.2 + proximityLevel / 200
          }}
        />
        <div 
          className="absolute inset-8 bg-[#1E88E5]/20 rounded-full blur-2xl transition-all duration-300"
          style={{ 
            transform: `scale(${1 + proximityLevel / 150})`,
            opacity: 0.2 + proximityLevel / 150
          }}
        />
      </motion.div>
      <div className="text-center z-10">
        <h2 className="text-[#F4D8B8] mb-6 uppercase tracking-tight">
          Step Closer
        </h2>
        <div className="text-[#D4B5C8] text-sm mb-4">👣 Activate Camera</div>
        {proximityLevel > 0 && (
          <div className="mt-4">
            <div className="w-64 h-2 bg-[#5A2650]/60 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-[#E9A86A]"
                initial={{ width: 0 }}
                animate={{ width: `${proximityLevel}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-[#D4B5C8] text-sm mt-2">Detecting presence...</p>
          </div>
        )}
        {proximityLevel === 0 && (
          <Button onClick={onNext} variant="secondary">
            Skip
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default IdleFrame;

