import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/quests', label: 'Quests', icon: '🗺️' },
    { path: '/achievements', label: 'Achievements', icon: '🏆' },
    { path: '/ascension', label: 'Ascension', icon: '🌅' },
    { path: '/transcendence', label: 'Transcendence', icon: '✨' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="bg-medieval-700 dark:bg-gray-800 border-t-4 border-medieval-500 shadow-lg">
      <div className="flex justify-around">
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center py-3 transition-all ${
                isActive
                  ? 'bg-medieval-600 dark:bg-gray-700 text-gold-DEFAULT'
                  : 'text-white hover:bg-medieval-600 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medieval">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
