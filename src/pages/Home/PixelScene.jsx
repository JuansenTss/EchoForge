import { motion } from 'framer-motion'
import useGameStore from '../../stores/gameStore'

const PixelScene = () => {
  const { buildings } = useGameStore()

  // Calculate total buildings for scene complexity
  const totalBuildings = Object.values(buildings).reduce((sum, count) => sum + count, 0)

  const sceneElements = [
    { id: 'castle', icon: '🏰', x: '50%', y: '40%', delay: 0 },
    { id: 'tree1', icon: '🌳', x: '20%', y: '60%', delay: 0.1 },
    { id: 'tree2', icon: '🌳', x: '75%', y: '55%', delay: 0.15 },
    { id: 'mountain', icon: '⛰️', x: '10%', y: '30%', delay: 0.2 },
    { id: 'sun', icon: '☀️', x: '85%', y: '15%', delay: 0.25 },
  ]

  // Add more elements based on building count
  if (totalBuildings > 10) {
    sceneElements.push({ id: 'tower', icon: '🗼', x: '65%', y: '45%', delay: 0.3 })
  }
  if (totalBuildings > 25) {
    sceneElements.push({ id: 'dragon', icon: '🐉', x: '30%', y: '20%', delay: 0.35 })
  }
  if (totalBuildings > 50) {
    sceneElements.push({ id: 'wizard', icon: '🧙', x: '45%', y: '65%', delay: 0.4 })
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-300 via-blue-200 to-green-300 dark:from-blue-900 dark:via-purple-900 dark:to-green-900 rounded-lg overflow-hidden">
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-600 dark:bg-green-800" />

      {/* Scene Elements */}
      {sceneElements.map(element => (
        <motion.div
          key={element.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: element.delay, type: 'spring' }}
          className="absolute text-6xl pixel-art animate-float"
          style={{
            left: element.x,
            top: element.y,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-sm font-pixel">
        🏛️ {totalBuildings} Buildings
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 text-2xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 text-2xl"
      >
        ✨
      </motion.div>
    </div>
  )
}

export default PixelScene
