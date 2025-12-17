import './home.css'
import { useSEO } from '../hooks/useSEO'

function Home() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/` : undefined
  const ogImage = origin ? `${origin}/images/yo-con-traje.png` : undefined

  useSEO({
    title: 'Heri Lara | Desarrollador web y funnels conectados a WhatsApp',
    description:
      'Desarrollador web especializado en React/Next.js y automatización de funnels conectados a WhatsApp para convertir visitas en clientes.',
    canonical,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Heri Lara Portafolio',
      url: canonical,
      description:
        'Desarrollador web especializado en React/Next.js y automatización de funnels conectados a WhatsApp.',
      creator: {
        '@type': 'Person',
        name: 'Heri Lara',
        sameAs: [
          'https://www.linkedin.com/in/hlara9012/',
          'https://wa.me/529848045757',
          'mailto:hlara9012@gmail.com',
        ],
      },
    },
  })

  return (
    <main className="home">
      <div className="home__content">
        <div className="home__text">
          <nav className="home__nav">
            <a href="/sobre-heriberto-lara">&lt;Hola</a>
            <a href="/portafolio-proyectos-nextjs">Me llamo</a>
            <a href="/contacto-desarrollador-web">Heri Lara</a>
          </nav>
          <p className="home__typing">Soy desarrollador web</p>
        </div>
        <div className="home__image">
          <img src="/images/yo-con-traje.png" alt="Heri Lara" width="360" height="690" />
        </div>
      </div>
    </main>
  )
}

export default Home
