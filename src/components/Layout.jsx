import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { trackPageView } from '../utils/analytics'

function Layout({ children }) {
  const { pathname } = useLocation()
  const lastTrackedPath = useRef(null)
  const isHome = pathname === '/'

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return

    lastTrackedPath.current = pathname
    trackPageView(pathname)
  }, [pathname])

  return (
    <div className="layout">
      {!isHome && <Header />}
      {children}
      {!isHome && <Footer />}
    </div>
  )
}

export default Layout
