import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const packages = [
  {
    name: 'Smash Start',
    level: 'Beginner',
    price: 165,
    desc: 'Master the fundamentals. Build your base fitness and learn core techniques from scratch.',
    features: ['Basic footwork drills', 'Grip & stance fundamentals', 'Weekly stat tracking', 'AI coaching access'],
    accent: '#666'
  },
  {
    name: "Competitor's Edge",
    level: 'Intermediate',
    price: 300,
    desc: 'Sharpen your skills and outpace the competition with advanced drills and AI insights.',
    features: ['Advanced shot training', 'HIIT conditioning', 'Weekly stat tracking', 'AI coaching access'],
    accent: '#999'
  },
  {
    name: "Conqueror's Court",
    level: 'Advanced',
    price: 599,
    desc: 'Peak performance training for serious players aiming for elite-level results.',
    features: ['Elite-level conditioning', 'Match strategy analysis', 'Weekly stat tracking', 'Priority AI coaching'],
    accent: '#c8f135'
  }
]

export default function Landing() {
  const navigate = useNavigate()
  const [online] = useState(() => Math.floor(15 + Math.random() * 16))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className="page" style={{ paddingTop: 60 }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 80 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px' }}>
          AE<span style={{ color: 'var(--accent)' }}>THR</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#4caf50', marginRight: 6 }}></span>
            {online} athletes online
          </span>
          <button className="btn-primary" onClick={() => navigate('/onboarding')}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
        marginBottom: 100,
        maxWidth: 680
      }}>
        <div className="label" style={{ marginBottom: 20 }}>AI-Powered Badminton Training</div>
        <h1 style={{ fontSize: 'clamp(42px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24 }}>
          Train smarter.<br /><span style={{ color: 'var(--accent)' }}>Win harder.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
          Aethr combines expert badminton training programs with AI coaching to help you hit peak performance — whatever your level.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }} onClick={() => navigate('/onboarding')}>
            Start Training Free
          </button>
          <button className="btn-outline" onClick={() => navigate('/tips')}>
            Browse Tips
          </button>
        </div>
      </div>

      {/* Packages */}
      <div className="label" style={{ marginBottom: 24 }}>Training Packages</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 80 }}>
        {packages.map((pkg, i) => (
          <div key={i} className="card" style={{
            borderColor: i === 2 ? 'var(--accent)' : 'var(--border)',
            position: 'relative',
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {i === 2 && (
              <div style={{
                position: 'absolute', top: -12, left: 24,
                background: 'var(--accent)', color: '#000',
                fontSize: 10, fontWeight: 700, padding: '3px 10px',
                borderRadius: 4, letterSpacing: 1, fontFamily: 'var(--font-display)'
              }}>MOST POPULAR</div>
            )}
            <div className="label" style={{ marginBottom: 8 }}>{pkg.level}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{pkg.name}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: pkg.accent, marginBottom: 12 }}>
              ${pkg.price}<span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 12.5, lineHeight: 1.6, marginBottom: 16 }}>{pkg.desc}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {pkg.features.map((f, j) => (
                <li key={j} style={{ fontSize: 12, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', fontSize: 10 }}>✦</span> {f}
                </li>
              ))}
            </ul>
            <button className="btn-primary" style={{ width: '100%', marginTop: 20 }} onClick={() => navigate('/onboarding')}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>AE<span style={{ color: 'var(--accent)' }}>THR</span></div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI-powered badminton training © 2026</div>
      </div>
    </div>
  )
}
