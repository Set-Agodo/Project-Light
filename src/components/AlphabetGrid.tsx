'use client';

import { useRouter } from 'next/navigation';
import { MODULES } from '@/config/courseData';

export default function AlphabetGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 p-4">
      {MODULES.map((mod) => (
        <button
          key={mod.letter}
          onClick={() => router.push(`/module/${mod.letter}`)}
          className="letter-btn relative flex flex-col items-center justify-center rounded-3xl aspect-square shadow-md border-2 border-white/60 cursor-pointer group overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${mod.color}ee, ${mod.color}bb)` }}
          title={`God is ${mod.attribute}`}
        >
          <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm leading-none">
            {mod.letter}
          </span>
          <span className="text-sm sm:text-base font-black text-white/80 leading-none mt-0.5">
            {mod.letter.toLowerCase()}
          </span>
          <span className="text-base mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {mod.emoji}
          </span>
          {/* Hover overlay showing attribute */}
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}>
            <span className="text-[10px] sm:text-xs font-black text-white text-center px-1.5 leading-tight drop-shadow-sm">{mod.attribute}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
