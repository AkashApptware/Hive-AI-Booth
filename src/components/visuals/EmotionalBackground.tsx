import { motion } from 'motion/react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { colors } from '@/utils/colors';

export function EmotionalBackground() {
  const faceImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1620204389674-ef76805d76b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGNyZWF0aXZlJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM0NDAwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      emotion: 'creative',
      x: 20,
      y: 25,
      scale: 1,
      delay: 0,
      color: colors.secondary
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1686543972602-da0c7ea61ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGRlc2lnbmVyJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzNDQwMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      emotion: 'designer',
      x: 75,
      y: 30,
      scale: 0.9,
      delay: 1,
      color: colors.primary
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1678542230173-8e2c3eb87c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzQ0MDAzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      emotion: 'professional',
      x: 15,
      y: 70,
      scale: 1.1,
      delay: 2,
      color: colors.accent
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1644085811610-7dbf10f96134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGFydGlzdCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzYzNDQwMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      emotion: 'artist',
      x: 80,
      y: 65,
      scale: 0.95,
      delay: 3,
      color: colors.secondary
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {faceImages.map((face) => (
        <motion.div
          key={face.id}
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: face.scale,
            rotate: [0, 8, -8, 0],
            y: [0, -15, 0]
          }}
          transition={{
            opacity: { duration: 5, repeat: Infinity, delay: face.delay },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: face.delay },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: face.delay },
            scale: { duration: 1, delay: face.delay }
          }}
          className="absolute"
          style={{
            left: `${face.x}%`,
            top: `${face.y}%`,
            width: `${120 * face.scale}px`,
            height: `${120 * face.scale}px`,
          }}
        >
          <div 
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              boxShadow: `0 0 40px ${face.color}40`
            }}
          >
            <ImageWithFallback
              src={face.url}
              alt={face.emotion}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
            
            <div 
              className="absolute inset-0 mix-blend-overlay"
              style={{
                backgroundColor: face.color,
                opacity: 0.4
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)'
              }}
            />
          </div>
        </motion.div>
      ))}

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          width: '220px',
          height: '220px',
        }}
      >
        <div 
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            boxShadow: `0 0 80px ${colors.primary}40`
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1544168190-79c17527004f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMGNyZWF0aXZlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzQ0MDA0MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="creative professional"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div 
            className="absolute inset-0 mix-blend-overlay"
            style={{
              backgroundColor: colors.primary,
              opacity: 0.5
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.7) 100%)'
            }}
          />
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${colors.secondary}20 0%, transparent 60%)`
        }}
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 60%, ${colors.primary}15 0%, transparent 60%)`
        }}
      />

      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.accent}18 0%, transparent 70%)`
        }}
      />
    </div>
  );
}

export default EmotionalBackground;


