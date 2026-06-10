# Deploy en Hostinger VPS con Caddy

Esta versión del proyecto ya queda empaquetada para servir el build con **Caddy** dentro de Docker.

## 1. Requisitos en la VPS

- Docker
- Docker Compose Plugin
- DNS del dominio apuntando a la IP de la VPS
- Puertos `80` y `443` abiertos

## 2. Ajustar dominio en Caddyfile

Edita [`Caddyfile`](./Caddyfile) y reemplaza `heri-lara.com, www.heri-lara.com` por tu dominio real.

## 3. Subir o actualizar el proyecto

```bash
cd /var/www/portfolio-next-herilara
git pull origin main
docker compose up -d --build
```

## 4. Verificar contenedor

```bash
docker compose ps
docker compose logs -f portafolio
```

## 5. Reiniciar en futuras actualizaciones

```bash
cd /var/www/portfolio-next-herilara
git pull origin main
docker compose up -d --build
```

## 6. Notas

- Caddy obtiene y renueva TLS automáticamente si el dominio ya apunta a la VPS.
- Los certificados quedan persistidos en los volúmenes `caddy_data` y `caddy_config`.
- Si vas a usar otro reverse proxy por fuera del contenedor, avísame y te dejo una variante sin exponer `443`.
