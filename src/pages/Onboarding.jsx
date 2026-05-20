import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tiers = [
  { id: 'beginner', name: 'Smash Start', level: 'Beginner', desc: 'Just getting started. Build fundamentals and base fitness.' },
  { id: 'intermediate', name: "Competitor's Edge", level: 'Intermediate', desc: 'Ready to level up. Focus on intensity and technique.' },
  { id: 'advanced', name: "Conqueror's Court", level: 'Advanced', desc: 'Chasing peak performance. Elite conditioning and strategy.' }
]

const stats = ['Strength', 'Speed', 'Endurance', 'Agility']

export default function Onboarding({ savePlayer }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [tier, setTier] = useState(null)
  const [statValues, setStatValues] = useState({ Strength: 5, Speed: 5, Endurance: 5, Agility: 5 })

  const handleStart = () => {
    const player = {
      tier,
      stats: { ...statValues },
      initialStats: { ...statValues },
      week: 1,
      history: [],
      startDate: new Date().toISOString()
    }
    savePlayer(player)
    navigate('/dashboard')
  }

  return (
    <div className="page" style={{ maxWidth: 600, paddingTop: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>
          AE<span style={{ color: 'var(--accent)' }}>THR</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: step >= s ? 'var(--accent)' : 'var(--border)',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <div className="label" style={{ marginBottom: 12 }}>Step 1 of 2</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>Choose your level</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Pick the training package that matches where you are right now.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {tiers.map(t => (
              <div key={t.id} onClick={() => setTier(t.id)} className="card" style={{
                cursor: 'pointer',
                borderColor: tier === t.id ? 'var(--accent)' : 'var(--border)',
                background: tier === t.id ? 'var(--accent-dim)' : 'var(--surface)',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.2s'
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${tier === t.id ? 'var(--accent)' : 'var(--border)'}`,
                  background: tier === t.id ? 'var(--accent)' : 'transparent',
                  flexShrink: 0, transition: 'all 0.2s'
                }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" disabled={!tier} onClick={() => setStep(2)} style={{ width: '100%', padding: 14 }}>
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="label" style={{ marginBottom: 12 }}>Step 2 of 2</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>Rate your stats</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Be honest — this helps your AI coach give better advice.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
            {stats.map(stat => (
              <div key={stat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{stat}</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 18 }}>{statValues[stat]}</span>
                </div>
                <input
                  type="range" min="1" max="10" value={statValues[stat]}
                  onChange={e => setStatValues(prev => ({ ...prev, [stat]: parseInt(e.target.value) }))}
                  style={{ width: '100%', accentColor: 'var(--accent)', height: 4 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                  <span>Beginner</span><span>Elite</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" onClick={handleStart} style={{ flex: 1, padding: 14 }}>
              Start Training 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
