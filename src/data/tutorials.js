import { RESOURCES, RESOURCE_INFO } from './constants'

export const TUTORIALS = {
  WELCOME: 'welcome',
  RESOURCES: 'resources',
  BUILDINGS: 'buildings',
  QUESTS: 'quests',
  ACHIEVEMENTS: 'achievements',
  COMBAT: 'combat',
  ASCENSION: 'ascension',
  TRANSCENDENCE: 'transcendence',
  SPECIAL_QUESTS: 'special_quests',
}

export const tutorialData = {
  [TUTORIALS.WELCOME]: {
    id: TUTORIALS.WELCOME,
    title: 'Welcome to EchoForge!',
    icon: '🏰',
    steps: [
      {
        title: 'Welcome, Adventurer!',
        content: `Welcome to EchoForge, a medieval fantasy idle game where you build a kingdom, complete quests, and grow infinitely powerful!

Your journey begins here. Let's learn the basics.`,
      },
      {
        title: 'The Header',
        content: `At the top of the screen, you'll see:
• Your name and level
• Experience bar showing progress to next level
• Resources you've collected
• Theme toggle (☀️/🌙)
• Kingdom stats button (📊)`,
      },
      {
        title: 'Navigation',
        content: `At the bottom, you have 5 main sections:
🏠 Home - Build structures and watch animations
🗺️ Quests - Complete tasks for rewards
🏆 Achievements - Unlock permanent bonuses
🌅 Ascension - First prestige layer
✨ Transcendence - Ultimate prestige layer`,
      },
      {
        title: 'Getting Started',
        content: `To begin:
1. Build your first Lumber Mill (costs 10 gold)
2. Watch it produce wood automatically
3. Complete your first quest
4. Unlock achievements for bonuses!

Let's explore each system in detail!`,
      },
    ],
  },

  [TUTORIALS.RESOURCES]: {
    id: TUTORIALS.RESOURCES,
    title: 'Resources Guide',
    icon: '💎',
    steps: [
      {
        title: 'Understanding Resources',
        content: `EchoForge has 8 different resources. Each serves a unique purpose in your kingdom's growth.`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.GOLD].icon} Gold`,
        content: `**How to Obtain:**
• Complete quests
• Defeat monsters in combat
• Alchemist's Laboratory building
• Quest rewards

**Used For:**
• Building structures
• Quest requirements
• Ascension requirement (1M gold)
• Transcendence requirement (1B gold)`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.WOOD].icon} Wood`,
        content: `**How to Obtain:**
• Lumber Mill building (produces automatically)
• Quest rewards

**Used For:**
• Building advanced structures
• Quest requirements
• Crafting prerequisites`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.STONE].icon} Stone`,
        content: `**How to Obtain:**
• Quarry building (produces automatically)
• Quest rewards

**Used For:**
• Building fortifications
• Quest requirements
• Upgrading infrastructure`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.IRON].icon} Iron`,
        content: `**How to Obtain:**
• Iron Mine building (produces automatically)
• Quest rewards

**Used For:**
• Advanced buildings
• Forge prerequisites
• Quest requirements`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.MITHRIL].icon} Mithril`,
        content: `**How to Obtain:**
• Ancient Forge building (requires level 10)
• Quest rewards

**Used For:**
• Legendary buildings
• High-level quests
• Magical structures`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.ARCANE_ESSENCE].icon} Arcane Essence`,
        content: `**How to Obtain:**
• Mage's Tower building (requires level 25)
• Quest rewards
• Magical quest completions

**Used For:**
• Magical buildings
• Ethereal structures
• Transcendence quests`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.DRAGONSCALE].icon} Dragonscale`,
        content: `**How to Obtain:**
• Dragon Roost building (requires level 50)
• Legendary quest rewards
• Special quests

**Used For:**
• Legendary buildings
• Epic quests
• Transcendence requirements`,
      },
      {
        title: `${RESOURCE_INFO[RESOURCES.ETHEREAL_SHARD].icon} Ethereal Shard`,
        content: `**How to Obtain:**
