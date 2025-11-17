import { RESOURCES } from './constants'

// Special equipment that can only be obtained from timed quests
export const SPECIAL_EQUIPMENT = {
  // Daily rewards
  DAILY_SWORD: 'daily_sword',
  DAILY_SHIELD: 'daily_shield',
  DAILY_HELMET: 'daily_helmet',
  DAILY_ARMOR: 'daily_armor',
  DAILY_BOOTS: 'daily_boots',

  // Weekly rewards
  WEEKLY_LEGENDARY_SWORD: 'weekly_legendary_sword',
  WEEKLY_DRAGON_SCALE_ARMOR: 'weekly_dragon_scale_armor',
  WEEKLY_ETHEREAL_RING: 'weekly_ethereal_ring',
  WEEKLY_MYSTIC_AMULET: 'weekly_mystic_amulet',

  // Monthly rewards
  MONTHLY_ARTIFACT: 'monthly_artifact',
  MONTHLY_CROWN: 'monthly_crown',
  MONTHLY_WINGS: 'monthly_wings',
  MONTHLY_TRANSCENDENT_ORB: 'monthly_transcendent_orb',
}

export const EQUIPMENT_INFO = {
  // Daily Equipment
  [SPECIAL_EQUIPMENT.DAILY_SWORD]: {
    name: 'Steel Sword',
    description: 'Increases attack power',
    icon: '⚔️',
    bonus: { attackMultiplier: 1.05 },
    tier: 'daily',
  },
  [SPECIAL_EQUIPMENT.DAILY_SHIELD]: {
    name: 'Iron Shield',
    description: 'Increases defense',
    icon: '🛡️',
    bonus: { defenseMultiplier: 1.05 },
    tier: 'daily',
  },
  [SPECIAL_EQUIPMENT.DAILY_HELMET]: {
    name: 'Knight Helmet',
    description: 'Increases EXP gain',
    icon: '⛑️',
    bonus: { expMultiplier: 1.03 },
    tier: 'daily',
  },
  [SPECIAL_EQUIPMENT.DAILY_ARMOR]: {
    name: 'Plate Armor',
    description: 'Increases production',
    icon: '🦺',
    bonus: { productionMultiplier: 1.03 },
    tier: 'daily',
  },
  [SPECIAL_EQUIPMENT.DAILY_BOOTS]: {
    name: 'Swift Boots',
    description: 'Increases quest speed',
    icon: '👢',
    bonus: { questSpeedMultiplier: 1.05 },
    tier: 'daily',
  },

  // Weekly Equipment
  [SPECIAL_EQUIPMENT.WEEKLY_LEGENDARY_SWORD]: {
    name: 'Excalibur',
    description: 'Legendary blade of kings',
    icon: '🗡️',
    bonus: { attackMultiplier: 1.15, goldMultiplier: 1.1 },
    tier: 'weekly',
  },
  [SPECIAL_EQUIPMENT.WEEKLY_DRAGON_SCALE_ARMOR]: {
    name: 'Dragonscale Plate',
    description: 'Armor forged from ancient dragons',
    icon: '🐉',
    bonus: { defenseMultiplier: 1.15, productionMultiplier: 1.1 },
    tier: 'weekly',
  },
  [SPECIAL_EQUIPMENT.WEEKLY_ETHEREAL_RING]: {
    name: 'Ring of Eternity',
    description: 'Channels ethereal energies',
    icon: '💍',
    bonus: { expMultiplier: 1.2 },
    tier: 'weekly',
  },
  [SPECIAL_EQUIPMENT.WEEKLY_MYSTIC_AMULET]: {
    name: 'Amulet of Power',
    description: 'Amplifies all abilities',
    icon: '📿',
    bonus: { allMultiplier: 1.08 },
    tier: 'weekly',
  },

  // Monthly Equipment
  [SPECIAL_EQUIPMENT.MONTHLY_ARTIFACT]: {
    name: 'Ancient Artifact',
    description: 'Relic of immense power',
    icon: '🏺',
    bonus: { allMultiplier: 1.25 },
    tier: 'monthly',
  },
  [SPECIAL_EQUIPMENT.MONTHLY_CROWN]: {
    name: 'Crown of Kings',
    description: 'Rules over all resources',
    icon: '👑',
    bonus: { goldMultiplier: 1.5, productionMultiplier: 1.3 },
    tier: 'monthly',
  },
  [SPECIAL_EQUIPMENT.MONTHLY_WINGS]: {
    name: 'Celestial Wings',
    description: 'Grants divine speed',
    icon: '🪽',
    bonus: { questSpeedMultiplier: 1.5, expMultiplier: 1.3 },
    tier: 'monthly',
  },
  [SPECIAL_EQUIPMENT.MONTHLY_TRANSCENDENT_ORB]: {
    name: 'Orb of Transcendence',
    description: 'Ultimate power incarnate',
    icon: '🔮',
    bonus: { allMultiplier: 1.5 },
    tier: 'monthly',
  },
}

