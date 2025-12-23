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
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8"
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
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 relative"
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
      <div className="text-center z-10 px-4 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-[#F4D8B8] mb-4 sm:mb-5 md:mb-6 lg:mb-8 uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Step Closer
        </h2>
        <div className="text-[#D4B5C8] text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5">👣 Activate Camera</div>
        {proximityLevel > 0 && (
          <div className="mt-3 sm:mt-4 md:mt-5">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-1.5 sm:h-2 bg-[#5A2650]/60 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-[#E9A86A]"
                initial={{ width: 0 }}
                animate={{ width: `${proximityLevel}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-[#D4B5C8] text-xs sm:text-sm md:text-base mt-2 sm:mt-3">Detecting presence...</p>
          </div>
        )}
        {proximityLevel === 0 && (
          <Button onClick={onNext} variant="secondary" className="w-full sm:w-auto">
            Skip
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default IdleFrame;

