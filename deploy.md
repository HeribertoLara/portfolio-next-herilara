# Deploy Real del VPS Hostinger

Este documento describe el flujo real y correcto para publicar este portafolio en el VPS de Hostinger, basado en la configuracion que ya existe en produccion.

No usa el Caddy embebido del repo como punto de entrada publico. En este servidor, el trafico entra por un **Caddy global** y el contenedor del portafolio corre detras de ese proxy.

## Resumen rapido

- VPS: `root@86.38.217.234`
- Proyecto en servidor: `/var/www/portfolio-next-herilara`
- Dominio: `https://herilaraweb.cloud`
- Proxy publico real: contenedor `caddy`
- Config del proxy global: `/srv/apps/proxy/Caddyfile`
- Contenedor del portafolio: `portfolio`
- Puerto expuesto del portafolio en VPS: `8081:80`
- Red Docker compartida con Caddy: `web`

## Arquitectura real

El sitio no debe exponer `80` y `443` directamente desde este proyecto.

La arquitectura correcta es:

1. El contenedor `portfolio` sirve archivos estaticos.
2. Ese contenedor escucha en `80` internamente.
3. Docker lo publica como `8081:80` en el VPS.
4. El contenedor `caddy` global recibe trafico HTTPS del dominio.
5. Caddy hace `reverse_proxy portfolio:80`.
6. Para que eso funcione, `portfolio` debe estar conectado a la red Docker `web`.

## Rutas y archivos importantes

- Repo local: `~/heri-lara-portfolio/portfolio-next-herilara`
- Proyecto remoto: `/var/www/portfolio-next-herilara`
- Proxy global: `/srv/apps/proxy/Caddyfile`
- Compose del proyecto remoto: `/var/www/portfolio-next-herilara/docker-compose.yml`
- Imagen/servidor estatico esperado en VPS: `nginx`

## Importante antes de hacer deploy

El repo puede contener una variante de despliegue distinta a la del VPS.

En este VPS, lo que debe respetarse es:

- `docker-compose.yml` del servidor debe usar:
  - servicio `portfolio`
  - `container_name: portfolio`
  - `ports: "8081:80"`
  - redes `default` y `web`
- `Dockerfile` del servidor debe servir el build con `nginx`

Si en GitHub aparece una variante con `Caddy` dentro del contenedor del proyecto, **no la subas tal cual al VPS sin revisar**.

## Configuracion correcta esperada en el VPS

### `docker-compose.yml`

```yaml
version: "3.9"

services:
  portfolio:
    build: .
    container_name: portfolio
    restart: unless-stopped
    ports:
      - "8081:80"
    networks:
      - default
      - web

networks:
  web:
    external: true
```

### `Dockerfile`

Debe construir con Node y servir con `nginx`, no con `caddy`, en este VPS.

## Configuracion correcta esperada en el Caddy global

Archivo:

```bash
/srv/apps/proxy/Caddyfile
```

Bloque esperado:

```caddy
www.herilaraweb.cloud {
  redir https://herilaraweb.cloud{uri} permanent
}

herilaraweb.cloud {
  reverse_proxy portfolio:80
}
```

## Flujo recomendado de deploy

### 1. Subir cambios a GitHub

Desde tu maquina local:

```bash
cd /Users/angelhost/heri-lara-portfolio/portfolio-next-herilara
git status
npm run build
git add -A
git commit -m "mensaje claro"
git push origin main
```

### 2. Entrar al VPS

```bash
ssh root@86.38.217.234
```

### 3. Ir al proyecto

```bash
cd /var/www/portfolio-next-herilara
```

### 4. Confirmar estado antes de actualizar

