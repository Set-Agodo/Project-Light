'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props { sentence: string; color: string; letter: string; }

export default function SentenceReadSlide({ sentence, color, letter }: Props) {
  const [playing, setPlaying] = useState(false);

  const playSentence = () => {
    if (playing) return;
    setPlaying(true);
    const audio = new Audio(`/audio/sentences/${letter.toLowerCase()}.m4a`);
    audio.onended = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
    audio.play().catch(() => setPlaying(false));
    setTimeout(() => setPlaying(false), 8000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full gap-6 px-4">
      <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Read Along</span>
      <motion.button
        onClick={playSentence}
        animate={playing ? { scale: [1, 1.03, 1] } : {}}
        transition={{ repeat: playing ? Infinity : 0, duration: 0.8 }}
        className="text-2xl font-black text-center leading-relaxed cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color }}
        aria-label={playing ? 'Playing sentence' : 'Tap to hear the sentence'}
      >
        {sentence}
      </motion.button>
      <button
        onClick={playSentence}
        className={`btn btn-sm gap-2 text-white border-0 ${playing ? 'opacity-70' : ''}`}
        style={{ background: color }}
      >
        <Volume2 size={14} />
        {playing ? 'Playing…' : 'Hear it'}
      </button>
    </motion.div>
  );
}
