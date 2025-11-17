import { RESOURCES } from './constants'

export const questsData = [
  {
    id: 'quest_1',
    name: 'The Beginner\'s Trial',
    description: 'Gather your first resources and prove your worth',
    icon: '📜',
    requirements: {
      [RESOURCES.GOLD]: 100,
    },
    rewards: {
      [RESOURCES.GOLD]: 200,
      exp: 50,
    },
    unlocked: true,
    category: 'tutorial',
  },
  {
    id: 'quest_2',
    name: 'Timber for the Keep',
    description: 'The castle needs wood for repairs',
    icon: '🪓',
    requirements: {
      [RESOURCES.WOOD]: 100,
    },
    rewards: {
      [RESOURCES.GOLD]: 500,
      [RESOURCES.STONE]: 50,
      exp: 100,
    },
    unlocked: true,
    category: 'gathering',
  },
  {
    id: 'quest_3',
    name: 'Stones of Foundation',
    description: 'Collect stone to fortify the kingdom',
    icon: '🏗️',
    requirements: {
      [RESOURCES.STONE]: 200,
    },
    rewards: {
      [RESOURCES.GOLD]: 1000,
      [RESOURCES.IRON]: 25,
      exp: 150,
    },
    unlocked: true,
    category: 'gathering',
  },
  {
    id: 'quest_4',
    name: 'Iron Will',
    description: 'Mine iron to forge weapons for the realm',
    icon: '⚔️',
    requirements: {
      [RESOURCES.IRON]: 100,
    },
    rewards: {
      [RESOURCES.GOLD]: 2500,
      [RESOURCES.MITHRIL]: 10,
      exp: 300,
    },
    unlocked: false,
    unlockRequirement: { level: 10 },
    category: 'gathering',
  },
  {
    id: 'quest_5',
    name: 'The Dragon\'s Bargain',
    description: 'Negotiate with dragons for their scales',
    icon: '🐉',
    requirements: {
      [RESOURCES.GOLD]: 50000,
      [RESOURCES.MITHRIL]: 500,
    },
    rewards: {
      [RESOURCES.DRAGONSCALE]: 50,
      exp: 5000,
    },
    unlocked: false,
    unlockRequirement: { level: 50 },
    category: 'legendary',
  },
  {
    id: 'quest_6',
    name: 'Slay the Goblin Horde',
    description: 'Defend the village from goblin raiders',
    icon: '⚔️',
    requirements: {
      completionTime: 300, // 5 minutes
    },
    rewards: {
      [RESOURCES.GOLD]: 1000,
      [RESOURCES.IRON]: 50,
      exp: 250,
    },
    unlocked: true,
    category: 'combat',
    isTimeQuest: true,
  },
  {
    id: 'quest_7',
    name: 'The Wizard\'s Apprentice',
    description: 'Study under the grand wizard to unlock arcane secrets',
    icon: '🧙',
    requirements: {
      [RESOURCES.ARCANE_ESSENCE]: 100,
    },
    rewards: {
      [RESOURCES.GOLD]: 10000,
      [RESOURCES.ARCANE_ESSENCE]: 150,
      exp: 1000,
    },
    unlocked: false,
    unlockRequirement: { level: 25 },
    category: 'magic',
  },
  {
    id: 'quest_8',
    name: 'Forge of the Ancients',
    description: 'Discover the lost forge and craft legendary mithril',
    icon: '🔨',
    requirements: {
      [RESOURCES.IRON]: 1000,
      [RESOURCES.STONE]: 500,
    },
    rewards: {
      [RESOURCES.MITHRIL]: 200,
      exp: 2000,
    },
    unlocked: false,
    unlockRequirement: { level: 15 },
    category: 'crafting',
  },
  {
    id: 'quest_9',
    name: 'The Undead Uprising',
    description: 'Quell the undead forces rising from ancient tombs',
    icon: '💀',
    requirements: {
      completionTime: 600, // 10 minutes
    },
    rewards: {
      [RESOURCES.GOLD]: 5000,
      [RESOURCES.ARCANE_ESSENCE]: 50,
      exp: 800,
    },
    unlocked: false,
    unlockRequirement: { level: 20 },
    category: 'combat',
    isTimeQuest: true,
  },
  {
    id: 'quest_10',
    name: 'Breach the Ethereal Veil',
    description: 'Open a portal to the ethereal plane',
    icon: '🌟',
    requirements: {
      [RESOURCES.ARCANE_ESSENCE]: 1000,
      [RESOURCES.DRAGONSCALE]: 100,
    },
    rewards: {
      [RESOURCES.ETHEREAL_SHARD]: 100,
      exp: 10000,
    },
    unlocked: false,
    unlockRequirement: { level: 75 },
    category: 'legendary',
  },
  {
    id: 'quest_11',
    name: 'The King\'s Request',
    description: 'Gather resources for King Arthur\'s grand feast',
    icon: '👑',
    requirements: {
      [RESOURCES.GOLD]: 10000,
      [RESOURCES.WOOD]: 500,
      [RESOURCES.STONE]: 500,
    },
    rewards: {
      [RESOURCES.GOLD]: 25000,
      exp: 1500,
    },
    unlocked: false,
    unlockRequirement: { level: 30 },
    category: 'royal',
  },
  {
    id: 'quest_12',
    name: 'Dwarf Trading Alliance',
    description: 'Establish trade routes with the dwarven kingdoms',
    icon: '⛰️',
    requirements: {
      [RESOURCES.IRON]: 2000,
      [RESOURCES.MITHRIL]: 100,
    },
    rewards: {
      [RESOURCES.GOLD]: 50000,
      [RESOURCES.IRON]: 3000,
      exp: 3000,
    },
    unlocked: false,
    unlockRequirement: { level: 35 },
    category: 'trading',
  },
  {
    id: 'quest_13',
    name: 'Elven Wisdom',
    description: 'Learn ancient elven magic and lore',
    icon: '🌿',
    requirements: {
      [RESOURCES.ARCANE_ESSENCE]: 500,
    },
    rewards: {
      [RESOURCES.ARCANE_ESSENCE]: 1000,
      exp: 5000,
    },
    unlocked: false,
    unlockRequirement: { level: 40 },
    category: 'magic',
  },
  {
    id: 'quest_14',
    name: 'The Beastfolk Hunt',
    description: 'Join the beastfolk in their sacred hunt',
    icon: '🏹',
    requirements: {
      completionTime: 900, // 15 minutes
    },
    rewards: {
      [RESOURCES.GOLD]: 20000,
      [RESOURCES.DRAGONSCALE]: 25,
      exp: 4000,
    },
    unlocked: false,
    unlockRequirement: { level: 45 },
    category: 'combat',
    isTimeQuest: true,
  },
  {
    id: 'quest_15',
    name: 'Transcendent Awakening',
    description: 'Unlock the secrets of transcendence',
    icon: '✨',
    requirements: {
      [RESOURCES.ETHEREAL_SHARD]: 1000,
      [RESOURCES.ARCANE_ESSENCE]: 5000,
      [RESOURCES.DRAGONSCALE]: 500,
    },
    rewards: {
      [RESOURCES.GOLD]: 1000000,
      exp: 50000,
    },
    unlocked: false,
    unlockRequirement: { level: 90 },
    category: 'legendary',
  },
]
