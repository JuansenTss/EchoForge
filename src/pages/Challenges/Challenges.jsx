import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { CREATURE_CHAINS, getNextTierForChain, canAccessChain } from '../../data/challenges'
import ChallengeChain from './ChallengeChain'

const Challenges = () => {
  const { player, challenges, combat } = useGameStore()

  // Filter chains by accessibility
  const availableChains = Object.values(CREATURE_CHAINS).filter(chain =>
    canAccessChain(chain, player.level)
  )

  const lockedChains = Object.values(CREATURE_CHAINS).filter(chain =>
    !canAccessChain(chain, player.level)
  )

  // Calculate total progress
  const totalChallenges = Object.values(CREATURE_CHAINS).reduce(
    (sum, chain) => sum + chain.tiers.length,
    0
  )
  const completedChallenges = challenges.completed.length

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="card">
        <h1 className="text-2xl font-medieval font-bold">⚔️ Challenges</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Defeat monsters in combat to complete challenge tiers and earn exclusive rewards!
        </p>
        <div className="mt-3 flex items-center gap-6 text-sm">
          <div>
            <span className="font-semibold">{completedChallenges}</span> / {totalChallenges} completed
          </div>
          <div>
            <span className="font-semibold">{combat.totalDefeated.toLocaleString()}</span> total monsters defeated
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="card bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border-2 border-blue-400">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-medieval font-bold mb-2">How Challenges Work</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Defeat monsters in the Combat animation to progress through challenge tiers</li>
              <li>• Each tier requires a specific number of total monster defeats</li>
              <li>• Complete tiers to earn gold, experience, and exclusive equipment</li>
              <li>• Equipment can be equipped in Settings for permanent bonuses</li>
              <li>• Higher level chains unlock as you level up</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Available Chains */}
      <div className="space-y-4">
        {availableChains.map(chain => (
          <ChallengeChain
            key={chain.id}
            chain={chain}
            completedTiers={challenges.completed}
            totalDefeated={combat.totalDefeated}
          />
        ))}
      </div>

      {/* Locked Chains */}
      {lockedChains.length > 0 && (
        <div className="card border-2 border-gray-300 dark:border-gray-600">
          <h2 className="text-lg font-medieval font-bold mb-3">🔒 Locked Challenge Chains</h2>
          <div className="space-y-3">
            {lockedChains.map(chain => (
              <motion.div
                key={chain.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-60"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl opacity-50">{chain.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medieval font-bold text-lg">{chain.name}</h3>
                      <span className="px-2 py-1 text-xs rounded bg-gray-400 text-white">
                        Requires Level {chain.unlockLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{chain.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {chain.tiers.length} tiers • Unlocks at level {chain.unlockLevel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenges
