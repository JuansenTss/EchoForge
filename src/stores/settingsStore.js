import { create } from 'zustand'
import localforage from 'localforage'
import { NUMBER_FORMATS } from '../utils/formatters'

const SETTINGS_KEY = 'echoforge_settings'

const useSettingsStore = create((set, get) => ({
  // Settings
  darkMode: true,
  soundEnabled: true,
  musicEnabled: true,
  notificationsEnabled: true,
  showAnimations: true,
  showCombat: true,
  showBuilding: true,
  autoSave: true,
  saveInterval: 30, // seconds

  // Display settings
  resolution: 'medium', // low, medium, high
  numberFormat: NUMBER_FORMATS.NORMAL,

  // Menu state
  menuOpen: false,
  currentMenuTab: 'guide',

  // Initialize settings
  initializeSettings: async () => {
    try {
      const saved = await localforage.getItem(SETTINGS_KEY)
      if (saved) {
        set(saved)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  },

  // Save settings
  saveSettings: async () => {
    try {
      const state = get()
      await localforage.setItem(SETTINGS_KEY, {
        darkMode: state.darkMode,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        notificationsEnabled: state.notificationsEnabled,
        showAnimations: state.showAnimations,
        showCombat: state.showCombat,
        showBuilding: state.showBuilding,
        autoSave: state.autoSave,
        saveInterval: state.saveInterval,
        resolution: state.resolution,
        numberFormat: state.numberFormat,
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  },

  // Toggle dark mode
  toggleDarkMode: () => {
    set(state => ({ darkMode: !state.darkMode }))
    get().saveSettings()
  },

  // Toggle sound
  toggleSound: () => {
    set(state => ({ soundEnabled: !state.soundEnabled }))
    get().saveSettings()
  },

  // Toggle music
  toggleMusic: () => {
    set(state => ({ musicEnabled: !state.musicEnabled }))
    get().saveSettings()
  },

  // Toggle notifications
  toggleNotifications: () => {
    set(state => ({ notificationsEnabled: !state.notificationsEnabled }))
    get().saveSettings()
  },

  // Toggle animations
  toggleAnimations: () => {
    set(state => ({ showAnimations: !state.showAnimations }))
    get().saveSettings()
  },

  // Toggle auto-save
  toggleAutoSave: () => {
    set(state => ({ autoSave: !state.autoSave }))
    get().saveSettings()
  },

  // Set save interval
  setSaveInterval: (interval) => {
    set({ saveInterval: interval })
    get().saveSettings()
  },

  // Toggle menu
  toggleMenu: () => {
    set(state => ({ menuOpen: !state.menuOpen }))
  },

  // Set menu tab
  setMenuTab: (tab) => {
    set({ currentMenuTab: tab })
  },

  // Toggle combat animation
  toggleCombat: () => {
    set(state => ({ showCombat: !state.showCombat }))
    get().saveSettings()
  },

  // Toggle building animation
  toggleBuilding: () => {
    set(state => ({ showBuilding: !state.showBuilding }))
    get().saveSettings()
  },

  // Set resolution
  setResolution: (resolution) => {
    set({ resolution })
    get().saveSettings()
  },

  // Set number format
  setNumberFormat: (format) => {
    set({ numberFormat: format })
    get().saveSettings()
  },
}))

export default useSettingsStore
