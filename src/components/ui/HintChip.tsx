import { motion } from 'motion/react';
import { colors } from '@/utils/colors';

interface HintChipProps {
  text: string;
}

export function HintChip({ text }: HintChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="inline-block px-6 py-3 backdrop-blur-sm border rounded-full text-xs uppercase tracking-widest"
      style={{
        backgroundColor: `${colors.surface}99`,
        borderColor: `${colors.secondary}4D`,
        color: colors.textMuted,
      }}
    >
      {text}
    </motion.div>
  );
}