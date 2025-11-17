import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { RESOURCES, ADMIN_KEY_COMBO } from '../../data/constants'
import { questsData } from '../../data/quests'
import { achievementsData } from '../../data/achievements'

const DeveloperTerminal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const historyRef = useRef(null)
  const [godMode, setGodMode] = useState(false)

  const gameStore = useGameStore()

  // Key combination listener
  useEffect(() => {
    const keys = new Set()

    const handleKeyDown = (e) => {
      keys.add(e.key)

      // Check if all admin keys are pressed
      const adminKeysPressed = ADMIN_KEY_COMBO.every(key => keys.has(key))
      if (adminKeysPressed) {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    const handleKeyUp = (e) => {
      keys.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Auto-scroll history
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const addToHistory = (text, type = 'output') => {
    setHistory(prev => [...prev, { text, type, timestamp: Date.now() }])
  }

  const executeCommand = (cmd) => {
    const parts = cmd.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    addToHistory(`> ${cmd}`, 'command')

    try {
      switch (command) {
        case '/help':
          addToHistory('Available Commands:')
          addToHistory('/give gold <amount> - Add gold')
          addToHistory('/give resource <type> <amount> - Add resource')
          addToHistory('/unlock quest <id> - Unlock quest')
          addToHistory('/unlock achievement <id> - Unlock achievement')
          addToHistory('/complete quest <id> - Complete quest')
          addToHistory('/setlevel <level> - Set player level')
          addToHistory('/ascend - Perform ascension')
          addToHistory('/transcend - Perform transcendence')
          addToHistory('/reset - Full game reset')
          addToHistory('/export - Export save data')
          addToHistory('/import <data> - Import save data')
          addToHistory('/timewarp <seconds> - Simulate offline progress')
          addToHistory('/togglegod - Toggle god mode')
          addToHistory('/clearsave - Clear all save data')
          addToHistory('/list quests - List all quests')
          addToHistory('/list achievements - List all achievements')
          addToHistory('/list resources - List all resources')
          break

        case '/give':
          if (args[0] === 'gold') {
            const amount = parseFloat(args[1])
            if (isNaN(amount)) {
              addToHistory('Error: Invalid amount', 'error')
            } else {
              gameStore.addResource(RESOURCES.GOLD, amount)
              addToHistory(`Added ${amount} gold`, 'success')
            }
          } else if (args[0] === 'resource') {
            const resource = args[1]
            const amount = parseFloat(args[2])
            if (isNaN(amount)) {
              addToHistory('Error: Invalid amount', 'error')
            } else if (!Object.values(RESOURCES).includes(resource)) {
              addToHistory(`Error: Unknown resource "${resource}"`, 'error')
            } else {
              gameStore.addResource(resource, amount)
              addToHistory(`Added ${amount} ${resource}`, 'success')
            }
          }
          break

        case '/setlevel':
          const level = parseInt(args[0])
          if (isNaN(level)) {
            addToHistory('Error: Invalid level', 'error')
          } else {
            const expNeeded = (level * level) * 100
            gameStore.addExp(expNeeded - gameStore.player.exp)
            addToHistory(`Set level to ${level}`, 'success')
          }
          break

        case '/ascend':
          gameStore.performAscension()
          addToHistory('Performed ascension', 'success')
          break

        case '/transcend':
          gameStore.performTranscendence()
          addToHistory('Performed transcendence', 'success')
          break

        case '/reset':
          if (window.confirm('Are you sure you want to reset the game? This will reload the page.')) {
            addToHistory('Resetting game...', 'success')
            // Call resetSave directly - it handles the reload
            gameStore.resetSave()
          } else {
            addToHistory('Reset cancelled', 'info')
          }
          break

        case '/export':
          const saveData = JSON.stringify(gameStore)
          navigator.clipboard.writeText(saveData)
          addToHistory('Save data copied to clipboard', 'success')
          break

        case '/import':
          try {
            const data = JSON.parse(args.join(' '))
            // Apply imported data (simplified)
            addToHistory('Import feature requires manual implementation', 'info')
          } catch (e) {
            addToHistory('Error: Invalid JSON data', 'error')
          }
          break

        case '/timewarp':
          const seconds = parseFloat(args[0])
          if (isNaN(seconds)) {
            addToHistory('Error: Invalid time', 'error')
          } else {
            gameStore.processOfflineProgress(seconds * 1000)
            addToHistory(`Simulated ${seconds} seconds of offline progress`, 'success')
          }
          break

        case '/togglegod':
          setGodMode(prev => !prev)
          addToHistory(`God mode ${!godMode ? 'enabled' : 'disabled'}`, 'success')
          break

        case '/clearsave':
          if (window.confirm('Are you sure you want to clear all save data? This will reload the page.')) {
            addToHistory('Clearing save data...', 'success')
            // Call resetSave directly - it handles the reload
            gameStore.resetSave()
          } else {
            addToHistory('Clear cancelled', 'info')
          }
          break

        case '/unlock':
          if (args[0] === 'quest') {
            addToHistory(`Quest unlock requires game store implementation`, 'info')
          } else if (args[0] === 'achievement') {
            const achId = args[1]
            const achievement = achievementsData.find(a => a.id === achId)
            if (achievement) {
              gameStore.claimAchievement(achId)
              addToHistory(`Unlocked achievement: ${achievement.name}`, 'success')
            } else {
              addToHistory(`Error: Achievement "${achId}" not found`, 'error')
            }
          }
          break

        case '/complete':
          if (args[0] === 'quest') {
            const questId = args[1]
            const quest = questsData.find(q => q.id === questId)
            if (quest) {
              gameStore.completeQuest(questId)
              addToHistory(`Completed quest: ${quest.name}`, 'success')
            } else {
              addToHistory(`Error: Quest "${questId}" not found`, 'error')
            }
          }
          break

        case '/list':
          if (args[0] === 'quests') {
            addToHistory('Available Quests:')
            questsData.forEach(q => {
              addToHistory(`  ${q.id}: ${q.name}`)
            })
          } else if (args[0] === 'achievements') {
            addToHistory('Available Achievements:')
            achievementsData.forEach(a => {
              addToHistory(`  ${a.id}: ${a.name}`)
            })
          } else if (args[0] === 'resources') {
            addToHistory('Available Resources:')
            Object.values(RESOURCES).forEach(r => {
              addToHistory(`  ${r}`)
            })
          }
          break

        case '/clear':
          setHistory([])
          addToHistory('Terminal cleared', 'info')
          break

        default:
          addToHistory(`Unknown command: ${command}. Type /help for available commands.`, 'error')
      }
    } catch (error) {
      addToHistory(`Error executing command: ${error.message}`, 'error')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input])
      setHistoryIndex(-1)
      executeCommand(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  // God mode effect
  useEffect(() => {
    if (godMode) {
      const interval = setInterval(() => {
        Object.values(RESOURCES).forEach(resource => {
          gameStore.addResource(resource, 1000000)
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [godMode])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-4 w-96 h-96 terminal rounded-lg shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-green-600">
            <div className="flex items-center gap-2">
              <span className="text-green-400">▶</span>
              <span className="text-xs">Developer Terminal</span>
              {godMode && <span className="text-yellow-400 text-xs animate-pulse">⚡ GOD MODE</span>}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>

          {/* History */}
          <div ref={historyRef} className="flex-1 overflow-y-auto p-2 text-xs font-mono">
            {history.length === 0 && (
              <div className="text-gray-500">
                Type /help for available commands
              </div>
            )}
            {history.map((entry, i) => (
              <div
                key={i}
                className={`${
                  entry.type === 'command'
                    ? 'text-cyan-400'
                    : entry.type === 'error'
                    ? 'text-red-400'
                    : entry.type === 'success'
                    ? 'text-green-400'
                    : entry.type === 'info'
                    ? 'text-yellow-400'
                    : 'text-green-300'
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-green-600">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-400 font-mono text-xs"
                placeholder="Enter command..."
                autoComplete="off"
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeveloperTerminal
