import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const tierLabels = {
  beginner: 'Smash Start',
  intermediate: "Competitor's Edge",
  advanced: "Conqueror's Court"
}

const weeklyTasks = {
  Strength: {
    beginner: ['20-100 pushups/day increasing each day', 'Increase weight when lifting', 'Eat high-nutrient meals', 'Apply resistance band workouts'],
    intermediate: ['50-150 pushups/day', 'Increase volume and intensity when lifting', 'Eat high-protein meals', 'Advanced resistance workouts'],
    advanced: ['100-200 pushups/day', 'High-intensity strength training', 'Specialized strength conditioning', 'Advanced powerlifting exercises']
  },
  Speed: {
    beginner: ['Complete a 5km morning run', 'Complete sprints 3x per week', 'Practice interval running', 'Strengthen your core'],
    intermediate: ['Complete a 10km morning run', 'High-intensity interval training (HIIT)', 'Practice agility ladder drills', 'Enhance leg strength with weights'],
    advanced: ['Daily 15km runs', 'Elite sprint training', 'Intensive interval running', 'Comprehensive lower body workouts']
  },
  Endurance: {
    beginner: ['Complete long sprints', 'Reduce recovery time between sets', 'Take adequate rest nights', 'Increase frequency and duration gradually'],
    intermediate: ['Long-distance runs and sprints', 'Circuit training sessions', 'Reduce rest intervals', 'Increase frequency and intensity significantly'],
    advanced: ['Marathon-level training', 'Extreme cardio sessions', 'Minimum recovery time between sets', 'Max frequency, intensity, and duration']
  },
  Agility: {
    beginner: ['Complete a set of high knee drills', 'Basic plyometrics', 'Jump rope 10 mins/day', 'Back and forth lunges'],
    intermediate: ['Advanced plyometrics', 'Complex footwork drills', 'Lateral movement exercises', 'Balance and coordination training'],
    advanced: ['High-intensity agility drills', 'Complex varied plyometric routines', 'Multi-directional speed training', 'Comprehensive balance exercises']
  }
}

export default function Dashboard({ player, savePlayer, resetPlayer }) {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const [selectedStat, setSelectedStat] = useState(null)
  const [showReset, setShowReset] = useState(false)

  const stats = player.stats
  const weakest = Object.entries(stats).sort((a, b) => a[1] - b[1])[0][0]
  const tasks = weeklyTasks[weakest][player.tier]

  const radarData = Object.entries(stats).map(([key, val]) => ({
    stat: key, value: val, fullMark: 10
  }))

  const totalProgress = Object.values(stats).reduce((a, b) => a + b, 0)
  const initialTotal = Object.values(player.initialStats).reduce((a, b) => a + b, 0)
  const progressPct = Math.min(100, Math.round(((totalProgress - initialTotal) / (40 - initialTotal)) * 100))

  const handleCompleteWeek = () => {
    if (!confirmed) return
    const newStats = { ...stats }
    if (newStats[weakest] < 10) newStats[weakest]++

    const updated = {
      ...player,
      stats: newStats,
      week: player.week + 1,
      history: [...player.history, { week: player.week, improved: weakest, stats: { ...stats } }]
    }
    savePlayer(updated)
    setConfirmed(false)
  }

  return (
    <div className="page" style={{ paddingTop: 40 }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
          AE<span style={{ color: 'var(--accent)' }}>THR</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => navigate('/coach')}>AI Coach</button>
          <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => navigate('/tips')}>Tips</button>
          <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px', color: 'var(--text-muted)' }} onClick={() => setShowReset(true)}>Reset</button>
        </div>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="label" style={{ marginBottom: 8 }}>{tierLabels[player.tier]}</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px' }}>Week {player.week}</h1>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* Radar Chart */}
        <div className="card">
          <div className="label" style={{ marginBottom: 16 }}>Stat Overview</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2a2a2a" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: '#666', fontSize: 11, fontFamily: 'DM Mono' }} />
              <Radar dataKey="value" stroke="#9a7ffa" fill="#9a7ffa" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="card">
          <div className="label" style={{ marginBottom: 16 }}>Stats</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(stats).map(([key, val]) => (
              <div key={key} onClick={() => setSelectedStat(selectedStat === key ? null : key)} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: key === weakest ? 'var(--accent)' : 'var(--text-dim)' }}>
                    {key} {key === weakest && '↑'}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{val}/10</span>
                </div>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    width: `${val * 10}%`,
                    background: key === weakest ? 'var(--accent)' : '#444',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div className="label">Overall Progress</div>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{progressPct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
          <div style={{ height: '100%', borderRadius: 3, width: `${progressPct}%`, background: 'var(--accent)', transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
          {player.history.length} weeks completed · Started {new Date(player.startDate).toLocaleDateString()}
        </div>
      </div>

      {/* This week's tasks */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="label" style={{ marginBottom: 4 }}>This Week's Focus</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>
              {weakest} <span style={{ color: 'var(--accent)' }}>Training</span>
            </div>
          </div>
          <div style={{
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            color: 'var(--accent)', fontSize: 10, padding: '4px 10px',
            borderRadius: 4, letterSpacing: 1
          }}>WEAKEST STAT</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {tasks.map((task, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', fontSize: 12, marginTop: 1 }}>✦</span>
              <span style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.5 }}>{task}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 14 }}>
            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: 16, height: 16 }} />
            <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>I've completed all tasks this week</span>
          </label>
          <button className="btn-primary" disabled={!confirmed} onClick={handleCompleteWeek} style={{ width: '100%', padding: 13 }}>
            Complete Week {player.week} →
          </button>
        </div>
      </div>

      {/* History */}
      {player.history.length > 0 && (
        <div className="card">
          <div className="label" style={{ marginBottom: 14 }}>Training History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {player.history.slice().reverse().map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span>Week {h.week}</span>
                <span>Focused on <span style={{ color: 'var(--accent)' }}>{h.improved}</span></span>
                <span>{Object.values(h.stats).reduce((a, b) => a + b, 0)} pts total</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset modal */}
      {showReset && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="card" style={{ maxWidth: 360, width: '90%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Reset progress?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 20 }}>This will delete all your stats and training history. Can't be undone.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowReset(false)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 1, background: 'var(--red)' }} onClick={() => { resetPlayer(); navigate('/') }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
