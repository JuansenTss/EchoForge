import { useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'
import { RACES, RACE_INFO } from '../../data/constants'

const CharacterCreation = () => {
  const { createCharacter, generateRandomName } = useGameStore()
  const [selectedRace, setSelectedRace] = useState(RACES.HUMAN)
  const [name, setName] = useState('')
  const [step, setStep] = useState(1)

  const handleRandomName = () => {
    const randomName = generateRandomName(selectedRace)
    setName(randomName)
  }

  const handleCreate = () => {
    if (name.trim()) {
      createCharacter(name.trim(), selectedRace)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-medieval-200 to-medieval-400 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medieval font-bold gold-shimmer mb-2">
            EchoForge
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Begin your medieval adventure
          </p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-medieval font-bold mb-4">Choose Your Race</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(RACE_INFO).map(([raceKey, raceData]) => (
                  <motion.button
                    key={raceKey}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRace(raceKey)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRace === raceKey
                        ? 'border-medieval-600 bg-medieval-100 dark:bg-medieval-900 shadow-lg'
                        : 'border-gray-300 dark:border-gray-700 hover:border-medieval-400'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{raceData.icon}</span>
                      <h3 className="text-xl font-medieval font-bold">{raceData.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {raceData.description}
                    </p>
                    <div className="text-xs text-medieval-700 dark:text-medieval-400 font-semibold">
                      {raceData.bonus.goldMultiplier && `+${Math.round((raceData.bonus.goldMultiplier - 1) * 100)}% Gold`}
                      {raceData.bonus.expMultiplier && `+${Math.round((raceData.bonus.expMultiplier - 1) * 100)}% EXP`}
                      {raceData.bonus.productionMultiplier && `+${Math.round((raceData.bonus.productionMultiplier - 1) * 100)}% Production`}
                      {raceData.bonus.questSpeedMultiplier && `+${Math.round((raceData.bonus.questSpeedMultiplier - 1) * 100)}% Quest Speed`}
                      {raceData.bonus.noProductionPenalty && 'No Production Penalties'}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="btn-primary px-8"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-medieval font-bold mb-4">Choose Your Name</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-medieval-400 dark:border-medieval-600 bg-white dark:bg-gray-700 font-medieval text-lg focus:outline-none focus:ring-2 focus:ring-medieval-600"
                    maxLength={30}
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleRandomName}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                  >
                    🎲 Random Name
                  </button>
                </div>

                {name && (
                  <div className="p-4 bg-medieval-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-center">
                      <span className="text-lg font-medieval">
                        {name}
                      </span>
                      <br />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {RACE_INFO[selectedRace].name} {RACE_INFO[selectedRace].icon}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary px-8"
              >
                ← Back
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className={`px-8 py-2 rounded-lg font-medieval transition-all ${
                  name.trim()
                    ? 'bg-medieval-600 hover:bg-medieval-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Begin Adventure
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default CharacterCreation
