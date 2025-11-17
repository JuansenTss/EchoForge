import { motion } from 'framer-motion'
import { useState } from 'react'
import useGameStore from '../../stores/gameStore'
import { RESOURCES, RESOURCE_INFO } from '../../data/constants'

const Transcendence = () => {
  const { ascension, resources, transcendence, performTranscendence } = useGameStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const formatNumber = (num) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return Math.floor(num).toString()
  }

  const canTranscend = ascension.count >= 10 && resources[RESOURCES.GOLD] >= 1000000000

  const estimatedPower = ascension.count * 0.1

  const handleTranscend = () => {
    if (canTranscend && showConfirm) {
      performTranscendence()
      setShowConfirm(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 dark:from-cyan-900 dark:via-purple-900 dark:to-pink-900">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">✨</div>
          <h1 className="text-3xl font-medieval font-bold mb-2 gold-shimmer">Transcendence</h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Break through the boundaries of reality itself. Transcendence resets everything, including ascensions,
            but grants multiplicative bonuses that compound with all other multipliers.
          </p>
        </div>
      </div>

      {/* Current Transcendence Stats */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Current Transcendence Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-900 dark:to-purple-900 dark:bg-opacity-30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transcendences</div>
            <div className="text-3xl font-bold gold-shimmer">
              {transcendence.count}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 dark:bg-opacity-30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Transcendence Power</div>
            <div className="text-3xl font-bold gold-shimmer">
              {transcendence.power.toFixed(2)}
            </div>
          </div>
        </div>

        {transcendence.power > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100 dark:from-cyan-800 dark:via-purple-800 dark:to-pink-800 rounded-lg">
            <div className="text-sm font-semibold mb-2">Current Transcendence Bonuses:</div>
            <div className="text-sm">
              <div className="font-bold text-lg mb-2">
                ×{(1 + transcendence.power).toFixed(2)} multiplier to EVERYTHING
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                This multiplies with all other bonuses from achievements, ascensions, and race bonuses!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Transcendence Requirements</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌅</span>
              <div>
                <div className="font-semibold">Complete 10 Ascensions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current: {ascension.count} Ascensions
                </div>
              </div>
            </div>
            <span className={`text-2xl ${ascension.count >= 10 ? 'text-green-600' : 'text-red-600'}`}>
              {ascension.count >= 10 ? '✓' : '✗'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{RESOURCE_INFO[RESOURCES.GOLD].icon}</span>
              <div>
                <div className="font-semibold">Accumulate 1,000,000,000 Gold</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current: {formatNumber(resources[RESOURCES.GOLD])}
                </div>
              </div>
            </div>
            <span className={`text-2xl ${resources[RESOURCES.GOLD] >= 1000000000 ? 'text-green-600' : 'text-red-600'}`}>
              {resources[RESOURCES.GOLD] >= 1000000000 ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>

      {/* Transcendence Preview */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">Next Transcendence</h2>
        <div className="p-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-lg">
          <div className="text-center mb-4">
            <div className="text-sm opacity-90">Estimated Power Gain</div>
            <div className="text-4xl font-bold">+{estimatedPower.toFixed(2)}</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>New Total Power:</span>
              <span className="font-bold">{(transcendence.power + estimatedPower).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Multiplier:</span>
              <span className="font-bold">×{(1 + transcendence.power + estimatedPower).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white bg-opacity-20 rounded text-xs">
            <p className="font-semibold">This means:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>×{(1 + transcendence.power + estimatedPower).toFixed(2)} Gold gain</li>
              <li>×{(1 + transcendence.power + estimatedPower).toFixed(2)} EXP gain</li>
              <li>×{(1 + transcendence.power + estimatedPower).toFixed(2)} Production</li>
              <li>×{(1 + transcendence.power + estimatedPower).toFixed(2)} Quest speed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What You'll Lose */}
      <div className="card border-2 border-red-400 dark:border-red-600">
        <h2 className="text-xl font-medieval font-bold mb-4 text-red-600 dark:text-red-400">
          ⚠️ What You'll Lose
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>All resources</li>
          <li>All buildings</li>
          <li>Player level (reset to 1)</li>
          <li>Quest progress</li>
          <li className="font-bold text-red-600 dark:text-red-400">ALL ASCENSIONS (reset to 0)</li>
          <li className="font-bold text-red-600 dark:text-red-400">All Ascension Power</li>
        </ul>
        <p className="mt-4 text-sm font-semibold text-green-600 dark:text-green-400">
          ✓ Your achievements and lifetime stats will be preserved!
        </p>
        <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
          ✓ You'll gain powerful transcendence multipliers!
        </p>
      </div>

      {/* Strategy Tip */}
      {!canTranscend && ascension.count > 0 && (
        <div className="card bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border border-blue-400">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medieval font-bold mb-1">Strategy Tip</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Keep ascending to reach 10 total ascensions. Each ascension makes you stronger,
                and when you finally transcend, you'll have built up a massive power multiplier!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transcend Button */}
      <div className="card">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!canTranscend}
            className={`w-full py-4 rounded-lg font-medieval text-xl transition-all ${
              canTranscend
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canTranscend ? 'Transcend' : 'Requirements Not Met'}
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-lg font-semibold text-red-600 dark:text-red-400">
              Are you absolutely sure? This resets EVERYTHING including ascensions!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-lg font-medieval bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTranscend}
                className="flex-1 py-3 rounded-lg font-medieval bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all"
              >
                Confirm Transcendence
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transcendence
