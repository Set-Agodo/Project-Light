'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props { letterPair: string; audioUrl: string; color: string; }

export default function PhoneticSlide({ letterPair, audioUrl, color }: Props) {
  const [playing, setPlaying] = useState(false);

  const playAudio = () => {
    setPlaying(true);
    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
    audio.onended = () => setPlaying(false);
    setTimeout(() => setPlaying(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center h-full gap-8 px-6"
    >
      <div>
        <p className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-2">Letter Sound</p>
        <h2 className="text-xl font-black text-base-content">Listen to the sound of</h2>
      </div>

      <motion.div
        animate={playing ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: playing ? Infinity : 0, duration: 0.6 }}
        className="w-36 h-36 rounded-3xl shadow-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}99)` }}
      >
        <span className="text-6xl font-black text-white leading-none">{letterPair}</span>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={playAudio}
        className={`btn btn-lg text-white font-black shadow-lg border-0 gap-3 ${playing ? 'opacity-80' : ''}`}
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}bb)` }}
      >
        <Volume2 size={22} />
        {playing ? 'Playing...' : 'Tap to Hear'}
      </motion.button>

      <p className="text-sm font-semibold text-base-content/55 max-w-xs">
        Tap the button to hear how this letter sounds. Say it out loud!
      </p>
    </motion.div>
  );
}
