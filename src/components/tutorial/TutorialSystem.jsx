import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tutorialData, TUTORIALS } from '../../data/tutorials'
import Tooltip from '../common/Tooltip'

const TutorialSystem = ({ isOpen, onClose, tutorialId = TUTORIALS.WELCOME }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTutorial, setSelectedTutorial] = useState(tutorialId)

  const tutorial = tutorialData[selectedTutorial]
  const step = tutorial?.steps[currentStep]

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelectTutorial = (tutId) => {
    setSelectedTutorial(tutId)
    setCurrentStep(0)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Tutorial Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-medieval-700 dark:bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tutorial.icon}</span>
                <h2 className="text-2xl font-medieval font-bold">{tutorial.title}</h2>
              </div>
              <Tooltip content="Close tutorial">
                <button
                  onClick={onClose}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </Tooltip>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar - Tutorial List */}
              <div className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-medieval font-bold mb-3">Tutorials</h3>
                  <div className="space-y-1">
                    {Object.entries(tutorialData).map(([tutId, tut]) => (
                      <button
                        key={tutId}
                        onClick={() => handleSelectTutorial(tutId)}
                        className={`w-full text-left px-3 py-2 rounded transition-all ${
                          selectedTutorial === tutId
                            ? 'bg-medieval-600 text-white'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{tut.icon}</span>
                          <span className="text-sm">{tut.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Step Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-medieval font-bold mb-4">
                        {step.title}
                      </h3>
                      <div className="prose dark:prose-invert max-w-none">
                        {step.content.split('\n').map((paragraph, index) => {
                          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return (
                              <h4 key={index} className="font-bold text-lg mt-4 mb-2">
                                {paragraph.replace(/\*\*/g, '')}
                              </h4>
                            )
                          }
                          if (paragraph.startsWith('• ')) {
                            return (
                              <li key={index} className="ml-6">
                                {paragraph.substring(2)}
                              </li>
                            )
                          }
                          if (paragraph.trim() === '') {
                            return <div key={index} className="h-4" />
                          }
                          return (
                            <p key={index} className="mb-3">
                              {paragraph}
                            </p>
                          )
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress & Navigation */}
                <div className="border-t border-gray-300 dark:border-gray-700 p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>
                        Step {currentStep + 1} of {tutorial.steps.length}
                      </span>
                      <span>
                        {Math.round(((currentStep + 1) / tutorial.steps.length) * 100)}% Complete
                      </span>
                    </div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-medieval-600"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentStep + 1) / tutorial.steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <Tooltip content="Go to previous step">
                      <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className={`px-6 py-2 rounded-lg font-medieval transition-all ${
                          currentStep === 0
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                      >
                        ← Previous
                      </button>
                    </Tooltip>

                    <div className="flex gap-2">
                      {tutorial.steps.map((_, index) => (
                        <Tooltip key={index} content={`Go to step ${index + 1}`}>
                          <button
                            onClick={() => setCurrentStep(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentStep
                                ? 'bg-medieval-600 w-8'
                                : index < currentStep
                                ? 'bg-medieval-400'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        </Tooltip>
                      ))}
                    </div>

                    <Tooltip
                      content={
                        currentStep === tutorial.steps.length - 1
                          ? 'Close tutorial'
                          : 'Go to next step'
                      }
                    >
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-medieval-600 hover:bg-medieval-700 text-white rounded-lg font-medieval transition-all"
                      >
                        {currentStep === tutorial.steps.length - 1 ? 'Finish' : 'Next →'}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TutorialSystem
