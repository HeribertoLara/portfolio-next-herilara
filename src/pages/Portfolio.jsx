import { FaWhatsapp } from 'react-icons/fa'
import { useSEO } from '../hooks/useSEO'
import ProjectCard from '../components/ProjectCard'
import './portfolio.css'

const projects = [
  {
    title: 'Riviera Maya Move',
    tag: 'Landing | Next.js',
    desc:
      'Landing para transportadora con sistema de reservas y flujo directo hacia WhatsApp para cotizaciones.',
    image: '/images/portfolio-rrm.jpg',
    link: 'https://rivieramayamove.com/',
  },
  {
    title: 'Hotel Sevens',
    tag: 'Landing | Next.js',
    desc:
      'Landing optimizada para reservas directas, conectada a WhatsApp y enfocada en conversión con UX simple.',
    image: '/images/hotelsevens.jpg',
    link: 'https://hotelsevens.online/',
  },
  {
    title: 'Landing page Triple I Soluciones',
    tag: 'Web corporativa',
    desc: 'Pagina web corporativa para la empresa Triple I Soluciones.',
    image: '/images/triple-i.jpg',
    link: 'https://infallible-mayer-d1f8dd.netlify.app/',
  },
]

function Portfolio() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/portafolio-proyectos-nextjs` : undefined
  const ogImage = origin ? `${origin}/images/portfolio-rrm.jpg` : undefined

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
          <p className="portfolio__summary">
            Diseño y desarrollo landing pages y sitios corporativos con enfoque en conversiones y reservas.
          </p>
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
            <ProjectCard key={project.title} project={project} />
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
