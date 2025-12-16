import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="layout">
      {!isHome && <Header />}
      {children}
      {!isHome && <Footer />}
    </div>
  )
}

export default Layout
