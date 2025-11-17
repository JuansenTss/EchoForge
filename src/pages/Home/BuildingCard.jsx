import { motion } from 'framer-motion'
import { useState } from 'react'
import useGameStore from '../../stores/gameStore'
import useSettingsStore from '../../stores/settingsStore'
import { RESOURCE_INFO } from '../../data/constants'
import Tooltip from '../../components/common/Tooltip'
import { formatNumber } from '../../utils/formatters'

const BuildingCard = ({ building }) => {
  const { buildings, resources, buildBuilding, getBuildingCost, getTotalMultipliers, canAfford } = useGameStore()
  const { numberFormat } = useSettingsStore()
  const [purchaseAmount, setPurchaseAmount] = useState(1)

  const count = buildings[building.id] || 0

  // Calculate costs for bulk purchase
  const calculateBulkCost = (amount) => {
    const costs = {}
    for (let i = 0; i < amount; i++) {
      const currentCount = count + i
      const cost = {}
      Object.entries(building.baseCost).forEach(([resource, baseAmount]) => {
        cost[resource] = Math.floor(baseAmount * Math.pow(building.costMultiplier, currentCount))
      })

      Object.entries(cost).forEach(([resource, amount]) => {
        costs[resource] = (costs[resource] || 0) + amount
      })
    }
    return costs
  }

  // Calculate max affordable
  const calculateMaxAffordable = () => {
    let max = 0
    let currentCount = count
    let totalCost = {}

    while (max < 10000) {
      const cost = {}
      Object.entries(building.baseCost).forEach(([resource, baseAmount]) => {
        cost[resource] = Math.floor(baseAmount * Math.pow(building.costMultiplier, currentCount))
      })

      const newTotalCost = { ...totalCost }
      Object.entries(cost).forEach(([resource, amount]) => {
        newTotalCost[resource] = (newTotalCost[resource] || 0) + amount
      })

      // Check if we can afford this
      const affordable = Object.entries(newTotalCost).every(([resource, amount]) => {
        return resources[resource] >= amount
      })

      if (!affordable) break

      totalCost = newTotalCost
      max++
      currentCount++
    }

    return max
  }

  const cost = calculateBulkCost(purchaseAmount)
  const canAffordBulk = canAfford(cost)
  const maxAffordable = calculateMaxAffordable()

  const handleBuild = () => {
    for (let i = 0; i < purchaseAmount; i++) {
      if (!buildBuilding(building.id)) break
    }
  }

  // Calculate actual production with multipliers
  const multipliers = getTotalMultipliers()
  const actualProduction = building.produces
    ? building.baseProduction * multipliers.production
    : null

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-5xl">{building.icon}</div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medieval font-bold text-lg">{building.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{building.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs text-gray-500">owned</div>
            </div>
          </div>

          {/* Production */}
          {actualProduction !== null && (
            <div className="mt-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Produces: </span>
              <span className="font-semibold">
                {RESOURCE_INFO[building.produces].icon} +{formatNumber(actualProduction)}/s
              </span>
            </div>
          )}

          {/* Special effects */}
          {building.effect && (
            <div className="mt-2 text-sm text-purple-600 dark:text-purple-400">
              {building.effect.questSpeedBonus && `+${building.effect.questSpeedBonus * 100}% Quest Speed`}
              {building.effect.productionBonus && `+${building.effect.productionBonus * 100}% All Production`}
            </div>
          )}

          {/* Purchase Amount Selector */}
          <div className="mt-3 flex gap-1 flex-wrap">
            {[1, 10, 100, 1000, 10000].map(amount => (
              <Tooltip key={amount} content={amount <= maxAffordable ? `Buy ${amount}` : `Can't afford ${amount}`}>
                <button
                  onClick={() => setPurchaseAmount(amount)}
                  disabled={amount > maxAffordable}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    purchaseAmount === amount
                      ? 'bg-medieval-600 text-white'
                      : amount <= maxAffordable
                      ? 'bg-medieval-200 dark:bg-medieval-800 hover:bg-medieval-300 dark:hover:bg-medieval-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  x{amount}
                </button>
              </Tooltip>
            ))}
            <Tooltip content={maxAffordable > 0 ? `Buy ${maxAffordable} (max)` : "Can't afford any"}>
              <button
                onClick={() => setPurchaseAmount(maxAffordable)}
                disabled={maxAffordable === 0}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  purchaseAmount === maxAffordable && maxAffordable > 0
                    ? 'bg-gold text-gray-900'
                    : maxAffordable > 0
                    ? 'bg-gold-dark hover:bg-gold text-gray-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                MAX ({maxAffordable})
              </button>
            </Tooltip>
          </div>

          {/* Cost and Build Button */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(cost).map(([resource, amount]) => {
                const info = RESOURCE_INFO[resource]
                const hasEnough = resources[resource] >= amount
                return (
                  <Tooltip key={resource} content={`${info.name}: ${formatNumber(resources[resource], numberFormat)} / ${formatNumber(amount, numberFormat)}`}>
                    <div
                      className={`text-sm px-2 py-1 rounded ${
                        hasEnough
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {info.icon} {formatNumber(amount, numberFormat)}
                    </div>
                  </Tooltip>
                )
              })}
            </div>

            <button
              onClick={handleBuild}
              disabled={!canAffordBulk}
              className={`px-4 py-2 rounded-lg font-medieval transition-all ${
                canAffordBulk
                  ? 'bg-medieval-600 hover:bg-medieval-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Build {purchaseAmount > 1 ? `x${purchaseAmount}` : ''}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BuildingCard
