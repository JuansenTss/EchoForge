// Challenge system - defeat monsters to unlock progression
// Based on fantasy creature evolution hierarchies

export const CREATURE_CHAINS = {
  slimes: {
    id: 'slimes',
    name: 'Slime Evolution',
    description: 'The weakest creatures, perfect for beginners',
    icon: '🟢',
    color: 'green',
    tiers: [
      {
        id: 'slime',
        name: 'Slime',
        icon: '🟢',
        requiredDefeats: 100,
        reward: { gold: 500, exp: 100 }
      },
      {
        id: 'blue_slime',
        name: 'Blue Slime',
        icon: '🔵',
        requiredDefeats: 500,
        reward: { gold: 2500, exp: 500 }
      },
      {
        id: 'king_slime',
        name: 'King Slime',
        icon: '👑',
        requiredDefeats: 2000,
        reward: { gold: 15000, exp: 3000, equipment: { id: 'slime_crown', name: 'Slime Crown', icon: '👑', description: 'A crown made of condensed slime', attack: 1.5, production: 1.1 } }
      }
    ]
  },

  goblins: {
    id: 'goblins',
    name: 'Goblin Horde',
    description: 'Small but cunning creatures that grow in power',
    icon: '👺',
    color: 'red',
    tiers: [
      {
        id: 'goblin',
        name: 'Goblin',
        icon: '👺',
        requiredDefeats: 250,
        reward: { gold: 1000, exp: 200 }
      },
      {
        id: 'hobgoblin',
        name: 'Hobgoblin',
        icon: '😈',
        requiredDefeats: 1000,
        reward: { gold: 5000, exp: 1000 }
      },
      {
        id: 'bugbear',
        name: 'Bugbear',
        icon: '👹',
        requiredDefeats: 3000,
        reward: { gold: 20000, exp: 5000 }
      },
      {
        id: 'goblin_king',
        name: 'Goblin King',
        icon: '🤴',
        requiredDefeats: 8000,
        reward: { gold: 50000, exp: 15000, equipment: { id: 'goblin_blade', name: 'Goblin King\'s Blade', icon: '🗡️', description: 'A blade forged by the goblin king', attack: 2.5, gold: 1.2 } }
      }
    ]
  },

  undead: {
    id: 'undead',
    name: 'Undead Legion',
    description: 'The restless dead grow stronger in darkness',
    icon: '💀',
    color: 'purple',
    tiers: [
      {
        id: 'skeleton',
        name: 'Skeleton',
        icon: '💀',
        requiredDefeats: 500,
        reward: { gold: 2000, exp: 400 }
      },
      {
        id: 'zombie',
        name: 'Zombie',
        icon: '🧟',
        requiredDefeats: 1500,
        reward: { gold: 7500, exp: 2000 }
      },
      {
        id: 'ghoul',
        name: 'Ghoul',
        icon: '👻',
        requiredDefeats: 4000,
        reward: { gold: 25000, exp: 7000 }
      },
      {
        id: 'wight',
        name: 'Wight',
        icon: '⚰️',
        requiredDefeats: 9000,
        reward: { gold: 60000, exp: 18000 }
      },
      {
        id: 'lich',
        name: 'Lich King',
        icon: '🧙‍♂️',
        requiredDefeats: 20000,
        reward: { gold: 150000, exp: 50000, equipment: { id: 'lich_staff', name: 'Staff of Eternal Darkness', icon: '🪄', description: 'A staff that commands the undead', attack: 3.5, exp: 1.5, production: 1.3 } }
      }
    ]
  },

  beasts: {
    id: 'beasts',
    name: 'Wild Beasts',
    description: 'From wolves to legendary creatures',
    icon: '🐺',
    color: 'yellow',
    tiers: [
      {
        id: 'wolf',
        name: 'Wolf',
        icon: '🐺',
        requiredDefeats: 750,
        reward: { gold: 3000, exp: 600 }
      },
      {
        id: 'dire_wolf',
        name: 'Dire Wolf',
        icon: '🦊',
        requiredDefeats: 2500,
        reward: { gold: 12500, exp: 3500 }
      },
      {
        id: 'wyvern',
        name: 'Wyvern',
        icon: '🦎',
        requiredDefeats: 6000,
        reward: { gold: 40000, exp: 12000 }
      },
      {
        id: 'griffin',
        name: 'Griffin',
        icon: '🦅',
        requiredDefeats: 12000,
        reward: { gold: 80000, exp: 28000, equipment: { id: 'griffin_feather', name: 'Griffin\'s Feather', icon: '🪶', description: 'A feather from a legendary griffin', attack: 2.8, gold: 1.4, production: 1.2 } }
      }
    ]
  },

  orcs: {
    id: 'orcs',
    name: 'Orc Warriors',
    description: 'Brutal warriors that command respect through strength',
    icon: '🧌',
    color: 'orange',
    tiers: [
      {
        id: 'orc',
        name: 'Orc',
        icon: '🧌',
        requiredDefeats: 1500,
        reward: { gold: 7500, exp: 2000 }
      },
      {
        id: 'orc_berserker',
        name: 'Orc Berserker',
        icon: '😠',
        requiredDefeats: 4500,
        reward: { gold: 30000, exp: 9000 }
      },
      {
        id: 'ogre',
        name: 'Ogre',
        icon: '👿',
        requiredDefeats: 10000,
        reward: { gold: 70000, exp: 22000 }
      },
      {
        id: 'troll',
        name: 'Troll',
        icon: '👹',
        requiredDefeats: 18000,
        reward: { gold: 120000, exp: 40000, equipment: { id: 'troll_club', name: 'Troll\'s War Club', icon: '🔨', description: 'A massive club that crushes enemies', attack: 4.0, gold: 1.3 } }
      }
    ]
  },

  dragons: {
    id: 'dragons',
    name: 'Dragon Ancestry',
    description: 'The most powerful creatures in existence',
    icon: '🐉',
    color: 'red',
    unlockLevel: 50,
    tiers: [
      {
        id: 'drake',
        name: 'Drake',
        icon: '🦎',
        requiredDefeats: 5000,
        reward: { gold: 35000, exp: 10000 }
      },
      {
        id: 'wyrm',
        name: 'Wyrm',
        icon: '🐍',
        requiredDefeats: 12000,
        reward: { gold: 85000, exp: 25000 }
      },
      {
        id: 'dragon',
        name: 'Dragon',
        icon: '🐉',
        requiredDefeats: 25000,
        reward: { gold: 200000, exp: 70000 }
      },
      {
        id: 'ancient_dragon',
        name: 'Ancient Dragon',
        icon: '🐲',
        requiredDefeats: 50000,
        reward: { gold: 500000, exp: 200000, equipment: { id: 'dragon_scale', name: 'Ancient Dragon Scale', icon: '🛡️', description: 'An impenetrable scale from an ancient dragon', attack: 5.0, gold: 2.0, exp: 2.0, production: 1.5 } }
      }
    ]
  },

  demons: {
    id: 'demons',
    name: 'Demonic Forces',
    description: 'Evil incarnate from the nether realms',
    icon: '😈',
    color: 'purple',
    unlockLevel: 100,
    tiers: [
      {
        id: 'imp',
        name: 'Imp',
        icon: '😈',
        requiredDefeats: 10000,
        reward: { gold: 65000, exp: 20000 }
      },
      {
        id: 'demon',
        name: 'Demon',
        icon: '👿',
        requiredDefeats: 22000,
        reward: { gold: 150000, exp: 50000 }
      },
      {
        id: 'arch_demon',
        name: 'Arch Demon',
        icon: '😡',
        requiredDefeats: 45000,
        reward: { gold: 400000, exp: 150000 }
      },
      {
        id: 'demon_lord',
        name: 'Demon Lord',
        icon: '🔥',
        requiredDefeats: 100000,
        reward: { gold: 1000000, exp: 500000, equipment: { id: 'demon_crown', name: 'Crown of the Damned', icon: '👑', description: 'A crown forged in hellfire', attack: 7.0, gold: 3.0, exp: 3.0, production: 2.0 } }
      }
    ]
  }
}

// Get all challenges in order
export const getChallengesInOrder = () => {
  return Object.values(CREATURE_CHAINS)
}

// Get next uncompleted tier for a chain
export const getNextTierForChain = (chainId, completedTiers) => {
  const chain = CREATURE_CHAINS[chainId]
  if (!chain) return null

  return chain.tiers.find(tier => !completedTiers.includes(tier.id))
}

// Check if player can access a chain
export const canAccessChain = (chain, playerLevel) => {
  return !chain.unlockLevel || playerLevel >= chain.unlockLevel
}
