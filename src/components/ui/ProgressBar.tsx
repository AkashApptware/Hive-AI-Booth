import { motion } from 'motion/react';
import { colors } from '@/utils/colors';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const steps = ['Scanning', 'Processing', 'Analyzing', 'Computing', 'Finalizing'];
  
  return (
    <div className="w-full max-w-2xl">
      <div 
        className="relative h-2 backdrop-blur-sm rounded-full overflow-hidden border"
        style={{
          backgroundColor: `${colors.surface}99`,
          borderColor: `${colors.secondary}33`,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-full"
          style={{
            background: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`
          }}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: progress > (index * 20) ? 1 : 0.3,
              scale: progress > (index * 20) ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div 
              className={`w-3 h-3 rounded-full`}
              style={{ 
                backgroundColor: progress > (index * 20) ? colors.secondary : `${colors.textMuted}4D`
              }}
            />
            <span 
              className={`text-xs uppercase tracking-wider`}
              style={{ 
                color: progress > (index * 20) ? colors.text : colors.textMuted
              }}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}