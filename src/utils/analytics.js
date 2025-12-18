const GA_ID = 'G-MDHC4MSZZY'

export function trackPageView(path) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  window.gtag('config', GA_ID, {
    page_path: path,
  })
}
