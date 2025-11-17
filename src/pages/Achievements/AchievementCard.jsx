import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { RESOURCE_INFO } from '../../data/constants'

const AchievementCard = ({ achievement, unlocked }) => {
  const { achievements, claimAchievement, resources, player } = useGameStore()
  const isClaimed = achievements.claimed.includes(achievement.id)

  const formatNumber = (num) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return Math.floor(num).toString()
  }

  const handleClaim = () => {
    if (unlocked && !isClaimed) {
      claimAchievement(achievement.id)
    }
  }

  // Calculate progress
  const getProgress = () => {
    const req = achievement.requirement
    switch (req.type) {
      case 'resource':
        const current = resources[req.resource] || 0
        return { current, target: req.amount, percent: Math.min((current / req.amount) * 100, 100) }
      case 'level':
        return { current: player.level, target: req.level, percent: Math.min((player.level / req.level) * 100, 100) }
      case 'building':
        const totalBuildings = Object.values(useGameStore.getState().buildings).reduce((sum, count) => sum + count, 0)
        return { current: totalBuildings, target: req.count, percent: Math.min((totalBuildings / req.count) * 100, 100) }
      case 'quest':
        const completedQuests = useGameStore.getState().quests.completed.length
        return { current: completedQuests, target: req.count, percent: Math.min((completedQuests / req.count) * 100, 100) }
      default:
        return { current: 0, target: 1, percent: 0 }
    }
  }

  const progress = unlocked ? { current: 1, target: 1, percent: 100 } : getProgress()

  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.02 : 1 }}
      className={`card transition-shadow ${
        unlocked
          ? isClaimed
            ? 'opacity-75 hover:shadow-lg'
            : 'shadow-gold hover:shadow-xl border-2 border-gold-DEFAULT'
          : 'opacity-50'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`text-5xl ${unlocked ? '' : 'grayscale'}`}>
          {unlocked ? achievement.icon : '🔒'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className={`font-medieval font-bold text-lg ${!unlocked && 'blur-sm'}`}>
                {unlocked ? achievement.name : '???'}
              </h3>
              <p className={`text-sm text-gray-600 dark:text-gray-400 ${!unlocked && 'blur-sm'}`}>
                {unlocked ? achievement.description : 'Complete the requirement to unlock'}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs rounded capitalize font-semibold ${
              achievement.tier === 'platinum'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-600 text-white'
                : achievement.tier === 'gold'
                ? 'bg-gold text-gray-900'
                : achievement.tier === 'silver'
                ? 'bg-gray-400 text-gray-900'
                : 'bg-orange-600 text-white'
            }`}>
              {achievement.tier}
            </span>
          </div>

          {/* Progress bar */}
          {!unlocked && (
            <div className="mb-3">
              <div className="progress-bar h-4">
                <div
                  className="progress-fill"
                  style={{ width: `${progress.percent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
                  {formatNumber(progress.current)} / {formatNumber(progress.target)}
                </div>
              </div>
            </div>
          )}

          {/* Rewards */}
          {achievement.reward && unlocked && (
            <div className="mb-3">
              <div className="text-sm font-semibold mb-1">
                {isClaimed ? 'Claimed Rewards:' : 'Rewards:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(achievement.reward).map(([key, value]) => {
                  if (Object.values(RESOURCE_INFO).find(r => Object.keys(r).includes(key))) {
                    const info = RESOURCE_INFO[key]
                    return (
                      <div
                        key={key}
                        className="text-sm px-2 py-1 rounded bg-gold dark:bg-gold-dark text-gray-900 dark:text-gray-100"
                      >
                        {info?.icon} {formatNumber(value)}
                      </div>
                    )
                  }
                  // Multiplier rewards
                  return (
                    <div
                      key={key}
                      className="text-sm px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                    >
                      {key.includes('gold') && '💰'}
                      {key.includes('exp') && '⭐'}
                      {key.includes('production') && '🏭'}
                      {key.includes('quest') && '🗺️'}
                      {key.includes('all') && '✨'}
                      {key.includes('ascension') && '🌅'}
                      {key.includes('transcendence') && '✨'}
                      {' '}+{((value - 1) * 100).toFixed(0)}%
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Claim Button */}
          {unlocked && !isClaimed && (
            <div className="flex justify-end">
              <button
                onClick={handleClaim}
                className="px-6 py-2 rounded-lg font-medieval bg-gold hover:bg-gold-dark text-gray-900 shadow-md hover:shadow-lg transition-all animate-pulse"
              >
                Claim Reward
              </button>
            </div>
          )}

          {isClaimed && (
            <div className="flex justify-end text-green-600 dark:text-green-400 font-semibold text-sm">
              ✓ Claimed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AchievementCard
