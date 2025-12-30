import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentFrame: number;
  totalFrames: number;
  onPrevious: () => void;
  onNext: () => void;
  onFrameChange: (frame: number) => void;
}

export function Navigation({
  currentFrame,
  totalFrames,
  onPrevious,
  onNext,
  onFrameChange
}: NavigationProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 md:gap-6 z-50">
      <button
        onClick={onPrevious}
        disabled={currentFrame === 0}
        className="p-2 sm:p-3 rounded-full bg-[#5A2650]/80 backdrop-blur-md border-2 border-[#E9A86A]/40 hover:border-[#E9A86A] hover:bg-[#6B2D5C]/90 disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4D8B8]" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3 bg-[#5A2650]/80 backdrop-blur-md border-2 border-[#E9A86A]/30 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 shadow-xl">
        {Array.from({ length: totalFrames }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <button
              onClick={() => onFrameChange(i)}
              className={`relative transition-all duration-300 ${
                i === currentFrame 
                  ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' 
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2'
              }`}
            >
              {/* Outer glow for active step */}
              {i === currentFrame && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0.4 }}
                  className="absolute inset-0 -m-1 sm:-m-2 bg-[#E9A86A] rounded-full blur-md"
                />
              )}

              {/* Step circle */}
              <div className={`relative w-full h-full rounded-full transition-all duration-300 ${
                i < currentFrame 
                  ? 'bg-[#E9A86A] border-2 border-[#E9A86A]' 
                  : i === currentFrame
                  ? 'bg-[#E9A86A] border-2 border-[#F4D8B8] shadow-lg shadow-[#E9A86A]/50'
                  : 'bg-[#4A1F3E] border border-[#6B2D5C]/50 hover:border-[#E9A86A]/60 hover:bg-[#5A2650]'
              }`}>
                {/* Checkmark for completed steps */}
                {i < currentFrame && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#4A1F3E] rounded-full" />
                  </motion.div>
                )}
              </div>

              {/* Connecting line to next step */}
              {i < totalFrames - 1 && (
                <div className={`absolute left-full top-1/2 -translate-y-1/2 w-2 sm:w-3 h-0.5 transition-all duration-300 ${
                  i < currentFrame 
                    ? 'bg-[#E9A86A]' 
                    : 'bg-[#6B2D5C]/30'
                }`} />
              )}
            </button>

            {/* Step number label for active step */}
            {i === currentFrame && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#E9A86A] text-[8px] sm:text-[10px] uppercase tracking-wider"
              >
                {i + 1}/9
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentFrame === totalFrames - 1}
        className="p-2 sm:p-3 rounded-full bg-[#5A2650]/80 backdrop-blur-md border-2 border-[#E9A86A]/40 hover:border-[#E9A86A] hover:bg-[#6B2D5C]/90 disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4D8B8]" />
      </button>
    </div>
  );
}

export default Navigation;

