import { motion } from 'motion/react';

interface HintChipProps {
  text: string;
  className?: string;
}

export function HintChip({ text, className = '' }: HintChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-block px-4 py-2 bg-[#5A2650]/60 backdrop-blur-sm border border-[#E9A86A]/30 rounded-full text-[#D4B5C8] text-sm uppercase tracking-wide ${className}`}
    >
      {text}
    </motion.div>
  );
}

export default HintChip;

