import { FaWhatsapp } from 'react-icons/fa'
import { Trans, useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'
import './portfolio.css'

const projects = [
  {
    titleKey: 'project.vimex.title',
    title: 'Vimex Vacation Rentals',
    tagKey: 'project.vimex.tag',
    tag: 'Sitio web | Widget de reservas',
    descKey: 'project.vimex.desc',
    desc: 'Sitio web de rentas vacacionales con widget de reservas integrado y enfoque en conversión directa.',
    image: '/images/portfolio-vimex.jpg',
    link: 'https://vimexvacationrentals.com/',
  },
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
      'Landing optimizada para reservas directas, conectada a WhatsApp y enfocada en conversion con UX simple.',
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
  const { t } = useTranslation()
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
    <main className="redesign-page portfolio-page">
      <div className="redesign-page__bg">
        <div className="redesign-page__floor" />
        <div className="redesign-page__blob redesign-page__blob--red" />
        <div className="redesign-page__blob redesign-page__blob--blue" />
        <div className="redesign-page__grain" />
      </div>

      <section className="redesign-shell portfolio-page__hero">
        <div className="portfolio-page__hero-content">
          <div>
            <p className="redesign-eyebrow is-ready">{t('portfolio.eyebrow')}</p>
            <h1 className="redesign-title is-ready">
              <div className="redesign-title-line">
                <span className="redesign-title-text">
                  <Trans i18nKey="portfolio.title" components={[<span key="accent" />]} />
                </span>
                <span className="redesign-title-glow">
                  <Trans i18nKey="portfolio.title" components={[<span key="accent" />]} />
                </span>
              </div>
            </h1>
            <p className="redesign-lede is-ready">{t('portfolio.summary')}</p>
          </div>
          <div className="portfolio-page__hero-image">
            <img
              src="/images/laboratorio.png"
              alt="Heri sosteniendo matraz y mechero"
              width="420"
              height="520"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="redesign-shell portfolio-page__section" id="proyectos">
        <div className="portfolio-page__section-head">
          <span>{t('portfolio.section.recent')}</span>
          <span>05</span>
        </div>

        <div className="portfolio-page__grid">
          {projects.map((project, index) => (
            <article key={project.titleKey} className="portfolio-project is-ready" style={{'--delay': `${index * 0.1}s`}}>
              <div className="portfolio-project__preview">
                <div className="portfolio-project__browser">
                  <div className="portfolio-project__bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <img
                    src={project.image}
                    alt={t(project.titleKey, { defaultValue: project.title })}
                    width="640"
                    height="400"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                  />
                </div>
              </div>

              <div className="portfolio-project__body">
                <span className={`portfolio-project__tag${index % 2 === 0 ? '' : ' is-red'}`}>
                  {t(project.tagKey, { defaultValue: project.tag })}
                </span>
                <h2>{t(project.titleKey, { defaultValue: project.title })}</h2>
                <p>{t(project.descKey, { defaultValue: project.desc })}</p>
                <div className="portfolio-project__actions">
                  <a
                    className="redesign-button redesign-button--primary"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('project.button.view')}
                  </a>
                  <a
                    className="redesign-button redesign-button--ghost"
                    href="https://wa.me/529848045757"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('project.button.whatsapp')}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="redesign-shell portfolio-page__cta">
        <p className="portfolio-page__cta-kicker">{t('portfolio.ctaFinal.question')}</p>
        <h2>{t('portfolio.ctaFinal.title')}</h2>
        <a className="redesign-button redesign-button--whatsapp" href="https://wa.me/529848045757">
          <FaWhatsapp aria-hidden="true" />
          <span>{t('portfolio.ctaFinal.whatsapp')}</span>
        </a>
      </section>
    </main>
  )
}

export default Portfolio
