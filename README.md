# Portafolio de Heri Lara (React + Vite)

Sitio SPA con React Router, SEO básico (schema JSON-LD, meta, OG/Twitter) y listo para servir estático con Nginx en Docker.

## Requisitos
- Node 20.x
- npm

## Scripts
- `npm install` instala dependencias.
- `npm run dev` corre el entorno local (http://localhost:5173).
- `npm run build` genera el bundle de producción en `dist/`.
- `npm run preview` sirve el build localmente.
- `npm run sitemap` genera `public/sitemap.xml` usando la variable `SITE_URL`.

## SEO / Metadatos
- El hook `useSEO` inyecta title, description, canonical, OG/Twitter y schema según cada página.
- Antes de publicar, genera el sitemap con tu dominio:
  ```
  SET SITE_URL=https://tudominio.com && npm run sitemap
  ```
  (En Linux/Mac: `SITE_URL=https://tudominio.com npm run sitemap`)
- Actualiza `public/robots.txt` para que el Sitemap apunte a tu dominio real.
- Define una imagen OG 1200x630 si cambias la actual (`/images/yo-con-traje.png`).

## Docker
El repo incluye una imagen multi-stage con Nginx:
- Construir y correr con Docker:
  ```
  docker build -t portafolio .
  docker run -d -p 80:80 portafolio
  ```
- Con Docker Compose (puerto 80 expuesto):
  ```
  docker compose up --build -d
  ```
Archivos relevantes:
- `Dockerfile` (build + Nginx)
- `nginx.conf` (SPA fallback con `try_files`)
- `.dockerignore`
- `docker-compose.yml`

## Despliegue manual (sin Docker)
1) `npm install`
2) `npm run build`
3) Publica el contenido de `dist/` en tu hosting estático o en Nginx con:
   ```
   root /ruta/dist;
   try_files $uri $uri/ /index.html;
   ```

## Backend (Node + TypeScript)
- Codigo en `../backend/` con Fastify y colas en memoria (orquestador listo para adaptadores de WhatsApp/email).
- Configura variables copiando `../backend/.env.example` a `../backend/.env`.
- Instala deps y levanta:
  ```
  cd ../backend
  npm install
  npm run dev
  ```
- Endpoints iniciales:
  - `GET /health`
  - `POST /webhooks/whatsapp` (tambien `GET` para verificar token)
  - `POST /webhooks/email`
- Para build/run en produccion:
  ```
  npm run build
  npm start
  ```

## Generar y subir a GitHub
Si el repo es nuevo:
```
git init
git add .
git commit -m "Inicial: portafolio React/Vite"
git branch -M main
git remote add origin git@github.com:USUARIO/REPO.git
git push -u origin main
```
