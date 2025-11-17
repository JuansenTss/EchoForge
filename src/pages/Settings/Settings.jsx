import { motion } from 'framer-motion'
import useSettingsStore from '../../stores/settingsStore'
import useGameStore from '../../stores/gameStore'
import { NUMBER_FORMATS } from '../../utils/formatters'
import Tooltip from '../../components/common/Tooltip'

const Settings = () => {
  const {
    darkMode,
    toggleDarkMode,
    soundEnabled,
    toggleSound,
    musicEnabled,
    toggleMusic,
    notificationsEnabled,
    toggleNotifications,
    showAnimations,
    toggleAnimations,
    showCombat,
    toggleCombat,
    showBuilding,
    toggleBuilding,
    autoSave,
    toggleAutoSave,
    saveInterval,
    setSaveInterval,
    resolution,
    setResolution,
    numberFormat,
    setNumberFormat,
  } = useSettingsStore()

  const { saveGame, resetSave } = useGameStore()

  const handleExportSave = () => {
    const saveData = JSON.stringify(useGameStore.getState())
    const blob = new Blob([saveData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `echoforge-save-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportSave = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result)
            // TODO: Implement proper save import
            alert('Save import feature coming soon!')
          } catch (error) {
            alert('Invalid save file!')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="card">
        <h1 className="text-2xl font-medieval font-bold">⚙️ Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your game experience
        </p>
      </div>

      {/* Display Settings */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">🎨 Display</h2>

        {/* Theme */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Theme</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between dark and light mode
              </p>
            </div>
            <Tooltip content={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <button
                onClick={toggleDarkMode}
                className={`px-6 py-3 rounded-lg font-medieval text-2xl transition-all ${
                  darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-yellow-100 text-gray-800 hover:bg-yellow-200'
                }`}
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Resolution */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-3">Resolution / Graphics Quality</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Affects animation scaling and performance
          </p>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map(res => (
              <Tooltip
                key={res}
                content={
                  res === 'low'
                    ? 'Best performance, 75% scale'
                    : res === 'medium'
                    ? 'Balanced, 100% scale'
                    : 'Best quality, 125% scale'
                }
              >
                <button
                  onClick={() => setResolution(res)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medieval transition-all capitalize ${
                    resolution === res
                      ? 'bg-medieval-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {res}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Number Format */}
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-3">Number Format</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            How large numbers are displayed
          </p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(NUMBER_FORMATS).map(([key, value]) => (
              <Tooltip
                key={value}
                content={
                  value === NUMBER_FORMATS.NORMAL
                    ? 'Example: 1.5K, 2.3M, 4.7B'
                    : value === NUMBER_FORMATS.SCIENTIFIC
                    ? 'Example: 1.5e3, 2.3e6, 4.7e9'
                    : value === NUMBER_FORMATS.ENGINEERING
                    ? 'Example: 1.5e3, 2.3e6, 4.7e9'
                    : 'Example: 1.5K, 2.3M, 4.7B, 1.2Qa'
                }
              >
                <button
                  onClick={() => setNumberFormat(value)}
                  className={`px-4 py-2 rounded-lg font-medieval transition-all capitalize ${
                    numberFormat === value
                      ? 'bg-medieval-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {key.toLowerCase()}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Settings */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">✨ Animations</h2>

        <div className="space-y-3">
          {/* Master Animation Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Enable Animations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Master toggle for all animations
              </p>
            </div>
            <button
              onClick={toggleAnimations}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                showAnimations
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {showAnimations ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Combat Animation */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Combat Animation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show fighting monsters scene
              </p>
            </div>
            <button
              onClick={toggleCombat}
              disabled={!showAnimations}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                showCombat && showAnimations
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              } ${!showAnimations && 'opacity-50 cursor-not-allowed'}`}
            >
              {showCombat ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Building Animation */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Building Animation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show kingdom with resource production
              </p>
            </div>
            <button
              onClick={toggleBuilding}
              disabled={!showAnimations}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                showBuilding && showAnimations
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              } ${!showAnimations && 'opacity-50 cursor-not-allowed'}`}
            >
              {showBuilding ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">🔊 Audio</h2>

        <div className="space-y-3">
          {/* Sound Effects */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Sound Effects</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Play sound effects (Coming soon)
              </p>
            </div>
            <button
              onClick={toggleSound}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                soundEnabled
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Music */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Background Music</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Play background music (Coming soon)
              </p>
            </div>
            <button
              onClick={toggleMusic}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                musicEnabled
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show achievement popups (Coming soon)
              </p>
            </div>
            <button
              onClick={toggleNotifications}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                notificationsEnabled
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {notificationsEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="card">
        <h2 className="text-xl font-medieval font-bold mb-4">💾 Save Game</h2>

        <div className="space-y-3">
          {/* Auto-save */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-semibold">Auto-Save</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically save game progress
              </p>
            </div>
            <button
              onClick={toggleAutoSave}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                autoSave
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {autoSave ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Save Interval */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold mb-2">Auto-Save Interval</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              How often to save automatically (seconds)
            </p>
            <div className="flex gap-2">
              {[10, 30, 60, 120].map(interval => (
                <button
                  key={interval}
                  onClick={() => setSaveInterval(interval)}
                  disabled={!autoSave}
                  className={`flex-1 px-3 py-2 rounded-lg transition-all ${
                    saveInterval === interval && autoSave
                      ? 'bg-medieval-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                  } ${!autoSave && 'opacity-50 cursor-not-allowed'}`}
                >
                  {interval}s
                </button>
              ))}
            </div>
          </div>

          {/* Manual Save */}
          <div className="flex gap-2">
            <Tooltip content="Save game now">
              <button
                onClick={() => {
                  saveGame()
                  alert('Game saved!')
                }}
                className="flex-1 btn-primary"
              >
                💾 Save Now
              </button>
            </Tooltip>

            <Tooltip content="Export save to file">
              <button onClick={handleExportSave} className="flex-1 btn-secondary">
                📤 Export Save
              </button>
            </Tooltip>

            <Tooltip content="Import save from file">
              <button onClick={handleImportSave} className="flex-1 btn-secondary">
                📥 Import Save
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-500">
        <h2 className="text-xl font-medieval font-bold mb-4 text-red-600 dark:text-red-400">
          ⚠️ Danger Zone
        </h2>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These actions cannot be undone!
          </p>

          <Tooltip content="Delete all save data and start fresh">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to reset everything? This will delete ALL progress!'
                  )
                ) {
                  resetSave()
                }
              }}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medieval transition-all"
            >
              🗑️ Reset All Progress
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Info */}
      <div className="card bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border border-blue-400">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm">
            <h3 className="font-semibold mb-1">Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Lower resolution improves performance on slower devices</li>
              <li>Auto-save ensures you never lose progress</li>
              <li>Export your save regularly as backup</li>
              <li>Use developer terminal (Ctrl+Shift+~) for testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