• Ethereal Nexus building (requires level 75)
• Transcendent quest rewards
• Monthly special quests

**Used For:**
• Ultimate buildings
• Transcendence quests
• End-game content`,
      },
    ],
  },

  [TUTORIALS.BUILDINGS]: {
    id: TUTORIALS.BUILDINGS,
    title: 'Buildings Guide',
    icon: '🏗️',
    steps: [
      {
        title: 'About Buildings',
        content: `Buildings are the core of your kingdom. They produce resources automatically over time.

Each building you own produces resources every second, even when you're offline!`,
      },
      {
        title: 'Building Costs',
        content: `Building costs increase with each purchase:
• First building: Base cost
• Second building: Base cost × 1.15
• Third building: Base cost × 1.15²
• And so on...

This creates exponential growth!`,
      },
      {
        title: 'Bulk Purchasing',
        content: `Use the bulk purchase buttons to buy multiple at once:
• x1 - Buy one
• x10 - Buy ten
• x100 - Buy one hundred
• x1000 - Buy one thousand
• x10000 - Buy ten thousand
• MAX - Buy maximum affordable

This saves time!`,
      },
      {
        title: 'Production Bonuses',
        content: `Your production is multiplied by:
• Achievement bonuses
• Race bonuses (from character creation)
• Ascension power
• Transcendence power
• Equipment bonuses

Stack these for massive production!`,
      },
      {
        title: 'Special Buildings',
        content: `Some buildings don't produce resources but give bonuses:
• Royal Barracks - Faster quest completion
• Master Workshop - Increased production

Build these strategically!`,
      },
      {
        title: 'Unlocking Buildings',
        content: `Buildings unlock as you level up:
• Level 1: Basic buildings
• Level 10: Ancient Forge
• Level 25: Mage's Tower
• Level 50: Dragon Roost
• Level 75: Ethereal Nexus

Keep leveling to unlock more!`,
      },
    ],
  },

  [TUTORIALS.QUESTS]: {
    id: TUTORIALS.QUESTS,
    title: 'Quests Guide',
    icon: '🗺️',
    steps: [
      {
        title: 'Quest System',
        content: `Quests are tasks you complete for rewards. Unlike many games, EchoForge quests have NO time limit!

Complete them at your own pace.`,
      },
      {
        title: 'Quest Types',
        content: `**Resource Quests:**
Require specific amounts of resources. Resources are consumed on completion.

**Time Quests:**
Complete after a certain time period (auto-completes).

**Special Quests:**
Daily/Weekly/Monthly timed events with exclusive rewards!`,
      },
      {
        title: 'Quest Rewards',
        content: `Completing quests gives:
• Gold
• Resources
• Experience points
• Sometimes special equipment

Rewards are multiplied by your bonuses!`,
      },
      {
        title: 'Quest Categories',
        content: `• Tutorial - Starting quests
• Gathering - Resource collection
• Combat - Battle challenges
• Crafting - Creation tasks
• Magic - Arcane quests
• Trading - Commerce
• Royal - Kingdom quests
• Legendary - Epic challenges`,
      },
      {
        title: 'Collect All Feature',
        content: `Use the "Collect All Available Rewards" button at the top of the Quests page to complete ALL quests you can afford at once!

This is a huge time saver!`,
      },
      {
        title: 'Special Quests',
        content: `Special time-limited quests appear at specific times:
• Daily: 8PM-9PM every day
• Weekly: Saturdays 8PM-9PM
• Monthly: Last day of month 8PM-9PM

These give exclusive equipment you can't get anywhere else!`,
      },
    ],
  },

  [TUTORIALS.ACHIEVEMENTS]: {
    id: TUTORIALS.ACHIEVEMENTS,
    title: 'Achievements Guide',
    icon: '🏆',
    steps: [
      {
        title: 'Achievement System',
        content: `Achievements are permanent milestones that give you powerful bonuses.

Once unlocked, they provide benefits forever - even through ascensions and transcendences!`,
      },
      {
        title: 'Achievement Tiers',
        content: `Achievements come in 4 tiers:
🥉 Bronze - Common achievements
🥈 Silver - Uncommon achievements
🥇 Gold - Rare achievements
💎 Platinum - Legendary achievements

Higher tiers give better rewards!`,
      },
      {
        title: 'How They Work',
        content: `1. Complete the requirement (automatically detected)
2. Achievement unlocks and shows in your list
3. Claim the reward
4. Bonus is permanently applied

Your total multipliers include all claimed achievements!`,
      },
      {
        title: 'Types of Bonuses',
        content: `Achievements can give:
• Gold multipliers (+5%, +10%, etc.)
• EXP multipliers (level faster!)
• Production multipliers (more resources!)
• Quest speed multipliers (faster completion!)
• "All" multipliers (affects everything!)

Stack them for exponential growth!`,
      },
      {
        title: 'Achievement Tips',
        content: `• Focus on "All" multiplier achievements first
• Bronze achievements are easy to get
• Some achievements require ascensions
• Platinum achievements are end-game goals
• Check back often for newly unlocked ones!`,
      },
    ],
  },

  [TUTORIALS.COMBAT]: {
    id: TUTORIALS.COMBAT,
    title: 'Combat Guide',
    icon: '⚔️',
    steps: [
      {
        title: 'Combat System',
        content: `Fight monsters to earn gold and experience!

Combat is a new way to progress alongside building and quests.`,
      },
      {
        title: 'How to Fight',
        content: `**Manual Mode:**
Click on the monster to attack

**Auto-Attack:**
Toggle auto-attack ON to fight automatically

Your attack speed increases with your level!`,
      },
      {
        title: 'Monster Types',
        content: `8 base monster types unlock as you level:
• Goblin (Level 1)
• Orc (Level 5)
• Troll (Level 10)
• Undead Warrior (Level 20)
• Dark Knight (Level 35)
• Dragon Whelp (Level 50)
• Demon (Level 70)
• Ancient Dragon (Level 90)`,
      },
      {
        title: 'Endless Scaling',
        content: `For infinite progression, monsters scale into tiers:
• Lesser (Tier 1)
• Greater (Tier 2)
• Elite (Tier 3)
• Champion (Tier 4)
• Legendary (Tier 5)
• And beyond...

Each tier is twice as strong as the previous!`,
      },
      {
        title: 'Combat Rewards',
        content: `Each defeated monster gives:
• Gold (random amount in a range)
• Experience points
• Progress toward achievements
• Counts for special quest requirements

All rewards are multiplied by your bonuses!`,
      },
      {
        title: 'Damage Calculation',
        content: `Your damage is based on:
• Base: 1 + (Level ÷ 5)
• Attack equipment bonuses
• ±30% random variance

Equipment from special quests boosts attack power!`,
      },
    ],
  },

  [TUTORIALS.ASCENSION]: {
    id: TUTORIALS.ASCENSION,
    title: 'Ascension Guide',
    icon: '🌅',
    steps: [
      {
        title: 'What is Ascension?',
        content: `Ascension is your first prestige layer. It resets your progress BUT gives you powerful permanent multipliers!

Think of it as "New Game+"`,
      },
      {
        title: 'Requirements',
        content: `To ascend, you need:
• Level 100
• 1,000,000 gold

Once you meet both, visit the Ascension page!`,
      },
      {
        title: 'What You Lose',
        content: `Ascension resets:
• Level (back to 1)
• All resources
• All buildings
• Quest progress

This sounds scary, but the bonuses make up for it!`,
      },
      {
        title: 'What You Keep',
        content: `You permanently keep:
• All achievements (and their bonuses!)
• Lifetime statistics
• Equipment from special quests
• Transcendence progress

Plus you gain Ascension Power!`,
      },
      {
        title: 'Ascension Power',
        content: `Each ascension grants power based on:
• Your level ÷ 10
• Number of buildings owned

This power gives:
• +10% gold per power
• +5% EXP per power
• +8% production per power

These stack with each ascension!`,
      },
      {
        title: 'Strategy Tips',
        content: `• First ascension around level 100-110
• Build lots of buildings before ascending
• Complete high-reward quests first
• Claim all achievements before ascending
• Each run should be faster than the last!`,
      },
    ],
  },

  [TUTORIALS.TRANSCENDENCE]: {
    id: TUTORIALS.TRANSCENDENCE,
    title: 'Transcendence Guide',
    icon: '✨',
    steps: [
      {
        title: 'What is Transcendence?',
        content: `Transcendence is the ULTIMATE prestige layer. It resets EVERYTHING including ascensions, but gives massive multiplicative bonuses!

This is the end-game progression system.`,
      },
      {
        title: 'Requirements',
        content: `To transcend, you need:
• 10 total ascensions
• 1,000,000,000 gold (1 billion!)

This is a long-term goal!`,
      },
      {
        title: 'What You Lose',
        content: `Transcendence resets:
• Level (back to 1)
• All resources
• All buildings
• All ascensions
• Ascension power
• Quest progress

Everything except achievements and equipment!`,
      },
      {
        title: 'Transcendence Power',
        content: `Power gained = Ascension count × 0.1

This power provides a MULTIPLICATIVE bonus to EVERYTHING:
• Gold: ×(1 + power)
• EXP: ×(1 + power)
• Production: ×(1 + power)
• Quest Speed: ×(1 + power)

These multiply with all other bonuses!`,
      },
      {
        title: 'Why Transcend?',
        content: `Example: After 10 ascensions, you get 1.0 power.

This means:
• ×2.0 to ALL stats!
• Your second transcendence gives ×3.0!
• Third gives ×4.0!

This is exponential growth at its finest!`,
      },
      {
        title: 'Strategy Tips',
        content: `• Don't rush your first transcendence
• Get as many ascensions as possible (more power!)
• Complete achievements for permanent bonuses
• Collect equipment from special quests
• After first transcendence, progress is MUCH faster!`,
      },
    ],
  },

  [TUTORIALS.SPECIAL_QUESTS]: {
    id: TUTORIALS.SPECIAL_QUESTS,
    title: 'Special Quests Guide',
    icon: '⭐',
    steps: [
      {
        title: 'Time-Limited Quests',
        content: `Special quests appear at specific times and give exclusive equipment rewards!

These are the ONLY way to get certain equipment.`,
      },
      {
        title: 'Daily Quests',
        content: `**When:** Every day 8PM-9PM (1 hour window)

**Rewards:** Daily equipment tier
• Steel Sword (+5% attack)
• Iron Shield (+5% defense)
• Knight Helmet (+3% EXP)
• Plate Armor (+3% production)
• Swift Boots (+5% quest speed)

Rotates daily!`,
      },
      {
        title: 'Weekly Quests',
        content: `**When:** Saturdays 8PM-9PM

**Rewards:** Weekly equipment tier
• Excalibur (+15% attack, +10% gold)
• Dragonscale Plate (+15% defense, +10% production)
• Ring of Eternity (+20% EXP)
• Amulet of Power (+8% to all stats)

Much more powerful!`,
      },
      {
        title: 'Monthly Quests',
        content: `**When:** Last day of month 8PM-9PM

**Rewards:** Monthly equipment tier
• Ancient Artifact (+25% all stats)
• Crown of Kings (+50% gold, +30% production)
• Celestial Wings (+50% quest speed, +30% EXP)
• Orb of Transcendence (+50% all stats)

These are INSANELY powerful!`,
      },
      {
        title: 'How to Complete',
        content: `Special quests require:
• Large amounts of resources
• Monsters defeated (combat requirement)

They're challenging but worth it!

Check the Quests page during the time window to see them.`,
      },
      {
        title: 'Important Notes',
        content: `• You can only complete each quest ONCE
• Equipment bonuses stack with everything else
• Miss a quest? Wait for next rotation!
• Equipment persists through ascensions/transcendences
• This is THE reason to log in daily!`,
      },
    ],
  },
}
