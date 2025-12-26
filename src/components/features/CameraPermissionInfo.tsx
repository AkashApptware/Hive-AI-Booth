import { motion } from 'motion/react';
import { Camera, AlertCircle } from 'lucide-react';
import { colors } from '@/utils/colors';

interface CameraPermissionInfoProps {
  mode: 'requesting' | 'denied' | 'granted';
}

const CameraPermissionInfo=({ mode }: CameraPermissionInfoProps) =>{
  if (mode === 'granted') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 backdrop-blur-sm border rounded-lg px-6 py-3 flex items-center gap-3 max-w-md"
      style={{
        backgroundColor: `${colors.surface}E6`,
        borderColor: `${colors.secondary}4D`,
      }}
    >
      {mode === 'requesting' && (
        <>
          <Camera className="w-5 h-5 animate-pulse" style={{ color: colors.secondary }} />
          <p className="text-sm uppercase tracking-wide" style={{ color: colors.text }}>
            Allow Camera Access
          </p>
        </>
      )}
      {mode === 'denied' && (
        <>
          <AlertCircle className="w-5 h-5" style={{ color: colors.textMuted }} />
          <p className="text-sm uppercase tracking-wide" style={{ color: colors.text }}>
            Demo Mode Active
          </p>
        </>
      )}
    </motion.div>
  );
}
export default CameraPermissionInfo