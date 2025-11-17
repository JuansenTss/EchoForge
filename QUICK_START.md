# 🚀 Quick Start Guide - EchoForge

## Prerequisites

Make sure you have Node.js installed (version 16 or higher).

Check by running:
```bash
node --version
```

If not installed, download from: https://nodejs.org/

---

## Installation Steps

### 1. Open Terminal/Command Prompt

Navigate to the project directory:
```bash
cd C:\Project_Swee\EchoForge
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React Router
- Vite (build tool)
- Zustand (state management)
- Framer Motion (animations)
- Tailwind CSS (styling)
- LocalForage (save system)

**Installation may take 2-5 minutes depending on your internet speed.**

### 3. Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 4. Open the Game

Open your browser and navigate to:
```
http://localhost:3000
```

**The game is now running! 🎮**

---

## First Time Setup

1. **Character Creation**
   - Choose your race (each has unique bonuses)
   - Enter your name or use the random name generator
   - Click "Begin Adventure"

2. **Tutorial**
   - Start by building your first Lumber Mill
   - Complete the beginner quest
   - Unlock achievements for permanent bonuses

3. **Developer Terminal** (For Testing)
   - Press `Ctrl + Shift + ~` to open terminal
   - Type `/help` to see all commands
   - Type `/give gold 100000` to test with resources

---

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

---

## Development Workflow

### Making Changes

1. Edit files in `src/` directory
2. Save the file
3. Vite will automatically reload the browser
4. Changes appear instantly (Hot Module Replacement)

### Project Structure

```
src/
├── pages/           # Main game pages (Home, Quests, etc.)
├── components/      # Reusable UI components
├── stores/          # Game state management
├── data/            # Game content (quests, buildings, etc.)
└── styles/          # CSS and styling
```

### Adding New Content

- **Buildings:** Edit `src/data/buildings.js`
- **Quests:** Edit `src/data/quests.js`
- **Achievements:** Edit `src/data/achievements.js`
- **Game Balance:** Edit `src/data/constants.js`

See `DEVELOPER_GUIDE.md` for detailed instructions.

---

## Recommended VS Code Extensions

For the best development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Prettier - Code formatter**
4. **ESLint**

---

## Dark Mode

The game supports dark/light mode:
- Toggle in settings (Menu → ☰)
- Automatically applies to entire UI
- Saves preference to browser storage

---

## Save System

- Game auto-saves every 30 seconds
- Saves to browser's IndexedDB
- Persists across sessions
- Export/import saves via developer terminal

---

## Testing Commands

Quick setup for testing features:

```bash
# Open terminal: Ctrl + Shift + ~

# Fast track to mid-game
/setlevel 50
/give gold 1000000
/give resource mithril 100

# Test ascension
/setlevel 100
/give gold 1000000

# God mode (infinite resources)
/togglegod

# Simulate offline progress (1 hour)
/timewarp 3600
```

---

## Troubleshooting

### Port 3000 Already in Use

If you see "Port 3000 is already in use":

**Option 1:** Kill the process using port 3000
**Option 2:** Use a different port:
```bash
npm run dev -- --port 3001
```

### Dependencies Won't Install

Try:
```bash
npm cache clean --force
npm install
```

### Game Won't Load

1. Check browser console (F12) for errors
2. Clear browser cache and reload
3. Try incognito/private browsing mode
4. Check `npm run dev` terminal for errors

### Save Data Issues

Reset save data:
```bash
# In developer terminal
/clearsave
```

Or manually clear:
1. Open browser DevTools (F12)
2. Go to Application → IndexedDB
3. Delete `localforage` database

---

## Performance Tips

- Close other browser tabs
- Disable browser extensions if laggy
- Use Chrome/Edge for best performance
- Enable "Hardware Acceleration" in browser settings

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Start development server
3. ✅ Create your character
4. 📖 Read `DEVELOPER_GUIDE.md` for advanced features
5. 🎮 Start playing and testing!

---

## Need Help?

- **Game Guide:** Menu → Guide (in-game)
- **Developer Docs:** `DEVELOPER_GUIDE.md`
- **Project README:** `README.md`

---

**Enjoy building EchoForge! 🏰✨**
