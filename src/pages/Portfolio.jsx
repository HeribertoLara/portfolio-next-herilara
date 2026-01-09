import { FaWhatsapp } from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import ProjectCard from '../components/ProjectCard'
import './portfolio.css'

const projects = [
  {
    titleKey: 'project.riviera.title',
    title: 'Riviera Maya Move',
    tagKey: 'project.riviera.tag',
    tag: 'Landing | Next.js',
    descKey: 'project.riviera.desc',
    desc:
      'Landing para transportadora con sistema de reservas y flujo directo hacia WhatsApp para cotizaciones.',
    image: '/images/portfolio-rrm.jpg',
    link: 'https://rivieramayamove.com/',
  },
  {
    titleKey: 'project.sevens.title',
    title: 'Hotel Sevens',
    tagKey: 'project.sevens.tag',
    tag: 'Landing | Next.js',
    descKey: 'project.sevens.desc',
    desc:
      'Landing optimizada para reservas directas, conectada a WhatsApp y enfocada en conversi\u00f3n con UX simple.',
    image: '/images/hotelsevens.jpg',
    link: 'https://hotelsevens.online/',
  },
  {
    titleKey: 'project.triplei.title',
    title: 'Landing page Triple I Soluciones',
    tagKey: 'project.triplei.tag',
    tag: 'Web corporativa',
    descKey: 'project.triplei.desc',
    desc: 'Pagina web corporativa para la empresa Triple I Soluciones.',
    image: '/images/triple-i.jpg',
    link: 'https://infallible-mayer-d1f8dd.netlify.app/',
  },
  {
    titleKey: 'project.fakestore.title',
    title: 'FakeStore API',
    tagKey: 'project.fakestore.tag',
    tag: 'Consumo de API',
    descKey: 'project.fakestore.desc',
    desc: 'Interfaz para consumo de la API FakeStore con productos, detalles y estados de carga.',
    image: '/images/fakestore.png',
    link: 'https://fakestorehl.shop/',
  },
]

function Portfolio() {
  const { t, i18n } = useTranslation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/portafolio-proyectos-nextjs` : undefined
  const ogImage = origin ? `${origin}/images/portfolio-rrm.jpg` : undefined

  useSEO({
    title: t('portfolio.seo.title'),
    description: t('portfolio.seo.description'),
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t('portfolio.schema.name'),
      itemListElement: projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: t(project.titleKey, { defaultValue: project.title }),
        description: t(project.descKey, { defaultValue: project.desc }),
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
          <p className="portfolio__eyebrow">{t('portfolio.eyebrow')}</p>
          <p className="portfolio__summary">{t('portfolio.summary')}</p>
          <div className="portfolio__locale">
            <button
              className={`portfolio__locale-btn ${i18n.resolvedLanguage === 'es' ? 'is-active' : ''}`}
              type="button"
              onClick={() => i18n.changeLanguage('es')}
            >
              ES
            </button>
            <button
              className={`portfolio__locale-btn ${i18n.resolvedLanguage === 'en' ? 'is-active' : ''}`}
              type="button"
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </button>
          </div>
          <h1 className="portfolio__title">
            <Trans i18nKey="portfolio.title" components={[<span key="accent" />]} />
          </h1>
          <a className="portfolio__cta" href="#proyectos">{t('portfolio.cta.viewProjects')}</a>
        </div>
      </section>

      <section className="portfolio__grid" id="proyectos">
        <h2>{t('portfolio.section.recent')}</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.titleKey} project={project} />
          ))}
        </div>
      </section>

      <section className="portfolio__cta-final">
        <div>
          <p className="portfolio__eyebrow">{t('portfolio.ctaFinal.question')}</p>
          <h2>{t('portfolio.ctaFinal.title')}</h2>
        </div>
        <a className="portfolio__cta portfolio__cta--whatsapp" href="https://wa.me/529848045757" rel="noreferrer">
          <FaWhatsapp aria-hidden="true" />
          <span>{t('portfolio.ctaFinal.whatsapp')}</span>
        </a>
      </section>
    </main>
  )
}

export default Portfolio
