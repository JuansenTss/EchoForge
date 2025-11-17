import { motion } from 'framer-motion'
import { useState } from 'react'
import useGameStore from '../../stores/gameStore'
import { RESOURCES, RESOURCE_INFO } from '../../data/constants'

const Ascension = () => {
  const { player, resources, ascension, performAscension } = useGameStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const formatNumber = (num) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return Math.floor(num).toString()
  }

  const canAscend = player.level >= 100 && resources[RESOURCES.GOLD] >= 1000000

  const estimatedPower = Math.floor(player.level / 10) + (Object.values(useGameStore.getState().buildings).reduce((sum, count) => sum + count, 0) || 1)

  const handleAscend = () => {
    if (canAscend && showConfirm) {
      performAscension()
      setShowConfirm(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-gray-800">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🌅</div>
          <h1 className="text-3xl font-medieval font-bold mb-2">Ascension</h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Ascend to a higher plane of existence. Your progress will reset, but you'll gain powerful permanent multipliers
            that make your next journey much faster.
          </p>
        </div>
      </div>

      {/* Current Ascension Stats */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Current Ascension Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Ascensions</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {ascension.count}
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Ascension Power</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {ascension.power}
            </div>
          </div>
        </div>

        {ascension.power > 0 && (
          <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-800 rounded-lg">
            <div className="text-sm font-semibold mb-2">Current Bonuses:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>💰 Gold: +{(ascension.power * 10).toFixed(0)}%</div>
              <div>⭐ EXP: +{(ascension.power * 5).toFixed(0)}%</div>
              <div>🏭 Production: +{(ascension.power * 8).toFixed(0)}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Ascension Requirements</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <div>
                <div className="font-semibold">Reach Level 100</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current: Level {player.level}</div>
              </div>
            </div>
            <span className={`text-2xl ${player.level >= 100 ? 'text-green-600' : 'text-red-600'}`}>
              {player.level >= 100 ? '✓' : '✗'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{RESOURCE_INFO[RESOURCES.GOLD].icon}</span>
              <div>
                <div className="font-semibold">Accumulate 1,000,000 Gold</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current: {formatNumber(resources[RESOURCES.GOLD])}
                </div>
              </div>
            </div>
            <span className={`text-2xl ${resources[RESOURCES.GOLD] >= 1000000 ? 'text-green-600' : 'text-red-600'}`}>
              {resources[RESOURCES.GOLD] >= 1000000 ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>

      {/* Ascension Preview */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Next Ascension</h2>
        <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg">
          <div className="text-center mb-4">
            <div className="text-sm opacity-90">Estimated Power Gain</div>
            <div className="text-4xl font-bold">+{estimatedPower}</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>New Total Power:</span>
              <span className="font-bold">{ascension.power + estimatedPower}</span>
            </div>
            <div className="flex justify-between">
              <span>Gold Multiplier:</span>
              <span className="font-bold">+{((ascension.power + estimatedPower) * 10).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>EXP Multiplier:</span>
              <span className="font-bold">+{((ascension.power + estimatedPower) * 5).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Production Multiplier:</span>
              <span className="font-bold">+{((ascension.power + estimatedPower) * 8).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Lose */}
      <div className="card border-2 border-red-400 dark:border-red-600">
        <h2 className="text-xl font-medieval font-bold mb-4 text-red-600 dark:text-red-400">
          ⚠️ What You'll Lose
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>All resources (except ascension bonuses)</li>
          <li>All buildings</li>
          <li>Player level (reset to 1)</li>
          <li>Quest progress</li>
        </ul>
        <p className="mt-4 text-sm font-semibold text-red-600 dark:text-red-400">
          Your achievements and lifetime stats will be preserved!
        </p>
      </div>

      {/* Ascend Button */}
      <div className="card">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!canAscend}
            className={`w-full py-4 rounded-lg font-medieval text-xl transition-all ${
              canAscend
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canAscend ? 'Ascend' : 'Requirements Not Met'}
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-lg font-semibold text-red-600 dark:text-red-400">
              Are you sure you want to ascend?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-lg font-medieval bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAscend}
                className="flex-1 py-3 rounded-lg font-medieval bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white transition-all"
              >
                Confirm Ascension
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ascension