// Timed quest configuration
export const TIMED_QUEST_SCHEDULE = {
  // Daily quest - appears at 8PM-9PM server time
  daily: {
    startHour: 20, // 8 PM
    endHour: 21,   // 9 PM
    duration: 3600, // 1 hour in seconds
  },
  // Weekly quest - appears on Saturdays 8PM-9PM
  weekly: {
    dayOfWeek: 6, // Saturday (0 = Sunday)
    startHour: 20,
    endHour: 21,
    duration: 3600,
  },
  // Monthly quest - appears on last day of month 8PM-9PM
  monthly: {
    lastDayOfMonth: true,
    startHour: 20,
    endHour: 21,
    duration: 3600,
  },
}

// Generate special quests
export const generateDailyQuest = (date) => {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
  const equipmentKeys = Object.keys(SPECIAL_EQUIPMENT).filter(key => EQUIPMENT_INFO[key].tier === 'daily')
  const equipmentKey = equipmentKeys[dayOfYear % equipmentKeys.length]

  return {
    id: `daily_quest_${date.toISOString().split('T')[0]}`,
    name: 'Daily Challenge',
    description: 'Complete the daily challenge for exclusive equipment',
    icon: '⭐',
    type: 'daily',
    requirements: {
      [RESOURCES.GOLD]: 50000,
      monstersDefeated: 100,
    },
    rewards: {
      equipment: equipmentKey,
      [RESOURCES.GOLD]: 100000,
      exp: 5000,
    },
    availableUntil: new Date(date.getFullYear(), date.getMonth(), date.getDate(), TIMED_QUEST_SCHEDULE.daily.endHour, 0, 0),
  }
}

export const generateWeeklyQuest = (date) => {
  const weekOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24 / 7)
  const equipmentKeys = Object.keys(SPECIAL_EQUIPMENT).filter(key => EQUIPMENT_INFO[key].tier === 'weekly')
  const equipmentKey = equipmentKeys[weekOfYear % equipmentKeys.length]

  return {
    id: `weekly_quest_${date.toISOString().split('T')[0]}`,
    name: 'Weekly Legendary Trial',
    description: 'Prove your worth in the legendary trial',
    icon: '🏆',
    type: 'weekly',
    requirements: {
      [RESOURCES.GOLD]: 500000,
      [RESOURCES.MITHRIL]: 100,
      monstersDefeated: 500,
    },
    rewards: {
      equipment: equipmentKey,
      [RESOURCES.GOLD]: 1000000,
      [RESOURCES.DRAGONSCALE]: 50,
      exp: 25000,
    },
    availableUntil: new Date(date.getFullYear(), date.getMonth(), date.getDate(), TIMED_QUEST_SCHEDULE.weekly.endHour, 0, 0),
  }
}

export const generateMonthlyQuest = (date) => {
  const monthOfYear = date.getMonth()
  const equipmentKeys = Object.keys(SPECIAL_EQUIPMENT).filter(key => EQUIPMENT_INFO[key].tier === 'monthly')
  const equipmentKey = equipmentKeys[monthOfYear % equipmentKeys.length]

  return {
    id: `monthly_quest_${date.toISOString().split('T')[0]}`,
    name: 'Monthly Epic Saga',
    description: 'Complete the ultimate monthly challenge',
    icon: '💫',
    type: 'monthly',
    requirements: {
      [RESOURCES.GOLD]: 10000000,
      [RESOURCES.ARCANE_ESSENCE]: 1000,
      [RESOURCES.DRAGONSCALE]: 500,
      monstersDefeated: 5000,
    },
    rewards: {
      equipment: equipmentKey,
      [RESOURCES.GOLD]: 50000000,
      [RESOURCES.ETHEREAL_SHARD]: 500,
      exp: 100000,
    },
    availableUntil: new Date(date.getFullYear(), date.getMonth(), date.getDate(), TIMED_QUEST_SCHEDULE.monthly.endHour, 0, 0),
  }
}

// Check if a timed quest is currently available
export const isTimedQuestAvailable = (type, now = new Date()) => {
  const schedule = TIMED_QUEST_SCHEDULE[type]
  const currentHour = now.getHours()

  if (type === 'daily') {
    return currentHour >= schedule.startHour && currentHour < schedule.endHour
  }

  if (type === 'weekly') {
    const currentDay = now.getDay()
    return currentDay === schedule.dayOfWeek && currentHour >= schedule.startHour && currentHour < schedule.endHour
  }

  if (type === 'monthly') {
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    const currentDate = now.getDate()
    return currentDate === lastDay && currentHour >= schedule.startHour && currentHour < schedule.endHour
  }

  return false
}
