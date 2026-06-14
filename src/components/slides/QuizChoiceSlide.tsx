'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizOption } from '@/config/courseData';

interface Props { question: string; options: QuizOption[]; color: string; onCorrect: () => void; }

export default function QuizChoiceSlide({ question, options, color, onCorrect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  const handleSelect = (opt: QuizOption) => {
    if (selected) return;
    setSelected(opt.word);
    if (opt.isCorrect) {
      setTimeout(() => onCorrect(), 1200);
    } else {
      setShake(opt.word);
      setTimeout(() => { setShake(null); setSelected(null); }, 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-6 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Quiz Time!</span>
        <h2 className="text-lg font-black text-base-content mt-1">{question}</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {options.map((opt) => {
          const isSelected = selected === opt.word;
          const isCorrect = opt.isCorrect;
          const isShaking = shake === opt.word;
          return (
            <motion.button
              key={opt.word}
              onClick={() => handleSelect(opt)}
              className={`card cursor-pointer border-2 p-4 flex flex-col items-center gap-2 transition-all ${
                isSelected && isCorrect ? 'border-success bg-success/10'
                : isSelected && !isCorrect ? 'border-error bg-error/10'
                : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200'
              } ${isShaking ? 'shake-anim' : ''}`}
              whileHover={!selected ? { scale: 1.04, y: -2 } : {}}
              whileTap={!selected ? { scale: 0.96 } : {}}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span className="text-xs font-black text-base-content">{opt.word}</span>
              <AnimatePresence>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    {isCorrect ? <CheckCircle2 size={20} className="text-success" /> : <XCircle size={20} className="text-error" />}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && options.find((o) => o.word === selected)?.isCorrect && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="alert alert-success py-2 text-sm font-black">
            <span>🎉 Correct! Great job!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
