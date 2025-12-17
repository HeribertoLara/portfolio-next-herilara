import { FaWhatsapp } from 'react-icons/fa'
import { useSEO } from '../hooks/useSEO'
import './portfolio.css'

const projects = [
  {
    title: 'Hotel Sevens',
    tag: 'Landing | Next.js',
    desc:
      'Landing optimizada para reservas directas, conectada a WhatsApp y enfocada en conversión con UX simple.',
    image: '/images/hotelsevens.jpg',
    link: 'https://hotelsevens.online/',
  },
]

function Portfolio() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/portafolio-proyectos-nextjs` : undefined
  const ogImage = origin ? `${origin}/images/hotelsevens.jpg` : undefined

  useSEO({
    title: 'Portafolio | Proyectos Next.js y funnels para WhatsApp',
    description:
      'Proyectos recientes en Next.js y landing pages conectadas a WhatsApp para hoteles y servicios.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Portafolio de Heri Lara',
      itemListElement: projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: project.title,
        description: project.desc,
        url: project.link || canonical,
        image: project.image ? (origin ? `${origin}${project.image}` : project.image) : undefined,
      })),
    },
  })

  return (
    <main className="portfolio">
      <section className="portfolio__hero">
        <div className="portfolio__overlay" />
        <div className="portfolio__content">
          <p className="portfolio__eyebrow">Portafolio de proyectos</p>
          <h1 className="portfolio__title">
            Portafolio de <span>proyectos</span>
          </h1>
          <a className="portfolio__cta" href="#proyectos">
            Ver proyectos
          </a>
        </div>
      </section>

      <section className="portfolio__grid" id="proyectos">
        <h2>Trabajos recientes</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <div className="project-card__media">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                ) : (
                  <div className="project-card__placeholder">Proyecto</div>
                )}
              </div>
              <div className="project-card__body">
                <p className="project-card__tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__actions">
                  {project.link && (
                    <a className="project-card__btn" href={project.link} target="_blank" rel="noreferrer">
                      Ver proyecto
                    </a>
                  )}
                  <a
                    className="project-card__btn project-card__btn--ghost"
                    href="https://wa.me/529848045757"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio__cta-final">
        <div>
          <p className="portfolio__eyebrow">¿Listo para empezar?</p>
          <h2>Construyo tu landing + funnel conectado a WhatsApp</h2>
        </div>
        <a className="portfolio__cta portfolio__cta--whatsapp" href="https://wa.me/529848045757" rel="noreferrer">
          <FaWhatsapp aria-hidden="true" />
          <span>Hablemos por WhatsApp</span>
        </a>
      </section>
    </main>
  )
}

export default Portfolio
