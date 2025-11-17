# 🛠️ EchoForge Developer Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Developer Terminal](#developer-terminal)
4. [Game Systems](#game-systems)
5. [Adding Content](#adding-content)
6. [Monetization Integration](#monetization-integration)

---

## Quick Start

### Installation

```bash
# Navigate to project directory
cd C:\Project_Swee\EchoForge

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## Project Structure

```
EchoForge/
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Shared components
│   │   │   └── CharacterCreation.jsx
│   │   ├── dev/             # Developer tools
│   │   │   └── DeveloperTerminal.jsx
│   │   └── layout/          # Layout components
│   │       ├── Header.jsx
│   │       ├── Navigation.jsx
│   │       ├── Menu.jsx
│   │       └── Layout.jsx
│   ├── pages/               # Main game pages
│   │   ├── Home/            # Home page & building system
│   │   │   ├── Home.jsx
│   │   │   ├── BuildingCard.jsx
│   │   │   └── PixelScene.jsx
│   │   ├── Quests/          # Quest system
│   │   │   ├── Quests.jsx
│   │   │   └── QuestCard.jsx
│   │   ├── Achievements/    # Achievement system
│   │   │   ├── Achievements.jsx
│   │   │   └── AchievementCard.jsx
│   │   ├── Ascension/       # First prestige tier
│   │   │   └── Ascension.jsx
│   │   └── Transcendence/   # Second prestige tier
│   │       └── Transcendence.jsx
│   ├── stores/              # State management (Zustand)
│   │   ├── gameStore.js     # Main game state
│   │   └── settingsStore.js # Settings & UI state
│   ├── data/                # Game data & constants
│   │   ├── constants.js     # Game constants
│   │   ├── buildings.js     # Building definitions
│   │   ├── quests.js        # Quest definitions
│   │   └── achievements.js  # Achievement definitions
│   ├── utils/               # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind & custom CSS
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
└── package.json             # Dependencies
```

---

## Developer Terminal

### Accessing the Terminal

Press **`Ctrl + Shift + ~`** (tilde key) to toggle the developer terminal.

### Available Commands

#### Resource Management
```bash
/give gold <amount>                    # Add gold
/give resource <type> <amount>         # Add specific resource
```

**Example:**
```bash
/give gold 1000000
/give resource wood 5000
/give resource mithril 100
```

#### Player Management
```bash
/setlevel <level>                      # Set player level
/timewarp <seconds>                    # Simulate offline progress
```

**Example:**
```bash
/setlevel 50
/timewarp 3600          # Simulate 1 hour offline
```

#### Quest & Achievement Management
```bash
/unlock quest <id>                     # Unlock quest
/unlock achievement <id>               # Unlock achievement
/complete quest <id>                   # Complete quest instantly
/list quests                           # List all quest IDs
/list achievements                     # List all achievement IDs
```

**Example:**
```bash
/complete quest quest_1
/unlock achievement ach_gold_hoarder
```

#### Progression Management
```bash
/ascend                                # Perform ascension instantly
/transcend                             # Perform transcendence instantly
```

#### Data Management
```bash
/export                                # Export save to clipboard
/import <json>                         # Import save data
/reset                                 # Reset game (with confirmation)
/clearsave                             # Clear all save data
```

#### Developer Tools
```bash
/togglegod                             # Toggle god mode (infinite resources)
/clear                                 # Clear terminal history
/help                                  # Show all commands
```

### Resource Types

Available resources for `/give resource`:
- `gold`
- `wood`
- `stone`
- `iron`
- `mithril`
- `arcane_essence`
- `dragonscale`
- `ethereal_shard`

---

## Game Systems

### 1. Building System

**File:** `src/data/buildings.js`

Buildings produce resources automatically. Each building has:
- Base production rate
- Cost (with multiplier for each purchase)
- Unlock requirements

**Adding a New Building:**

```javascript
[BUILDINGS.YOUR_BUILDING]: {
  id: BUILDINGS.YOUR_BUILDING,
  name: 'Building Name',
  description: 'What it does',
  icon: '🏛️',
  produces: RESOURCES.GOLD,
  baseProduction: 5,
  baseCost: {
    [RESOURCES.GOLD]: 1000,
    [RESOURCES.WOOD]: 500,
  },
  costMultiplier: 1.15,
  unlocked: false,
  unlockRequirement: { level: 20 },
}
```

### 2. Quest System

**File:** `src/data/quests.js`

Quests give rewards when requirements are met.

**Adding a New Quest:**

```javascript
{
  id: 'quest_new',
  name: 'Quest Name',
  description: 'Quest description',
  icon: '📜',
  requirements: {
    [RESOURCES.GOLD]: 10000,
    [RESOURCES.WOOD]: 500,
  },
  rewards: {
    [RESOURCES.GOLD]: 25000,
    exp: 1000,
  },
  unlocked: false,
  unlockRequirement: { level: 15 },
  category: 'gathering',
}
```

**Quest Categories:**
- `tutorial` - Starting quests
- `gathering` - Resource collection
- `combat` - Battle quests
- `crafting` - Creation tasks
- `magic` - Arcane quests
- `trading` - Commerce
- `royal` - Kingdom quests
- `legendary` - Epic challenges

### 3. Achievement System

**File:** `src/data/achievements.js`

Achievements provide permanent bonuses.

**Adding a New Achievement:**

```javascript
{
  id: 'ach_new',
  name: 'Achievement Name',
  description: 'What to accomplish',
  icon: '🏆',
  requirement: {
    type: 'resource',           // or 'level', 'building', 'quest', etc.
    resource: RESOURCES.GOLD,
    amount: 1000000
  },
  reward: {
    [RESOURCES.GOLD]: 50000,
    goldMultiplier: 1.05        // 5% permanent bonus
  },
  tier: 'gold',                 // bronze, silver, gold, platinum
}
```

**Requirement Types:**
- `resource` - Collect X of a resource
- `level` - Reach level X
- `building` - Build X total buildings
- `quest` - Complete X quests
- `ascension` - Perform X ascensions
- `transcendence` - Perform X transcendences
- `challenge` - Complete X challenges

**Multiplier Types:**
- `goldMultiplier` - Increase gold gain
- `expMultiplier` - Increase EXP gain
- `productionMultiplier` - Increase all production
- `questSpeedMultiplier` - Speed up quests
- `allMultiplier` - Increase everything

### 4. Ascension System

**Level 100 + 1M Gold** → Reset with permanent multipliers

**Power Calculation:**
```javascript
ascensionPower = floor(level / 10) + totalBuildings
```

**Bonuses:**
- Gold: +10% per power
- EXP: +5% per power
- Production: +8% per power

### 5. Transcendence System

**10 Ascensions + 1B Gold** → Reset everything including ascensions

**Power Calculation:**
```javascript
transcendencePower = ascensionCount * 0.1
```

**Bonuses:**
- Everything: ×(1 + power) multiplier
- Compounds with all other bonuses

---

## Adding Content

### Adding a New Race

**File:** `src/data/constants.js`

1. Add to `RACES` enum:
```javascript
export const RACES = {
  // existing races...
  NEW_RACE: 'new_race',
}
```

2. Add to `RACE_INFO`:
```javascript
[RACES.NEW_RACE]: {
  name: 'Race Name',
  description: 'What makes them special',
  bonus: { goldMultiplier: 1.15 },
  icon: '🧝',
}
```

3. Add name pool to `FIRST_NAMES`:
```javascript
new_race: ['Name1', 'Name2', 'Name3'],
```

### Adding a New Resource

**File:** `src/data/constants.js`

1. Add to `RESOURCES`:
```javascript
export const RESOURCES = {
  // existing resources...
  NEW_RESOURCE: 'new_resource',
}
```

2. Add to `RESOURCE_INFO`:
```javascript
[RESOURCES.NEW_RESOURCE]: {
  name: 'Resource Name',
  icon: '💎',
  color: '#00CED1'
}
```

3. Add to gameStore initial state (`src/stores/gameStore.js`):
```javascript
resources: {
  // existing resources...
  [RESOURCES.NEW_RESOURCE]: 0,
}
```

### Adding a New Page

1. Create page directory: `src/pages/NewPage/`
2. Create component: `src/pages/NewPage/NewPage.jsx`
3. Add route in `src/App.jsx`:
```javascript
<Route path="/newpage" element={<NewPage />} />
```
4. Add navigation item in `src/components/layout/Navigation.jsx`:
```javascript
{ path: '/newpage', label: 'New Page', icon: '🎮' }
```

---

## Monetization Integration

The game is structured for easy monetization. Here's how to integrate:

### Premium Currency

**File:** `src/data/constants.js`

1. Enable premium currency:
```javascript
export const MONETIZATION = {
  PREMIUM_CURRENCY_ENABLED: true,
  ADS_ENABLED: false,
  IAP_ENABLED: false,
}
```

2. Add premium currency to resources:
```javascript
RESOURCES.GEMS: 'gems',
```

3. Add gem costs to buildings/quests/etc:
```javascript
baseCost: {
  [RESOURCES.GEMS]: 10,
}
```

### In-App Purchases

**File:** `src/stores/gameStore.js`

Add IAP handling methods:
```javascript
purchaseGems: async (amount) => {
  // Integrate with payment provider (Stripe, PayPal, etc.)
  // On success:
  get().addResource(RESOURCES.GEMS, amount)
},
```

### Advertisement Integration

Add ad triggers for:
- Bonus rewards (2x gold for watching ad)
- Speed-ups (instant quest completion)
- Free resources

**Example:**
```javascript
watchAd: async (rewardType) => {
  // Integrate with ad provider (AdMob, Unity Ads, etc.)
  // On ad completion:
  switch(rewardType) {
    case 'double_gold':
      // Grant bonus
      break
  }
},
```

### Time-Skip Purchases

Already structured in game loop - just add payment:
```javascript
purchaseTimeSkip: async (hours) => {
  // Process payment
  // Then:
  get().processOfflineProgress(hours * 3600 * 1000)
},
```

---

## Testing Tips

1. **Quick Testing Setup:**
```bash
/setlevel 100
/give gold 10000000
/togglegod
```

2. **Test Ascension:**
```bash
/setlevel 100
/give gold 1000000
# Navigate to Ascension page and test
```

3. **Test Transcendence:**
```bash
/ascend        # Do this 10 times
/give gold 1000000000
# Navigate to Transcendence page
```

4. **Test Progression Speed:**
```bash
/timewarp 3600   # Simulate 1 hour
/timewarp 86400  # Simulate 24 hours
```

---

## Common Issues

### Save Data Issues
- Use `/export` to backup save
- Use `/clearsave` to start fresh
- Check browser console for errors

### Performance Issues
- Reduce `TICK_RATE` in constants (100ms = 10 ticks/sec)
- Disable animations in settings
- Close developer terminal when not in use

### Building Issues
If buildings aren't unlocking:
```bash
/setlevel <required_level>
```

---

## Support

For issues or questions:
- Check the in-game Guide (Menu → Guide)
- Review this documentation
- Check browser console for errors

---

**Happy Developing! 🎮✨**
