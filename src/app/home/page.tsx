'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const boxes = [
  {
    href: '/lessons',
    color: '#6C5CE7',
    label: 'A–Z Letters',
    desc: 'Learn every letter A through Z through photos, phonics, and interactive quizzes.',
    cta: 'Start Learning',
    img: '/images/home/box-letters.svg',
  },
  {
    href: '/sight-words',
    color: '#F9A825',
    label: '50 Sight Words',
    desc: 'Master the 50 most common words that make up half of everything you read.',
    cta: 'Practice Words',
    img: '/images/home/box-words.svg',
  },
  {
    href: '/instructions',
    color: '#2E7D32',
    label: 'How To Use',
    desc: 'Step-by-step guide for learners and parents to get the most from each lesson.',
    cta: 'Read Guide',
    img: '/images/home/box-guide.svg',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-112px)]">

      {/* ── Header / Banner ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 220,
      }}>
        {/* Hero SVG fills the banner */}
        <img
          src="/images/home/banner-hero.svg"
          alt="Project Light banner with colorful ABC blocks"
          style={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Overlay text on banner */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,18,40,0.78) 0%, rgba(10,18,40,0.35) 55%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 28px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(24px, 5vw, 40px)',
            color: '#f5e8c8',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            marginBottom: 6,
            lineHeight: 1.15,
          }}>
            Project Light
          </h1>
          <p style={{
            fontFamily: 'var(--font-roboto), Roboto, sans-serif',
            fontSize: 'clamp(14px, 3.5vw, 20px)',
            color: 'rgba(245,232,200,0.82)',
            marginBottom: 20,
          }}>
            Who God Is · Literacy for Life
          </p>
          <Link href="/lessons" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: '#fff',
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 800,
            fontSize: 14,
            padding: '10px 22px',
            borderRadius: 10,
            boxShadow: '0 6px 20px rgba(245,158,11,0.45)',
            textDecoration: 'none',
            width: 'fit-content',
          }}>
            Start Learning <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Intro Text Area ── */}
      <div className="parchment-bg" style={{
        padding: '22px 24px',
        textAlign: 'center',
        borderTop: '3px solid #8090b8',
        borderBottom: '3px solid #8090b8',
      }}>
        <h2 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: '#1e2848',
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 8,
        }}>
          Building Readers Through Faith
        </h2>
        <p style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: '#2a3060',
          fontSize: 13,
          lineHeight: 1.8,
          maxWidth: 560,
          margin: '0 auto',
        }}>
          Project Light is an interactive pre-reading and literacy program built on a
          scripture-based curriculum. Each of the 26 letters introduces an attribute of
          God — from <em>Awesome</em> to <em>Zealous</em> — helping learners grow in
          both reading skills and faith.
        </p>
      </div>

      {/* ── Three Boxes ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        padding: '20px 16px',
        flex: 1,
      }}>
        {boxes.map(({ href, color, label, desc, cta, img }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div
              className="parchment-card"
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                border: `2px solid ${color}33`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${color}44`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              {/* Illustration */}
              <div style={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                <img
                  src={img}
                  alt={label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                {/* Color accent rule at bottom of image */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: 4,
                  background: `linear-gradient(to right, ${color}, ${color}88)`,
                }} />
              </div>

              {/* Text content */}
              <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  color: '#1e2848',
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 6,
                }}>{label}</h3>
                <p style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#2a3060',
                  fontSize: 13,
                  lineHeight: 1.65,
                  flex: 1,
                }}>{desc}</p>
                <div style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color,
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                }}>
                  {cta} <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="wood-dark" style={{
        padding: '16px 24px',
        textAlign: 'center',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
      }}>
        <p style={{
          fontFamily: 'var(--font-roboto), Roboto, sans-serif',
          color: 'rgba(245,232,200,0.6)',
          fontSize: 13,
        }}>
          © Project Light · Literacy for Life Transformation
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 6 }}>
          {[
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
            { href: '/sight-words', label: 'Sight Words' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: 'rgba(245,232,200,0.45)',
              fontSize: 11,
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>{label}</Link>
          ))}
        </div>
      </div>

    </div>
  );
}
