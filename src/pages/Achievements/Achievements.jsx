import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { achievementsData } from '../../data/achievements'
import AchievementCard from './AchievementCard'

const Achievements = () => {
  const { achievements } = useGameStore()

  const unlockedAchievements = achievementsData.filter(ach =>
    achievements.unlocked.includes(ach.id)
  )

  const lockedAchievements = achievementsData.filter(ach =>
    !achievements.unlocked.includes(ach.id)
  )

  const claimedCount = achievements.claimed.length
  const unclaimedCount = unlockedAchievements.length - claimedCount

  // Group by tier
  const tierOrder = ['bronze', 'silver', 'gold', 'platinum']
  const tierColors = {
    bronze: 'from-orange-700 to-orange-900',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-cyan-400 to-purple-600',
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-medieval font-bold">Achievements</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Unlock achievements for permanent bonuses
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          <div>
            <span className="font-semibold">{unlockedAchievements.length}</span> / {achievementsData.length} unlocked
          </div>
          {unclaimedCount > 0 && (
            <div className="text-gold-DEFAULT font-semibold animate-pulse">
              {unclaimedCount} ready to claim!
            </div>
          )}
        </div>
      </div>

      {/* Unlocked Achievements */}
      {tierOrder.map(tier => {
        const tierAchievements = unlockedAchievements.filter(ach => ach.tier === tier)
        if (tierAchievements.length === 0) return null

        return (
          <div key={tier}>
            <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${tierColors[tier]} text-white font-medieval font-bold capitalize mb-2`}>
              {tier} Achievements
            </div>
            <div className="space-y-3">
              {tierAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} unlocked={true} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <div className="px-4 py-2 rounded-lg bg-gray-600 dark:bg-gray-800 text-white font-medieval font-bold mb-2">
            Locked Achievements
          </div>
          <div className="space-y-3">
            {lockedAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} unlocked={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements
