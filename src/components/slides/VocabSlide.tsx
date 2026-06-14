'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props { word: string; emoji: string; audioUrl: string; color: string; letter: string; }

export default function VocabSlide({ word, emoji, audioUrl, color, letter }: Props) {
  const [playing, setPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = `/images/${word.toLowerCase()}.jpg`;

  const playAudio = () => {
    setPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
    audio.onended = () => setPlaying(false);
    setTimeout(() => setPlaying(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col items-center justify-center text-center h-full gap-6 px-6"
    >
      <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">
        Words that start with {letter}
      </p>

      <motion.button
        onClick={playAudio}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={playing ? { scale: [1, 1.04, 1] } : {}}
        transition={{ repeat: playing ? Infinity : 0, duration: 0.5 }}
        className="w-44 h-44 rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer border-4 overflow-hidden"
        style={{ background: `${color}18`, borderColor: `${color}44` }}
      >
        {!imgError ? (
          <img
            src={imageUrl}
            alt={word}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-8xl">{emoji}</span>
        )}
      </motion.button>

      <div>
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {word.split('').map((char, i) => (
            <span key={i} className="text-4xl font-black" style={{ color: char.toLowerCase() === letter.toLowerCase() ? color : undefined }}>
              {char}
            </span>
          ))}
        </div>
        <p className="text-sm font-bold text-base-content/60 mt-2">
          <span className="font-black" style={{ color }}>{letter}</span> is for{' '}
          <span className="font-black text-base-content">{word}</span>
        </p>
      </div>

      <button
        onClick={playAudio}
        className={`btn text-white font-bold gap-2 border-0 ${playing ? 'opacity-80' : ''}`}
        style={{ background: color }}
      >
        <Volume2 size={18} />
        {playing ? 'Playing...' : `Hear "${word}"`}
      </button>
    </motion.div>
  );
}
