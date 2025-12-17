# Deploy a Hostinger VPS (portafolio-next-herilara)

Pasos para actualizar y desplegar en la VPS de Hostinger:

1. Ir al proyecto:
   ```bash
   cd /var/www/portfolio-next-herilara
   ```
2. Traer cambios:
   ```bash
   git pull origin main
   ```
3. Rebuild y levantar contenedor:
   ```bash
   docker compose up -d --build
   ```
4. Asegurar red y alias (evita 502):
   ```bash
   docker network disconnect web portfolio-next-herilara-portafolio-1 2>/dev/null || true
   docker network connect --alias portafolio web portfolio-next-herilara-portafolio-1
   ```
5. Recargar Nginx (proxy):
   ```bash
   docker exec -it the-fives-hotels-nginx-1 nginx -t
   docker exec -it the-fives-hotels-nginx-1 nginx -s reload
   ```
6. Test rapido:
   ```bash
   docker exec -it the-fives-hotels-nginx-1 sh -c "wget -qO- http://portafolio:80 | head"
   ```
