import { SIGHT_WORDS } from '@/config/sightWords';

const TACK_COLORS = [
  'radial-gradient(circle at 35% 35%, #ff6666, #cc0000)',
  'radial-gradient(circle at 35% 35%, #ffaa44, #cc6600)',
  'radial-gradient(circle at 35% 35%, #6699ff, #2244cc)',
  'radial-gradient(circle at 35% 35%, #66cc66, #228822)',
];

export default function SightWordsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Wooden frame around cork board */}
      <div style={{
        background: 'linear-gradient(145deg, #2a3a8a, #1a2868, #253378, #1a2868, #2a3a8a)',
        borderRadius: 10,
        padding: 14,
        boxShadow: '0 8px 40px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.25)',
      }}>
        {/* Cork surface */}
        <div className="cork-bg" style={{ borderRadius: 4, padding: '14px 12px 18px' }}>

          {/* Paper banner header */}
          <div style={{
            background: 'linear-gradient(to bottom, #e8ecff, #c8d0f8)',
            borderRadius: 4,
            padding: '12px 16px 10px',
            textAlign: 'center',
            marginBottom: 18,
            position: 'relative',
            boxShadow: '0 3px 10px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.7)',
          }}>
            {/* Banner tacks */}
            {[16, -16].map((offset, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: 7,
                [i === 0 ? 'left' : 'right']: Math.abs(offset),
                width: 11, height: 11,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #ff8888, #cc2222)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.45)',
              }} />
            ))}
            <div style={{ fontSize: 26, marginBottom: 3 }}>⭐</div>
            <h1 style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 800, color: '#1e2858', fontSize: 17, marginBottom: 2,
            }}>50 Most Common Words</h1>
            <p style={{ color: '#2a3878', fontSize: 12, fontWeight: 600 }}>Learn these sight words to read faster!</p>
          </div>

          {/* Index card grid with thumbtacks */}
          <div style={{ paddingTop: 6 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '22px 10px',
            }}>
              {SIGHT_WORDS.map((word, index) => (
                <div key={word} className="sight-word-item" style={{ position: 'relative', paddingTop: 7 }}>
                  {/* Thumbtack */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 13, height: 13,
                    borderRadius: '50%',
                    background: TACK_COLORS[index % TACK_COLORS.length],
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,200,0.5)',
                    zIndex: 2,
                  }} />
                  {/* Index card */}
                  <div style={{
                    background: '#fffde7',
                    border: '1px solid #e8dfa8',
                    borderRadius: 3,
                    padding: '10px 6px 8px',
                    textAlign: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
                  }}>
                    <span style={{
                      display: 'block', fontSize: 9, fontWeight: 800,
                      color: '#c8b870', marginBottom: 4, letterSpacing: '0.05em',
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#1a1a2e', fontFamily: 'var(--font-poppins), Poppins' }}>{word}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading tip — pinned note */}
          <div style={{ position: 'relative', marginTop: 24, paddingTop: 7 }}>
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 13, height: 13, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #88aaff, #2244cc)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.45)',
              zIndex: 2,
            }} />
            <div style={{
              background: '#fff9c4',
              border: '1px solid #e8e070',
              borderRadius: 3,
              padding: '12px 14px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.22)',
              transform: 'rotate(0.3deg)',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>💡</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#4a3800', marginBottom: 4, fontFamily: 'var(--font-poppins), Poppins' }}>Reading Tip</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#5a4a00', lineHeight: 1.6 }}>
                    These 50 words make up about half of all words you read every day!
                    Practice saying each one out loud for the fastest results.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
