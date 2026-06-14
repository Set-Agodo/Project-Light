'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Props { letter: string; attribute: string; sentence: string; color: string; }

export default function CompletionSlide({ letter, attribute, sentence, color }: Props) {
  const router = useRouter();

  const confettiItems = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 320 - 160,
    delay: Math.random() * 0.5,
    color: ['#FF6B6B', '#FECA57', '#54A0FF', '#A29BFE', '#00B894', '#FD79A8'][i % 6],
    size: 8 + Math.random() * 8,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center h-full gap-5 px-6 relative overflow-hidden">
      {confettiItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -20, x: item.x, opacity: 1, rotate: 0 }}
          animate={{ y: 300, opacity: 0, rotate: 720 }}
          transition={{ duration: 1.5, delay: item.delay, ease: 'easeIn' }}
          className="absolute top-0 rounded-full pointer-events-none"
          style={{ width: item.size, height: item.size, background: item.color, left: '50%' }}
        />
      ))}

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.3 + i * 0.15 }} className="text-4xl">⭐</motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}
        className="w-24 h-24 rounded-3xl shadow-2xl flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}bb)` }}
      >
        <span className="text-4xl font-black text-white leading-none">{letter}</span>
        <span className="text-2xl font-black text-white/80 leading-none">{letter.toLowerCase()}</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h1 className="text-2xl font-black text-base-content">Great Job! 🎊</h1>
        <p className="text-base font-black mt-1" style={{ color }}>Letter {letter}: Completed!</p>
        <p className="text-sm font-bold text-base-content/55 mt-2 italic max-w-xs">&ldquo;{sentence}&rdquo;</p>
      </motion.div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => router.push('/')}
          className="btn w-full text-white font-black text-base border-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${color}ff, ${color}bb)` }}
        >
          🏠 Go Home
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => {
            const next = String.fromCharCode(letter.charCodeAt(0) + 1);
            if (next <= 'Z') router.push(`/module/${next}`); else router.push('/');
          }}
          className="btn btn-ghost btn-outline w-full font-black text-sm border-base-300"
        >
          Next Letter →
        </motion.button>
      </div>
    </motion.div>
  );
}
