'use client';

import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  letter: string;
  attribute: string;
  color: string;
  onStart: () => void;
}

export default function WelcomeSlide({ title, subtitle, letter, attribute, color, onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center h-full gap-6 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className="w-28 h-28 rounded-3xl shadow-2xl flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}bb)` }}
      >
        <span className="text-5xl font-black text-white leading-none">{letter}</span>
        <span className="text-3xl font-black text-white/80 leading-none">{letter.toLowerCase()}</span>
      </motion.div>

      <div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-3xl font-black text-base-content">
          {title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-base font-bold text-base-content/55 mt-1">
          {subtitle}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-lg font-black mt-3" style={{ color }}>
          God is {attribute}!
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="btn btn-lg text-white font-black shadow-lg border-0"
        style={{ background: `linear-gradient(135deg, ${color}ff, ${color}aa)` }}
      >
        Let&apos;s Begin! 🚀
      </motion.button>
    </motion.div>
  );
}
