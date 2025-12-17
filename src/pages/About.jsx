import { useEffect } from "react"
import { FaBolt, FaLaptopCode, FaBriefcase, FaGraduationCap } from "react-icons/fa"
import { useSEO } from "../hooks/useSEO"
import "./page.css"
import "./about.css"

function About() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/sobre-heriberto-lara` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: 'Sobre Heri Lara | Desarrollador Web y Automatización',
    description:
      'Conoce a Heri Lara, desarrollador web especializado en React/Next.js, WhatsApp API, n8n y automatización de funnels de venta.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Heri Lara',
      jobTitle: 'Desarrollador Web y Automatización',
      url: canonical,
      image: origin ? `${origin}/images/yo-con-traje.png` : undefined,
      sameAs: [
        'https://www.linkedin.com/in/hlara9012/',
        'https://wa.me/529848045757',
        'mailto:hlara9012@gmail.com',
      ],
      knowsAbout: ['React', 'Next.js', 'n8n', 'WhatsApp API', 'HubSpot', 'GoHighLevel'],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
    },
  })

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="about neon">
      <section className="about__top">
        <div className="about__intro reveal">
          <p className="about__eyebrow">Sobre mi</p>
          <h1 className="about__title">Heri Lara</h1>
          <p className="about__role">
            Web Developer enfocado en React, Next.js y automatizacion (n8n, WhatsApp API,
            HubSpot, GoHighLevel) para escalar ventas y UX.
          </p>
          <div className="about__cta">
            <a className="btn" href="/portafolio-proyectos-nextjs">
              Ver proyectos
            </a>
          </div>
        </div>

        <div className="about__portrait reveal">
          <div className="portrait__ring">
            <img src="/images/yo-con-traje.png" alt="Heri Lara" width="220" height="220" />
          </div>
        </div>

        <div className="about__stats reveal">
          <div className="stat stat--accent">
            <p className="stat__value">60%</p>
            <p className="stat__label">conversion en reservas</p>
          </div>
          <div className="stat stat--accent">
            <p className="stat__value">-70%</p>
            <p className="stat__label">tiempo de respuesta</p>
          </div>
        </div>
      </section>

      <section className="about__grid">
        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--impact" aria-hidden="true">
              <FaBolt />
            </span>
            <h2>Impacto reciente</h2>
          </div>
          <ul>
            <li>Reduje tiempos de respuesta 70% conectando chatbots con CRM via MCP.</li>
            <li>Automatice reservas de tours de punta a punta, eliminando 80% de errores.</li>
            <li>Escale reservas hoteleras de 40% a 60% con flujos UX sin friccion.</li>
          </ul>
        </article>

        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--stack" aria-hidden="true">
              <FaLaptopCode />
            </span>
            <h2>Tecnologias</h2>
          </div>
          <div className="tags neon-tags">
            <span>Next.js</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>n8n</span>
            <span>WhatsApp API</span>
            <span>HubSpot</span>
            <span>GoHighLevel</span>
            <span>SEO tecnico</span>
          </div>
        </article>

        <article className="card card--glow reveal">
          <div className="card__header">
            <span className="card__icon card__icon--xp" aria-hidden="true">
              <FaBriefcase />
            </span>
            <h2>Experiencia clave</h2>
          </div>
          <ul className="timeline">
            <li>
              <div>
                <p className="timeline__role">Automation & MCP Workflows | Freelancer</p>
                <p className="timeline__meta">2025 | Real estate / tours</p>
              </div>
              <p className="timeline__desc">
                Routing inteligente, agendado automatico y confirmaciones en <strong>&lt;15s</strong>.
              </p>
            </li>
            <li>
              <div>
                <p className="timeline__role">Web Developer | The Fives Hotels</p>
                <p className="timeline__meta">2022-2024 | Hospitality</p>
              </div>
              <p className="timeline__desc">
                Web en Next.js, landing de campanas en HubSpot y automatizacion de 50+ anuncios diarios.
              </p>
            </li>
            <li>
              <div>
                <p className="timeline__role">Web Developer | GFT (Banca)</p>
                <p className="timeline__meta">2021-2022 | Banking</p>
              </div>
              <p className="timeline__desc">
                UI enterprise con Web Components/React + TypeScript, integraciones con APIs Python + Django.
              </p>
            </li>
          </ul>
        </article>

        <article className="card card--glow card--two reveal">
          <div className="card__header">
            <span className="card__icon card__icon--edu" aria-hidden="true">
              <FaGraduationCap />
            </span>
            <h2>Educacion</h2>
          </div>
          <ul>
            <li>Ing. Quimica | UNAM</li>
            <li>Web Dev & CS | Academlo</li>
            <li>React/Front-End | Platzi</li>
            <li>Automatizacion n8n & AI con MCP (2025) | Platzi</li>
          </ul>

          <h2>Soft skills</h2>
          <div className="tags neon-tags">
            <span>Ownership</span>
            <span>Proactividad</span>
            <span>Detalle</span>
            <span>Liderazgo</span>
            <span>Gestion</span>
            <span>Adaptabilidad</span>
            <span>Creatividad</span>
          </div>
        </article>
      </section>
    </main>
  )
}

export default About
