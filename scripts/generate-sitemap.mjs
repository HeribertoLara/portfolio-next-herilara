import fs from 'fs'
import path from 'path'

const baseUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '')
const today = new Date().toISOString().split('T')[0]

const routes = [
  '/',
  '/sobre-heriberto-lara',
  '/portafolio-proyectos-nextjs',
  '/contacto-desarrollador-web',
  '/consigue-mas-clientes',
]

const urlEntries = routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>
`

const outputPath = path.resolve('public', 'sitemap.xml')
fs.writeFileSync(outputPath, xml.trim())
console.log(`Sitemap generated at ${outputPath} using base ${baseUrl}`)
