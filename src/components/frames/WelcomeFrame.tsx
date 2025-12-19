import { motion } from 'motion/react';
import { Camera, Smile, Sparkles } from 'lucide-react';
import { Button, Logo } from '@/components';

interface WelcomeFrameProps {
  onNext: () => void;
}

export function WelcomeFrame({ onNext }: WelcomeFrameProps) {
  return (
    <motion.div
      key="frame-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center lg:justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6"
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 w-full min-h-0">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center flex flex-col items-center mb-0 sm:mb-1"
        >
          <Logo size="large" className="mb-1 sm:mb-2" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        >
          <h2 className="text-[#F4D8B8] mb-1 sm:mb-2 md:mb-2 lg:mb-3 uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            What's happening here?
          </h2>
          <p className="text-[#D4B5C8] mb-2 sm:mb-3 md:mb-3 lg:mb-4 tracking-wide leading-tight text-xs sm:text-sm md:text-base lg:text-lg">
            You're about to vibe with an AI that reads tiny facial expressions and turns them into your Design Archetype. No stress. No saving. Just pure designer energy.
          </p>
        </motion.div>

        {/* How to play section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mb-1 sm:mb-2 md:mb-2 lg:mb-3 w-full shrink-0"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-[#5A2650]/40 backdrop-blur-sm border-2 border-[#E9A86A]/30 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 text-center hover:border-[#E9A86A]/60 hover:bg-[#5A2650]/60 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Hexagon glow effect */}
            <div className="absolute -top-8 -right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-[#E9A86A]/10 rounded-full blur-2xl group-hover:bg-[#E9A86A]/20 transition-all duration-300" />

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 mx-auto mb-1 sm:mb-2 md:mb-2 lg:mb-3 bg-[#6B2D5C]/60 rounded-full flex items-center justify-center border-2 border-[#E9A86A]/40"
              >
                <Camera className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-[#E9A86A]" />
              </motion.div>
              <p className="text-[#F4D8B8] uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Face the camera</p>
              <p className="text-[#D4B5C8] leading-tight text-[10px] sm:text-xs md:text-sm lg:text-base">Stand where the hive can see your fabulous face.</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-[#5A2650]/40 backdrop-blur-sm border-2 border-[#E9A86A]/30 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 text-center hover:border-[#E9A86A]/60 hover:bg-[#5A2650]/60 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Hexagon glow effect */}
            <div className="absolute -top-8 -right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-[#E9A86A]/10 rounded-full blur-2xl group-hover:bg-[#E9A86A]/20 transition-all duration-300" />

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 mx-auto mb-1 sm:mb-2 md:mb-2 lg:mb-3 bg-[#6B2D5C]/60 rounded-full flex items-center justify-center border-2 border-[#E9A86A]/40"
              >
                <Smile className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-[#E9A86A]" />
              </motion.div>
              <p className="text-[#F4D8B8] uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">React like a designer</p>
              <p className="text-[#D4B5C8] leading-tight text-[10px] sm:text-xs md:text-sm lg:text-base">Smile, squint, eye-roll, clap… whatever feels right. Just be you.</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="bg-[#5A2650]/40 backdrop-blur-sm border-2 border-[#E9A86A]/30 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 text-center hover:border-[#E9A86A]/60 hover:bg-[#5A2650]/60 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Hexagon glow effect */}
            <div className="absolute -top-8 -right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 bg-[#E9A86A]/10 rounded-full blur-2xl group-hover:bg-[#E9A86A]/20 transition-all duration-300" />

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 mx-auto mb-1 sm:mb-2 md:mb-2 lg:mb-3 bg-[#6B2D5C]/60 rounded-full flex items-center justify-center border-2 border-[#E9A86A]/40"
              >
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-[#E9A86A]" />
              </motion.div>
              <p className="text-[#F4D8B8] uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Meet your inner design creature</p>
              <p className="text-[#D4B5C8] leading-tight text-[10px] sm:text-xs md:text-sm lg:text-base">At the end, the Hive reveals the archetype hidden in your expressions.</p>
            </div>
          </motion.div>
        </div>
        </motion.div>
      </div>

      {/* Bottom section - Microcopy and Button */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 lg:pb-16 xl:pb-20">
        {/* Microcopy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center px-4"
        >
          <p className="text-[#D4B5C8] text-[10px] sm:text-xs md:text-sm lg:text-base mt-2 ">
            Don't overthink it — your face already has opinions 😄
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button onClick={onNext} variant="primary">
            Let's Begin →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WelcomeFrame;

