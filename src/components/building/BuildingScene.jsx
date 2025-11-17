import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import { buildingsData } from '../../data/buildings'
import { RESOURCE_INFO } from '../../data/constants'
import { formatNumber } from '../../utils/formatters'
import Tooltip from '../common/Tooltip'

const BuildingScene = () => {
  const { buildings, productionRates } = useGameStore()
  const { resolution, numberFormat } = useSettingsStore()

  const ownedBuildings = Object.entries(buildings)
    .filter(([id, count]) => count > 0)
    .map(([id, count]) => ({ ...buildingsData[id], count }))

  const resolutionClass = resolution === 'low' ? 'scale-75' : resolution === 'high' ? 'scale-125' : 'scale-100'

  // Group resources being produced
  const activeResources = Object.entries(productionRates).filter(([_, rate]) => rate > 0)

  return (
    <div className={`relative ${resolutionClass} transition-transform origin-top`}>
      <div className="bg-gradient-to-b from-medieval-200 via-medieval-100 to-green-200 dark:from-gray-800 dark:via-gray-900 dark:to-green-900 rounded-lg p-6 relative overflow-hidden min-h-[400px]">
        {/* Sky/Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300 to-transparent dark:from-blue-900 opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-green-600 to-transparent dark:from-green-900 opacity-30" />
        </div>

        {/* Buildings Display */}
        <div className="relative z-10">
          <h3 className="text-lg font-medieval font-bold text-center mb-4 text-medieval-800 dark:text-medieval-200">
            Your Kingdom
          </h3>

          {ownedBuildings.length === 0 ? (
            <div className="text-center py-16 text-gray-600 dark:text-gray-400">
              <p className="text-4xl mb-2">🏗️</p>
              <p>No buildings yet. Start building to see your kingdom grow!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {ownedBuildings.map((building, index) => (
                <Tooltip
                  key={building.id}
                  content={`${building.name}\nCount: ${building.count}\nProduces: ${building.produces ? RESOURCE_INFO[building.produces].name : 'Special'}\n${building.produces && productionRates[building.produces] ? `+${formatNumber(productionRates[building.produces], numberFormat)}/s` : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Building Icon */}
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                      className="text-5xl text-center cursor-help"
                    >
                      {building.icon}
                    </motion.div>

                    {/* Count Badge */}
                    <div className="absolute -top-2 -right-2 bg-medieval-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {building.count > 99 ? '99+' : building.count}
                    </div>

                    {/* Floating Resources */}
                    {building.produces && productionRates[building.produces] > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -40 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 text-xl"
                      >
                        {RESOURCE_INFO[building.produces].icon}
                      </motion.div>
                    )}
                  </motion.div>
                </Tooltip>
              ))}
            </div>
          )}

          {/* Production Summary */}
          {activeResources.length > 0 && (
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 bg-opacity-80 rounded-lg">
              <h4 className="text-sm font-medieval font-bold mb-2 text-center">Production Rates</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {activeResources.map(([resource, rate]) => {
                  const info = RESOURCE_INFO[resource]
                  return (
                    <div key={resource} className="flex items-center gap-2 text-sm">
                      <span className="text-xl">{info.icon}</span>
                      <div>
                        <div className="font-semibold text-xs">{info.name}</div>
                        <div className="text-green-600 dark:text-green-400 font-bold">
                          +{formatNumber(rate, numberFormat)}/s
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute top-10 right-10 text-2xl"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{
            x: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 text-2xl"
        >
          ☁️
        </motion.div>
      </div>
    </div>
  )
}

export default BuildingScene
