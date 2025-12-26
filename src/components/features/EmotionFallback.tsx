import { motion } from 'motion/react';
import { colors } from '@/utils/colors';

interface EmotionFallbackProps {
  emotions: string[];
  onSelect: (emotion: string, confidence: number) => void;
  disabled?: boolean;
}

export function EmotionFallback({ emotions, onSelect, disabled = false }: EmotionFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6"
    >
      <p className="uppercase tracking-wider" style={{ color: colors.textMuted }}>Select Reaction</p>
      <div className="flex gap-4">
        {emotions.map((emotion, index) => {
          const parts = emotion.split(' ');
          const emoji = parts[0];
          const text = parts.slice(1).join(' ');
          
          return (
            <motion.button
              key={emotion}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: disabled ? 1 : 1.1 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              onClick={() => !disabled && onSelect(emotion, 0.8)}
              disabled={disabled}
              className="px-8 py-4 backdrop-blur-sm border rounded-full transition-all uppercase tracking-wider flex items-center gap-2"
              style={{
                backgroundColor: `${colors.surface}CC`,
                borderColor: `${colors.secondary}4D`,
                color: colors.text,
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <span style={{ fontSize: '2em' }}>{emoji}</span>
              <span>{text}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default EmotionFallback;

