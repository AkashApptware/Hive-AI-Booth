import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { colors } from '@/utils/colors';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm font-medium";

  const variantStyles = {
    primary: {
      className: "shadow-lg hover:shadow-xl",
      style: {
        backgroundColor: colors.secondary,
        color: colors.background,
      }
    },
    secondary: {
      className: "shadow-lg hover:shadow-xl",
      style: {
        backgroundColor: colors.primary,
        color: colors.text,
      }
    },
    ghost: {
      className: "border hover:bg-opacity-10",
      style: {
        backgroundColor: 'transparent',
        color: colors.text,
        borderColor: `${colors.textSecondary}80`,
      }
    }
  };

  const { className: variantClassName, style } = variantStyles[variant];

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClassName} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={style}
    >
      {children}
    </motion.button>
  );
}

export default Button;

