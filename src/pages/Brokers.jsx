import {
  FaWhatsapp,
  FaChartLine,
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaRegCommentDots,
} from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import { useSEO } from '../hooks/useSEO'
import './brokers.css'

function Brokers() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/mas-ventas-para-brokers` : undefined
  const ogImage = origin ? `${origin}/images/heri-brokers.png` : undefined
  const title = t('brokers.seo.title')
  const description = t('brokers.seo.description')
  const schema = canonical
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${canonical}#service`,
            name: t('brokers.schema.serviceName'),
            serviceType: t('brokers.schema.serviceType'),
            description,
            areaServed: 'Latin America',
            url: canonical,
            image: ogImage,
            provider: {
              '@type': 'Person',
              name: 'Heri Lara',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              price: t('brokers.schema.offerPrice'),
              url: canonical,
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Real estate brokers',
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonical}#faq`,
            mainEntity: [
              {
                '@type': 'Question',
                name: t('brokers.schema.faq.1.q'),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: t('brokers.schema.faq.1.a'),
                },
              },
              {
                '@type': 'Question',
                name: t('brokers.schema.faq.2.q'),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: t('brokers.schema.faq.2.a'),
                },
              },
              {
                '@type': 'Question',
                name: t('brokers.schema.faq.3.q'),
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: t('brokers.schema.faq.3.a'),
                },
              },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('brokers.schema.breadcrumb.home'),
                item: origin || '',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('brokers.schema.breadcrumb.current'),
                item: canonical,
              },
            ],
          },
        ],
      }
    : undefined

  useSEO({
    title,
    description,
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema,
  })

  return (
    <main className="brokers">
      <div className="brokers__inner">
        <section className="brokers__hero">
          <div className="brokers__copy">
            <p className="brokers__eyebrow">{t('brokers.eyebrow')}</p>
            <h1 className="brokers__title">
              <Trans i18nKey="brokers.title" components={[<span key="accent" />]} />
            </h1>
            <p className="brokers__subtitle">{t('brokers.subtitle')}</p>
            <ul className="brokers__points">
              <li>
                <FaTimes aria-hidden="true" />
                <span>{t('brokers.pain.1')}</span>
              </li>
              <li>
                <FaTimes aria-hidden="true" />
                <span>{t('brokers.pain.2')}</span>
              </li>
              <li>
                <FaTimes aria-hidden="true" />
                <span>{t('brokers.pain.3')}</span>
              </li>
            </ul>
            <div className="brokers__actions">
              <a className="brokers__cta" href="https://wa.me/529848045757" target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" />
                <span>{t('brokers.cta.primary')}</span>
              </a>
              <a className="brokers__cta brokers__cta--secondary" href="#brokers-form">
                <FaRegCommentDots aria-hidden="true" />
                <span>{t('brokers.cta.secondary')}</span>
              </a>
            </div>
            <div className="brokers__stat-card">
              <div className="brokers__stat">
                <FaChartLine aria-hidden="true" />
                <div>
                  <p className="brokers__stat-label">{t('brokers.stat.label')}</p>
                  <p className="brokers__stat-value">{t('brokers.stat.value')}</p>
                </div>
              </div>
              <ul className="brokers__list">
                <li>
                  <FaCheckCircle aria-hidden="true" /> {t('brokers.list.1')}
                </li>
                <li>
                  <FaCheckCircle aria-hidden="true" /> {t('brokers.list.2')}
                </li>
                <li>
                  <FaCheckCircle aria-hidden="true" /> {t('brokers.list.3')}
                </li>
              </ul>
            </div>
          </div>
          <div className="brokers__hero-media">
            <picture className="brokers__hero-picture">
              <source srcSet="/images/heri-brokers.png" type="image/png" />
              <img
                src="/images/heri-brokers.png"
                alt={t('brokers.hero.alt')}
                className="brokers__hero-img"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </picture>
          </div>
        </section>

        <section className="brokers__grid">
          <div className="brokers__panel">
            <h2>{t('brokers.grid.title')}</h2>
            <p>{t('brokers.grid.body')}</p>
            <div className="brokers__steps">
              <div className="brokers__step">
                <span className="brokers__step-num">1</span>
                <p>{t('brokers.step.1')}</p>
              </div>
              <div className="brokers__step">
                <span className="brokers__step-num">2</span>
                <p>{t('brokers.step.2')}</p>
              </div>
              <div className="brokers__step">
                <span className="brokers__step-num">3</span>
                <p>{t('brokers.step.3')}</p>
              </div>
            </div>
          </div>

          <div className="brokers__panel brokers__panel--accent">
            <div className="brokers__panel-head">
              <FaBolt aria-hidden="true" />
              <h2>{t('brokers.includes.title')}</h2>
            </div>
            <ul className="brokers__list">
              <li>{t('brokers.includes.1')}</li>
              <li>{t('brokers.includes.2')}</li>
              <li>{t('brokers.includes.3')}</li>
              <li>{t('brokers.includes.4')}</li>
            </ul>
          </div>
        </section>

        <section className="brokers__cta-block">
          <div>
            <p className="brokers__eyebrow">{t('brokers.ctaBlock.eyebrow')}</p>
            <h2>{t('brokers.ctaBlock.title')}</h2>
            <p>{t('brokers.ctaBlock.body')}</p>
            <p className="brokers__note">{t('brokers.ctaBlock.note')}</p>
          </div>
          <a className="brokers__cta brokers__cta--solid" href="https://wa.me/529848045757" target="_blank" rel="noreferrer">
            <FaWhatsapp aria-hidden="true" />
            <span>{t('brokers.ctaBlock.cta')}</span>
          </a>
        </section>

        <section className="brokers__form" id="brokers-form">
          <div className="brokers__form-copy">
            <p className="brokers__eyebrow">{t('brokers.form.eyebrow')}</p>
            <h2>{t('brokers.form.title')}</h2>
            <p className="brokers__meta">{t('brokers.form.meta')}</p>
            <p>{t('brokers.form.body')}</p>
            <ul className="brokers__list brokers__list--tight">
              <li>
                <FaCheckCircle aria-hidden="true" /> {t('brokers.form.list.1')}
              </li>
              <li>
                <FaClock aria-hidden="true" /> {t('brokers.form.list.2')}
              </li>
            </ul>
          </div>
          <ContactForm className="brokers__form-card" />
        </section>
      </div>
    </main>
  )
}

export default Brokers
