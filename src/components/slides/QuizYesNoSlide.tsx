'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { question: string; word1: string; word2: string; emoji1: string; emoji2: string; yesNoAnswer: boolean; color: string; onCorrect: () => void; }

export default function QuizYesNoSlide({ question, word1, word2, emoji1, emoji2, yesNoAnswer, color, onCorrect }: Props) {
  const [answered, setAnswered] = useState<boolean | null>(null);

  const handleAnswer = (answer: boolean) => {
    if (answered !== null) return;
    setAnswered(answer);
    if (answer === yesNoAnswer) {
      setTimeout(() => onCorrect(), 1200);
    } else {
      setTimeout(() => setAnswered(null), 1000);
    }
  };

  const correct = answered === yesNoAnswer;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-6 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Sound Check</span>
        <h2 className="text-base font-black text-base-content mt-1 max-w-xs">{question}</h2>
      </div>

      <div className="flex items-center gap-4 w-full max-w-xs">
        <div className="card flex-1 bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body items-center py-4 gap-2">
            <span className="text-5xl">{emoji1}</span>
            <span className="text-base font-black text-base-content">{word1}</span>
          </div>
        </div>
        <span className="text-2xl font-black text-base-content/20">&</span>
        <div className="card flex-1 bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body items-center py-4 gap-2">
            <span className="text-5xl">{emoji2}</span>
            <span className="text-base font-black text-base-content">{word2}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-xs">
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => handleAnswer(true)}
          className={`btn flex-1 font-black text-lg ${
            answered === true ? (correct ? 'btn-success' : 'btn-error') : 'btn-success btn-outline'
          }`}
        >
          ✅ YES
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => handleAnswer(false)}
          className={`btn flex-1 font-black text-lg ${
            answered === false ? (correct ? 'btn-success' : 'btn-error') : 'btn-error btn-outline'
          }`}
        >
          ❌ NO
        </motion.button>
      </div>

      <AnimatePresence>
        {answered !== null && correct && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="alert alert-success py-2 text-sm font-black">
            <span>🎉 Correct! Amazing!</span>
          </motion.div>
        )}
        {answered !== null && !correct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="alert alert-error py-2 text-sm font-black">
            <span>🤔 Try again!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
