'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { scrambledWords: string[]; correctSentence: string; color: string; onCorrect: () => void; }

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SentenceScrambleSlide({ scrambledWords, correctSentence, color, onCorrect }: Props) {
  const shuffled = useMemo(() => shuffleArray(scrambledWords), [scrambledWords]);
  const [available, setAvailable] = useState<string[]>(shuffled);
  const [selected, setSelected] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);

  const addWord = (word: string, idx: number) => {
    const newSelected = [...selected, word];
    const newAvailable = available.filter((_, i) => i !== idx);
    setSelected(newSelected);
    setAvailable(newAvailable);
    if (newSelected.length === scrambledWords.length) {
      if (newSelected.join(' ') === correctSentence) {
        setTimeout(() => onCorrect(), 1200);
      } else {
        setWrong(true);
        setTimeout(() => { setWrong(false); setSelected([]); setAvailable(shuffleArray(scrambledWords)); }, 1000);
      }
    }
  };

  const removeWord = (idx: number) => {
    const word = selected[idx];
    setSelected(selected.filter((_, i) => i !== idx));
    setAvailable([...available, word]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start h-full gap-4 px-4 pt-4 w-full">
      <div className="text-center w-full">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Sentence Scramble</span>
        <h2 className="text-base font-black text-base-content mt-1">Put the words in the right order!</h2>
      </div>

      {/* Build zone */}
      <div className={`w-full min-h-16 p-3 rounded-3xl border-2 border-dashed flex flex-wrap gap-2 items-center transition-colors ${wrong ? 'border-error bg-error/10' : 'border-base-300 bg-base-200/50'}`}>
        <AnimatePresence>
          {selected.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="text-sm font-bold text-base-content/40 italic mx-auto">
              Tap words below to build the sentence...
            </motion.p>
          )}
          {selected.map((word, i) => (
            <motion.button
              key={`${word}-${i}-sel`}
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              onClick={() => removeWord(i)}
              className="btn btn-sm text-white border-0 shadow-sm"
              style={{ background: color }}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {wrong && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black text-error text-center w-full -mt-2">
          Not quite — try again!
        </motion.p>
      )}

      {/* Word bank */}
      <div className="w-full">
        <p className="text-xs font-black text-base-content/40 uppercase tracking-wide mb-2">Word Bank</p>
        <div className="flex flex-wrap gap-2">
          {available.map((word, i) => (
            <motion.button
              key={`${word}-${i}-avail`}
              layout
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addWord(word, i)}
              className="btn btn-sm btn-outline border-base-300 text-base-content font-black"
            >
              {word}
            </motion.button>
          ))}
        </div>
      </div>

      {selected.length === scrambledWords.length && !wrong && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="alert alert-success py-2 text-sm font-black w-full justify-center">
          <span>🎉 Perfect sentence!</span>
        </motion.div>
      )}
    </motion.div>
  );
}
