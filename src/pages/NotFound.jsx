import { useSEO } from '../hooks/useSEO'
import './page.css'

function NotFound() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonical = origin ? `${origin}/404` : undefined

  useSEO({
    title: 'Página no encontrada | Heri Lara',
    description: 'La página que buscas no existe. Vuelve al inicio o revisa el portafolio.',
    canonical,
    robots: 'noindex, nofollow',
  })

  return (
    <main className="page not-found">
      <div className="not-found__content">
        <p className="not-found__eyebrow">404</p>
        <h1>Página no encontrada</h1>
        <p>No pude encontrar lo que buscabas. Regresa al inicio o explora los proyectos.</p>
        <div className="not-found__actions">
          <a className="btn" href="/">
            Volver al inicio
          </a>
          <a className="btn btn--outline" href="/portafolio-proyectos-nextjs">
            Ver portafolio
          </a>
        </div>
      </div>
    </main>
  )
}

export default NotFound
