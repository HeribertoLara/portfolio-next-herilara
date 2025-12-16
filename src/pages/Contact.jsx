import { useForm, ValidationError } from '@formspree/react'
import { FaWhatsapp, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useSEO } from '../hooks/useSEO'
import './contact.css'

function Contact() {
  const [state, handleSubmit] = useForm('xwpgjrvp')
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/contacto-desarrollador-web` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: 'Contacto | Agenda tu proyecto web con Heri Lara',
    description:
      'Agenda tu proyecto web o automatización: envía un mensaje o escribe por WhatsApp. Respondo en menos de 24h.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contacto Heri Lara',
      description: 'Agenda tu proyecto web o automatización con Heri Lara.',
      url: canonical,
      mainEntity: {
        '@type': 'Person',
        name: 'Heri Lara',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+52-561-583-9142',
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
            ¿Listo para convertir visitas en clientes? Escríbeme y armamos tu funnel.
          </p>
          <div className="contact__channels">
            <a
              className="channel"
              href="https://wa.me/5615839142"
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
          <p className="contact__note">Respondo en menos de 24h · MX / Latam · Remoto</p>
        </div>

        <div className="contact__form-card">
          {state.succeeded ? (
            <div className="contact__thanks">¡Gracias! Te responderé muy pronto.</div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Nombre</span>
                <input type="text" name="name" placeholder="Tu nombre" />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" placeholder="tu@email.com" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </label>
              <label className="field">
                <span>Mensaje</span>
                <textarea name="message" placeholder="Cuéntame sobre tu proyecto" rows="4" />
                <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
              </label>
              <div className="form__actions">
                <button type="submit" className="btn btn--primary" disabled={state.submitting}>
                  Enviar
                </button>
                <a className="btn btn--outline" href="https://wa.me/5615839142" target="_blank">
                  <FaPhoneAlt aria-hidden="true" /> Agendar llamada
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default Contact
