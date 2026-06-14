'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MODULES } from '@/config/courseData';

const CARD_W = 240;
const CARD_H = 340;

function getOffset(index: number, current: number, total: number) {
  let offset = (index - current + total) % total;
  if (offset > total / 2) offset -= total;
  return offset;
}

function getCardTransform(offset: number) {
  const abs = Math.abs(offset);
  if (abs > 2) {
    return { x: Math.sign(offset) * CARD_W * 2, rotateY: -Math.sign(offset) * 65, scale: 0.5, opacity: 0 };
  }
  return {
    x: offset * CARD_W * 0.68,
    rotateY: -offset * 46,
    scale: abs === 0 ? 1 : abs === 1 ? 0.85 : 0.7,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.8 : 0.45,
  };
}

export default function CarouselGallery() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const total = MODULES.length;
  const throttle = useRef(false);
  const touchStart = useRef<number | null>(null);
  const mod = MODULES[current];

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (throttle.current) return;
    throttle.current = true;
    setTimeout(() => { throttle.current = false; }, 620);
    if (e.deltaY > 0) next(); else prev();
  }, [next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
    touchStart.current = null;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        height: 'calc(100vh - 160px)',
        minHeight: 500,
        backgroundImage: [
          'repeating-linear-gradient(92deg, transparent 0px, rgba(255,255,255,0.018) 1px, transparent 2px, transparent 18px)',
          'repeating-linear-gradient(180deg, transparent 0, rgba(0,0,0,0.06) 1px, transparent 2px, transparent 32px)',
          'linear-gradient(178deg, #1a2240 0%, #111828 35%, #253050 65%, #111828 100%)',
        ].join(', '),
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient color glow */}
      <motion.div
        key={`glow-${current}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, 20px)',
          width: 340, height: 110,
          background: mod.color,
          filter: 'blur(70px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <motion.div
        key={`glow2-${current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, 60px)',
          width: 520, height: 160,
          background: mod.color,
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Title */}
      <div className="text-center mb-6 px-4 z-10">
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tight"
          style={{ color: '#f5e8c8', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          Who God Is
        </h1>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(245,232,200,0.45)' }}>
          Scroll · Swipe · Arrow keys
        </p>
      </div>

      {/* 3D Stage */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ perspective: '1000px', width: '100%', height: CARD_H + 20 }}
      >
        {MODULES.map((m, index) => {
          const offset = getOffset(index, current, total);
          const abs = Math.abs(offset);
          const t = getCardTransform(offset);

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                top: 0,
                zIndex: abs <= 2 ? 20 - abs * 6 : 0,
                pointerEvents: abs <= 2 ? 'auto' : 'none',
                cursor: abs === 0 ? 'pointer' : abs <= 2 ? 'pointer' : 'default',
                borderRadius: 20,
                overflow: 'hidden',
                /* Paper mat frame using inset shadow */
                boxShadow: abs === 0
                  ? `inset 0 0 0 8px rgba(240,244,255,0.9), 0 28px 64px rgba(0,0,0,0.55), 0 0 50px ${m.color}44`
                  : abs === 1
                  ? `inset 0 0 0 5px rgba(240,244,255,0.72), 0 10px 28px rgba(0,0,0,0.35)`
                  : `inset 0 0 0 4px rgba(240,244,255,0.52), 0 6px 16px rgba(0,0,0,0.25)`,
              }}
              animate={{ x: t.x, rotateY: t.rotateY, scale: t.scale, opacity: t.opacity }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => {
                if (abs > 2) return;
                if (offset === 0) router.push(`/module/${m.letter}`);
                else if (offset < 0) prev();
                else next();
              }}
            >
              <div
                className="w-full h-full relative"
                style={{ background: `linear-gradient(160deg, ${m.color} 0%, ${m.color}99 100%)` }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.28) 0%, transparent 60%)' }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ color: 'rgba(255,255,255,0.07)', fontSize: 190, fontWeight: 900, lineHeight: 1 }}>
                  {m.letter}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-5xl font-black text-white leading-none">{m.letter}</div>
                  <div className="text-xl font-black text-white mt-1">{m.attribute}</div>
                  <div className="text-white/55 text-xs mt-1.5 font-semibold italic">God is {m.attribute}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-7 z-10">
        <motion.button
          onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="btn btn-circle"
          style={{ background: 'rgba(255,240,200,0.1)', border: '1px solid rgba(255,240,200,0.22)', color: '#f5e8c8', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <ChevronLeft size={22} />
        </motion.button>

        <div className="flex flex-col items-center gap-2">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
            style={{ color: 'rgba(245,232,200,0.6)' }}
          >
            {mod.letter} — God is {mod.attribute}
          </motion.p>
          <progress
            className="progress progress-primary w-32 h-1.5"
            value={current + 1}
            max={total}
          />
          <span className="text-[9px] font-bold tabular-nums" style={{ color: 'rgba(245,232,200,0.3)' }}>{current + 1} / {total}</span>
        </div>

        <motion.button
          onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="btn btn-circle"
          style={{ background: 'rgba(255,240,200,0.1)', border: '1px solid rgba(255,240,200,0.22)', color: '#f5e8c8', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>
    </div>
  );
}
