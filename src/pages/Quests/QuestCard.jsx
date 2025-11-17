import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { RESOURCE_INFO } from '../../data/constants'
import { formatNumber } from '../../utils/formatters'
import useSettingsStore from '../../stores/settingsStore'
import Tooltip from '../../components/common/Tooltip'

const QuestCard = ({ quest, isSpecial = false }) => {
  const { resources, completeQuest, completeSpecialQuest, combat } = useGameStore()
  const { numberFormat } = useSettingsStore()

  const canComplete = quest.requirements
    ? Object.entries(quest.requirements).every(([resource, amount]) => {
        if (resource === 'completionTime') return true
        if (resource === 'monstersDefeated') return combat.totalDefeated >= amount
        return resources[resource] >= amount
      })
    : true

  const handleComplete = () => {
    if (canComplete) {
      if (isSpecial) {
        // Determine which type of special quest this is
        const questType = quest.id.includes('daily') ? 'daily' : quest.id.includes('weekly') ? 'weekly' : 'monthly'
        completeSpecialQuest(quest.id, questType)
      } else {
        completeQuest(quest.id)
      }
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-5xl">{quest.icon}</div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-medieval font-bold text-lg">{quest.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{quest.description}</p>
            </div>
            <span className="px-2 py-1 text-xs rounded bg-medieval-200 dark:bg-medieval-800 text-medieval-800 dark:text-medieval-200 capitalize">
              {quest.category}
            </span>
          </div>

          {/* Requirements */}
          {quest.requirements && (
            <div className="mb-3">
              <div className="text-sm font-semibold mb-1">Requirements:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(quest.requirements).map(([resource, amount]) => {
                  if (resource === 'completionTime') {
                    return (
                      <Tooltip key={resource} content="Time-based quest">
                        <div className="text-sm px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          ⏱️ {Math.floor(amount / 60)}m
                        </div>
                      </Tooltip>
                    )
                  }
                  if (resource === 'monstersDefeated') {
                    const hasEnough = combat.totalDefeated >= amount
                    return (
                      <Tooltip key={resource} content={`Defeat ${amount} monsters in combat`}>
                        <div
                          className={`text-sm px-2 py-1 rounded ${
                            hasEnough
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          }`}
                        >
                          ⚔️ {formatNumber(combat.totalDefeated, numberFormat)} / {formatNumber(amount, numberFormat)}
                        </div>
                      </Tooltip>
                    )
                  }
                  const info = RESOURCE_INFO[resource]
                  const hasEnough = resources[resource] >= amount
                  return (
                    <Tooltip key={resource} content={`${info.name} required`}>
                      <div
                        className={`text-sm px-2 py-1 rounded ${
                          hasEnough
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {info.icon} {formatNumber(resources[resource] || 0, numberFormat)} / {formatNumber(amount, numberFormat)}
                      </div>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          )}

          {/* Rewards */}
          {quest.rewards && (
            <div className="mb-3">
              <div className="text-sm font-semibold mb-1">Rewards:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(quest.rewards).map(([key, value]) => {
                  if (key === 'exp') {
                    return (
                      <Tooltip key={key} content="Experience points">
                        <div className="text-sm px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                          ⭐ {formatNumber(value, numberFormat)} EXP
                        </div>
                      </Tooltip>
                    )
                  }
                  if (key === 'equipment') {
                    return (
                      <Tooltip key={key} content={`${value.name} - ${value.description}`}>
                        <div className="text-sm px-3 py-2 rounded bg-gold text-gray-900 font-bold border-2 border-yellow-600 shadow-md">
                          ✨ {value.icon} {value.name}
                        </div>
                      </Tooltip>
                    )
                  }
                  const info = RESOURCE_INFO[key]
                  return (
                    <Tooltip key={key} content={`${info.name} reward`}>
                      <div className="text-sm px-2 py-1 rounded bg-gold dark:bg-gold-dark text-gray-900 dark:text-gray-100">
                        {info.icon} {formatNumber(value, numberFormat)}
                      </div>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          )}

          {/* Complete Button */}
          <div className="flex justify-end">
            <Tooltip content={canComplete ? 'Complete this quest' : 'Requirements not met'}>
              <button
                onClick={handleComplete}
                disabled={!canComplete}
                className={`px-6 py-2 rounded-lg font-medieval transition-all ${
                  isSpecial
                    ? canComplete
                      ? 'bg-gold hover:bg-yellow-600 text-gray-900 shadow-md hover:shadow-lg border-2 border-yellow-600'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : canComplete
                    ? 'bg-medieval-600 hover:bg-medieval-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canComplete ? (isSpecial ? '⭐ Claim Reward' : 'Complete Quest') : 'Not Ready'}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuestCard
