import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import BuildingCard from './BuildingCard'
import CharacterCreation from '../../components/common/CharacterCreation'
import PixelScene from './PixelScene'
import { buildingsData } from '../../data/buildings'

const Home = () => {
  const { gameState, player } = useGameStore()
  const { showAnimations } = useSettingsStore()
  const [expandedView, setExpandedView] = useState(false)

  // Show character creation if not initialized
  if (!gameState.isInitialized || !player.name) {
    return <CharacterCreation />
  }

  // Filter buildings by unlock status
  const unlockedBuildings = Object.values(buildingsData).filter(building => {
    if (building.unlocked) return true
    if (building.unlockRequirement) {
      return player.level >= building.unlockRequirement.level
    }
    return false
  })

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medieval font-bold">Your Kingdom</h2>
          <button
            onClick={() => setExpandedView(!expandedView)}
            className="btn-primary text-sm"
          >
            {expandedView ? '📊 Show Animation' : '📜 Show Details'}
          </button>
        </div>
      </div>

      {/* Animation View */}
      <AnimatePresence mode="wait">
        {!expandedView && showAnimations && (
          <motion.div
            key="animation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card"
          >
            <PixelScene />
          </motion.div>
        )}

        {/* Expanded Buildings View */}
        {expandedView && (
          <motion.div
            key="buildings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-medieval font-bold px-2">Buildings</h3>
            {unlockedBuildings.map(building => (
              <BuildingCard key={building.id} building={building} />
            ))}

            {unlockedBuildings.length === 0 && (
              <div className="card text-center py-8 text-gray-500">
                <p>No buildings unlocked yet. Complete quests to progress!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="card">
        <h3 className="text-lg font-medieval font-bold mb-3">Kingdom Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 dark:text-gray-400">Total Buildings</div>
            <div className="text-2xl font-bold">
              {Object.values(useGameStore.getState().buildings).reduce((sum, count) => sum + count, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Quests Done</div>
            <div className="text-2xl font-bold">
              {useGameStore.getState().quests.completed.length}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Ascensions</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {useGameStore.getState().ascension.count}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400">Transcendences</div>
            <div className="text-2xl font-bold text-gold-DEFAULT">
              {useGameStore.getState().transcendence.count}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
