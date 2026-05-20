import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tips = [
  {
    category: 'Footwork',
    icon: '👟',
    items: [
      { title: 'Stay on Your Toes', desc: 'Keep your weight on the balls of your feet to react quickly to any shot.' },
      { title: 'Use Small Steps', desc: 'Quick, small steps give better balance and control than large strides.' },
      { title: 'Split Step', desc: "Just before your opponent hits the shuttle, do a small hop to be ready to move in any direction." },
      { title: 'Lunge Properly', desc: "When lunging, keep your knee behind your toes to avoid injury and maintain balance." },
      { title: 'Recover Quickly', desc: 'Always return to a ready position in the center of the court after each shot.' }
    ]
  },
  {
    category: 'Grips',
    icon: '🤚',
    items: [
      { title: 'Forehand Grip', desc: "Hold the racket as if shaking hands — the V-shape between thumb and index finger on the top edge of the handle." },
      { title: 'Backhand Grip', desc: "Rotate slightly from the forehand position so your thumb presses flat against the back bevel of the handle." },
      { title: 'Grip Pressure', desc: 'Keep a relaxed grip and tighten only at the moment of contact to maximize power and control.' }
    ]
  },
  {
    category: 'Shots',
    icon: '🏸',
    items: [
      { title: 'Clear', desc: 'Aim high and deep into the opponent\'s court to push them back and buy time to reposition.' },
      { title: 'Drop Shot', desc: 'Use a gentle touch to make the shuttle fall just over the net, forcing your opponent to move forward.' },
      { title: 'Smash', desc: 'Aim for a steep downward angle. Use a full arm swing and follow through for maximum power.' },
      { title: 'Drive', desc: 'Keep the shuttle low and flat over the net to pressure your opponent and limit their options.' },
      { title: 'Net Shot', desc: 'Use a delicate touch and control the shuttle\'s tumble to make returns extremely difficult.' }
    ]
  },
  {
    category: 'Strategy',
    icon: '♟️',
    items: [
      { title: 'Doubles Positioning', desc: 'One covers front, one covers back in attack. Switch to side-by-side for defense.' },
      { title: 'Court Control', desc: 'In singles, control the center to minimize the distance you need to move for each shot.' },
      { title: 'Anticipation', desc: "Read your opponent's body language and racket preparation to anticipate shots before they happen." },
      { title: 'Variety', desc: 'Mix up your shots constantly — predictable players are easy players to beat.' },
      { title: 'Exploit Weaknesses', desc: 'Identify and target weak areas — backhand, slow movement, or poor net play.' }
    ]
  }
]

export default function Tips() {
  const navigate = useNavigate()
  const [active, setActive] = useState('Footwork')
  const current = tips.find(t => t.category === active)

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
          AE<span style={{ color: 'var(--accent)' }}>THR</span>
        </div>
        <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => navigate(-1)}>← Back</button>
      </nav>

      <div className="label" style={{ marginBottom: 12 }}>Knowledge Base</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', marginBottom: 32 }}>Training Tips</h1>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {tips.map(t => (
          <button key={t.category} onClick={() => setActive(t.category)} style={{
            background: active === t.category ? 'var(--accent)' : 'var(--surface)',
            color: active === t.category ? '#000' : 'var(--text-dim)',
            border: `1px solid ${active === t.category ? 'var(--accent)' : 'var(--border)'}`,
            padding: '8px 18px', borderRadius: 6,
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', transition: 'all 0.15s'
          }}>
            {t.icon} {t.category}
          </button>
        ))}
      </div>

      {/* Tips grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {current.items.map((item, i) => (
          <div key={i} className="card" style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'var(--accent-dim)', border: '1px solid var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: 'var(--accent)', fontWeight: 700
              }}>{i + 1}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{item.title}</div>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Nutrition section */}
      <div style={{ marginTop: 48 }}>
        <div className="label" style={{ marginBottom: 16 }}>Nutrition</div>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { tip: 'Balanced macros', desc: 'Carbs for energy, protein for recovery, fats for endurance.' },
              { tip: 'Hydration', desc: 'Drink water before, during, and after every session.' },
              { tip: 'Micronutrients', desc: 'Fruits and vegetables for vitamins and minerals your body needs.' },
              { tip: 'Avoid junk', desc: 'Cut excessive sugar and saturated fats during training periods.' },
              { tip: 'Meal timing', desc: 'Eat a light meal 2 hours before training for optimal energy.' },
            ].map((n, i) => (
              <div key={i}>
                <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>✦ {n.tip}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 12, lineHeight: 1.5 }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
