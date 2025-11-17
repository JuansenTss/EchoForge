import { useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import BuildingCard from './BuildingCard'
import CharacterCreation from '../../components/common/CharacterCreation'
import CombatScene from '../../components/combat/CombatScene'
import BuildingScene from '../../components/building/BuildingScene'
import { buildingsData } from '../../data/buildings'
import Tooltip from '../../components/common/Tooltip'

const Home = () => {
  const { gameState, player } = useGameStore()
  const { showAnimations, showCombat, showBuilding, toggleCombat, toggleBuilding } = useSettingsStore()

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
    <div className="space-y-4 pb-4">
      {/* Animation Controls */}
      {showAnimations && (
        <div className="card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-medieval font-bold">Animations</h2>
            <div className="flex gap-2">
              <Tooltip content={showCombat ? 'Hide combat' : 'Show combat'}>
                <button
                  onClick={toggleCombat}
                  className={`px-4 py-2 rounded-lg font-medieval text-sm transition-all ${
                    showCombat
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  ⚔️ Combat {showCombat ? 'ON' : 'OFF'}
                </button>
              </Tooltip>
              <Tooltip content={showBuilding ? 'Hide buildings' : 'Show buildings'}>
                <button
                  onClick={toggleBuilding}
                  className={`px-4 py-2 rounded-lg font-medieval text-sm transition-all ${
                    showBuilding
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  🏗️ Building {showBuilding ? 'ON' : 'OFF'}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {/* Combat Animation */}
      {showAnimations && showCombat && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <CombatScene />
        </motion.div>
      )}

      {/* Building Animation */}
      {showAnimations && showBuilding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <BuildingScene />
        </motion.div>
      )}

      {/* Buildings Section */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Buildings & Upgrades</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Build structures to generate resources automatically. Use bulk purchase to buy multiple at once.
        </p>
      </div>

      <div className="space-y-3">
        {unlockedBuildings.map(building => (
          <BuildingCard key={building.id} building={building} />
        ))}

        {unlockedBuildings.length === 0 && (
          <div className="card text-center py-8 text-gray-500">
            <p>No buildings unlocked yet. Level up to unlock more!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