```bash
git status -sb
docker compose ps
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

### 5. Traer cambios del repo

Si el working tree esta limpio:

```bash
git fetch origin
git pull --rebase origin main
```

Si hay cambios locales del VPS en `Dockerfile` o `docker-compose.yml`, primero revisa:

```bash
git status --short
git diff -- Dockerfile docker-compose.yml
```

Si esos cambios locales son los ajustes correctos del servidor, preservalos antes de rebasear.

Ejemplo:

```bash
git stash push -m "server-overrides" -- Dockerfile docker-compose.yml
git pull --rebase origin main
git stash pop
```

Despues confirma que el compose siga correcto.

## 6. Verificar compose antes de reconstruir

Revisa que `docker-compose.yml` siga incluyendo la red `web`:

```bash
sed -n '1,220p' docker-compose.yml
```

Busca especificamente:

- `container_name: portfolio`
- `8081:80`
- redes `default` y `web`

## 7. Reconstruir y levantar

```bash
docker compose up -d --build
```

## 8. Validaciones obligatorias despues del deploy

### Contenedor arriba

```bash
docker compose ps
docker logs --tail 30 portfolio
```

### Puerto local del proyecto

```bash
curl -I http://127.0.0.1:8081
```

Debe devolver `200`.

### Dominio publico

```bash
curl -k -I https://herilaraweb.cloud
```

Debe devolver `200`.

### Red Docker correcta

```bash
docker inspect portfolio --format '{{json .NetworkSettings.Networks}}'
```

Debe mostrar:

- `portfolio-next-herilara_default`
- `web`

## Checklist corto post-deploy

- `docker compose ps` muestra `portfolio` en `Up`
- `curl -I http://127.0.0.1:8081` responde `200`
- `curl -k -I https://herilaraweb.cloud` responde `200`
- el sitio abre en navegador
- las rutas SPA cargan bien
- el enlace de `Sobre mi -> Ver proyectos` apunta a `/portafolio`
- `robots.txt` y `sitemap.xml` sirven el dominio correcto

## Si aparece error 502

La causa mas probable en este servidor es que `portfolio` no este unido a la red `web`.

### Diagnostico

```bash
docker logs --tail 50 caddy
```

Si aparece algo como:

```text
dial tcp: lookup portfolio on 127.0.0.11:53: server misbehaving
```

entonces Caddy no puede resolver el contenedor `portfolio`.

### Solucion

1. Edita `docker-compose.yml`
2. Asegurate de que el servicio `portfolio` tenga:

```yaml
networks:
  - default
  - web
```

3. Asegurate de que exista:

```yaml
networks:
  web:
    external: true
```

4. Recrea el contenedor:

```bash
docker compose up -d --build
```

5. Vuelve a validar:

```bash
curl -k -I https://herilaraweb.cloud
```

## Si Caddy no apunta al proyecto correcto

Revisa:

```bash
sed -n '1,260p' /srv/apps/proxy/Caddyfile
```

Debe existir:

```caddy
herilaraweb.cloud {
  reverse_proxy portfolio:80
}
```

Si cambias ese archivo, recarga o recrea el proxy global segun la configuracion del servidor.

## Comandos utiles de soporte

### Ver contenedores

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

### Ver redes

```bash
docker network ls
```

### Ver redes de `portfolio`

```bash
docker inspect portfolio --format '{{json .NetworkSettings.Networks}}'
```

### Ver redes de `caddy`

```bash
docker inspect caddy --format '{{json .NetworkSettings.Networks}}'
```

### Ver logs del proxy global

```bash
docker logs --tail 50 caddy
```

## Flujo ideal resumido

```bash
# local
git push origin main

# VPS
ssh root@86.38.217.234
cd /var/www/portfolio-next-herilara
git fetch origin
git pull --rebase origin main
docker compose up -d --build
curl -I http://127.0.0.1:8081
curl -k -I https://herilaraweb.cloud
```

## Nota final

Si en algun momento quieres que el deploy sea todavia mas seguro, conviene alinear el repo con esta arquitectura real del VPS para que:

- el `Dockerfile` del repo ya use la variante correcta para servidor
- el `docker-compose.yml` del repo ya incluya la red `web`
- el proceso no dependa de overrides manuales en el VPS

Mientras eso no ocurra, este documento es la referencia correcta para desplegar sin romper produccion.
