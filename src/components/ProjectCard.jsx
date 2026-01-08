import { useEffect, useRef } from 'react'

const whatsappUrl = 'https://wa.me/529848045757'

function ProjectCard({ project }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const node = cardRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('project-card--visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={cardRef} className="project-card">
      <div className="project-card__media">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" width="640" height="360" />
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
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Contacto WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
