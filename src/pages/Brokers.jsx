import {
  FaWhatsapp,
  FaChartLine,
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaRegCommentDots,
} from 'react-icons/fa'
import ContactForm from '../components/ContactForm'
import { useSEO } from '../hooks/useSEO'
import './brokers.css'

function Brokers() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/mas-ventas-para-brokers` : undefined
  const ogImage = origin ? `${origin}/images/heri-brokers.png` : undefined
  const title = 'Mas ventas para brokers | Landing + WhatsApp'
  const description =
    'Landing enfocada en captar leads calientes y enviarlos directo a tu WhatsApp para que cierres mas ventas como broker inmobiliario.'
  const schema = canonical
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${canonical}#service`,
            name: 'Landing page para brokers',
            serviceType: 'Landing page + WhatsApp',
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
              price: 'A cotizar',
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
                name: 'Como consigue mas leads esta landing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Muestra inventario y CTA directos a WhatsApp con mensajes prearmados para agendar visita o llamada.',
                },
              },
              {
                '@type': 'Question',
                name: 'Que incluye la entrega?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Landing lista, mensajes a WhatsApp, bloque de propiedades y analytics basico.',
                },
              },
              {
                '@type': 'Question',
                name: 'En cuanto tiempo se entrega?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'En promedio 72 horas con video de avances para ajustes rapidos.',
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
                name: 'Home',
                item: origin || '',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Mas ventas para brokers',
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
            <p className="brokers__eyebrow">Mas ventas para brokers</p>
            <h1 className="brokers__title">
              Leads listos para hablar <span>por WhatsApp</span>
            </h1>
            <p className="brokers__subtitle">
              Usa la landing como anuncio vivo: muestra tu inventario y envia a los interesados a tu
              WhatsApp con un mensaje ya escrito para agendar visita o llamada.
            </p>
            <ul className="brokers__points">
              <li>
                <FaTimes aria-hidden="true" />
                <span>Publicas propiedades y no te escriben.</span>
              </li>
              <li>
                <FaTimes aria-hidden="true" />
                <span>Leads frios sin interes real.</span>
              </li>
              <li>
                <FaTimes aria-hidden="true" />
                <span>Respondes tarde y pierdes la cita.</span>
              </li>
            </ul>
            <div className="brokers__actions">
              <a
                className="brokers__cta"
                href="https://wa.me/529848045757"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" />
                <span>Quiero mas leads hoy</span>
              </a>
              <a className="brokers__cta brokers__cta--secondary" href="#brokers-form">
                <FaRegCommentDots aria-hidden="true" />
                <span>Ir al formulario</span>
              </a>
            </div>
            <div className="brokers__stat-card">
              <div className="brokers__stat">
                <FaChartLine aria-hidden="true" />
                <div>
                  <p className="brokers__stat-label">Leads calificados</p>
                  <p className="brokers__stat-value">+38%</p>
                </div>
              </div>
              <ul className="brokers__list">
                <li>
                  <FaCheckCircle aria-hidden="true" /> Formulario corto + CTA a WhatsApp
                </li>
                <li>
                  <FaCheckCircle aria-hidden="true" /> Segmentamos por zona e inmueble
                </li>
                <li>
                  <FaCheckCircle aria-hidden="true" /> Mensajes prearmados para responder rapido
                </li>
              </ul>
            </div>
          </div>
          <div className="brokers__hero-media">
            <picture className="brokers__hero-picture">
              <source srcSet="/images/heri-brokers.png" type="image/png" />
              <img
                src="/images/heri-brokers.png"
                alt="Heri presentando landing para brokers"
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
            <h2>Evita perder leads</h2>
            <p>
              No mas formularios eternos ni correos que nadie abre. Todo queda en tu WhatsApp para
              contestar en minutos y agendar visitas sin friccion.
            </p>
            <div className="brokers__steps">
              <div className="brokers__step">
                <span className="brokers__step-num">1</span>
                <p>Visitante ve tu inventario o servicio.</p>
              </div>
              <div className="brokers__step">
                <span className="brokers__step-num">2</span>
                <p>Elige propiedad, toca WhatsApp.</p>
              </div>
              <div className="brokers__step">
                <span className="brokers__step-num">3</span>
                <p>Hablan contigo y agendas cita.</p>
              </div>
            </div>
          </div>

          <div className="brokers__panel brokers__panel--accent">
            <div className="brokers__panel-head">
              <FaBolt aria-hidden="true" />
              <h2>Que incluye</h2>
            </div>
            <ul className="brokers__list">
              <li>Landing con mensaje claro para brokers inmobiliarios.</li>
              <li>Boton y mensajes directos a tu WhatsApp.</li>
              <li>Bloque de propiedades destacadas o servicios.</li>
              <li>Analytics basico listo para anuncios.</li>
            </ul>
          </div>
        </section>

        <section className="brokers__cta-block">
          <div>
            <p className="brokers__eyebrow">Lista para lanzar anuncios</p>
            <h2>Vamos por mas cierres este mes</h2>
            <p>
              Muestro avances en video antes de publicar y ajustamos juntos los mensajes para que
              se sienta 100 por ciento tuyo.
            </p>
            <p className="brokers__note">Entrega estimada: 72 h</p>
          </div>
          <a
            className="brokers__cta brokers__cta--solid"
            href="https://wa.me/529848045757"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp aria-hidden="true" />
            <span>Hablar por WhatsApp</span>
          </a>
        </section>

        <section className="brokers__form" id="brokers-form">
          <div className="brokers__form-copy">
            <p className="brokers__eyebrow">Listo para captar leads</p>
            <h2>Deja tus datos y te escribo hoy</h2>
            <p className="brokers__meta">Entrega promedio en 72 horas</p>
            <p>
              Armo el flujo para tus anuncios y un mensaje listo para que los leads lleguen a tu
              WhatsApp con contexto.
            </p>
            <ul className="brokers__list brokers__list--tight">
              <li>
                <FaCheckCircle aria-hidden="true" /> Mensaje prearmado para visita o llamada.
              </li>
              <li>
                <FaClock aria-hidden="true" /> Tiempo estimado de entrega 72h.
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
