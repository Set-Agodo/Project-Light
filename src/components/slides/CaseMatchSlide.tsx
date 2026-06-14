'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { uppercase: string; caseChoices: string[]; correctCase: string; color: string; onCorrect: () => void; }

export default function CaseMatchSlide({ uppercase, caseChoices, correctCase, color, onCorrect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    if (choice === correctCase) {
      setTimeout(() => onCorrect(), 1200);
    } else {
      setShake(choice);
      setTimeout(() => { setShake(null); setSelected(null); }, 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-6 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Case Matching</span>
        <h2 className="text-base font-black text-base-content mt-1">Find the lowercase letter that matches</h2>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-28 h-28 rounded-3xl shadow-xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}bb)` }}
      >
        <span className="text-6xl font-black text-white">{uppercase}</span>
      </motion.div>

      <div className="flex gap-3 flex-wrap justify-center max-w-xs">
        {caseChoices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = choice === correctCase;
          const isShaking = shake === choice;
          return (
            <motion.button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={`w-20 h-20 rounded-3xl text-4xl font-black shadow-md border-2 cursor-pointer transition-all ${
                isSelected && isCorrect ? 'border-success bg-success/10 text-success'
                : isSelected && !isCorrect ? 'border-error bg-error/10 text-error'
                : 'border-base-200 bg-base-100 text-base-content hover:border-base-300 hover:bg-base-200'
              } ${isShaking ? 'shake-anim' : ''}`}
              whileHover={!selected ? { scale: 1.08, y: -3 } : {}}
              whileTap={!selected ? { scale: 0.94 } : {}}
            >
              {choice}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected === correctCase && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="alert alert-success py-2 text-sm font-black">
            <span>🎉 {uppercase} and {correctCase} match!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
