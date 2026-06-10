import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import { useSEO } from '../hooks/useSEO'
import './contact.css'

function Contact() {
  const { t } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/contacto-desarrollador-web` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: t('contact.seo.title'),
    description: t('contact.seo.description'),
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: t('contact.schema.name'),
      description: t('contact.schema.description'),
      url: canonical,
      mainEntity: {
        '@type': 'Person',
        name: 'Heri Lara',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+529848045757',
          email: 'hlara9012@gmail.com',
          areaServed: 'Latin America',
        },
      },
    },
  })

  return (
    <main className="redesign-page contact-page">
      <div className="redesign-page__bg">
        <div className="redesign-page__floor" />
        <div className="redesign-page__blob redesign-page__blob--red" />
        <div className="redesign-page__blob redesign-page__blob--blue" />
        <div className="redesign-page__grain" />
      </div>

      <section className="redesign-shell contact-page__grid">
        <div className="contact-page__copy">
          <p className="redesign-eyebrow is-ready">{t('contact.eyebrow')}</p>
          <h1 className="redesign-title is-ready">
            <div className="redesign-title-line">
              <span className="redesign-title-text">{t('contact.title')}</span>
              <span className="redesign-title-glow">{t('contact.title')}</span>
            </div>
            <div className="redesign-title-line">
              <span className="redesign-title-text">{t('home.nav.contact')}</span>
              <span className="redesign-title-glow">{t('home.nav.contact')}</span>
            </div>
          </h1>
          <p className="redesign-lede is-ready">{t('contact.subtitle')}</p>

          <div className="contact-page__channels">
            <a className="contact-page__channel contact-page__channel--wa" href="https://wa.me/529848045757">
              <span className="contact-page__channel-icon">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <span>
                <small>{t('contact.channel.whatsapp')}</small>
                <strong>984 804 5757</strong>
              </span>
              <em>→</em>
            </a>

            <a className="contact-page__channel contact-page__channel--mail" href="mailto:hlara9012@gmail.com">
              <span className="contact-page__channel-icon">
                <MdEmail aria-hidden="true" />
              </span>
              <span>
                <small>{t('contact.channel.email')}</small>
                <strong>hlara9012@gmail.com</strong>
              </span>
              <em>→</em>
            </a>

            <a
              className="contact-page__channel contact-page__channel--linkedin"
              href="https://www.linkedin.com/in/hlara9012/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-page__channel-icon">
                <FaLinkedinIn aria-hidden="true" />
              </span>
              <span>
                <small>{t('contact.channel.linkedin')}</small>
                <strong>linkedin.com/in/hlara9012</strong>
              </span>
              <em>→</em>
            </a>
          </div>

          <p className="contact-page__note">{t('contact.note')}</p>
        </div>

        <div className="contact-page__form-wrap">
          <div className="contact-page__form-photo">
            <img src="/images/contact.png" alt="Heri Lara" width="420" height="560" />
          </div>
          <ContactForm className="contact-page__form" />
        </div>
      </section>
    </main>
  )
}

export default Contact
