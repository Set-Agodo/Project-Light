
const contactItems = [
  { icon: '📬', color: '#FF6B6B', label: 'Mailing Address', value: 'PO Box\nNorfolk, VA' },
  { icon: '📞', color: '#54A0FF', label: 'Phone', value: 'Contact us for phone information' },
  { icon: '📠', color: '#FECA57', label: 'Fax', value: 'Contact us for fax information' },
  { icon: '🌐', color: '#00B894', label: 'Website', value: 'project-light.indapoint.org' },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Envelope flap header */}
      <div style={{
        background: 'linear-gradient(160deg, #e0e6ff, #c8d2f8)',
        border: '2px solid #8898d8',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
        padding: '22px 24px 36px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 -2px 12px rgba(30,42,80,0.1)',
      }}>
        {/* V-fold crease */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
          background: 'linear-gradient(135deg, #c8d2f8 50%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
          background: 'linear-gradient(225deg, #c8d2f8 50%, transparent 50%)',
        }} />
        {/* Postage stamp */}
        <div style={{
          position: 'absolute', top: 14, right: 20,
          width: 38, height: 46,
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          border: '2px dashed rgba(255,255,255,0.7)',
          borderRadius: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}>
          <img src="/images/logo.jpg" alt="Project Light logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} />
        </div>
        <div style={{ fontSize: 36, marginBottom: 8, position: 'relative', zIndex: 1 }}>✉️</div>
        <h1 style={{
          fontFamily: 'var(--font-poppins), Poppins', fontWeight: 800,
          color: '#1e2848', fontSize: 20, position: 'relative', zIndex: 1,
        }}>Contact Us</h1>
        <p style={{ color: '#2a3880', fontSize: 12, fontWeight: 600, position: 'relative', zIndex: 1 }}>Project Light Organization</p>
      </div>

      {/* Letter paper body */}
      <div className="lined-paper" style={{
        border: '2px solid #8898d8',
        borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        padding: '20px 24px 28px 72px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
        minHeight: 380,
      }}>

        {/* Salutation */}
        <div style={{ marginBottom: 22, paddingTop: 2 }}>
          <p style={{
            fontFamily: 'var(--font-caveat), Caveat, cursive',
            fontSize: 20, color: '#1e2848', fontWeight: 600,
          }}>Dear Friend,</p>
        </div>

        {/* Contact entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {contactItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: item.color + '22',
                border: `1.5px solid ${item.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{
                  fontSize: 10, fontWeight: 800, color: '#888',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2,
                }}>{item.label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1e2848', whiteSpace: 'pre-line' }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div style={{ marginTop: 28, paddingTop: 14, borderTop: '1px dashed #c0c8f0' }}>
          <p style={{
            fontFamily: 'var(--font-caveat), Caveat, cursive',
            fontSize: 15, color: '#2a3880', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 14,
          }}>
            &ldquo;Empowering learners through the Word — one letter at a time.&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src="/images/logo.jpg" alt="Project Light logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} />
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-caveat), Caveat, cursive',
                fontSize: 17, fontWeight: 700, color: '#1e2848',
              }}>Project Light</p>
              <p style={{ fontSize: 11, color: '#3a4870', fontWeight: 500 }}>Literacy for Life</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
