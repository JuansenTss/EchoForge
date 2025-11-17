import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSettingsStore from '../../stores/settingsStore'
import useGameStore from '../../stores/gameStore'
import { GAME_VERSION } from '../../data/constants'
import TutorialSystem from '../tutorial/TutorialSystem'
import { TUTORIALS } from '../../data/tutorials'

const Menu = () => {
  const { menuOpen, toggleMenu, currentMenuTab, setMenuTab } = useSettingsStore()
  const { player, lifetimeStats, gameState, ascension, transcendence } = useGameStore()
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const [selectedTutorial, setSelectedTutorial] = useState(TUTORIALS.WELCOME)

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const tabs = [
    { id: 'guide', label: 'Guide', icon: '📖' },
    { id: 'tutorial', label: 'Tutorial', icon: '🎓' },
    { id: 'currentRun', label: 'Current Run', icon: '📊' },
    { id: 'overall', label: 'Overall Stats', icon: '📈' },
    { id: 'changelog', label: 'Changelog', icon: '📝' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ]

  const handleOpenTutorial = (tutorialId) => {
    setSelectedTutorial(tutorialId)
    setTutorialOpen(true)
  }

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-medieval-700 dark:bg-gray-900 text-white p-4 flex items-center justify-between">
              <h2 className="text-xl font-medieval">Menu</h2>
              <button onClick={toggleMenu} className="text-2xl hover:scale-110 transition-transform">
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 dark:border-gray-700">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMenuTab(tab.id)}
                  className={`flex-1 py-2 text-sm transition-colors ${
                    currentMenuTab === tab.id
                      ? 'bg-medieval-100 dark:bg-gray-700 text-medieval-700 dark:text-gold-DEFAULT border-b-2 border-medieval-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={tab.label}
                >
                  <div>{tab.icon}</div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {currentMenuTab === 'guide' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">How to Play</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>🏠 Home:</strong> Build structures to generate resources automatically. Fight monsters for gold and EXP!</p>
                    <p><strong>🗺️ Quests:</strong> Complete quests for rewards and experience. Use "Collect All" button for bulk completion!</p>
                    <p><strong>⚔️ Challenges:</strong> Defeat monsters to progress through creature evolution chains and earn exclusive equipment!</p>
                    <p><strong>🏆 Achievements:</strong> Unlock achievements for permanent bonuses.</p>
                    <p><strong>🌅 Ascension:</strong> Reset your progress for powerful multipliers.</p>
                    <p><strong>✨ Transcendence:</strong> The ultimate reset for massive bonuses.</p>
                    <p><strong>⚙️ Settings:</strong> Customize theme, animations, resolution, and number format.</p>
                    <p className="mt-4"><strong>💡 Tip:</strong> Check the Tutorial tab for detailed guides on each game system!</p>
                  </div>
                </div>
              )}

              {currentMenuTab === 'tutorial' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">📚 Tutorials</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select a tutorial to learn about game systems:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.WELCOME)}
                      className="w-full text-left px-4 py-3 bg-medieval-100 dark:bg-gray-700 hover:bg-medieval-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏰</span>
                        <div>
                          <div className="font-medieval font-bold">Welcome to EchoForge!</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Basic introduction and navigation</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.RESOURCES)}
                      className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 hover:bg-blue-100 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💎</span>
                        <div>
                          <div className="font-medieval font-bold">Resources Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">All ways to obtain each resource</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.BUILDINGS)}
                      className="w-full text-left px-4 py-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-30 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏗️</span>
                        <div>
                          <div className="font-medieval font-bold">Buildings Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Understanding production and costs</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.QUESTS)}
                      className="w-full text-left px-4 py-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 hover:bg-purple-100 dark:hover:bg-purple-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🗺️</span>
                        <div>
                          <div className="font-medieval font-bold">Quests Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Quest types and rewards</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.COMBAT)}
                      className="w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-30 hover:bg-red-100 dark:hover:bg-red-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⚔️</span>
                        <div>
                          <div className="font-medieval font-bold">Combat Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Fighting monsters and rewards</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.SPECIAL_QUESTS)}
                      className="w-full text-left px-4 py-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-30 hover:bg-yellow-100 dark:hover:bg-yellow-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⭐</span>
                        <div>
                          <div className="font-medieval font-bold">Special Quests Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Time-limited quests and equipment</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.ACHIEVEMENTS)}
                      className="w-full text-left px-4 py-3 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-30 hover:bg-orange-100 dark:hover:bg-orange-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <div className="font-medieval font-bold">Achievements Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Permanent bonuses and tiers</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.ASCENSION)}
                      className="w-full text-left px-4 py-3 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-30 hover:bg-indigo-100 dark:hover:bg-indigo-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌅</span>
                        <div>
                          <div className="font-medieval font-bold">Ascension Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">First prestige layer explained</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenTutorial(TUTORIALS.TRANSCENDENCE)}
                      className="w-full text-left px-4 py-3 bg-pink-50 dark:bg-pink-900 dark:bg-opacity-30 hover:bg-pink-100 dark:hover:bg-pink-800 dark:hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <div className="font-medieval font-bold">Transcendence Guide</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Ultimate prestige mechanics</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {currentMenuTab === 'currentRun' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">Current Run Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-bold">{player.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-bold">{Math.floor(player.exp)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Run Time:</span>
                      <span className="font-bold">{formatTime(gameState.currentRunTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ascensions:</span>
                      <span className="font-bold">{ascension.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ascension Power:</span>
                      <span className="font-bold">{ascension.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transcendences:</span>
                      <span className="font-bold">{transcendence.count}</span>
                    </div>
                  </div>
                </div>
              )}

              {currentMenuTab === 'overall' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">Overall Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Play Time:</span>
                      <span className="font-bold">{formatTime(lifetimeStats.playTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Gold Earned:</span>
                      <span className="font-bold">{Math.floor(lifetimeStats.totalGoldEarned).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quests Completed:</span>
                      <span className="font-bold">{lifetimeStats.totalQuestsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Buildings Built:</span>
                      <span className="font-bold">{lifetimeStats.totalBuildingsBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Ascensions:</span>
                      <span className="font-bold">{lifetimeStats.totalAscensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Transcendences:</span>
                      <span className="font-bold">{lifetimeStats.totalTranscendences}</span>
                    </div>
                  </div>
                </div>
              )}

              {currentMenuTab === 'changelog' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">Changelog</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-bold">v0.1.0 - Initial Release</h4>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Core idle game mechanics</li>
                        <li>8 building types</li>
                        <li>15 quests across multiple categories</li>
                        <li>20+ achievements</li>
                        <li>Ascension system</li>
                        <li>Transcendence system</li>
                        <li>Dark/Light mode</li>
                        <li>Auto-save functionality</li>
                        <li>Developer terminal (Ctrl+Shift+~)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentMenuTab === 'about' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medieval font-bold">About EchoForge</h3>
                  <div className="space-y-2 text-sm">
                    <p>A medieval fantasy idle game with endless progression.</p>
                    <div className="mt-4">
                      <p><strong>Version:</strong> {GAME_VERSION}</p>
                      <p><strong>Created:</strong> 2024</p>
                      <p className="mt-4 text-xs opacity-75">Built with React, Vite, and Tailwind CSS</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}

      {/* Tutorial System */}
      <TutorialSystem
        isOpen={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        tutorialId={selectedTutorial}
      />
    </AnimatePresence>
  )
}

export default Menu
