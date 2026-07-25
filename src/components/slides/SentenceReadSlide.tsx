'use client';

import { motion } from 'framer-motion';

interface Props { sentence: string; color: string; }

export default function SentenceReadSlide({ sentence, color }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full gap-6 px-4">
      <span className="text-xs font-black text-base-content/40 uppercase tracking-widest">Read Along</span>
      <p className="text-2xl font-black text-center leading-relaxed" style={{ color }}>
        {sentence}
      </p>
    </motion.div>
  );
}
