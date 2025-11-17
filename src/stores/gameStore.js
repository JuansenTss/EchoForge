import { create } from 'zustand'
import localforage from 'localforage'
import { SAVE_KEY, RESOURCES, TICK_RATE, RACES, FIRST_NAMES, TITLES } from '../data/constants'
import { buildingsData } from '../data/buildings'
import { questsData } from '../data/quests'
import { achievementsData } from '../data/achievements'

// Helper function to calculate cost with multiplier
const calculateCost = (baseCost, currentCount, multiplier) => {
  const costs = {}
  Object.entries(baseCost).forEach(([resource, amount]) => {
    costs[resource] = Math.floor(amount * Math.pow(multiplier, currentCount))
  })
  return costs
}

// Helper function to calculate level from exp
const calculateLevel = (exp) => {
  return Math.floor(Math.sqrt(exp / 100)) + 1
}

// Helper function to calculate exp needed for next level
const calculateExpForNextLevel = (level) => {
  return (level * level) * 100
}

const useGameStore = create((set, get) => ({
  // Player data
  player: {
    name: '',
    race: RACES.HUMAN,
    level: 1,
    exp: 0,
    expToNextLevel: 100,
  },

  // Resources
  resources: {
    [RESOURCES.GOLD]: 50,
    [RESOURCES.WOOD]: 0,
    [RESOURCES.STONE]: 0,
    [RESOURCES.IRON]: 0,
    [RESOURCES.MITHRIL]: 0,
    [RESOURCES.ARCANE_ESSENCE]: 0,
    [RESOURCES.DRAGONSCALE]: 0,
    [RESOURCES.ETHEREAL_SHARD]: 0,
  },

  // Lifetime stats (don't reset on ascension)
  lifetimeStats: {
    totalGoldEarned: 50,
    totalQuestsCompleted: 0,
    totalBuildingsBuilt: 0,
    totalAscensions: 0,
    totalTranscendences: 0,
    playTime: 0,
  },

  // Buildings
  buildings: {},

  // Quests
  quests: {
    active: [],
    completed: [],
  },

  // Achievements
  achievements: {
    unlocked: [],
    claimed: [],
  },

  // Challenges
  challenges: {
    active: null,
    completed: [],
  },

  // Combat
  combat: {
    totalDefeated: 0,
    monstersDefeated: {}, // { monsterId: count }
    currentMonster: null,
  },

  // Equipment
  equipment: {
    owned: [], // Array of equipment IDs
    equipped: {}, // { slot: equipmentId }
  },

  // Special Quests
  specialQuests: {
    daily: null,
    weekly: null,
    monthly: null,
    completed: [], // IDs of completed special quests
  },

  // Ascension data
  ascension: {
    count: 0,
    power: 0, // Multiplier from ascensions
  },

  // Transcendence data
  transcendence: {
    count: 0,
    power: 0, // Multiplier from transcendences
  },

  // Game state
  gameState: {
    lastTick: Date.now(),
    totalGameTime: 0,
    currentRunTime: 0,
    isInitialized: false,
  },

  // Production rates (calculated)
  productionRates: {},

  // Initialize game
  initializeGame: async () => {
    try {
      const savedGame = await localforage.getItem(SAVE_KEY)
      if (savedGame && savedGame.player && savedGame.player.name) {
        // Valid save with character exists
        set(savedGame)
        // Calculate offline progress
        const offlineTime = Date.now() - savedGame.gameState.lastTick
        get().processOfflineProgress(offlineTime)
      } else {
        // No save or no character created - keep isInitialized as false
        // This will show character creation screen
        set({ gameState: { ...get().gameState, isInitialized: false } })
      }
    } catch (error) {
      console.error('Failed to load save:', error)
      // On error, reset to character creation
      set({ gameState: { ...get().gameState, isInitialized: false } })
    }

    // Start game loop
    get().startGameLoop()
  },

  // Save game
  saveGame: async () => {
    try {
      const state = get()
      await localforage.setItem(SAVE_KEY, {
        player: state.player,
        resources: state.resources,
        lifetimeStats: state.lifetimeStats,
        buildings: state.buildings,
        quests: state.quests,
        achievements: state.achievements,
        challenges: state.challenges,
        ascension: state.ascension,
        transcendence: state.transcendence,
        gameState: { ...state.gameState, lastTick: Date.now() },
      })
    } catch (error) {
      console.error('Failed to save game:', error)
    }
  },

  // Reset save
  resetSave: async () => {
    try {
      console.log('Starting reset...')

      // Clear all storage
      await localforage.clear()
      console.log('IndexedDB cleared')

      localStorage.clear()
      console.log('localStorage cleared')

      sessionStorage.clear()
      console.log('sessionStorage cleared')

      // Force immediate reload
      console.log('Reloading page...')
      window.location.href = window.location.origin
    } catch (error) {
      console.error('Reset failed:', error)
      // Try to reload anyway
      window.location.href = window.location.origin
    }
  },

  // Create character
  createCharacter: (name, race) => {
    set({
      player: {
        name,
        race,
        level: 1,
        exp: 0,
        expToNextLevel: 100,
      },
      gameState: { ...get().gameState, isInitialized: true },
    })
    get().saveGame()
  },

  // Generate random name
  generateRandomName: (race) => {
    const firstNames = FIRST_NAMES[race] || FIRST_NAMES.human
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const title = TITLES[Math.floor(Math.random() * TITLES.length)]
    return `${firstName} ${title}`
  },

  // Game loop
  startGameLoop: () => {
    setInterval(() => {
      const state = get()
      const now = Date.now()
      const deltaTime = (now - state.gameState.lastTick) / 1000 // Convert to seconds

      // Update production
      state.updateProduction(deltaTime)

      // Update game time
      set({
        gameState: {
          ...state.gameState,
          lastTick: now,
          totalGameTime: state.gameState.totalGameTime + deltaTime,
          currentRunTime: state.gameState.currentRunTime + deltaTime,
        },
        lifetimeStats: {
          ...state.lifetimeStats,
          playTime: state.lifetimeStats.playTime + deltaTime,
        },
      })

      // Check achievements
      state.checkAchievements()

      // Update special quests (check every tick)
      state.updateSpecialQuests()
    }, TICK_RATE)
  },

  // Update production
  updateProduction: (deltaTime) => {
    const state = get()
    const newResources = { ...state.resources }
    const productionRates = {}

    // Calculate production from buildings
    Object.entries(state.buildings).forEach(([buildingId, count]) => {
      if (count > 0) {
        const building = buildingsData[buildingId]
        if (building && building.produces) {
          const baseProduction = building.baseProduction * count
          const multipliers = state.getTotalMultipliers()
          const production = baseProduction * multipliers.production * deltaTime

          productionRates[building.produces] = (productionRates[building.produces] || 0) + (baseProduction * multipliers.production)
          newResources[building.produces] = (newResources[building.produces] || 0) + production
        }
      }
    })

    set({ resources: newResources, productionRates })
  },

  // Process offline progress
  processOfflineProgress: (offlineTime) => {
    const offlineSeconds = Math.min(offlineTime / 1000, 7200) // Cap at 2 hours
    get().updateProduction(offlineSeconds)
  },

  // Get equipment multipliers
  getEquipmentMultipliers: () => {
    const state = get()
    let goldMult = 1
    let expMult = 1
    let productionMult = 1
    let questSpeedMult = 1
    let attackMult = 1
    let defenseMult = 1
    let allMult = 1

    // Apply bonuses from owned equipment
    state.equipment.owned.forEach(equipId => {
      const { EQUIPMENT_INFO } = require('../data/specialQuests')
      const equip = EQUIPMENT_INFO[equipId]
      if (equip?.bonus) {
        if (equip.bonus.goldMultiplier) goldMult *= equip.bonus.goldMultiplier
        if (equip.bonus.expMultiplier) expMult *= equip.bonus.expMultiplier
        if (equip.bonus.productionMultiplier) productionMult *= equip.bonus.productionMultiplier
        if (equip.bonus.questSpeedMultiplier) questSpeedMult *= equip.bonus.questSpeedMultiplier
        if (equip.bonus.attackMultiplier) attackMult *= equip.bonus.attackMultiplier
        if (equip.bonus.defenseMultiplier) defenseMult *= equip.bonus.defenseMultiplier
        if (equip.bonus.allMultiplier) allMult *= equip.bonus.allMultiplier
      }
    })

    return {
      gold: goldMult * allMult,
      exp: expMult * allMult,
      production: productionMult * allMult,
      questSpeed: questSpeedMult * allMult,
      attack: attackMult * allMult,
      defense: defenseMult * allMult,
    }
  },

  // Get total multipliers
  getTotalMultipliers: () => {
    const state = get()
    let goldMult = 1
    let expMult = 1
    let productionMult = 1
    let questSpeedMult = 1
    let allMult = 1

    // Ascension multipliers
    goldMult *= (1 + state.ascension.power * 0.1)
    expMult *= (1 + state.ascension.power * 0.05)
    productionMult *= (1 + state.ascension.power * 0.08)

    // Transcendence multipliers
    const transcendenceMult = 1 + state.transcendence.power
    goldMult *= transcendenceMult
    expMult *= transcendenceMult
    productionMult *= transcendenceMult
    questSpeedMult *= transcendenceMult

    // Achievement multipliers
    state.achievements.claimed.forEach(achId => {
      const achievement = achievementsData.find(a => a.id === achId)
      if (achievement?.reward) {
        if (achievement.reward.goldMultiplier) goldMult *= achievement.reward.goldMultiplier
        if (achievement.reward.expMultiplier) expMult *= achievement.reward.expMultiplier
        if (achievement.reward.productionMultiplier) productionMult *= achievement.reward.productionMultiplier
        if (achievement.reward.questSpeedMultiplier) questSpeedMult *= achievement.reward.questSpeedMultiplier
        if (achievement.reward.allMultiplier) allMult *= achievement.reward.allMultiplier
      }
    })

    // Equipment multipliers
    const equipMult = state.getEquipmentMultipliers()
    goldMult *= equipMult.gold
    expMult *= equipMult.exp
    productionMult *= equipMult.production
    questSpeedMult *= equipMult.questSpeed

    // Apply all multiplier to everything
    goldMult *= allMult
    expMult *= allMult
    productionMult *= allMult
    questSpeedMult *= allMult

    return {
      gold: goldMult,
      exp: expMult,
      production: productionMult,
      questSpeed: questSpeedMult,
    }
  },

  // Add resource
  addResource: (resource, amount) => {
    set(state => ({
      resources: {
        ...state.resources,
        [resource]: state.resources[resource] + amount,
      },
    }))
  },

  // Spend resource
  spendResource: (resource, amount) => {
    const state = get()
    if (state.resources[resource] >= amount) {
      set({
        resources: {
          ...state.resources,
          [resource]: state.resources[resource] - amount,
        },
      })
      return true
    }
    return false
  },

  // Check if can afford
  canAfford: (costs) => {
    const state = get()
    return Object.entries(costs).every(([resource, amount]) => {
      return state.resources[resource] >= amount
    })
  },

  // Spend resources
  spendResources: (costs) => {
    const state = get()
    if (!state.canAfford(costs)) return false

    const newResources = { ...state.resources }
    Object.entries(costs).forEach(([resource, amount]) => {
      newResources[resource] -= amount
    })
    set({ resources: newResources })
    return true
  },

  // Build building
  buildBuilding: (buildingId) => {
    const state = get()
    const building = buildingsData[buildingId]
    const currentCount = state.buildings[buildingId] || 0
    const cost = calculateCost(building.baseCost, currentCount, building.costMultiplier)

    if (state.spendResources(cost)) {
      set({
        buildings: {
          ...state.buildings,
          [buildingId]: currentCount + 1,
        },
        lifetimeStats: {
          ...state.lifetimeStats,
          totalBuildingsBuilt: state.lifetimeStats.totalBuildingsBuilt + 1,
        },
      })
      return true
    }
    return false
  },

  // Get building cost
  getBuildingCost: (buildingId) => {
    const state = get()
    const building = buildingsData[buildingId]
    const currentCount = state.buildings[buildingId] || 0
    return calculateCost(building.baseCost, currentCount, building.costMultiplier)
  },

  // Complete quest
  completeQuest: (questId) => {
    const state = get()
    const quest = questsData.find(q => q.id === questId)
    if (!quest) return false

    // Check requirements
    if (quest.requirements) {
      const canComplete = Object.entries(quest.requirements).every(([resource, amount]) => {
        return state.resources[resource] >= amount
      })
      if (!canComplete) return false

      // Spend resources
      const costs = {}
      Object.entries(quest.requirements).forEach(([resource, amount]) => {
        if (resource !== 'completionTime') {
          costs[resource] = amount
        }
      })
      if (!state.spendResources(costs)) return false
    }

    // Give rewards
    const multipliers = state.getTotalMultipliers()
    if (quest.rewards) {
      Object.entries(quest.rewards).forEach(([key, value]) => {
        if (key === 'exp') {
          state.addExp(value * multipliers.exp)
        } else {
          state.addResource(key, value * (key === RESOURCES.GOLD ? multipliers.gold : 1))
        }
      })
    }

    // Mark as completed
    set({
      quests: {
        ...state.quests,
        completed: [...state.quests.completed, questId],
      },
      lifetimeStats: {
        ...state.lifetimeStats,
        totalQuestsCompleted: state.lifetimeStats.totalQuestsCompleted + 1,
      },
    })

    return true
  },

  // Add experience
  addExp: (amount) => {
    const state = get()
    const newExp = state.player.exp + amount
    const newLevel = calculateLevel(newExp)
    const leveledUp = newLevel > state.player.level

    set({
      player: {
        ...state.player,
        exp: newExp,
        level: newLevel,
        expToNextLevel: calculateExpForNextLevel(newLevel),
      },
    })

    return leveledUp
  },

  // Check achievements
  checkAchievements: () => {
    const state = get()
    achievementsData.forEach(achievement => {
      if (state.achievements.unlocked.includes(achievement.id)) return

      let unlocked = false

      switch (achievement.requirement.type) {
        case 'resource':
          unlocked = state.resources[achievement.requirement.resource] >= achievement.requirement.amount
          break
        case 'building':
          const totalBuildings = Object.values(state.buildings).reduce((sum, count) => sum + count, 0)
          unlocked = totalBuildings >= achievement.requirement.count
          break
        case 'quest':
          unlocked = state.quests.completed.length >= achievement.requirement.count
          break
        case 'level':
          unlocked = state.player.level >= achievement.requirement.level
          break
        case 'ascension':
          unlocked = state.ascension.count >= achievement.requirement.count
          break
        case 'transcendence':
          unlocked = state.transcendence.count >= achievement.requirement.count
          break
        case 'challenge':
          if (achievement.requirement.count === 'all') {
            // Check if all challenges are completed
            unlocked = state.challenges.completed.length >= 10 // Assuming 10 challenges
          } else {
            unlocked = state.challenges.completed.length >= achievement.requirement.count
          }
          break
      }

      if (unlocked) {
        set({
          achievements: {
            ...state.achievements,
            unlocked: [...state.achievements.unlocked, achievement.id],
          },
        })
      }
    })
  },

  // Claim achievement reward
  claimAchievement: (achievementId) => {
    const state = get()
    if (state.achievements.claimed.includes(achievementId)) return false
    if (!state.achievements.unlocked.includes(achievementId)) return false

    const achievement = achievementsData.find(a => a.id === achievementId)
    if (!achievement) return false

    // Give rewards
    if (achievement.reward) {
      Object.entries(achievement.reward).forEach(([key, value]) => {
        if (Object.values(RESOURCES).includes(key)) {
          state.addResource(key, value)
        }
      })
    }

    set({
      achievements: {
        ...state.achievements,
        claimed: [...state.achievements.claimed, achievementId],
      },
    })

    return true
  },

  // Perform ascension
  performAscension: () => {
    const state = get()
    if (state.player.level < 100 || state.resources[RESOURCES.GOLD] < 1000000) {
      return false
    }

    const ascensionPower = Math.floor(state.player.level / 10) + state.buildings[Object.keys(state.buildings)[0]] || 1

    // Reset game state
    set({
      player: {
        ...state.player,
        level: 1,
        exp: 0,
        expToNextLevel: 100,
      },
      resources: {
        [RESOURCES.GOLD]: 50,
        [RESOURCES.WOOD]: 0,
        [RESOURCES.STONE]: 0,
        [RESOURCES.IRON]: 0,
        [RESOURCES.MITHRIL]: 0,
        [RESOURCES.ARCANE_ESSENCE]: 0,
        [RESOURCES.DRAGONSCALE]: 0,
        [RESOURCES.ETHEREAL_SHARD]: 0,
      },
      buildings: {},
      quests: {
        active: [],
        completed: [],
      },
      ascension: {
        count: state.ascension.count + 1,
        power: state.ascension.power + ascensionPower,
      },
      lifetimeStats: {
        ...state.lifetimeStats,
        totalAscensions: state.lifetimeStats.totalAscensions + 1,
      },
      gameState: {
        ...state.gameState,
        currentRunTime: 0,
      },
    })

    return true
  },

  // Perform transcendence
  performTranscendence: () => {
    const state = get()
    if (state.ascension.count < 10 || state.resources[RESOURCES.GOLD] < 1000000000) {
      return false
    }

    const transcendencePower = state.ascension.count * 0.1

    // Reset everything including ascension
    set({
      player: {
        ...state.player,
        level: 1,
        exp: 0,
        expToNextLevel: 100,
      },
      resources: {
        [RESOURCES.GOLD]: 50,
        [RESOURCES.WOOD]: 0,
        [RESOURCES.STONE]: 0,
        [RESOURCES.IRON]: 0,
        [RESOURCES.MITHRIL]: 0,
        [RESOURCES.ARCANE_ESSENCE]: 0,
        [RESOURCES.DRAGONSCALE]: 0,
        [RESOURCES.ETHEREAL_SHARD]: 0,
      },
      buildings: {},
      quests: {
        active: [],
        completed: [],
      },
      ascension: {
        count: 0,
        power: 0,
      },
      transcendence: {
        count: state.transcendence.count + 1,
        power: state.transcendence.power + transcendencePower,
      },
      lifetimeStats: {
        ...state.lifetimeStats,
        totalTranscendences: state.lifetimeStats.totalTranscendences + 1,
      },
      gameState: {
        ...state.gameState,
        currentRunTime: 0,
      },
    })

    return true
  },

  // Defeat monster
  defeatMonster: (monsterId) => {
    set(state => ({
      combat: {
        ...state.combat,
        totalDefeated: state.combat.totalDefeated + 1,
        monstersDefeated: {
          ...state.combat.monstersDefeated,
          [monsterId]: (state.combat.monstersDefeated[monsterId] || 0) + 1,
        },
      },
    }))
  },

  // Add equipment
  addEquipment: (equipmentId) => {
    const state = get()
    if (state.equipment.owned.includes(equipmentId)) return false

    set({
      equipment: {
        ...state.equipment,
        owned: [...state.equipment.owned, equipmentId],
      },
    })
    return true
  },

  // Complete special quest
  completeSpecialQuest: (questId, questType) => {
    const state = get()
    const quest = state.specialQuests[questType]
    if (!quest || quest.id !== questId) return false

    // Check requirements
    if (quest.requirements) {
      const canComplete = Object.entries(quest.requirements).every(([key, value]) => {
        if (key === 'monstersDefeated') {
          return state.combat.totalDefeated >= value
        }
        return state.resources[key] >= value
      })

      if (!canComplete) return false

      // Spend resources
      Object.entries(quest.requirements).forEach(([key, value]) => {
        if (key !== 'monstersDefeated') {
          state.spendResource(key, value)
        }
      })
    }

    // Give rewards
    if (quest.rewards) {
      Object.entries(quest.rewards).forEach(([key, value]) => {
        if (key === 'exp') {
          state.addExp(value)
        } else if (key === 'equipment') {
          state.addEquipment(value)
        } else {
          state.addResource(key, value)
        }
      })
    }

    // Mark as completed
    set({
      specialQuests: {
        ...state.specialQuests,
        [questType]: null,
        completed: [...state.specialQuests.completed, questId],
      },
    })

    return true
  },

  // Update special quests based on time
  updateSpecialQuests: () => {
    const { generateDailyQuest, generateWeeklyQuest, generateMonthlyQuest, isTimedQuestAvailable } = require('../data/specialQuests')
    const now = new Date()
    const state = get()

    // Check daily quest
    if (isTimedQuestAvailable('daily', now)) {
      const dailyQuest = generateDailyQuest(now)
      if (!state.specialQuests.completed.includes(dailyQuest.id) && state.specialQuests.daily?.id !== dailyQuest.id) {
        set(state => ({
          specialQuests: {
            ...state.specialQuests,
            daily: dailyQuest,
          },
        }))
      }
    } else if (state.specialQuests.daily) {
      // Remove expired daily quest
      set(state => ({
        specialQuests: {
          ...state.specialQuests,
          daily: null,
        },
      }))
    }

    // Check weekly quest
    if (isTimedQuestAvailable('weekly', now)) {
      const weeklyQuest = generateWeeklyQuest(now)
      if (!state.specialQuests.completed.includes(weeklyQuest.id) && state.specialQuests.weekly?.id !== weeklyQuest.id) {
        set(state => ({
          specialQuests: {
            ...state.specialQuests,
            weekly: weeklyQuest,
          },
        }))
      }
    } else if (state.specialQuests.weekly) {
      set(state => ({
        specialQuests: {
          ...state.specialQuests,
          weekly: null,
        },
      }))
    }

    // Check monthly quest
    if (isTimedQuestAvailable('monthly', now)) {
      const monthlyQuest = generateMonthlyQuest(now)
      if (!state.specialQuests.completed.includes(monthlyQuest.id) && state.specialQuests.monthly?.id !== monthlyQuest.id) {
        set(state => ({
          specialQuests: {
            ...state.specialQuests,
            monthly: monthlyQuest,
          },
        }))
      }
    } else if (state.specialQuests.monthly) {
      set(state => ({
        specialQuests: {
          ...state.specialQuests,
          monthly: null,
        },
      }))
    }
  },

  // Complete all available quests
  completeAllQuests: () => {
    const state = get()
    const completedCount = questsData.filter(quest => {
      if (state.quests.completed.includes(quest.id)) return false
      if (!quest.unlocked && quest.unlockRequirement) {
        if (state.player.level < quest.unlockRequirement.level) return false
      }

      // Try to complete
      return state.completeQuest(quest.id)
    }).length

    return completedCount
  },
}))

export default useGameStore
