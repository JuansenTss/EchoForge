import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false)

  if (!content) return children

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          >
            <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl max-w-xs whitespace-pre-line">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 ${
                  position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1'
                  : position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1'
                  : position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1'
                  : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
