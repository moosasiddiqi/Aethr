import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GEMINI_MODEL = "gemini-2.5-flash"
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

const tierLabels = {
  beginner: 'Smash Start (Beginner)',
  intermediate: "Competitor's Edge (Intermediate)",
  advanced: "Conqueror's Court (Advanced)"
}

const suggestions = [
  "What should I focus on this week?",
  "Create me a meal plan for training",
  "How do I improve my weakest stat fast?",
  "Give me a 30-min workout plan",
  "What are the best badminton drills for my level?"
]

export default function Coach({ player }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aethr_gemini_key') || '')
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [keyDraft, setKeyDraft] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!apiKey) setShowKeyInput(true)
  }, [])

  const systemContext = `You are an expert badminton coach and sports performance trainer inside the Aethr training app.

The athlete's profile:
- Training tier: ${tierLabels[player.tier]}
- Current stats (out of 10): Strength ${player.stats.Strength}, Speed ${player.stats.Speed}, Endurance ${player.stats.Endurance}, Agility ${player.stats.Agility}
- Weeks completed: ${player.history.length}
- Weakest stat: ${Object.entries(player.stats).sort((a,b) => a[1]-b[1])[0][0]}

Give direct, practical advice. No filler. Be specific to their stats and level. Keep responses concise but actionable. Use bullet points where helpful.`

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || !apiKey) return

    setInput('')
    setLoading(true)
    const newMessages = [...messages, { role: 'user', text: msg }]
    setMessages(newMessages)

    const history = newMessages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.role === 'user' ? m.text : m.text }]
    }))

    // Prepend system context to first message
    const contents = [
      { role: 'user', parts: [{ text: systemContext + '\n\nFirst message from athlete: ' + history[0].parts[0].text }] },
      ...history.slice(1)
    ]

    try {
      const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || 'API error')

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${err.message}` }])
    }

    setLoading(false)
  }

  const saveKey = () => {
    if (!keyDraft.trim()) return
    localStorage.setItem('aethr_gemini_key', keyDraft.trim())
    setApiKey(keyDraft.trim())
    setShowKeyInput(false)
  }

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)/gm, '• $1')
      .replace(/\n/g, '<br>')
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
          AE<span style={{ color: 'var(--accent)' }}>THR</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 12, fontFamily: 'var(--font-mono)', fontWeight: 400 }}>AI Coach</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => setShowKeyInput(true)}>⚙ Key</button>
          <button className="btn-outline" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => navigate('/dashboard')}>← Dashboard</button>
        </div>
      </nav>

      {/* Key setup modal */}
      {showKeyInput && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="card" style={{ maxWidth: 400, width: '90%' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Gemini API Key</div>
            <p style={{ color: 'var(--text-dim)', fontSize: 12, marginBottom: 16 }}>
              Get a free key at <a href="https://aistudio.google.com" target="_blank" style={{ color: 'var(--accent)' }}>aistudio.google.com</a>. Stored locally, never shared.
            </p>
            <input
              type="password" placeholder="AIza..."
              value={keyDraft} onChange={e => setKeyDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              style={{
                width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '10px 12px', borderRadius: 6,
                fontSize: 13, marginBottom: 12, outline: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              {apiKey && <button className="btn-outline" style={{ flex: 1 }} onClick={() => setShowKeyInput(false)}>Cancel</button>}
              <button className="btn-primary" style={{ flex: 1 }} onClick={saveKey}>Save Key</button>
            </div>
          </div>
        </div>
      )}

      {/* Player context bar */}
      <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.entries(player.stats).map(([k, v]) => (
          <div key={k} style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {k}: <span style={{ color: 'var(--text)', fontWeight: 700 }}>{v}</span>
          </div>
        ))}
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Tier: <span style={{ color: 'var(--accent)' }}>{player.tier}</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🏸</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Your AI Coach</div>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 32 }}>Ask anything about your training, nutrition, or technique.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420, margin: '0 auto' }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--text-dim)', padding: '10px 16px', borderRadius: 8,
                  fontSize: 13, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s'
                }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--text)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-dim)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: m.role === 'user' ? 'var(--accent-dim)' : 'var(--surface)',
            border: `1px solid ${m.role === 'user' ? 'rgba(200,241,53,0.2)' : 'var(--border)'}`,
            borderRadius: 10, padding: '12px 16px',
            fontSize: 13, lineHeight: 1.6,
            color: m.role === 'user' ? 'var(--accent)' : 'var(--text-dim)'
          }}>
            {m.role === 'ai'
              ? <span dangerouslySetInnerHTML={{ __html: formatText(m.text) }} />
              : m.text
            }
          </div>
        ))}

        {loading && (
          <div style={{
            alignSelf: 'flex-start', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 10,
            padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)',
            fontStyle: 'italic'
          }}>
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)', flexShrink: 0, display: 'flex', gap: 10 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder={apiKey ? "Ask your coach anything..." : "Add your API key to start →"}
          disabled={!apiKey || loading}
          style={{
            flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--text)', padding: '12px 16px', borderRadius: 8,
            fontSize: 13, outline: 'none', transition: 'border-color 0.15s'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button className="btn-primary" onClick={() => sendMessage()} disabled={!input.trim() || !apiKey || loading}
          style={{ padding: '12px 20px', fontSize: 16 }}>↑</button>
      </div>
    </div>
  )
}
