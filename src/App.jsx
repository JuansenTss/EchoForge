import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Quests from './pages/Quests/Quests'
import Achievements from './pages/Achievements/Achievements'
import Ascension from './pages/Ascension/Ascension'
import Transcendence from './pages/Transcendence/Transcendence'
import Settings from './pages/Settings/Settings'
import useGameStore from './stores/gameStore'
import useSettingsStore from './stores/settingsStore'
import DeveloperTerminal from './components/dev/DeveloperTerminal'

function App() {
  const { initializeGame, saveGame } = useGameStore()
  const { darkMode } = useSettingsStore()

  useEffect(() => {
    // Initialize game on mount
    initializeGame()

    // Auto-save every 30 seconds
    const saveInterval = setInterval(() => {
      saveGame()
    }, 30000)

    // Save on page close
    const handleBeforeUnload = () => {
      saveGame()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearInterval(saveInterval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [initializeGame, saveGame])

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/ascension" element={<Ascension />} />
            <Route path="/transcendence" element={<Transcendence />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <DeveloperTerminal />
      </div>
    </Router>
  )
}

export default App
