import { FaWhatsapp, FaCheckCircle, FaClock } from 'react-icons/fa'
import { MdFilterAlt } from 'react-icons/md'
import { useSEO } from '../hooks/useSEO'
import './clientes.css'

function Clientes() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/consigue-mas-clientes` : undefined
  const ogImage = origin ? `${origin}/images/heri-landing.png` : undefined

  useSEO({
    title: 'Landing + WhatsApp | Consigue más clientes rápido',
    description:
      'Landing enfocada en ventas conectada a WhatsApp para responder en segundos y cerrar más clientes sin sistemas complicados.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Landing page conectada a WhatsApp',
      serviceType: 'Landing page + WhatsApp',
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
        price: 'A cotizar',
        priceCurrency: 'USD',
      },
    },
  })

  return (
    <main className="clientes">
      <section className="clientes__hero">
        <div className="clientes__photo">
          <img src="/images/heri-landing.png" alt="Heri mostrando landing" width="540" height="680" />
        </div>
        <div className="clientes__content">
          <p className="clientes__eyebrow">Consigue más clientes</p>
          <h1 className="clientes__title">
            Landing page + <span>WhatsApp</span>
          </h1>
          <p className="clientes__subtitle">
            Una página simple que envía personas interesadas directo a tu número, sin sistemas
            complicados.
          </p>
          <a className="clientes__cta" href="https://wa.me/5615839142" target="_blank" rel="noreferrer">
            <FaWhatsapp aria-hidden="true" />
            <span>Quiero más clientes ahora</span>
          </a>
        </div>
      </section>

      <section className="clientes__section">
        <h2>¿Te pasa?</h2>
        <ul className="clientes__chips">
          <li>Te escriben, pero no se convierten en clientes.</li>
          <li>No tienes un lugar claro para enviar prospectos.</li>
          <li>Pierdes oportunidades por no responder a tiempo.</li>
        </ul>
      </section>

      <section className="clientes__section clientes__grid">
        <div className="card">
          <h3>Lo que obtienes</h3>
          <p>
            Landing enfocada en ventas, conectada a tu WhatsApp para que las personas interesadas te
            escriban de inmediato. Nada más. Nada menos.
          </p>
          <div className="card__steps">
            <div className="step">
              <span className="step__num">1</span>
              <p>El cliente ve tu landing.</p>
            </div>
            <div className="step">
              <span className="step__num">2</span>
              <p>Hace clic en WhatsApp.</p>
            </div>
            <div className="step">
              <span className="step__num">3</span>
              <p>Tú cierras la venta.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Beneficios</h3>
          <ul className="list">
            <li>
              <FaCheckCircle aria-hidden="true" /> Más mensajes de personas interesadas.
            </li>
            <li>
              <FaCheckCircle aria-hidden="true" /> Menos explicaciones repetidas.
            </li>
            <li>
              <FaClock aria-hidden="true" /> Funciona 24/7 y todo desde tu celular.
            </li>
          </ul>
        </div>

        <div className="card card--wide">
          <h3>¿Por qué funciona?</h3>
          <p>
            La landing explica tu servicio antes de que te escriban, así cuando llegan a WhatsApp ya
            saben qué ofreces y por qué contactarte.
          </p>
          <div className="list list--inline">
            <span>
              <MdFilterAlt aria-hidden="true" /> Filtra curiosos
            </span>
            <span>
              <FaClock aria-hidden="true" /> Ahorra tiempo
            </span>
            <span>
              <FaCheckCircle aria-hidden="true" /> Conversaciones directas
            </span>
          </div>
        </div>

        <div className="card">
          <h3>Autoridad</h3>
          <p>
            Experiencia con negocios de turismo y real estate enfocados en generar resultados, no
            solo presencia online.
          </p>
        </div>
      </section>

      <section className="clientes__cta-final">
        <div>
          <p className="clientes__eyebrow">Entrega en 48–72 horas</p>
          <h2>Empieza hoy con tu landing + WhatsApp</h2>
        </div>
        <a className="clientes__cta clientes__cta--block" href="https://wa.me/5615839142" rel="noreferrer">
          <FaWhatsapp aria-hidden="true" />
          <span>Hablar por WhatsApp</span>
        </a>
      </section>
    </main>
  )
}

export default Clientes
