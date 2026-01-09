import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
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
    <main className="contact">
      <div className="contact__hero">
        <div className="contact__intro">
          <p className="contact__eyebrow">{t('contact.eyebrow')}</p>
          <h1 className="contact__title">{t('contact.title')}</h1>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>
          <div className="contact__channels">
            <a className="channel" href="https://wa.me/529848045757" target="_blank" rel="noreferrer">
              <span className="channel__icon">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <span className="channel__label">{t('contact.channel.whatsapp')}</span>
            </a>
            <a className="channel" href="mailto:hlara9012@gmail.com">
              <span className="channel__icon">
                <MdEmail aria-hidden="true" />
              </span>
              <span className="channel__label">{t('contact.channel.email')}</span>
            </a>
            <a className="channel" href="https://www.linkedin.com/in/hlara9012/" target="_blank" rel="noreferrer">
              <span className="channel__icon">
                <FaLinkedinIn aria-hidden="true" />
              </span>
              <span className="channel__label">{t('contact.channel.linkedin')}</span>
            </a>
          </div>
          <p className="contact__note">{t('contact.note')}</p>
        </div>

        <ContactForm className="contact__form-card" />
      </div>
    </main>
  )
}

export default Contact
