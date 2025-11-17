import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import { formatNumber } from '../../utils/formatters'
import { RESOURCE_INFO } from '../../data/constants'
import Tooltip from '../../components/common/Tooltip'

const ChallengeChain = ({ chain, completedTiers, totalDefeated }) => {
  const { addResource, addExp, completeChallengeTier, equipItem } = useGameStore()
  const { numberFormat } = useSettingsStore()

  const handleClaimReward = (tier) => {
    // Award rewards
    if (tier.reward.gold) {
      addResource('gold', tier.reward.gold)
    }
    if (tier.reward.exp) {
      addExp(tier.reward.exp)
    }
    if (tier.reward.equipment) {
      equipItem(tier.reward.equipment)
    }

    // Mark as completed
    completeChallengeTier(tier.id)
  }

  const getBorderColor = () => {
    switch (chain.color) {
      case 'green': return 'border-green-500'
      case 'red': return 'border-red-500'
      case 'purple': return 'border-purple-500'
      case 'yellow': return 'border-yellow-500'
      case 'orange': return 'border-orange-500'
      case 'blue': return 'border-blue-500'
      default: return 'border-gray-500'
    }
  }

  const getProgressColor = () => {
    switch (chain.color) {
      case 'green': return 'from-green-600 to-green-400'
      case 'red': return 'from-red-600 to-red-400'
      case 'purple': return 'from-purple-600 to-purple-400'
      case 'yellow': return 'from-yellow-600 to-yellow-400'
      case 'orange': return 'from-orange-600 to-orange-400'
      case 'blue': return 'from-blue-600 to-blue-400'
      default: return 'from-gray-600 to-gray-400'
    }
  }

  const getBadgeColor = () => {
    switch (chain.color) {
      case 'green': return 'bg-green-500'
      case 'red': return 'bg-red-500'
      case 'purple': return 'bg-purple-500'
      case 'yellow': return 'bg-yellow-500'
      case 'orange': return 'bg-orange-500'
      case 'blue': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className={`card border-2 ${getBorderColor()}`}>
      {/* Chain Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-5xl">{chain.icon}</div>
        <div className="flex-1">
          <h2 className="text-xl font-medieval font-bold">{chain.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{chain.description}</p>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {completedTiers.filter(t => chain.tiers.find(tier => tier.id === t)).length} / {chain.tiers.length} tiers completed
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-3">
        {chain.tiers.map((tier, index) => {
          const isCompleted = completedTiers.includes(tier.id)
          const canClaim = totalDefeated >= tier.requiredDefeats && !isCompleted
          const progress = Math.min(100, (totalDefeated / tier.requiredDefeats) * 100)
          const isLocked = index > 0 && !completedTiers.includes(chain.tiers[index - 1].id)

          return (
            <motion.div
              key={tier.id}
              whileHover={{ scale: isLocked ? 1 : 1.02 }}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted
                  ? 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-500'
                  : canClaim
                  ? `${getBorderColor()} bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20`
                  : isLocked
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-400 opacity-50'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Tier Icon */}
                <div className="relative">
                  <div className={`text-4xl ${isLocked ? 'opacity-50' : ''}`}>{tier.icon}</div>
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      ✓
                    </div>
                  )}
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      🔒
                    </div>
                  )}
                </div>

                {/* Tier Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-medieval font-bold text-lg">{tier.name}</h3>
                      {isLocked && (
                        <p className="text-xs text-gray-500">
                          Complete previous tier to unlock
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${getBadgeColor()} text-white`}>
                      Tier {index + 1}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {!isCompleted && !isLocked && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Monsters Defeated</span>
                        <span className="font-bold">
                          {formatNumber(totalDefeated, numberFormat)} / {formatNumber(tier.requiredDefeats, numberFormat)}
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getProgressColor()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Rewards */}
                  <div className="mb-3">
                    <div className="text-xs font-semibold mb-1">Rewards:</div>
                    <div className="flex flex-wrap gap-2">
                      {tier.reward.gold && (
                        <Tooltip content={`Gold reward`}>
                          <div className="text-xs px-2 py-1 rounded bg-gold dark:bg-gold-dark text-gray-900">
                            {RESOURCE_INFO.gold.icon} {formatNumber(tier.reward.gold, numberFormat)}
                          </div>
                        </Tooltip>
                      )}
                      {tier.reward.exp && (
                        <Tooltip content={`Experience reward`}>
                          <div className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                            ⭐ {formatNumber(tier.reward.exp, numberFormat)} EXP
                          </div>
                        </Tooltip>
                      )}
                      {tier.reward.equipment && (
                        <Tooltip content={`${tier.reward.equipment.name} - ${tier.reward.equipment.description}`}>
                          <div className="text-xs px-3 py-2 rounded bg-gold text-gray-900 font-bold border-2 border-yellow-600 shadow-md">
                            ✨ {tier.reward.equipment.icon} {tier.reward.equipment.name}
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  {!isCompleted && !isLocked && (
                    <div className="flex justify-end">
                      <Tooltip content={canClaim ? 'Claim your reward!' : 'Keep defeating monsters'}>
                        <button
                          onClick={() => handleClaimReward(tier)}
                          disabled={!canClaim}
                          className={`px-6 py-2 rounded-lg font-medieval text-sm transition-all ${
                            canClaim
                              ? 'bg-gold hover:bg-yellow-600 text-gray-900 shadow-md hover:shadow-lg border-2 border-yellow-600'
                              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {canClaim ? '⭐ Claim Reward' : 'In Progress'}
                        </button>
                      </Tooltip>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="flex justify-end">
                      <div className="px-6 py-2 rounded-lg bg-green-600 text-white font-medieval text-sm">
                        ✓ Completed
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ChallengeChain
