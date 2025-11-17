# 🏰 EchoForge - Medieval Fantasy Idle Game

A text-based idle game set in a medieval fantasy world with endless progression, multiple prestige layers, and various fantasy races.

## 🎮 Features

- **5 Main Pages**: Home, Quests, Achievements, Ascension, Transcendence
- **Dark/Light Mode**: Comfortable gaming in any lighting
- **Endless Progression**: Multiple prestige layers for infinite growth
- **Quest System**: Rewarding tasks with no time limitations
- **Achievement System**: Unlock bonuses and show off your progress
- **Challenges**: Optional difficulty for extra rewards
- **Global Ranking**: Compete with other players
- **Character Customization**: Choose your name or randomize it
- **Developer Terminal**: Admin commands for testing (dev only)

## 🚀 Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## 🎯 Developer Terminal

**Access**: Press \`Ctrl + Shift + ~\` (tilde) in-game

### Admin Commands

- \`/give gold <amount>\` - Add gold
- \`/give resource <type> <amount>\` - Add specific resource
- \`/unlock quest <id>\` - Unlock specific quest
- \`/unlock achievement <id>\` - Unlock achievement
- \`/complete quest <id>\` - Complete quest instantly
- \`/setlevel <level>\` - Set player level
- \`/ascend\` - Perform ascension instantly
- \`/transcend\` - Perform transcendence instantly
- \`/reset\` - Full game reset
- \`/export\` - Export save data
- \`/import <data>\` - Import save data
- \`/timewarp <seconds>\` - Simulate offline progression
- \`/togglegod\` - Toggle god mode (infinite resources)
- \`/clearsave\` - Clear all save data

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   └── layout/         # Layout components
├── pages/              # Main game pages
│   ├── Home/
│   ├── Quests/
│   ├── Achievements/
│   ├── Ascension/
│   └── Transcendence/
├── stores/             # State management (zustand)
├── data/               # Game data, configs, constants
├── utils/              # Helper functions
├── hooks/              # Custom React hooks
└── styles/             # Global styles
\`\`\`

## 🎨 Theming

The game uses Tailwind CSS with custom medieval color palette. Dark mode is supported through Tailwind's class-based system.

## 💾 Save System

Game progress is automatically saved using LocalForage (IndexedDB). Saves persist across sessions.

## 🔮 Future Monetization

The codebase is structured to support:
- Premium currency system
- Cosmetic purchases
- Time-skip purchases
- Ad integration points

## 📝 License

Private project - All rights reserved
