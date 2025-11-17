import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import Menu from './Menu'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
      <Navigation />
      <Menu />
    </div>
  )
}

export default Layout
