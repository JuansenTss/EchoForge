// Game constants and configuration

export const GAME_VERSION = '0.1.0'

export const RACES = {
  HUMAN: 'human',
  ELF: 'elf',
  DWARF: 'dwarf',
  UNDEAD: 'undead',
  BEASTFOLK: 'beastfolk',
}

export const RACE_INFO = {
  [RACES.HUMAN]: {
    name: 'Human',
    description: 'Versatile and adaptable, humans excel in all trades',
    bonus: { goldMultiplier: 1.1 },
    icon: '👤',
  },
  [RACES.ELF]: {
    name: 'Elf',
    description: 'Ancient and wise, elves gain experience more quickly',
    bonus: { expMultiplier: 1.15 },
    icon: '🧝',
  },
  [RACES.DWARF]: {
    name: 'Dwarf',
    description: 'Master craftsmen, dwarves produce resources faster',
    bonus: { productionMultiplier: 1.2 },
    icon: '⛏️',
  },
  [RACES.UNDEAD]: {
    name: 'Undead',
    description: 'Tireless workers, undead never suffer production penalties',
    bonus: { noProductionPenalty: true },
    icon: '💀',
  },
  [RACES.BEASTFOLK]: {
    name: 'Beastfolk',
    description: 'Natural warriors, beastfolk complete quests faster',
    bonus: { questSpeedMultiplier: 1.25 },
    icon: '🐺',
  },
}

export const RESOURCES = {
  GOLD: 'gold',
  WOOD: 'wood',
  STONE: 'stone',
  IRON: 'iron',
  MITHRIL: 'mithril',
  ARCANE_ESSENCE: 'arcane_essence',
  DRAGONSCALE: 'dragonscale',
  ETHEREAL_SHARD: 'ethereal_shard',
}

export const RESOURCE_INFO = {
  [RESOURCES.GOLD]: { name: 'Gold', icon: '🪙', color: '#FFD700' },
  [RESOURCES.WOOD]: { name: 'Wood', icon: '🪵', color: '#8B4513' },
  [RESOURCES.STONE]: { name: 'Stone', icon: '🪨', color: '#808080' },
  [RESOURCES.IRON]: { name: 'Iron', icon: '⚙️', color: '#B0B0B0' },
  [RESOURCES.MITHRIL]: { name: 'Mithril', icon: '💎', color: '#00CED1' },
  [RESOURCES.ARCANE_ESSENCE]: { name: 'Arcane Essence', icon: '✨', color: '#9370DB' },
  [RESOURCES.DRAGONSCALE]: { name: 'Dragonscale', icon: '🐉', color: '#DC143C' },
  [RESOURCES.ETHEREAL_SHARD]: { name: 'Ethereal Shard', icon: '🔮', color: '#E6E6FA' },
}

export const BUILDINGS = {
  LUMBER_MILL: 'lumber_mill',
  QUARRY: 'quarry',
  MINE: 'mine',
  FORGE: 'forge',
  MAGES_TOWER: 'mages_tower',
  DRAGON_ROOST: 'dragon_roost',
  ETHEREAL_NEXUS: 'ethereal_nexus',
  ALCHEMIST_LAB: 'alchemist_lab',
  BARRACKS: 'barracks',
  WORKSHOP: 'workshop',
}

export const FIRST_NAMES = {
  human: ['Arthur', 'Gawain', 'Lancelot', 'Percival', 'Tristan', 'Bedivere', 'Galahad', 'Mordred', 'Gareth', 'Kay',
    'Guinevere', 'Morgan', 'Elaine', 'Isolde', 'Morgause', 'Lynette', 'Viviane', 'Nimue'],
  elf: ['Legolas', 'Thranduil', 'Celeborn', 'Elrond', 'Gil-galad', 'Haldir', 'Glorfindel',
    'Galadriel', 'Arwen', 'Luthien', 'Idril', 'Aredhel'],
  dwarf: ['Thorin', 'Balin', 'Dwalin', 'Gimli', 'Gloin', 'Bombur', 'Dain', 'Thrain'],
  undead: ['Morgoth', 'Sauron', 'Saruman', 'Gothmog', 'Azog', 'Nazgul', 'Shelob'],
  beastfolk: ['Fenrir', 'Raksha', 'Akela', 'Baloo', 'Bagheera', 'Shere', 'Kaa', 'Hathi'],
}

export const TITLES = [
  'the Brave', 'the Wise', 'the Bold', 'the Swift', 'the Strong', 'the Cunning',
  'the Noble', 'the Just', 'the Valiant', 'the Fearless', 'the Ancient', 'the Eternal',
  'Dragonslayer', 'Ironheart', 'Lightbringer', 'Shadowbane', 'Stormbringer', 'Flamewarden',
  'of the North', 'of the Realm', 'of Legend', 'the Undying', 'the Magnificent', 'the Dread'
]

export const SAVE_KEY = 'echoforge_save'

export const TICK_RATE = 100 // Game update rate in milliseconds (10 times per second)

export const BASE_PRODUCTION_RATE = 1 // Base resource per second

// Ascension thresholds
export const ASCENSION_LEVEL_REQUIREMENT = 100
export const ASCENSION_GOLD_REQUIREMENT = 1000000

// Transcendence thresholds
export const TRANSCENDENCE_ASCENSION_REQUIREMENT = 10
export const TRANSCENDENCE_GOLD_REQUIREMENT = 1000000000

// Monetization flags (for future use)
export const MONETIZATION = {
  PREMIUM_CURRENCY_ENABLED: false,
  ADS_ENABLED: false,
  IAP_ENABLED: false,
}

// Admin secret key for terminal access
export const ADMIN_KEY_COMBO = ['Control', 'Shift', '~']
