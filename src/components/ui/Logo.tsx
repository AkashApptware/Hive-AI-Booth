import logoImage from '@/assets/images/design-hive-logo.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeStyles = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-24'
  };

  return (
    <img 
      src={logoImage} 
      alt="Design Hive" 
      className={`${sizeStyles[size]} w-auto ${className}`}
    />
  );
}

export default Logo;

