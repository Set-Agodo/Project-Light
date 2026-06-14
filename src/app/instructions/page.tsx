export default function InstructionsPage() {
  const steps = [
    { num: '1', icon: '🔤', color: '#FF6B6B', title: 'Select a Letter', body: "From the home screen, tap any letter card on the A–Z carousel to open that letter's learning module." },
    { num: '2', icon: '▶️', color: '#54A0FF', title: 'Move Through Slides', body: 'Use the Next (→) and Back (←) buttons at the bottom of each slide to move forward or go back through the 10-slide lesson.' },
    { num: '3', icon: '🔊', color: '#FECA57', title: 'Hear Words Read Aloud', body: 'On vocabulary slides, tap the speaker icon or the picture to hear the word pronounced clearly.' },
    { num: '4', icon: '☑️', color: '#A29BFE', title: 'Answer Quiz Questions', body: 'During quiz slides, tap the correct picture or button to answer. Green means correct! A shake means try again.' },
    { num: '5', icon: '🧩', color: '#00B894', title: 'Build the Sentence', body: 'On the sentence scramble slide, tap the words in the correct order to build a sentence about God.' },
    { num: '6', icon: '⭐', color: '#FDCB6E', title: 'Celebrate Completion!', body: 'When you finish all 10 slides, a celebration screen appears! Tap "Go Home" to choose another letter.' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Wooden frame around chalkboard */}
      <div style={{
        background: 'linear-gradient(145deg, #2a3a8a, #1a2868, #253378, #1a2868, #2a3a8a)',
        borderRadius: 10,
        padding: 14,
        boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.28)',
      }}>
        {/* Chalkboard surface */}
        <div className="chalk-bg" style={{ borderRadius: 4, padding: '20px 16px 22px' }}>
          {/* Inner chalk border */}
          <div style={{ border: '1.5px dashed rgba(255,255,255,0.22)', borderRadius: 4, padding: '16px 14px' }}>

            {/* Chalk title */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div className="chalk-text" style={{ fontSize: 30, fontWeight: 700, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>How To Use</div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', margin: '8px 24px' }} />
              <p className="chalk-text" style={{ fontSize: 15, opacity: 0.7, fontFamily: 'var(--font-roboto), Roboto, sans-serif' }}>Step-by-step guide for learners</p>
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {steps.map((step) => (
                <div key={step.num} style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.055)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '9px 12px',
                }}>
                  {/* Chalk circle number */}
                  <div className="chalk-text" style={{
                    width: 30, height: 30,
                    border: '2px solid rgba(255,255,255,0.55)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    fontWeight: 700,
                    flexShrink: 0,
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    background: step.color + '33',
                  }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 3 }}>
                      <span className="chalk-text" style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{step.title}</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.55, fontFamily: 'var(--font-roboto), Roboto, sans-serif' }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>

        {/* Chalk tray */}
        <div style={{
          marginTop: 8,
          height: 10,
          background: 'linear-gradient(to bottom, #1a2858, #0e1838)',
          borderRadius: '0 0 4px 4px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          gap: 8,
        }}>
          {['#f5e8c8', '#ffd6d6', '#d6f5d6'].map((c, i) => (
            <div key={i} style={{
              width: 28, height: 5, borderRadius: 3,
              background: c, opacity: 0.7,
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
