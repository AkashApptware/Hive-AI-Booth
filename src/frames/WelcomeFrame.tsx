import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Zap } from 'lucide-react';
import { Logo, Button } from '@/components';
// import expressionsGrid from 'figma:asset/de782b3e842b439f134f3aa9e2ba21bc2e96ce5f.png';
import { useState, useEffect } from 'react';

interface WelcomeFrameProps {
  onNext: () => void;
}

export function WelcomeFrame({ onNext }: WelcomeFrameProps) {
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);

  // 6 individual expressions from the grid - each has a unique crop position
  // Grid layout: 3 columns x 2 rows
  const faces = [
    { expression: 'excited', delay: 0.4, gridX: 0, gridY: 0 },
    { expression: 'thoughtful', delay: 0.5, gridX: 1, gridY: 0 },
    { expression: 'surprised', delay: 0.6, gridX: 2, gridY: 0 },
    { expression: 'shocked', delay: 0.7, gridX: 0, gridY: 1 },
    { expression: 'calm', delay: 0.8, gridX: 1, gridY: 1 },
    { expression: 'celebrating', delay: 0.9, gridX: 2, gridY: 1 },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFaceIndex((prev) => (prev + 1) % faces.length);
    }, 3000); // Change face every 3 seconds

    return () => clearInterval(interval);
  }, [faces.length]);

  const currentFace = faces[currentFaceIndex];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A1F3E] via-[#4A1F3E] to-[#6B2D5C]/50" />

      {/* Minimal hexagon pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons-welcome" width="100" height="87" patternUnits="userSpaceOnUse">
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="#E9A86A"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-welcome)" />
        </svg>
      </div>

      {/* Soft gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ backgroundColor: '#E9A86A22' }}
      />

      {/* Left Section - Carousel Face (60%) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-[60%] h-full relative flex items-center justify-center p-16 z-10"
      >
        {/* Centered Face Container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Face Carousel */}
          <div className="relative w-[420px] h-[420px] mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFaceIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  {/* Face Image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#6B2D5C]/20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("https://www.shutterstock.com/image-vector/happy-cartoon-capybara-holding-vintage-600nw-2611613163.jpg")`,
                        backgroundSize: '300% 200%',
                        backgroundPosition: `${currentFace.gridX * 50}% ${currentFace.gridY * 100}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6B2D5C]/10 via-transparent to-[#E9A86A]/10" />

                  {/* Minimal scanning effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {/* Soft face detection box */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: [0, 0.5, 0.5], scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute"
                      style={{
                        top: '18%',
                        left: '22%',
                        width: '56%',
                        height: '64%',
                        border: '1.5px solid #E9A86A',
                        borderRadius: '12px',
                      }}
                    >
                      {/* Corner markers */}
                      <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-l-2 border-t-2 border-[#F4D8B8]" />
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-r-2 border-t-2 border-[#F4D8B8]" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-l-2 border-b-2 border-[#F4D8B8]" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-r-2 border-b-2 border-[#F4D8B8]" />
                    </motion.div>

                    {/* Minimal detection points */}
                    {[
                      { x: 42, y: 35 }, // left eye
                      { x: 58, y: 35 }, // right eye
                      { x: 50, y: 50 }, // nose
                      { x: 50, y: 62 }, // mouth
                    ].map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 0.6, 0.6], scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        className="absolute w-2 h-2 rounded-full bg-[#E9A86A]"
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: '0 0 8px rgba(233, 168, 106, 0.6)'
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Soft border */}
                  <div className="absolute inset-0 border-2 border-[#E9A86A]/20 rounded-3xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Expression Label */}
          <motion.div
            key={currentFaceIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-2.5 rounded-full bg-[#6B2D5C]/40 backdrop-blur-sm border border-[#E9A86A]/30"
          >
            <span className="text-[#F4D8B8] uppercase tracking-wider" style={{ fontSize: '14px' }}>
              {currentFace.expression}
            </span>
          </motion.div>

          {/* Carousel indicators */}
          <div className="flex gap-2 mt-6">
            {faces.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentFaceIndex(idx)}
                className="group relative"
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentFaceIndex 
                      ? 'bg-[#E9A86A] w-8' 
                      : 'bg-[#E9A86A]/30 group-hover:bg-[#E9A86A]/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Section - Content Panel (40%) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[40%] h-full relative flex flex-col items-start justify-center p-16 pl-8 z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <Logo size="large" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#F4D8B8] mb-5 uppercase tracking-tight text-left"
          style={{ fontSize: '48px', lineHeight: '1.1' }}
        >
          Discover Your Design DNA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#D4B5C8] mb-10 text-left max-w-md"
          style={{ fontSize: '17px', lineHeight: '1.6' }}
        >
          AI-powered emotion detection meets creative archetypes. React naturally to 4 designer moments and reveal your true design personality.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col gap-3 mb-10 w-full max-w-sm"
        >
          {[
            { icon: Camera, text: 'Live Webcam', color: '#E9A86A' },
            { icon: Zap, text: 'AI Detection', color: '#F4D8B8' },
            { icon: Sparkles, text: '6 Archetypes', color: '#E9A86A' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#6B2D5C]/30 border border-[#E9A86A]/30 backdrop-blur-sm transition-all duration-200 hover:bg-[#6B2D5C]/40 hover:border-[#E9A86A]/40"
            >
              <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
              <span className="text-[#F4D8B8] uppercase tracking-wide" style={{ fontSize: '13px' }}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onNext} variant="primary">
            Start Your Journey →
          </Button>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex items-center gap-2 text-[#D4B5C8]/60"
          style={{ fontSize: '12px' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10 6H15L11 9L12.5 14L8 11L3.5 14L5 9L1 6H6L8 1Z" fill="#E9A86A" opacity="0.4" />
          </svg>
          <span className="uppercase tracking-wide">100% Safe & Private</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WelcomeFrame;