import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import { MONSTERS, generateScaledMonster } from '../../data/combat'
import { formatNumber } from '../../utils/formatters'
import Tooltip from '../common/Tooltip'

const CombatScene = () => {
  const { player, addResource, addExp, combat, attackMonster, defeatMonster } = useGameStore()
  const { resolution, numberFormat } = useSettingsStore()
  const [currentMonster, setCurrentMonster] = useState(null)
  const [monsterHp, setMonsterHp] = useState(0)
  const [floatingDamage, setFloatingDamage] = useState([])
  const [autoAttackEnabled, setAutoAttackEnabled] = useState(true)

  // Determine current monster based on player level
  useEffect(() => {
    const availableMonsters = MONSTERS.filter(m => m.unlockLevel <= player.level)
    if (availableMonsters.length === 0) return

    // Get highest level monster or scale it
    const baseMonster = availableMonsters[availableMonsters.length - 1]
    const tier = Math.floor(player.level / 100) // New tier every 100 levels

    const monster = tier > 0 ? generateScaledMonster(baseMonster, tier) : baseMonster

    if (!currentMonster || currentMonster.id !== monster.id) {
      setCurrentMonster(monster)
      setMonsterHp(monster.hp)
    }
  }, [player.level, currentMonster])

  // Calculate damage based on player stats
  const calculateDamage = useCallback(() => {
    const baseDamage = 1 + Math.floor(player.level / 5)
    const multipliers = useGameStore.getState().getTotalMultipliers()
    const equipment = useGameStore.getState().getEquipmentMultipliers()

    const attackBonus = equipment.attack || 1
    const damage = Math.floor(baseDamage * attackBonus * (1 + Math.random() * 0.3)) // +/- 30% variance

    return Math.max(1, damage)
  }, [player.level])

  // Handle manual click attack
  const handleAttack = () => {
    if (!currentMonster) return

    const damage = calculateDamage()
    const newHp = Math.max(0, monsterHp - damage)
    setMonsterHp(newHp)

    // Add floating damage text
    setFloatingDamage(prev => [...prev, { id: Date.now(), damage, x: Math.random() * 100 }])

    // Check if monster defeated
    if (newHp === 0) {
      handleMonsterDefeat()
    }
  }

  // Handle monster defeat
  const handleMonsterDefeat = () => {
    if (!currentMonster) return

    // Calculate rewards
    const goldReward = Math.floor(
      currentMonster.goldMin + Math.random() * (currentMonster.goldMax - currentMonster.goldMin)
    )
    const expReward = Math.floor(
      currentMonster.expMin + Math.random() * (currentMonster.expMax - currentMonster.expMin)
    )

    const multipliers = useGameStore.getState().getTotalMultipliers()
    addResource('gold', goldReward * multipliers.gold)
    addExp(expReward * multipliers.exp)

    // Track defeated monsters
    defeatMonster(currentMonster.id)

    // Respawn monster
    setMonsterHp(currentMonster.hp)
  }

  // Auto-attack system
  useEffect(() => {
    if (!autoAttackEnabled || !currentMonster) return

    // Attack speed: 1 attack per second base, faster with levels
    const attackSpeed = Math.max(200, 1000 - player.level * 2)

    const interval = setInterval(() => {
      handleAttack()
    }, attackSpeed)

    return () => clearInterval(interval)
  }, [autoAttackEnabled, currentMonster, player.level, monsterHp])

  // Clean up floating damage
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFloatingDamage(prev => prev.slice(-10)) // Keep last 10
    }, 1000)
    return () => clearTimeout(timeout)
  }, [floatingDamage])

  if (!currentMonster) {
    return (
      <div className="text-center py-8 text-gray-500">
        No monsters available at your level
      </div>
    )
  }

  const hpPercentage = (monsterHp / currentMonster.hp) * 100
  const resolutionClass = resolution === 'low' ? 'scale-75' : resolution === 'high' ? 'scale-125' : 'scale-100'

  return (
    <div className={`relative ${resolutionClass} transition-transform origin-top`}>
      {/* Combat Arena */}
      <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 rounded-lg p-6 relative overflow-hidden min-h-[400px]">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-900 to-transparent" />
        </div>

        {/* Monster */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-medieval font-bold text-white">
                {currentMonster.name}
              </h3>
              {currentMonster.tier && (
                <span className="px-2 py-1 text-xs rounded bg-purple-600 text-white">
                  Tier {currentMonster.tier + 1}
                </span>
              )}
            </div>

            {/* HP Bar */}
            <div className="w-64 h-6 bg-gray-900 rounded-full border-2 border-red-600 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                initial={{ width: '100%' }}
                animate={{ width: `${hpPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow-lg">
                {formatNumber(monsterHp, numberFormat, 0)} / {formatNumber(currentMonster.hp, numberFormat, 0)}
              </div>
            </div>
          </div>

          {/* Monster Display */}
          <Tooltip content={`Click to attack!\nGold: ${currentMonster.goldMin}-${currentMonster.goldMax}\nEXP: ${currentMonster.expMin}-${currentMonster.expMax}`}>
            <motion.button
              onClick={handleAttack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-8xl cursor-pointer hover:drop-shadow-2xl transition-all"
            >
              {currentMonster.icon}
            </motion.button>
          </Tooltip>

          {/* Floating Damage Numbers */}
          <AnimatePresence>
            {floatingDamage.map(dmg => (
              <motion.div
                key={dmg.id}
                initial={{ opacity: 1, y: 0, x: dmg.x - 50 }}
                animate={{ opacity: 0, y: -100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-1/2 text-2xl font-bold text-yellow-400 drop-shadow-lg pointer-events-none"
                style={{ left: `${dmg.x}%` }}
              >
                -{dmg.damage}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Combat Stats */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 text-white text-sm">
          <div className="bg-black bg-opacity-50 rounded px-3 py-2">
            <div className="text-xs opacity-75">Damage</div>
            <div className="font-bold">{calculateDamage()}</div>
          </div>
          <div className="bg-black bg-opacity-50 rounded px-3 py-2">
            <div className="text-xs opacity-75">Monsters Defeated</div>
            <div className="font-bold">{combat?.totalDefeated || 0}</div>
          </div>
        </div>

        {/* Auto-attack Toggle */}
        <div className="absolute top-4 right-4">
          <Tooltip content={autoAttackEnabled ? 'Auto-attack ON' : 'Auto-attack OFF'}>
            <button
              onClick={() => setAutoAttackEnabled(!autoAttackEnabled)}
              className={`px-4 py-2 rounded-lg font-medieval text-sm transition-all ${
                autoAttackEnabled
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {autoAttackEnabled ? '⚔️ Auto' : '⏸️ Manual'}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default CombatScene
