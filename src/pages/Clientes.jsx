import { FaWhatsapp, FaCheckCircle, FaClock, FaRegCommentDots } from 'react-icons/fa'
import { MdFilterAlt } from 'react-icons/md'
import { Trans, useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import { useSEO } from '../hooks/useSEO'
import './clientes.css'

function Clientes() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/consigue-mas-clientes` : undefined
  const ogImage = origin ? `${origin}/images/heri-landing.png` : undefined

  useSEO({
    title: t('clientes.seo.title'),
    description: t('clientes.seo.description'),
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('clientes.schema.name'),
      serviceType: t('clientes.schema.serviceType'),
      url: canonical,
      provider: {
        '@type': 'Person',
        name: 'Heri Lara',
      },
      areaServed: 'Latin America',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        url: canonical,
        price: t('clientes.schema.price'),
        priceCurrency: 'USD',
      },
    },
  })

  return (
    <main className="clientes">
      <section className="clientes__hero">
        <div className="clientes__photo">
          <img
            src="/images/heri-landing.png"
            alt={t('clientes.hero.alt')}
            width="540"
            height="680"
          />
        </div>
        <div className="clientes__content">
          <p className="clientes__eyebrow">{t('clientes.eyebrow')}</p>
          <h1 className="clientes__title">
            <Trans i18nKey="clientes.title" components={[<span key="accent" />]} />
          </h1>
          <p className="clientes__subtitle">{t('clientes.subtitle')}</p>
          <div className="clientes__actions">
            <a className="clientes__cta clientes__cta--primary" href="https://wa.me/529848045757" target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" />
              <span>{t('clientes.cta.primary')}</span>
            </a>
            <a className="clientes__cta clientes__cta--secondary" href="#clientes-form">
              <FaRegCommentDots aria-hidden="true" />
              <span>{t('clientes.cta.secondary')}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="clientes__section">
        <h2>{t('clientes.pain.title')}</h2>
        <ul className="clientes__chips">
          <li>{t('clientes.pain.1')}</li>
          <li>{t('clientes.pain.2')}</li>
          <li>{t('clientes.pain.3')}</li>
        </ul>
      </section>

      <section className="clientes__section clientes__grid">
        <div className="card">
          <h3>{t('clientes.value.title')}</h3>
          <p>{t('clientes.value.body')}</p>
          <div className="card__steps">
            <div className="step">
              <span className="step__num">1</span>
              <p>{t('clientes.step.1')}</p>
            </div>
            <div className="step">
              <span className="step__num">2</span>
              <p>{t('clientes.step.2')}</p>
            </div>
            <div className="step">
              <span className="step__num">3</span>
              <p>{t('clientes.step.3')}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>{t('clientes.benefits.title')}</h3>
          <ul className="list">
            <li>
              <FaCheckCircle aria-hidden="true" /> {t('clientes.benefits.1')}
            </li>
            <li>
              <FaCheckCircle aria-hidden="true" /> {t('clientes.benefits.2')}
            </li>
            <li>
              <FaClock aria-hidden="true" /> {t('clientes.benefits.3')}
            </li>
          </ul>
        </div>

        <div className="card card--wide">
          <h3>{t('clientes.why.title')}</h3>
          <p>{t('clientes.why.body')}</p>
          <div className="list list--inline">
            <span>
              <MdFilterAlt aria-hidden="true" /> {t('clientes.why.filter')}
            </span>
            <span>
              <FaClock aria-hidden="true" /> {t('clientes.why.time')}
            </span>
            <span>
              <FaCheckCircle aria-hidden="true" /> {t('clientes.why.direct')}
            </span>
          </div>
        </div>

        <div className="card">
          <h3>{t('clientes.authority.title')}</h3>
          <p>{t('clientes.authority.body')}</p>
        </div>
      </section>

      <section className="clientes__form" id="clientes-form">
        <div className="clientes__form-copy">
          <p className="clientes__eyebrow">{t('clientes.form.eyebrow')}</p>
          <h2>{t('clientes.form.title')}</h2>
          <p className="clientes__meta">{t('clientes.form.meta')}</p>
          <p>{t('clientes.form.body')}</p>
          <ul className="list">
            <li>
              <FaCheckCircle aria-hidden="true" /> {t('clientes.form.list.1')}
            </li>
            <li>
              <FaClock aria-hidden="true" /> {t('clientes.form.list.2')}
            </li>
          </ul>
        </div>
        <ContactForm className="clientes__form-card" />
      </section>

      <section className="clientes__cta-final">
        <div>
          <p className="clientes__eyebrow">{t('clientes.final.eyebrow')}</p>
          <h2>{t('clientes.final.title')}</h2>
        </div>
        <a className="clientes__cta clientes__cta--block" href="https://wa.me/529848045757" rel="noreferrer">
          <FaWhatsapp aria-hidden="true" />
          <span>{t('clientes.final.cta')}</span>
        </a>
      </section>
    </main>
  )
}

export default Clientes
