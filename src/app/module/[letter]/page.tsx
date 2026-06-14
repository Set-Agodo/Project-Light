'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { MODULE_MAP } from '@/config/courseData';
import WelcomeSlide from '@/components/slides/WelcomeSlide';
import PhoneticSlide from '@/components/slides/PhoneticSlide';
import VocabSlide from '@/components/slides/VocabSlide';
import QuizChoiceSlide from '@/components/slides/QuizChoiceSlide';
import QuizYesNoSlide from '@/components/slides/QuizYesNoSlide';
import CaseMatchSlide from '@/components/slides/CaseMatchSlide';
import SentenceScrambleSlide from '@/components/slides/SentenceScrambleSlide';
import CompletionSlide from '@/components/slides/CompletionSlide';

const RING_COUNT = 13;

export default function ModulePage({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = use(params);
  const router = useRouter();
  const mod = MODULE_MAP[letter.toUpperCase()];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  if (!mod) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-lg font-black text-base-content/60">Letter not found.</p>
        <button onClick={() => router.push('/')} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  const slides = mod.slides;
  const slide = slides[currentSlide];
  const total = slides.length;
  const isLast = currentSlide === total - 1;
  const isFirst = currentSlide === 0;

  const goNext = () => { setQuizDone(false); if (!isLast) setCurrentSlide((s) => s + 1); };
  const goBack = () => { setQuizDone(false); if (!isFirst) setCurrentSlide((s) => s - 1); };
  const handleQuizCorrect = () => setQuizDone(true);

  const canAdvance = slide.type === 'welcome' || slide.type === 'phonetic' || slide.type === 'vocab' || slide.type === 'complete' || quizDone;

  const renderSlide = () => {
    switch (slide.type) {
      case 'welcome': return <WelcomeSlide title={slide.title!} subtitle={slide.subtitle!} letter={mod.letter} attribute={mod.attribute} color={mod.color} onStart={goNext} />;
      case 'phonetic': return <PhoneticSlide letterPair={slide.letterPair!} audioUrl={slide.audioUrl!} color={mod.color} />;
      case 'vocab': return <VocabSlide word={slide.word!} emoji={slide.emoji!} audioUrl={slide.audioUrl!} color={mod.color} letter={mod.letter} />;
      case 'quiz-choice': return <QuizChoiceSlide question={slide.question!} options={slide.options!} color={mod.color} onCorrect={handleQuizCorrect} />;
      case 'quiz-yesno': return <QuizYesNoSlide question={slide.question!} word1={slide.word1!} word2={slide.word2!} emoji1={slide.emoji1!} emoji2={slide.emoji2!} yesNoAnswer={slide.yesNoAnswer!} color={mod.color} onCorrect={handleQuizCorrect} />;
      case 'quiz-caseMatch': return <CaseMatchSlide uppercase={slide.uppercase!} caseChoices={slide.caseChoices!} correctCase={slide.correctCase!} color={mod.color} onCorrect={handleQuizCorrect} />;
      case 'scramble': return <SentenceScrambleSlide scrambledWords={slide.scrambledWords!} correctSentence={slide.correctSentence!} color={mod.color} onCorrect={handleQuizCorrect} />;
      case 'complete': return <CompletionSlide letter={mod.letter} attribute={mod.attribute} sentence={mod.sentence} color={mod.color} />;
      default: return null;
    }
  };

  return (
    <div
      className="max-w-lg mx-auto h-[calc(100vh-140px)] flex flex-col"
      style={{ padding: '10px 12px 10px 0' }}
    >
      {/* Spiral workbook */}
      <div style={{
        flex: 1,
        display: 'flex',
        borderRadius: '0 12px 12px 0',
        boxShadow: '4px 2px 24px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        border: '1px solid #b0b8d0',
        borderLeft: '3px solid #9098c0',
      }}>

        {/* Spiral binding column */}
        <div style={{
          width: 34,
          flexShrink: 0,
          background: 'linear-gradient(to right, #a8b0cc, #c0c8e0)',
          borderRight: '2px solid #8890b8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: '10px 0',
        }}>
          {Array.from({ length: RING_COUNT }).map((_, i) => (
            <div key={i} style={{
              width: 20, height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4d8f8 0%, #8088d8 55%, #5860c0 100%)',
              border: '2px solid #4858b8',
              boxShadow: '1px 1px 4px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.55)',
            }} />
          ))}
        </div>

        {/* Workbook page */}
        <div style={{
          flex: 1,
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 14px',
          overflow: 'hidden',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(148,175,210,0.28) 27px, rgba(148,175,210,0.28) 28px)',
          backgroundSize: '100% 28px',
          backgroundPositionY: 4,
        }}>

          {/* Module header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, background: 'rgba(250,250,250,0.9)', position: 'relative', zIndex: 1 }}>
            <button
              onClick={() => router.push('/')}
              className="btn btn-ghost btn-sm btn-square"
              style={{ background: 'rgba(0,0,0,0.05)', borderRadius: 8 }}
            >
              <Home size={17} />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: mod.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 900, fontSize: 12,
                  boxShadow: `0 2px 6px ${mod.color}66`,
                }}>
                  {mod.letter}
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#1a1a2e' }}>God is {mod.attribute}</span>
              </div>
            </div>
            {/* Page corner annotation */}
            <span style={{
              fontSize: 10, color: '#bbb', fontWeight: 700, fontFamily: 'monospace',
            }}>pg. {currentSlide + 1}</span>
          </div>

          {/* Progress bar */}
          <progress
            className="progress w-full h-1.5 mb-3"
            value={currentSlide + 1}
            max={total}
            style={{ '--tw-progress-color': mod.color } as React.CSSProperties}
          />

          {/* Slide content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                style={{ height: '100%', overflowY: 'auto' }}
              >
                {renderSlide()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {slide.type !== 'welcome' && slide.type !== 'complete' && (
            <div style={{ display: 'flex', gap: 10, marginTop: 10, zIndex: 1, position: 'relative' }}>
              <button
                onClick={goBack}
                disabled={isFirst}
                className="btn btn-ghost btn-sm gap-1 disabled:opacity-40"
                style={{ border: '1px solid #ddd', background: '#f5f5f5' }}
              >
                <ChevronLeft size={16} /> Back
              </button>
              <motion.button
                onClick={goNext}
                disabled={!canAdvance || isLast}
                whileHover={canAdvance && !isLast ? { scale: 1.03 } : {}}
                whileTap={canAdvance && !isLast ? { scale: 0.97 } : {}}
                className="btn flex-1 btn-sm text-white font-black shadow-sm disabled:opacity-40"
                style={{ background: canAdvance ? mod.color : '#ccc' }}
              >
                Next <ChevronRight size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
