import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { questsData } from '../../data/quests'
import QuestCard from './QuestCard'
import { isTimedQuestAvailable } from '../../data/specialQuests'
import { SPECIAL_EQUIPMENT } from '../../data/specialQuests'
import Tooltip from '../../components/common/Tooltip'

const Quests = () => {
  const { player, quests, completeAllQuests, specialQuests, resources } = useGameStore()
  const [collectMessage, setCollectMessage] = useState('')

  // Filter quests by availability
  const availableQuests = questsData.filter(quest => {
    if (quests.completed.includes(quest.id)) return false
    if (!quest.unlocked && quest.unlockRequirement) {
      return player.level >= quest.unlockRequirement.level
    }
    return quest.unlocked
  })

  const completedQuests = questsData.filter(quest => quests.completed.includes(quest.id))

  // Group quests by category
  const questsByCategory = availableQuests.reduce((acc, quest) => {
    if (!acc[quest.category]) acc[quest.category] = []
    acc[quest.category].push(quest)
    return acc
  }, {})

  const categoryOrder = ['tutorial', 'gathering', 'combat', 'crafting', 'magic', 'trading', 'royal', 'legendary']

  // Calculate countdown for special quests
  const [countdown, setCountdown] = useState({ daily: '', weekly: '', monthly: '' })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const endTime = new Date(now)
      endTime.setHours(21, 0, 0, 0) // 9PM

      if (now.getHours() >= 21) {
        endTime.setDate(endTime.getDate() + 1)
      }

      const diff = endTime - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({
        daily: `${hours}h ${minutes}m ${seconds}s`,
        weekly: `${hours}h ${minutes}m ${seconds}s`,
        monthly: `${hours}h ${minutes}m ${seconds}s`,
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle collect all
  const handleCollectAll = () => {
    const count = completeAllQuests()
    if (count > 0) {
      setCollectMessage(`✓ Collected ${count} quest reward${count > 1 ? 's' : ''}!`)
      setTimeout(() => setCollectMessage(''), 3000)
    } else {
      setCollectMessage('No quests available to complete')
      setTimeout(() => setCollectMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="card">
        <h1 className="text-2xl font-medieval font-bold">🗺️ Quests</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete quests to earn rewards and experience
        </p>
        <div className="mt-2 text-sm">
          <span className="font-semibold">{completedQuests.length}</span> / {questsData.length} completed
        </div>

        {/* Collect All Button */}
        <div className="mt-4">
          <Tooltip content="Complete all quests you can afford at once">
            <button
              onClick={handleCollectAll}
              className="w-full btn-primary"
            >
              🎁 Collect All Available Rewards
            </button>
          </Tooltip>
          {collectMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-2 text-center text-sm font-semibold ${
                collectMessage.startsWith('✓') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {collectMessage}
            </motion.div>
          )}
        </div>
      </div>

      {/* Special Quests Section */}
      {(specialQuests.daily || specialQuests.weekly || specialQuests.monthly) && (
        <div className="card border-2 border-gold">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-medieval font-bold text-gold">⭐ Special Quests</h2>
            <span className="text-xs bg-gold text-gray-900 px-2 py-1 rounded-full font-bold">
              TIME LIMITED
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Exclusive equipment rewards! Available only during specific times.
          </p>

          <div className="space-y-3">
            {/* Daily Quest */}
            {specialQuests.daily && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border-2 border-blue-400 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medieval font-bold text-blue-700 dark:text-blue-300">
                    📅 Daily Quest
                  </h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    Ends in: {countdown.daily}
                  </span>
                </div>
                <QuestCard quest={specialQuests.daily} isSpecial={true} />
              </div>
            )}

            {/* Weekly Quest */}
            {specialQuests.weekly && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 border-2 border-purple-400 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medieval font-bold text-purple-700 dark:text-purple-300">
                    📆 Weekly Quest (Saturday Only!)
                  </h3>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    Ends in: {countdown.weekly}
                  </span>
                </div>
                <QuestCard quest={specialQuests.weekly} isSpecial={true} />
              </div>
            )}

            {/* Monthly Quest */}
            {specialQuests.monthly && (
              <div className="p-4 bg-gold bg-opacity-20 dark:bg-yellow-900 dark:bg-opacity-30 border-2 border-gold rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medieval font-bold text-yellow-700 dark:text-gold">
                    📜 Monthly Quest (Last Day Only!)
                  </h3>
                  <span className="text-xs font-bold text-yellow-700 dark:text-gold">
                    Ends in: {countdown.monthly}
                  </span>
                </div>
                <QuestCard quest={specialQuests.monthly} isSpecial={true} />
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              💡 <strong>Schedule:</strong> Daily (8PM-9PM), Weekly (Saturdays 8PM-9PM), Monthly (Last day 8PM-9PM)
            </p>
          </div>
        </div>
      )}

      {/* Info about special quests when none active */}
      {!specialQuests.daily && !specialQuests.weekly && !specialQuests.monthly && (
        <div className="card border-2 border-gray-300 dark:border-gray-600">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="font-medieval font-bold mb-2">Special Quests</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Time-limited quests with exclusive equipment rewards appear at specific times:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>📅 <strong>Daily:</strong> Every day 8PM-9PM</li>
                <li>📆 <strong>Weekly:</strong> Saturdays 8PM-9PM</li>
                <li>📜 <strong>Monthly:</strong> Last day of month 8PM-9PM</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Next daily quest in: {countdown.daily}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Available Quests by Category */}
      {categoryOrder.map(category => {
        const categoryQuests = questsByCategory[category]
        if (!categoryQuests || categoryQuests.length === 0) return null

        return (
          <div key={category}>
            <h2 className="text-lg font-medieval font-bold capitalize px-2 mb-2 text-medieval-700 dark:text-medieval-400">
              {category} Quests
            </h2>
            <div className="space-y-3">
              {categoryQuests.map(quest => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        )
      })}

      {availableQuests.length === 0 && (
        <div className="card text-center py-8 text-gray-500">
          <p className="text-lg mb-2">🎉 All available quests completed!</p>
          <p className="text-sm">Level up to unlock more quests</p>
        </div>
      )}

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-medieval font-bold mb-3">Completed Quests</h2>
          <div className="space-y-2">
            {completedQuests.map(quest => (
              <div
                key={quest.id}
                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900 bg-opacity-30 rounded-lg"
              >
                <span className="text-2xl">{quest.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{quest.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{quest.category}</div>
                </div>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quests
