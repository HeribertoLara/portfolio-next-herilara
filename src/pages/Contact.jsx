import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import ContactForm from '../components/ContactForm'
import { useSEO } from '../hooks/useSEO'
import './contact.css'

function Contact() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/contacto-desarrollador-web` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: 'Contacto | Agenda tu proyecto web con Heri Lara',
    description:
      'Agenda tu proyecto web o automatizaciA3n: envA-a un mensaje o escribe por WhatsApp. Respondo en menos de 24h.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contacto Heri Lara',
      description: 'Agenda tu proyecto web o automatizaciA3n con Heri Lara.',
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
          <p className="contact__eyebrow">Contacto</p>
          <h1 className="contact__title">Hablemos</h1>
          <p className="contact__subtitle">
            A¨Listo para convertir visitas en clientes? EscrA-beme y armamos tu funnel.
          </p>
          <div className="contact__channels">
            <a
              className="channel"
              href="https://wa.me/529848045757"
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel__icon">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <span className="channel__label">WhatsApp</span>
            </a>
            <a className="channel" href="mailto:hlara9012@gmail.com">
              <span className="channel__icon">
                <MdEmail aria-hidden="true" />
              </span>
              <span className="channel__label">Email</span>
            </a>
            <a
              className="channel"
              href="https://www.linkedin.com/in/hlara9012/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel__icon">
                <FaLinkedinIn aria-hidden="true" />
              </span>
              <span className="channel__label">LinkedIn</span>
            </a>
          </div>
          <p className="contact__note">Respondo en menos de 24h Aú MX / Latam Aú Remoto</p>
        </div>

        <ContactForm className="contact__form-card" />
      </div>
    </main>
  )
}

export default Contact
