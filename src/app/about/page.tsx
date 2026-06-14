export default function AboutPage() {
  const sections = [
    { icon: '📚', color: '#7c3aed', title: 'A. What does this program do?', body: `Project Light: Literacy for Life Transformation is an interactive pre-reading and literacy development program built on a scripture-based curriculum titled "Who God Is." It is specifically designed to help pre-readers, early learners, and English as a Second Language (ESL) students develop foundational phonological awareness while exploring the character of God through every letter of the alphabet.` },
    { icon: '🎮', color: '#2563eb', title: 'B. How does it work?', body: `Each of the 26 letter modules contains a structured 10-slide learning sequence. The sequence begins with a welcome screen, moves through a phonetic introduction and three vocabulary slides, then challenges the learner with four interactive assessments — a word-choice quiz, a same-sound yes/no quiz, a case-matching activity, and a sentence scramble puzzle.` },
    { icon: '🧠', color: '#0891b2', title: 'C. What is so important about pre-reading skills?', body: `Phonological awareness — the ability to hear, identify, and manipulate individual sounds in spoken language — is one of the strongest predictors of early reading success. Children who enter formal schooling without these foundational skills are significantly more likely to struggle with reading and literacy throughout their academic careers.` },
    { icon: '🔤', color: '#c026d3', title: 'D. What is a minimal pair?', body: `A minimal pair consists of two words that differ by only one phoneme (sound), such as "cat" and "bat," or "ship" and "chip." Training the ear to detect these subtle differences is a core component of phonological awareness development. Project Light incorporates minimal pair comparisons in its yes/no sound-comparison assessments.` },
    { icon: '✨', color: '#059669', title: 'E. Why is this program different?', body: `Most pre-reading programs focus solely on secular vocabulary and phonics drills. Project Light uniquely integrates scripture-based learning so that foundational literacy skills are developed alongside spiritual formation. Every letter introduces an attribute of God — from "Awesome" to "Zealous" — ensuring that learners grow in both mechanics and faith.` },
  ];

  return (
    <div className="parchment-bg min-h-[calc(100vh-112px)]">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Scroll / parchment hero */}
        <div style={{
          background: 'linear-gradient(to bottom, #8890b8, #f0ecea, #f0ecea, #8890b8)',
          border: '2px solid #8090b8',
          borderRadius: 8,
          padding: '28px 28px 24px',
          textAlign: 'center',
          marginBottom: 24,
          position: 'relative',
          boxShadow: '0 4px 20px rgba(30,40,80,0.22), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.08)',
        }}>
          {/* Scroll roll top */}
          <div style={{
            position: 'absolute', top: -6, left: 12, right: 12, height: 10,
            background: 'linear-gradient(to bottom, #6070a0, #8890b8)',
            borderRadius: 5,
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
          }} />
          {/* Scroll roll bottom */}
          <div style={{
            position: 'absolute', bottom: -6, left: 12, right: 12, height: 10,
            background: 'linear-gradient(to top, #6070a0, #8890b8)',
            borderRadius: 5,
            boxShadow: '0 -2px 4px rgba(0,0,0,0.2)',
          }} />

          <div style={{ fontSize: 44, marginBottom: 10 }}>📜</div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#1e2848', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            About Project Light
          </h1>
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #8090b8, transparent)', margin: '0 24px 10px' }} />
          <p style={{ color: '#3a4060', fontSize: 13, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            Literacy for Life Transformation
          </p>
        </div>

        {/* Section cards — parchment papers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sections.map((s) => (
            <div key={s.title} className="parchment-card" style={{ borderRadius: 6, overflow: 'hidden' }}>
              {/* Color accent rule */}
              <div style={{ height: 3, background: `linear-gradient(to right, ${s.color}, ${s.color}88)` }} />
              <div style={{ padding: '14px 18px 16px' }}>
                <h2 style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#1e2848', fontSize: 14, fontWeight: 700,
                  marginBottom: 8,
                }}>{s.title}</h2>
                <p style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: '#2a3060', fontSize: 13, lineHeight: 1.75,
                }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
