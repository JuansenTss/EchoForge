import { RESOURCES } from './constants'

export const MONSTERS = [
  {
    id: 'goblin',
    name: 'Goblin',
    icon: '👹',
    hp: 10,
    goldMin: 1,
    goldMax: 5,
    expMin: 2,
    expMax: 5,
    unlockLevel: 1,
  },
  {
    id: 'orc',
    name: 'Orc',
    icon: '👺',
    hp: 25,
    goldMin: 5,
    goldMax: 15,
    expMin: 5,
    expMax: 12,
    unlockLevel: 5,
  },
  {
    id: 'troll',
    name: 'Troll',
    icon: '🧌',
    hp: 50,
    goldMin: 15,
    goldMax: 40,
    expMin: 12,
    expMax: 25,
    unlockLevel: 10,
  },
  {
    id: 'undead_warrior',
    name: 'Undead Warrior',
    icon: '💀',
    hp: 100,
    goldMin: 40,
    goldMax: 100,
    expMin: 25,
    expMax: 50,
    unlockLevel: 20,
  },
  {
    id: 'dark_knight',
    name: 'Dark Knight',
    icon: '⚔️',
    hp: 200,
    goldMin: 100,
    goldMax: 250,
    expMin: 50,
    expMax: 100,
    unlockLevel: 35,
  },
  {
    id: 'dragon_whelp',
    name: 'Dragon Whelp',
    icon: '🐲',
    hp: 500,
    goldMin: 250,
    goldMax: 600,
    expMin: 100,
    expMax: 200,
    unlockLevel: 50,
  },
  {
    id: 'demon',
    name: 'Demon',
    icon: '😈',
    hp: 1000,
    goldMin: 600,
    goldMax: 1500,
    expMin: 200,
    expMax: 400,
    unlockLevel: 70,
  },
  {
    id: 'ancient_dragon',
    name: 'Ancient Dragon',
    icon: '🐉',
    hp: 5000,
    goldMin: 1500,
    goldMax: 5000,
    expMin: 500,
    expMax: 1000,
    unlockLevel: 90,
  },
]

// For endless progression - generate scaled monsters
export const generateScaledMonster = (baseMonster, tier) => {
  const tierNames = ['Lesser', 'Greater', 'Elite', 'Champion', 'Legendary', 'Mythic', 'Ancient', 'Primordial', 'Celestial', 'Divine']
  const tierName = tier < tierNames.length ? tierNames[tier] : `Tier-${tier + 1}`

  const scale = Math.pow(2, tier) // Exponential scaling

  return {
    ...baseMonster,
    id: `${baseMonster.id}_tier_${tier}`,
    name: `${tierName} ${baseMonster.name}`,
    hp: Math.floor(baseMonster.hp * scale),
    goldMin: Math.floor(baseMonster.goldMin * scale),
    goldMax: Math.floor(baseMonster.goldMax * scale),
    expMin: Math.floor(baseMonster.expMin * scale),
    expMax: Math.floor(baseMonster.expMax * scale),
    tier,
  }
}
