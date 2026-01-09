import { useEffect } from 'react'
import { FaBolt, FaLaptopCode, FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import './page.css'
import './about.css'

function About() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/sobre-heriberto-lara` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

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
      image: origin ? `${origin}/images/yo-con-traje.png` : undefined,
      sameAs: [
        'https://www.linkedin.com/in/hlara9012/',
        'https://wa.me/529848045757',
        'mailto:hlara9012@gmail.com',
      ],
      knowsAbout: ['React', 'Next.js', 'n8n', 'WhatsApp API', 'HubSpot', 'GoHighLevel'],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
    },
  })

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const impactItems = [
    t('about.impact.item1'),
    t('about.impact.item2'),
    t('about.impact.item3'),
  ]
  const techItems = t('about.tech.items', { returnObjects: true })
  const eduItems = t('about.edu.items', { returnObjects: true })
  const softItems = t('about.soft.items', { returnObjects: true })

  return (
    <main className="about neon">
      <section className="about__top">
        <div className="about__intro reveal">
          <p className="about__eyebrow">{t('about.eyebrow')}</p>
          <h1 className="about__title">{t('about.title')}</h1>
          <p className="about__role">{t('about.role')}</p>
          <div className="about__cta">
            <a className="btn" href="/portafolio-proyectos-nextjs">
              {t('about.cta.projects')}
            </a>
          </div>
        </div>

        <div className="about__portrait reveal">
          <div className="portrait__ring">
            <img src="/images/yo-con-traje.png" alt="Heri Lara" width="220" height="220" />
          </div>
        </div>

        <div className="about__stats reveal">
          <div className="stat stat--accent">
            <p className="stat__value">60%</p>
            <p className="stat__label">{t('about.stats.conversion')}</p>
          </div>
          <div className="stat stat--accent">
            <p className="stat__value">-70%</p>
            <p className="stat__label">{t('about.stats.response')}</p>
          </div>
        </div>
      </section>

      <section className="about__grid">
        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--impact" aria-hidden="true">
              <FaBolt />
            </span>
            <h2>{t('about.impact.title')}</h2>
          </div>
          <ul>
            {impactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--stack" aria-hidden="true">
              <FaLaptopCode />
            </span>
            <h2>{t('about.tech.title')}</h2>
          </div>
          <div className="tags neon-tags">
            {techItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--xp" aria-hidden="true">
              <FaBriefcase />
            </span>
            <h2>{t('about.exp.title')}</h2>
          </div>
          <ul className="timeline">
            <li>
              <div>
                <p className="timeline__role">{t('about.exp.1.role')}</p>
                <p className="timeline__meta">{t('about.exp.1.meta')}</p>
              </div>
              <p className="timeline__desc">
                <Trans i18nKey="about.exp.1.desc" />
              </p>
            </li>
            <li>
              <div>
                <p className="timeline__role">{t('about.exp.2.role')}</p>
                <p className="timeline__meta">{t('about.exp.2.meta')}</p>
              </div>
              <p className="timeline__desc">{t('about.exp.2.desc')}</p>
            </li>
            <li>
              <div>
                <p className="timeline__role">{t('about.exp.3.role')}</p>
                <p className="timeline__meta">{t('about.exp.3.meta')}</p>
              </div>
              <p className="timeline__desc">{t('about.exp.3.desc')}</p>
            </li>
          </ul>
        </article>

        <article className="card card--glow card--two reveal">
          <div className="card__header">
            <span className="card__icon card__icon--edu" aria-hidden="true">
              <FaGraduationCap />
            </span>
            <h2>{t('about.edu.title')}</h2>
          </div>
          <ul>
            {eduItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{t('about.soft.title')}</h2>
          <div className="tags neon-tags">
            {softItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default About
