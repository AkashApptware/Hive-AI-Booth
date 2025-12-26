import React from "react";
import { motion } from "motion/react";
import { Share2, Camera, Download } from 'lucide-react';
import { Button, ArchetypeBadge } from '@/components';

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

interface ShareScreenProps {
  selectedArchetype?: Archetype | null;
  onNext?: () => void;
}

const ShareScreen: React.FC<ShareScreenProps> = ({ selectedArchetype, onNext }) => {
  if (!selectedArchetype) {
    return null;
  }

  const downloadBadge = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#0F1724';
      ctx.fillRect(0, 0, 800, 800);
      
      ctx.strokeStyle = selectedArchetype.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(400, 100);
      ctx.lineTo(600, 225);
      ctx.lineTo(600, 575);
      ctx.lineTo(400, 700);
      ctx.lineTo(200, 575);
      ctx.lineTo(200, 225);
      ctx.closePath();
      ctx.stroke();
      
      ctx.fillStyle = '#F3E9D2';
      ctx.font = '48px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(selectedArchetype.emoji, 400, 380);
      ctx.font = '32px Inter';
      ctx.fillText(selectedArchetype.name, 400, 450);
      
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `design-hive-${selectedArchetype.name.toLowerCase().replace(/\s/g, '-')}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <motion.div
      key="frame-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-12"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-40 h-40 opacity-10"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="#E9A86A"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-48 h-48 opacity-10"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="#F4D8B8"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center relative"
      >
        <h2 className="text-[#F4D8B8] uppercase tracking-tight text-4xl mb-2">
          Share Your Badge
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-transparent via-[#E9A86A] to-transparent rounded-full"
        />
        <p className="text-[#D4B5C8] mt-4 uppercase tracking-wider">
          Download or scan to share your design DNA
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-8 rounded-3xl blur-3xl"
          style={{ backgroundColor: selectedArchetype.color + '30' }}
        />

        <div className="relative bg-[#5A2650]/60 backdrop-blur-xl border-2 border-[#E9A86A]/40 rounded-3xl p-12 shadow-2xl">
          <div className="flex gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              <ArchetypeBadge archetype={selectedArchetype} size="medium" />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 text-center"
              >
                <p className="text-[#F4D8B8] uppercase tracking-wider mb-2" style={{ fontSize: '16px' }}>
                  {selectedArchetype.name}
                </p>
                <div className="px-4 py-2 rounded-full bg-[#6B2D5C]/60 border border-[#E9A86A]/30">
                  <p className="text-[#D4B5C8] uppercase tracking-wider" style={{ fontSize: '12px' }}>
                    Your Design Archetype
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-px h-80 bg-gradient-to-b from-transparent via-[#E9A86A]/50 to-transparent"
            />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)]" viewBox="0 0 280 280">
                  <motion.polygon
                    points="140,20 240,75 240,185 140,240 40,185 40,75"
                    fill="none"
                    stroke="#E9A86A"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </svg>

                <div className="relative w-56 h-56 bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const isBlack = (i % 3 === 0) || (i % 7 === 0) || (i % 11 === 0);
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 + (i * 0.01) }}
                          className={isBlack ? 'bg-black' : 'bg-white'}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-white/95">
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#6B2D5C] to-[#E9A86A] rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Share2 className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-[#4A1F3E] uppercase tracking-wider" style={{ fontSize: '11px' }}>
                        Scan to view
                      </p>
                      <p className="text-[#6B2D5C]" style={{ fontSize: '10px' }}>
                        design-hive.app
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B2D5C]/40 border border-[#E9A86A]/30">
                <Camera className="w-3.5 h-3.5 text-[#E9A86A]" />
                <p className="text-[#F4D8B8] uppercase tracking-wider" style={{ fontSize: '11px' }}>
                  Scan with phone
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex gap-4"
      >
        <Button onClick={downloadBadge} variant="primary">
          <Download className="w-5 h-5 mr-2" />
          Download Badge
        </Button>
        <Button onClick={() => onNext?.()} variant="secondary">
          View Hive Wall →
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-12"
      >
        <p className="text-[#D4B5C8]/60 uppercase tracking-wider" style={{ fontSize: '11px' }}>
          Press → or click "View Hive Wall" to see all archetypes
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ShareScreen;

