import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // in milliseconds
}

interface DriftingItem {
  id: number;
  type: 'envelope' | 'paper' | 'note';
  startX: number; // in percentage of screen
  startY: number;
  endX: number;
  endY: number;
  rotStart: number;
  rotEnd: number;
  scale: number;
  duration: number;
  delay: number;
  driftCurveY: number;
}

const DRIFTING_LETTERS: DriftingItem[] = [
  {
    id: 1,
    type: 'envelope',
    startX: -15,
    startY: 75,
    endX: 115,
    endY: 20,
    rotStart: -25,
    rotEnd: 45,
    scale: 1,
    duration: 3.2,
    delay: 0.1,
    driftCurveY: -35,
  },
  {
    id: 2,
    type: 'paper',
    startX: -10,
    startY: 55,
    endX: 110,
    endY: -10,
    rotStart: 12,
    rotEnd: -35,
    scale: 0.85,
    duration: 3.6,
    delay: 0.4,
    driftCurveY: -45,
  },
  {
    id: 3,
    type: 'note',
    startX: 10,
    startY: 85,
    endX: 120,
    endY: 35,
    rotStart: -15,
    rotEnd: 30,
    scale: 0.75,
    duration: 2.9,
    delay: 0.2,
    driftCurveY: -25,
  },
  {
    id: 4,
    type: 'envelope',
    startX: -20,
    startY: 40,
    endX: 110,
    endY: 10,
    rotStart: 30,
    rotEnd: 65,
    scale: 0.7,
    duration: 3.4,
    delay: 0.7,
    driftCurveY: -30,
  },
  {
    id: 5,
    type: 'paper',
    startX: 5,
    startY: 90,
    endX: 115,
    endY: 5,
    rotStart: -8,
    rotEnd: -48,
    scale: 1.1,
    duration: 3.5,
    delay: 0.5,
    driftCurveY: -50,
  },
  {
    id: 6,
    type: 'note',
    startX: -5,
    startY: 65,
    endX: 105,
    endY: 45,
    rotStart: 18,
    rotEnd: 52,
    scale: 0.65,
    duration: 3.1,
    delay: 0.9,
    driftCurveY: -20,
  },
  {
    id: 7,
    type: 'envelope',
    startX: 20,
    startY: 95,
    endX: 125,
    endY: 15,
    rotStart: -12,
    rotEnd: 40,
    scale: 0.9,
    duration: 3.3,
    delay: 0.6,
    driftCurveY: -40,
  },
];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDuration = 3000,
}) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="dear-kat-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] overflow-hidden cursor-pointer select-none"
          onClick={handleSkip}
          title="Click to enter"
        >
          {/* Subtle natural paper texture background */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#D6C6B6 0.75px, transparent 0.75px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Minimalist Wind Breeze Wisps */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full text-[#E0D4C7] opacity-60"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Wind gust 1 */}
              <motion.path
                d="M -100 450 C 250 420, 450 320, 800 240 S 1100 180, 1200 160"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="16 24"
                initial={{ pathOffset: 0 }}
                animate={{ pathOffset: -1 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              {/* Wind gust 2 */}
              <motion.path
                d="M -50 320 C 200 280, 500 220, 750 160 S 1050 110, 1150 90"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="12 18"
                initial={{ pathOffset: 0 }}
                animate={{ pathOffset: -1 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
              />
              {/* Wind gust 3 */}
              <motion.path
                d="M 50 550 C 350 500, 600 390, 850 310 S 1150 250, 1250 220"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="10 20"
                initial={{ pathOffset: 0 }}
                animate={{ pathOffset: -1 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 0.7 }}
              />
            </svg>
          </div>

          {/* Letters being blown away by the wind */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {DRIFTING_LETTERS.map((item) => (
              <motion.div
                key={item.id}
                className="absolute"
                initial={{
                  left: `${item.startX}%`,
                  top: `${item.startY}%`,
                  rotate: item.rotStart,
                  scale: item.scale * 0.9,
                  opacity: 0,
                }}
                animate={{
                  left: `${item.endX}%`,
                  top: `${item.endY}%`,
                  rotate: item.rotEnd,
                  scale: item.scale,
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.2, 0.8, 1],
                }}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Wind tumble 3D flutter effect */}
                <motion.div
                  animate={{
                    rotateX: [0, 25, -20, 15, 0],
                    rotateY: [0, -30, 25, -15, 0],
                    y: [0, item.driftCurveY * 0.4, item.driftCurveY, item.driftCurveY * 0.6, 0],
                  }}
                  transition={{
                    duration: item.duration,
                    delay: item.delay,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Type 1: Delicate Vintage Envelope */}
                  {item.type === 'envelope' && (
                    <div className="w-14 h-9 sm:w-16 sm:h-11 bg-[#FDFBF7] rounded-sm border border-[#DDD0C4] shadow-[0_4px_12px_rgba(70,55,45,0.09)] relative flex items-center justify-center overflow-hidden">
                      {/* Envelope flap lines */}
                      <svg
                        className="absolute inset-0 w-full h-full text-[#D4C3B5]"
                        fill="none"
                        viewBox="0 0 64 44"
                      >
                        <path d="M 0 0 L 32 24 L 64 0" stroke="currentColor" strokeWidth="0.9" />
                        <path d="M 0 44 L 26 20" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M 64 44 L 38 20" stroke="currentColor" strokeWidth="0.8" />
                      </svg>
                      {/* Tiny wax seal or heart stamp */}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#BA3D35]/70 flex items-center justify-center shadow-xs">
                        <span className="text-[6px] text-white">♡</span>
                      </div>
                    </div>
                  )}

                  {/* Type 2: Minimalist Letter / Ruled Parchment */}
                  {item.type === 'paper' && (
                    <div className="w-12 h-16 sm:w-14 sm:h-18 bg-[#FFFDF9] rounded-[2px] border border-[#E0D5C9] shadow-[0_4px_10px_rgba(70,55,45,0.08)] p-1.5 flex flex-col justify-around">
                      {/* Faint handwriting / text lines */}
                      <div className="w-3/4 h-[1px] bg-[#C8B8AA]/60" />
                      <div className="w-full h-[1px] bg-[#C8B8AA]/40" />
                      <div className="w-5/6 h-[1px] bg-[#C8B8AA]/40" />
                      <div className="w-2/3 h-[1px] bg-[#C8B8AA]/40" />
                      <div className="w-1/2 h-[1px] bg-[#C8B8AA]/50" />
                    </div>
                  )}

                  {/* Type 3: Folded Note / Origami Letter */}
                  {item.type === 'note' && (
                    <div className="w-10 h-12 sm:w-11 sm:h-13 bg-[#FAF5ED] rounded-xs border border-[#D9CBC0] shadow-[0_3px_8px_rgba(70,55,45,0.07)] relative">
                      {/* Subtle fold crease across */}
                      <div className="absolute top-1/2 inset-x-0 h-[1px] bg-[#C9B9AC]/70" />
                      <div className="p-1">
                        <div className="w-1/2 h-[1px] bg-[#C9B9AC]/50 mt-1" />
                        <div className="w-3/4 h-[1px] bg-[#C9B9AC]/40 mt-1" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Central & Only Typography: "Dear Kat" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center px-6 pointer-events-none"
          >
            <h1 className="font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#241C18] tracking-wide drop-shadow-xs">
              Dear Kat
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
