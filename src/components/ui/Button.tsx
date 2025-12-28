import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { colors } from '@/utils/colors';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?:string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className: customClassName,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center gap-2 cursor-pointer rounded-xl uppercase tracking-wider transition-all " +
    "whitespace-normal break-words text-center " +
    "px-4 py-3 text-xs " +                 // mobile
    "sm:px-6 sm:py-3 sm:text-sm " +         // tablet
    "lg:px-6 lg:py-3 lg:text-base " +       // desktop
    "font-['Hammersmith_One',_sans-serif]"; // font family

  const variantStyles = {
    primary: {
      className: "shadow-lg",
      style: {
        backgroundColor: colors.secondary,
        color: colors.background,
      },
    },
    secondary: {
      className: "shadow-lg",
      style: {
        backgroundColor: colors.primary,
        color: colors.text,
      },
    },
    ghost: {
      className: "border",
      style: {
        backgroundColor: "transparent",
        color: colors.text,
        borderColor: `${colors.border}80`,
      },
    },
  };

  const { className: variantClassName, style } = variantStyles[variant];

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClassName} ${customClassName || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ ...style, fontFamily: "'Hammersmith One', sans-serif" }}
    >
      {children}
    </motion.button>
  );
}
export default Button