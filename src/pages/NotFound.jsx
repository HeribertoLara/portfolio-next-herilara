import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import './page.css'

function NotFound() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/404` : undefined

  useSEO({
    title: t('notFound.seo.title'),
    description: t('notFound.seo.description'),
    canonical,
    robots: 'noindex, nofollow',
  })

  return (
    <main className="page not-found">
      <div className="not-found__content">
        <p className="not-found__eyebrow">404</p>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.body')}</p>
        <div className="not-found__actions">
          <a className="btn" href="/">
            {t('notFound.cta.home')}
          </a>
          <a className="btn btn--outline" href="/portafolio-proyectos-nextjs">
            {t('notFound.cta.portfolio')}
          </a>
        </div>
      </div>
    </main>
  )
}

export default NotFound
