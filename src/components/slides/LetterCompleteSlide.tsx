'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  completeWord: string;
  caseChoices: string[];
  correctCase: string;
  color: string;
  onCorrect: () => void;
}

export default function LetterCompleteSlide({ completeWord, caseChoices, correctCase, color, onCorrect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const wordLower = completeWord.toLowerCase().replace(' ', '-');
  // Find position of the missing letter (first occurrence, case-insensitive)
  const missingIdx = completeWord.toLowerCase().indexOf(correctCase.toLowerCase());

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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-4 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Complete the Word</span>
        <h2 className="text-base font-black text-base-content mt-1">Choose the letter that completes the word.</h2>
      </div>

      {/* Word with blank letter */}
      <div className="flex gap-1.5 items-center justify-center flex-wrap">
        {completeWord.split('').map((ch, i) => {
          const isBlank = i === missingIdx && !selected;
          const isReveal = i === missingIdx && !!selected;
          return (
            <div key={i} className={`w-9 h-11 rounded-xl flex items-center justify-center text-xl font-black border-2 transition-all ${
              isBlank ? 'border-dashed border-base-300 bg-base-200/50 text-transparent' :
              isReveal ? 'text-white' :
              'border-base-200 bg-base-100 text-base-content'
            }`}
              style={isReveal ? { background: color, borderColor: color } : {}}
            >
              {isBlank ? '_' : ch.toUpperCase()}
            </div>
          );
        })}
      </div>

      {/* Word picture */}
      <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 flex items-center justify-center"
        style={{ borderColor: `${color}44`, background: `${color}18` }}>
        {!imgError ? (
          <img src={`/images/${wordLower}.jpg`} alt={completeWord} onError={() => setImgError(true)} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl font-black" style={{ color }}>{completeWord[0]?.toUpperCase()}</span>
        )}
      </div>

      {/* Letter choices */}
      <div className="flex gap-3 flex-wrap justify-center">
        {caseChoices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = choice === correctCase;
          return (
            <motion.button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={`w-16 h-16 rounded-2xl text-3xl font-black border-2 shadow-md transition-all ${
                isSelected && isCorrect ? 'border-success bg-success/10 text-success' :
                isSelected && !isCorrect ? 'border-error bg-error/10 text-error' :
                'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200 text-base-content'
              } ${shake === choice ? 'shake-anim' : ''}`}
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
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="alert alert-success py-2 text-sm font-black">
            <span>🎉 {completeWord}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
