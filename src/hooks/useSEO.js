import { useEffect } from 'react'

function ensureMeta(name) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  return tag
}

function ensureLink(rel) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  return link
}

function ensureMetaProperty(property) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  return tag
}

/**
 * Simple SEO helper for SPA pages.
 * @param {object} options
 * @param {string} options.title - Document title
 * @param {string} options.description - Meta description
 * @param {object|null} [options.schema] - JSON-LD object to inject
 * @param {string} [options.canonical] - Absolute canonical URL
 * @param {string} [options.robots] - Robots directives (e.g., "noindex, nofollow")
 * @param {string} [options.ogImage] - Absolute URL for social sharing
 * @param {number} [options.ogImageWidth] - Width of social image
 * @param {number} [options.ogImageHeight] - Height of social image
 */
export function useSEO({ title, description, schema, canonical, robots, ogImage, ogImageWidth, ogImageHeight }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      const metaDesc = ensureMeta('description')
      metaDesc.setAttribute('content', description)
    }

    if (canonical) {
      const linkCanonical = ensureLink('canonical')
      linkCanonical.setAttribute('href', canonical)
    }

    const existingRobots = document.querySelector('meta[name="robots"]')
    if (robots) {
      const metaRobots = ensureMeta('robots')
      metaRobots.setAttribute('content', robots)
    } else if (existingRobots) {
      existingRobots.remove()
    }

    if (title) {
      ensureMetaProperty('og:title').setAttribute('content', title)
      ensureMeta('twitter:title').setAttribute('content', title)
    }
    if (description) {
      ensureMetaProperty('og:description').setAttribute('content', description)
      ensureMeta('twitter:description').setAttribute('content', description)
    }
    if (canonical) {
      ensureMetaProperty('og:url').setAttribute('content', canonical)
    }
    if (ogImage) {
      ensureMetaProperty('og:image').setAttribute('content', ogImage)
      ensureMeta('twitter:image').setAttribute('content', ogImage)
      ensureMeta('twitter:card').setAttribute('content', 'summary_large_image')
      if (ogImageWidth) {
        ensureMetaProperty('og:image:width').setAttribute('content', String(ogImageWidth))
      }
      if (ogImageHeight) {
        ensureMetaProperty('og:image:height').setAttribute('content', String(ogImageHeight))
      }
    }

    const schemaId = 'ld-json'
    let script = document.getElementById(schemaId)

    if (schema) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = schemaId
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schema)
    } else if (script) {
      script.remove()
    }

    return () => {
      // Avoid removing if another page already replaced it
      const current = document.getElementById(schemaId)
      if (current && !schema) {
        current.remove()
      }
    }
  }, [title, description, schema, canonical, robots, ogImage])
}
