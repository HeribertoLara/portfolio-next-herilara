import { useEffect, useState } from 'react'
import { FaBolt, FaBriefcase, FaGraduationCap, FaLaptopCode } from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import './page.css'
import './about.css'

function About() {
  const { t } = useTranslation()
  const [titleReady, setTitleReady] = useState(false)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/sobre-heriberto-lara` : undefined
  const ogImage = origin ? `${origin}/images/acerca_de_mi.png` : undefined

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setTitleReady(true)
    })

    return () => window.cancelAnimationFrame(id)
  }, [])

  useSEO({
    title: t('about.seo.title'),
    description: t('about.seo.description'),
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Heri Lara',
      jobTitle: t('about.schema.jobTitle'),
      url: canonical,
      image: origin ? `${origin}/images/acerca_de_mi.png` : undefined,
      sameAs: [
        'https://www.linkedin.com/in/hlara9012/',
        'https://wa.me/529848045757',
        'mailto:hlara9012@gmail.com',
      ],
      knowsAbout: ['React', 'Next.js', 'n8n', 'WhatsApp API', 'HubSpot', 'GoHighLevel'],
    },
  })

  const impactItems = [
    t('about.impact.item1'),
    t('about.impact.item2'),
    t('about.impact.item3'),
  ]
  const techItems = t('about.tech.items', { returnObjects: true })
  const eduItems = t('about.edu.items', { returnObjects: true })
  const softItems = t('about.soft.items', { returnObjects: true })

  return (
    <main className="redesign-page about-page">
      <div className="redesign-page__bg">
        <div className="redesign-page__floor" />
        <div className="redesign-page__blob redesign-page__blob--red" />
        <div className="redesign-page__blob redesign-page__blob--blue" />
        <div className="redesign-page__grain" />
      </div>

      <section className="redesign-shell about-page__hero">
        <div className="about-page__copy">
          <p className="redesign-eyebrow">{t('about.eyebrow')}</p>
          <h1 className={`redesign-title about-page__title${titleReady ? ' is-ready' : ''}`}>
            <span className="about-page__title-line">
              <span className="about-page__title-glow" aria-hidden="true">
                {t('about.title')}
              </span>
              <span className="about-page__title-text">{t('about.title')}</span>
            </span>
            <strong className="about-page__title-line">
              <span className="about-page__title-glow" aria-hidden="true">
                {t('about.schema.jobTitle')}
              </span>
              <span className="about-page__title-text">{t('about.schema.jobTitle')}</span>
            </strong>
          </h1>
          <p className="redesign-lede">{t('about.role')}</p>
          <div className="about-page__actions">
            <a className="redesign-button redesign-button--primary" href="/portafolio-proyectos-nextjs">
              {t('about.cta.projects')}
            </a>
          </div>
        </div>

        <div className="about-page__profile">
          <div className="about-page__portrait">
            <img
              src="/images/acerca_de_mi.png"
              alt="Heri Lara"
              width="420"
              height="560"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="about-page__stats">
            <article className="redesign-card redesign-card--compact">
              <p className="about-page__stat-value">60%</p>
              <p className="about-page__stat-label">{t('about.stats.conversion')}</p>
            </article>
            <article className="redesign-card redesign-card--compact">
              <p className="about-page__stat-value about-page__stat-value--red">-70%</p>
              <p className="about-page__stat-label">{t('about.stats.response')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="redesign-shell about-page__grid">
        <article className="redesign-card">
          <div className="redesign-card__header">
            <span className="redesign-card__icon redesign-card__icon--red">
              <FaBolt />
            </span>
            <h2>{t('about.impact.title')}</h2>
          </div>
          <ul className="redesign-list">
            {impactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="redesign-card">
          <div className="redesign-card__header">
            <span className="redesign-card__icon redesign-card__icon--blue">
              <FaLaptopCode />
            </span>
            <h2>{t('about.tech.title')}</h2>
          </div>
          <div className="redesign-chips">
            {techItems.map((item, index) => (
              <span
                key={item}
                className={index % 2 === 0 ? 'redesign-chip redesign-chip--blue' : 'redesign-chip redesign-chip--red'}
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="redesign-card">
          <div className="redesign-card__header">
            <span className="redesign-card__icon redesign-card__icon--blue">
              <FaBriefcase />
            </span>
            <h2>{t('about.exp.title')}</h2>
          </div>
          <div className="about-page__timeline">
            <div className="about-page__timeline-item">
              <p className="about-page__timeline-role">{t('about.exp.1.role')}</p>
              <p className="about-page__timeline-meta">{t('about.exp.1.meta')}</p>
              <p className="about-page__timeline-desc">
                <Trans i18nKey="about.exp.1.desc" />
              </p>
            </div>
            <div className="about-page__timeline-item">
              <p className="about-page__timeline-role">{t('about.exp.2.role')}</p>
              <p className="about-page__timeline-meta">{t('about.exp.2.meta')}</p>
              <p className="about-page__timeline-desc">{t('about.exp.2.desc')}</p>
            </div>
            <div className="about-page__timeline-item">
              <p className="about-page__timeline-role">{t('about.exp.3.role')}</p>
              <p className="about-page__timeline-meta">{t('about.exp.3.meta')}</p>
              <p className="about-page__timeline-desc">{t('about.exp.3.desc')}</p>
            </div>
          </div>
        </article>

        <article className="redesign-card">
          <div className="redesign-card__header">
            <span className="redesign-card__icon redesign-card__icon--red">
              <FaGraduationCap />
            </span>
            <h2>{t('about.edu.title')}</h2>
          </div>
          <ul className="redesign-list redesign-list--tight">
            {eduItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="about-page__subheading">{t('about.soft.title')}</h3>
          <div className="redesign-chips">
            {softItems.map((item) => (
              <span key={item} className="redesign-chip">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default About
