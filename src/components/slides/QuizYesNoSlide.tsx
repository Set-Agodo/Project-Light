'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props { question: string; word1: string; word2: string; emoji1: string; emoji2: string; yesNoAnswer: boolean; color: string; onCorrect: () => void; }

function WordCard({ word, emoji }: { word: string; emoji: string }) {
  const [imgError, setImgError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const slug = word.toLowerCase().replace(/ /g, '-');
  const src = `/images/${slug}.jpg`;

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) return;
    setPlaying(true);
    let fallbackUsed = false;
    const mp3 = new Audio(`/audio/${slug}.mp3`);
    mp3.onended = () => setPlaying(false);
    const tryM4a = () => {
      if (fallbackUsed) return;
      fallbackUsed = true;
      const m4a = new Audio(`/audio/${slug}.m4a`);
      m4a.onended = () => setPlaying(false);
      m4a.onerror = () => setPlaying(false);
      m4a.play().catch(() => setPlaying(false));
    };
    mp3.onerror = tryM4a;
    mp3.play().catch(tryM4a);
    setTimeout(() => setPlaying(false), 5000);
  };

  return (
    <div className="card flex-1 bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body items-center py-3 gap-2">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-base-200/60">
          {!imgError ? (
            <img src={src} alt={word} onError={() => setImgError(true)} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">{emoji}</span>
          )}
        </div>
        <span className="text-sm font-black text-base-content">{word}</span>
        <button
          onClick={playAudio}
          aria-label={`Hear ${word}`}
          className={`btn btn-xs btn-ghost gap-1 ${playing ? 'opacity-60' : ''}`}
        >
          <Volume2 size={13} />
          {playing ? 'Playing…' : 'Hear it'}
        </button>
      </div>
    </div>
  );
}

export default function QuizYesNoSlide({ question, word1, word2, emoji1, emoji2, yesNoAnswer, color, onCorrect }: Props) {
  const [answered, setAnswered] = useState<boolean | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/phrases/quiz_yesno.m4a');
    audio.play().catch(() => {});
  }, []);

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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-5 px-4 pt-4">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Sound Check</span>
        <h2 className="text-base font-black text-base-content mt-1 max-w-xs">{question}</h2>
      </div>

      <div className="flex items-center gap-4 w-full max-w-xs">
        <WordCard word={word1} emoji={emoji1} />
        <span className="text-2xl font-black text-base-content/20">&</span>
        <WordCard word={word2} emoji={emoji2} />
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
