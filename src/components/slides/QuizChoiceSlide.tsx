'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizOption } from '@/config/courseData';

interface Props { question: string; options: QuizOption[]; color: string; letter: string; onCorrect: () => void; }

function OptionCard({ opt, selected, revealCorrects, shake, color, onSelect }: {
  opt: QuizOption;
  selected: string | null;
  revealCorrects: boolean;
  shake: string | null;
  color: string;
  onSelect: (opt: QuizOption) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isSelected = selected === opt.word;
  const showGreen = isSelected ? opt.isCorrect : (revealCorrects && opt.isCorrect);
  const showRed = isSelected && !opt.isCorrect;
  const isShaking = shake === opt.word;

  return (
    <motion.button
      onClick={() => onSelect(opt)}
      className={`card cursor-pointer border-2 p-3 flex flex-col items-center gap-1 transition-all ${
        showGreen ? 'border-success bg-success/10'
        : showRed ? 'border-error bg-error/10'
        : 'border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200'
      } ${isShaking ? 'shake-anim' : ''}`}
      whileHover={!selected ? { scale: 1.04, y: -2 } : {}}
      whileTap={!selected ? { scale: 0.96 } : {}}
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-base-200/60">
        {!imgError ? (
          <img
            src={`/images/${opt.word.toLowerCase()}.jpg`}
            alt={opt.word}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl">{opt.emoji}</span>
        )}
      </div>
      <span className="text-xs font-black text-base-content leading-tight text-center">{opt.word}</span>
      <AnimatePresence>
        {(showGreen || showRed) && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            {showGreen ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-error" />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function QuizChoiceSlide({ question, options, color, letter, onCorrect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio(`/audio/phrases/which_word_${letter.toLowerCase()}.m4a`);
    audio.play().catch(() => {});
  }, [letter]);

  const selectedOpt = options.find(o => o.word === selected);
  const revealCorrects = selectedOpt?.isCorrect ?? false;

  const handleSelect = (opt: QuizOption) => {
    if (selected !== null) return;
    setSelected(opt.word);
    if (opt.isCorrect) {
      setTimeout(() => onCorrect(), 1400);
    } else {
      setShake(opt.word);
      setTimeout(() => { setShake(null); setSelected(null); }, 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-4 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Quiz Time!</span>
        <h2 className="text-base font-black text-base-content mt-1">{question}</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {options.map((opt) => (
          <OptionCard
            key={opt.word}
            opt={opt}
            selected={selected}
            revealCorrects={revealCorrects}
            shake={shake}
            color={color}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <AnimatePresence>
        {revealCorrects && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="alert alert-success py-2 text-sm font-black">
            <span>🎉 Correct! Great job!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
