# Personal Web App

Esta aplicación consta de tres servicios principales:

- Frontend (Astro)
- CMS (Strapi)
- API de búsqueda (SerpAPI)

## Requisitos

- Docker
- Docker Compose
- Node.js 18 o superior (para desarrollo local)

## Estructura del Proyecto

```
.
├── astroweb/         # Frontend en Astro
├── strapi-cms/       # CMS Strapi
└── serpapi/          # Servicio de SerpAPI
```

## Configuración para Despliegue Local

1. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y configura las siguientes variables:
   - Credenciales de PostgreSQL
   - Claves secretas de Strapi
   - Clave de API de SerpAPI
   - URLs de los servicios

## Despliegue Local

El proyecto incluye un script de despliegue que automatiza todo el proceso:

```bash
./deploy.sh
```

Este script realizará las siguientes acciones:
1. Verificará la existencia del archivo `.env`
2. Construirá las imágenes de Docker
3. Levantará todos los servicios
4. Mostrará el estado final del despliegue

## Configuración de CI/CD

Para el despliegue automático a través de GitHub Actions, necesitas configurar los siguientes secretos en tu repositorio:

### Secretos Requeridos

1. Secretos de Base de Datos:
   - `POSTGRES_DB`: Nombre de la base de datos
   - `POSTGRES_USER`: Usuario de PostgreSQL
   - `POSTGRES_PASSWORD`: Contraseña de PostgreSQL

2. Secretos de Strapi:
   - `JWT_SECRET`: Clave secreta para JWT
   - `ADMIN_JWT_SECRET`: Clave secreta para JWT del admin
   - `APP_KEYS`: Claves de aplicación (separadas por comas)
   - `API_TOKEN_SALT`: Salt para tokens de API

3. Secretos de API:
   - `SERPAPI_KEY`: Clave de API de SerpAPI

4. Secretos de Despliegue:
   - `GITHUB_TOKEN`: Token de GitHub (automáticamente proporcionado)
   - `ENV_FILE`: Contenido completo del archivo .env para producción

### Configuración de Secretos

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a "Settings" > "Secrets and variables" > "Actions"
3. Haz clic en "New repository secret"
4. Añade cada uno de los secretos mencionados arriba

## URLs de Acceso

Después del despliegue, los servicios estarán disponibles en:

- Frontend: http://localhost
- Strapi CMS: http://localhost:1337
- SerpAPI: http://localhost:3001

## Mantenimiento

### Logs
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f [frontend|strapi|serpapi]
```

### Gestión de Servicios
```bash
# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Reconstruir servicios
docker-compose up -d --build
```

## Desarrollo Local

Para desarrollo local, cada servicio puede ejecutarse independientemente:

### Frontend (Astro)
```bash
cd astroweb
npm install
npm run dev
```

### Strapi CMS
```bash
cd strapi-cms
npm install
npm run develop
```

### SerpAPI Service
```bash
cd serpapi
npm install
node index.mjs
```

## Backups

La base de datos y los archivos de Strapi se almacenan en volúmenes de Docker:
- `postgres-data`: Datos de PostgreSQL
- `strapi-uploads`: Archivos subidos a Strapi

Para realizar backups:
```bash
# Backup de la base de datos
docker-compose exec postgres pg_dump -U strapi > backup.sql

# Backup de archivos de Strapi
docker cp $(docker-compose ps -q strapi):/app/public/uploads ./backups/uploads
```

## CI/CD Pipeline

El proyecto utiliza GitHub Actions para CI/CD con los siguientes jobs:

1. **test-frontend**: Ejecuta tests del frontend
2. **test-strapi**: Ejecuta tests de Strapi
3. **test-serpapi**: Preparado para tests de SerpAPI
4. **lint**: Verifica el código con ESLint
5. **build-and-push**: Construye y publica las imágenes Docker
6. **deploy**: Despliega la aplicación en el servidor

El pipeline se ejecuta automáticamente en:
- Push a la rama main
- Pull requests a la rama main
