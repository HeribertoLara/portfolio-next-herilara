const GA_ID = 'G-MDHC4MSZZY'
const CONSENT_KEY = 'heri_cookie_consent_v1'
const CONSENT_ACCEPTED = 'accepted'
const CONSENT_REJECTED = 'rejected'
export const OPEN_COOKIE_PREFERENCES_EVENT = 'heri:open-cookie-preferences'
let loadPromise = null

function getStoredConsent() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(CONSENT_KEY)
}

function setStoredConsent(value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, value)
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === CONSENT_ACCEPTED
}

export function hasRejectedAnalytics() {
  return getStoredConsent() === CONSENT_REJECTED
}

export function getAnalyticsConsentState() {
  const consent = getStoredConsent()
  if (consent === CONSENT_ACCEPTED || consent === CONSENT_REJECTED) {
    return consent
  }

  return 'pending'
}

export function loadAnalytics() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (typeof window.gtag === 'function') return Promise.resolve(true)
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
    })
    window.gtag('config', GA_ID, {
      send_page_view: false,
    })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script.onload = () => resolve(true)
    script.onerror = () => {
      loadPromise = null
      reject(new Error('No se pudo cargar Google Analytics'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

export async function grantAnalyticsConsent() {
  setStoredConsent(CONSENT_ACCEPTED)
  await loadAnalytics()
}

export function denyAnalyticsConsent() {
  setStoredConsent(CONSENT_REJECTED)
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT))
}

export function trackPageView(path) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return
  if (typeof window.gtag !== 'function') return

  window.gtag('config', GA_ID, {
    page_path: path,
  })
}
