import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import { hasAnalyticsConsent, loadAnalytics, trackPageView } from '../utils/analytics'

function Layout({ children }) {
  const { pathname } = useLocation()
  const lastTrackedPath = useRef(null)
  const isHome = pathname === '/'

  useEffect(() => {
    if (!hasAnalyticsConsent()) return

    loadAnalytics().catch(() => {})
  }, [])

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
      <CookieConsent />
    </div>
  )
}

export default Layout
