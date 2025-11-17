import { useState } from 'react'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import { RESOURCE_INFO, RESOURCES } from '../../data/constants'
import { formatNumber } from '../../utils/formatters'
import Tooltip from '../common/Tooltip'

const Header = () => {
  const { player, resources, productionRates, buildings, quests, ascension, transcendence } = useGameStore()
  const { toggleMenu, darkMode, toggleDarkMode, numberFormat } = useSettingsStore()
  const [showResources, setShowResources] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const mainResources = [RESOURCES.GOLD, RESOURCES.WOOD, RESOURCES.STONE, RESOURCES.IRON]

  // Calculate kingdom stats
  const totalBuildings = Object.values(buildings).reduce((sum, count) => sum + count, 0)
  const totalQuests = quests.completed.length

  return (
    <header className="bg-medieval-700 dark:bg-gray-800 text-white p-4 shadow-lg border-b-4 border-medieval-500">
      <div className="flex items-center justify-between">
        {/* Player info */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ☰
          </button>
          <div>
            <h1 className="font-medieval text-xl">{player.name || 'EchoForge'}</h1>
            <div className="text-sm opacity-75">
              Level {player.level} • {formatNumber(player.exp)}/{formatNumber(player.expToNextLevel)} EXP
            </div>
          </div>
        </div>

        {/* Resources and Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Tooltip content={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} position="bottom">
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 bg-medieval-600 hover:bg-medieval-500 rounded-lg transition-all text-xl"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </Tooltip>

          {/* Stats Toggle */}
          <Tooltip content={showStats ? 'Hide kingdom stats' : 'Show kingdom stats'} position="bottom">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-2 py-1 bg-medieval-600 hover:bg-medieval-500 rounded transition-colors text-sm"
            >
              📊
            </button>
          </Tooltip>

          {/* Main Resources */}
          {mainResources.map(resource => {
            const info = RESOURCE_INFO[resource]
            return (
              <Tooltip
                key={resource}
                content={`${info.name}\nCurrent: ${formatNumber(resources[resource] || 0, numberFormat)}\nProduction: +${formatNumber(productionRates[resource] || 0, numberFormat)}/s`}
                position="bottom"
              >
                <div className="resource-display cursor-help">
                  <span>{info.icon}</span>
                  <span className="font-semibold">{formatNumber(resources[resource] || 0, numberFormat)}</span>
                </div>
              </Tooltip>
            )
          })}

          {/* More Resources Toggle */}
          <Tooltip content={showResources ? 'Hide resources' : 'Show all resources'} position="bottom">
            <button
              onClick={() => setShowResources(!showResources)}
              className="px-2 py-1 bg-medieval-600 hover:bg-medieval-500 rounded transition-colors"
            >
              {showResources ? '▲' : '▼'}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Kingdom Stats */}
      {showStats && (
        <div className="mt-4 pt-4 border-t border-medieval-600 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tooltip content="Total buildings owned" position="bottom">
            <div className="bg-medieval-600 bg-opacity-50 rounded px-3 py-2">
              <div className="text-xs opacity-75">Buildings</div>
              <div className="text-xl font-bold">{totalBuildings}</div>
            </div>
          </Tooltip>

          <Tooltip content="Quests completed" position="bottom">
            <div className="bg-medieval-600 bg-opacity-50 rounded px-3 py-2">
              <div className="text-xs opacity-75">Quests</div>
              <div className="text-xl font-bold">{totalQuests}</div>
            </div>
          </Tooltip>

          <Tooltip content="Times you've ascended" position="bottom">
            <div className="bg-purple-600 bg-opacity-50 rounded px-3 py-2">
              <div className="text-xs opacity-75">Ascensions</div>
              <div className="text-xl font-bold">{ascension.count}</div>
            </div>
          </Tooltip>

          <Tooltip content="Times you've transcended" position="bottom">
            <div className="bg-gold bg-opacity-50 rounded px-3 py-2 text-gray-900">
              <div className="text-xs opacity-75">Transcendences</div>
              <div className="text-xl font-bold">{transcendence.count}</div>
            </div>
          </Tooltip>
        </div>
      )}

      {/* Extended resources */}
      {showResources && (
        <div className="mt-4 pt-4 border-t border-medieval-600 grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.values(RESOURCES).filter(r => !mainResources.includes(r)).map(resource => {
            const info = RESOURCE_INFO[resource]
            return (
              <Tooltip
                key={resource}
                content={`${info.name}\nCurrent: ${formatNumber(resources[resource] || 0, numberFormat)}\nProduction: +${formatNumber(productionRates[resource] || 0, numberFormat)}/s`}
                position="bottom"
              >
                <div className="resource-display text-sm cursor-help">
                  <span>{info.icon}</span>
                  <span>{info.name}</span>
                  <span className="font-semibold ml-auto">{formatNumber(resources[resource] || 0, numberFormat)}</span>
                </div>
              </Tooltip>
            )
          })}
        </div>
      )}

      {/* Level progress bar */}
      <div className="mt-2 progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(player.exp / player.expToNextLevel) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
          {Math.floor((player.exp / player.expToNextLevel) * 100)}%
        </div>
      </div>
    </header>
  )
}

export default Header
