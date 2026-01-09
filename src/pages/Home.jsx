import './home.css'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'

function Home() {
  const { i18n, t } = useTranslation()
  const nextLocale = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: t('home.seo.title'),
    description: t('home.seo.description'),
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: t('home.schema.name'),
      url: canonical,
      description: t('home.schema.description'),
      creator: {
        '@type': 'Person',
        name: 'Heri Lara',
        sameAs: [
          'https://www.linkedin.com/in/hlara9012/',
          'https://wa.me/529848045757',
          'mailto:hlara9012@gmail.com',
        ],
      },
    },
  })

  return (
    <main className="home">
      <div className="home__content">
        <div className="home__text">
          <nav className="home__nav">
            <a href="/sobre-heriberto-lara" data-label={t('home.nav.hover.about')}>
              {t('home.nav.hello')}
            </a>
            <a href="/portafolio-proyectos-nextjs" data-label={t('home.nav.hover.portfolio')}>
              {t('home.nav.name')}
            </a>
            <a href="/contacto-desarrollador-web" data-label={t('home.nav.hover.contact')}>
              {t('home.nav.contact')}
            </a>
          </nav>
          <p className="home__typing">{t('home.typing')}</p>
        </div>
        <div className="home__image">
          <img src="/images/yo-con-traje.png" alt={t('home.image.alt')} width="360" height="690" />
        </div>
      </div>
      <button
        type="button"
        className="home__lang"
        onClick={() => i18n.changeLanguage(nextLocale)}
        aria-label={t('common.changeLanguage', { lang: nextLocale.toUpperCase() })}
      >
        {nextLocale.toUpperCase()}
      </button>
    </main>
  )
}

export default Home
