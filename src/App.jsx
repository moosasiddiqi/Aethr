import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Coach from './pages/Coach'
import Tips from './pages/Tips'
import './index.css'

export default function App() {
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('aethr_player')
    return saved ? JSON.parse(saved) : null
  })

  const savePlayer = (data) => {
    localStorage.setItem('aethr_player', JSON.stringify(data))
    setPlayer(data)
  }

  const resetPlayer = () => {
    localStorage.removeItem('aethr_player')
    setPlayer(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding savePlayer={savePlayer} />} />
        <Route path="/dashboard" element={
          player ? <Dashboard player={player} savePlayer={savePlayer} resetPlayer={resetPlayer} /> 
                 : <Navigate to="/onboarding" />
        } />
        <Route path="/coach" element={
          player ? <Coach player={player} /> 
                 : <Navigate to="/onboarding" />
        } />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </BrowserRouter>
  )
}
