import { colors } from '@/utils/colors';
import { Logo } from '@/components/ui/Logo';

interface HeaderProps {
  currentFrame: number;
}

export function Header({ currentFrame }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6">
      <div className="flex items-center gap-3">
        <Logo size="small" />
      </div>

      <div className="flex items-center gap-4">
        {currentFrame >= 3 && (
          <div className="text-sm uppercase tracking-wider" style={{ color: colors.textMuted }}>
            {currentFrame - 2} / 9
          </div>
        )}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.secondary }} />
          <span className="text-xs uppercase tracking-wider" style={{ color: colors.textMuted }}>Live</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

