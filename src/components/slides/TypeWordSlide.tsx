'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props { word: string; emoji: string; color: string; letter: string; onCorrect: () => void; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TypeWordSlide({ word, emoji, color, letter, onCorrect }: Props) {
  const letters = useMemo(() => shuffle(word.toUpperCase().split('')), [word]);
  const [available, setAvailable] = useState<string[]>(letters);
  const [selected, setSelected] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [playing, setPlaying] = useState(false);

  const wordSlug = word.toLowerCase().replace(/ /g, '-');
  const imageUrl = `/images/${wordSlug}.jpg`;

  const playWordAudio = (onEnd?: () => void) => {
    const mp3 = new Audio(`/audio/${wordSlug}.mp3`);
    mp3.play()
      .then(() => { if (onEnd) mp3.onended = onEnd; })
      .catch(() => {
        const m4a = new Audio(`/audio/${wordSlug}.m4a`);
        m4a.play().catch(() => {});
        if (onEnd) m4a.onended = onEnd;
      });
  };

  useEffect(() => { playWordAudio(); }, [wordSlug]);

  const playWord = () => {
    setPlaying(true);
    playWordAudio(() => setPlaying(false));
    setTimeout(() => setPlaying(false), 3000);
  };

  const addLetter = (letter: string, idx: number) => {
    const newSelected = [...selected, letter];
    const newAvailable = available.filter((_, i) => i !== idx);
    setSelected(newSelected);
    setAvailable(newAvailable);
    if (newSelected.length === word.length) {
      if (newSelected.join('') === word.toUpperCase()) {
        setTimeout(() => onCorrect(), 1200);
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSelected([]);
          setAvailable(shuffle(word.toUpperCase().split('')));
        }, 900);
      }
    }
  };

  const removeLetter = (idx: number) => {
    const l = selected[idx];
    setSelected(selected.filter((_, i) => i !== idx));
    setAvailable([...available, l]);
  };

  const succeeded = selected.length === word.length && !wrong && available.length === 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center h-full gap-3 px-4 pt-2">
      <div className="text-center">
        <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Spell the Word</span>
        <h2 className="text-base font-black text-base-content mt-1">Type the word!</h2>
      </div>

      {/* Picture — tap to hear */}
      <motion.button
        onClick={playWord}
        whileTap={{ scale: 0.95 }}
        animate={playing ? { scale: [1, 1.04, 1] } : {}}
        transition={{ repeat: playing ? Infinity : 0, duration: 0.5 }}
        className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-2 flex items-center justify-center"
        style={{ borderColor: `${color}55`, background: `${color}18` }}
      >
        {!imgError ? (
          <img src={imageUrl} alt={word} onError={() => setImgError(true)} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}
      </motion.button>

      {/* Letter slots (build zone) */}
      <div className={`flex gap-2 justify-center flex-wrap p-2 rounded-2xl border-2 min-h-14 min-w-[200px] transition-colors ${wrong ? 'border-error bg-error/10' : 'border-base-300 bg-base-200/50'}`}>
        <AnimatePresence>
          {selected.length === 0 ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="text-sm text-base-content/40 font-bold italic self-center">
              Tap letters below...
            </motion.span>
          ) : (
            selected.map((l, i) => (
              <motion.button
                key={`sel-${i}`}
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}
                onClick={() => removeLetter(i)}
                className="w-9 h-9 rounded-xl text-lg font-black text-white shadow-sm flex items-center justify-center"
                style={{ background: color }}
              >
                {l}
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      {wrong && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black text-error -mt-1">
          Not quite — try again!
        </motion.p>
      )}

      {/* Available letters */}
      <div className="w-full">
        <p className="text-xs font-black text-base-content/40 uppercase tracking-wide mb-1">Letters</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <AnimatePresence>
            {available.map((l, i) => (
              <motion.button
                key={`avail-${i}`}
                layout
                initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6, opacity: 0 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addLetter(l, i)}
                className="w-9 h-9 rounded-xl text-lg font-black border-2 border-base-300 bg-base-100 text-base-content shadow-sm"
              >
                {l}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Hear word button */}
      <button onClick={playWord} className="btn btn-xs text-white gap-1 border-0 mt-1" style={{ background: color }}>
        <Volume2 size={12} />
        {playing ? 'Playing...' : `Hear "${word}"`}
      </button>

      <AnimatePresence>
        {succeeded && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="alert alert-success py-2 text-sm font-black w-full justify-center">
            <span>🎉 You spelled {word}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
