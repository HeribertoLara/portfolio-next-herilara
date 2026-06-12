import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import './page.css'

function Privacy() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/privacidad` : undefined

  useSEO({
    title: t('privacy.seo.title'),
    description: t('privacy.seo.description'),
    canonical,
  })

  return (
    <main className="page page--legal">
      <article className="legal-card">
        <p className="legal-card__eyebrow">{t('privacy.eyebrow')}</p>
        <h1 className="legal-card__title">{t('privacy.title')}</h1>
        <p className="legal-card__intro">{t('privacy.intro')}</p>

        <section className="legal-card__section">
          <h2>{t('privacy.section.data.title')}</h2>
          <p>{t('privacy.section.data.body')}</p>
        </section>

        <section className="legal-card__section">
          <h2>{t('privacy.section.cookies.title')}</h2>
          <p>{t('privacy.section.cookies.body')}</p>
        </section>

        <section className="legal-card__section">
          <h2>{t('privacy.section.analytics.title')}</h2>
          <p>{t('privacy.section.analytics.body')}</p>
        </section>

        <section className="legal-card__section">
          <h2>{t('privacy.section.rights.title')}</h2>
          <p>{t('privacy.section.rights.body')}</p>
        </section>

        <section className="legal-card__section">
          <h2>{t('privacy.section.contact.title')}</h2>
          <p>{t('privacy.section.contact.body')}</p>
        </section>
      </article>
    </main>
  )
}

export default Privacy
