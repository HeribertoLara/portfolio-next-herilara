import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  denyAnalyticsConsent,
  getAnalyticsConsentState,
  grantAnalyticsConsent,
  OPEN_COOKIE_PREFERENCES_EVENT,
  trackPageView,
} from '../utils/analytics'
import './cookie-consent.css'

function CookieConsent() {
  const { t } = useTranslation()
  const [consentState, setConsentState] = useState('pending')
  const [isOpen, setIsOpen] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const nextState = getAnalyticsConsentState()
    setConsentState(nextState)
    setIsOpen(nextState === 'pending')

    function handleOpenPreferences() {
      setConsentState(getAnalyticsConsentState())
      setIsOpen(true)
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences)

    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences)
    }
  }, [])

  async function handleAccept() {
    setIsSaving(true)

    try {
      await grantAnalyticsConsent()
      trackPageView(window.location.pathname)
      setConsentState('accepted')
      setIsOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  function handleReject() {
    denyAnalyticsConsent()
    setConsentState('rejected')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <aside
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent__content">
        <p className="cookie-consent__eyebrow">{t('cookies.eyebrow')}</p>
        <h2 id="cookie-consent-title">{t('cookies.title')}</h2>
        <p>{t('cookies.body')}</p>
        {consentState !== 'pending' && <p className="cookie-consent__status">{t(`cookies.status.${consentState}`)}</p>}
      </div>
      <div className="cookie-consent__actions">
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--ghost"
          onClick={handleReject}
          disabled={isSaving}
        >
          {t('cookies.reject')}
        </button>
        <button
          type="button"
          className="cookie-consent__button cookie-consent__button--primary"
          onClick={handleAccept}
          disabled={isSaving}
        >
          {t('cookies.accept')}
        </button>
      </div>
    </aside>
  )
}

export default CookieConsent
