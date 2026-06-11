import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import './home.css'

const sectionImages = [
  '/images/acerca_de_mi.png',
  '/images/laboratorio.png',
  '/images/ventas2.png',
  '/images/contacto.png',
]

function Home() {
  const { i18n, t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const nextLocale = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/` : undefined
  const ogImage = origin ? `${origin}/images/acerca_de_mi.png` : undefined

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

  const sections = [
    {
      id: 'about',
      index: '01',
      kicker: t('about.eyebrow'),
      line1: i18n.resolvedLanguage === 'en' ? 'I am' : 'Me llamo',
      line2: 'Heri Lara',
      subline: t('home.typing'),
      to: '/sobre-heriberto-lara',
    },
    {
      id: 'portfolio',
      index: '02',
      kicker: t('portfolio.eyebrow'),
      line1: i18n.resolvedLanguage === 'en' ? 'My' : 'Mi',
      line2: i18n.resolvedLanguage === 'en' ? 'Portfolio' : 'Portafolio',
      subline: t('portfolio.summary'),
      to: '/portafolio',
    },
    {
      id: 'clients',
      index: '03',
      kicker: t('nav.clients'),
      line1: i18n.resolvedLanguage === 'en' ? 'Get more' : 'Consigue mas',
      line2: i18n.resolvedLanguage === 'en' ? 'Clients' : 'Clientes',
      subline: t('clientes.subtitle'),
      to: '/consigue-mas-clientes',
    },
    {
      id: 'contact',
      index: '04',
      kicker: t('contact.eyebrow'),
      line1: i18n.resolvedLanguage === 'en' ? "Let's work" : 'Trabajemos',
      line2: i18n.resolvedLanguage === 'en' ? 'Together' : 'Juntos',
      subline: t('contact.subtitle'),
      to: '/contacto-desarrollador-web',
    },
  ]

  const activeSection = sections[activeIndex]
  const updateActiveIndex = (index) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? currentIndex : index))
  }

  return (
    <main className="home home-redesign">
      <div className="home-redesign__bg">
        <div className="home-redesign__floor" />
        <div className="home-redesign__blob home-redesign__blob--red" />
        <div className="home-redesign__blob home-redesign__blob--blue" />
        <div className="home-redesign__grain" />
      </div>

      <header className="home-redesign__topbar">
        <div className="home-redesign__brand">
          <span className="home-redesign__brand-mark" />
          <span className="home-redesign__brand-name">HERI LARA</span>
        </div>
        <div className="home-redesign__counter" aria-label="Section counter">
          <span>{activeSection.index}</span>
          <span>/</span>
          <span>04</span>
        </div>
      </header>

      <section className="home-redesign__split">
        <div className="home-redesign__copy">
          <div className="home-redesign__kicker is-ready">
            <span className="home-redesign__kicker-line" />
            <span className="home-redesign__kicker-text">{activeSection.kicker}</span>
          </div>

          <div className="home-redesign__title is-ready">
            <div className="home-redesign__title-line">
              <span className="home-redesign__title-text">{activeSection.line1}</span>
              <span className="home-redesign__title-glow">{activeSection.line1}</span>
            </div>
            <div className="home-redesign__title-line">
              <span className="home-redesign__title-text">{activeSection.line2}</span>
              <span className="home-redesign__title-glow">{activeSection.line2}</span>
            </div>
          </div>

          <p className="home-redesign__subline is-ready">{activeSection.subline}</p>

          <nav className="home-redesign__menu" aria-label="Sections">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                to={section.to}
                className={`home-redesign__menu-row${index === activeIndex ? ' is-active' : ''}`}
                onMouseEnter={() => updateActiveIndex(index)}
                onFocus={() => updateActiveIndex(index)}
              >
                <span className="home-redesign__menu-fill" />
                <span className="home-redesign__menu-index">{section.index}</span>
                <span className="home-redesign__menu-label">{section.kicker}</span>
                <span className="home-redesign__menu-arrow">→</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="home-redesign__visual">
          <div className="home-redesign__frame">
            {sectionImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={sections[index].line2}
                className={`home-redesign__image${index === activeIndex ? ' is-active' : ''}`}
                width="520"
                height="650"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
            ))}
            <div className="home-redesign__image-shade" />
            <div className="home-redesign__image-meta">
              <span>{activeSection.index}</span>
              <span>{activeSection.kicker}</span>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        className="home-redesign__lang"
        onClick={() => i18n.changeLanguage(nextLocale)}
        aria-label={t('common.changeLanguage', { lang: nextLocale.toUpperCase() })}
      >
        {nextLocale.toUpperCase()}
      </button>
    </main>
  )
}

export default Home
