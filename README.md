# Personal Web Astro

Sistema web personal construido con Astro, Strapi CMS y servicios adicionales.

## Arquitectura

El proyecto está compuesto por varios servicios:

- **Frontend (Astro)**: Aplicación web principal
- **Strapi CMS**: Sistema de gestión de contenidos
- **PostgreSQL**: Base de datos para Strapi
- **SerpAPI**: Servicio para obtención de datos externos

## Requisitos

- Docker
- Docker Compose
- 4GB RAM mínimo recomendado
- 10GB espacio en disco

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env
```

2. Configura las variables en el archivo `.env`:
- Variables PostgreSQL (POSTGRES_*)
- Claves secretas Strapi (JWT_SECRET, etc.)
- API key de SerpAPI
- URLs de los servicios

## Despliegue

El sistema incluye un script de despliegue automatizado con las siguientes características:

```bash
./deploy.sh
```

### Características del Despliegue

- **Backup Automático**: Realiza backup de la base de datos antes del despliegue
- **Verificación de Salud**: Comprueba el estado de cada servicio
- **Sistema de Rollback**: Restaura el estado anterior en caso de fallo
- **Rotación de Backups**: Mantiene los últimos 5 backups
- **Limpieza Automática**: Elimina imágenes Docker antiguas

## Monitorización y Mantenimiento

### Logs

Los logs de cada servicio se encuentran en:
```
/var/lib/docker/containers/[container-id]/[container-id]-json.log
```

Configuración de rotación:
- Tamaño máximo: 10MB
- Máximo 3 archivos

### Backups

Los backups se almacenan en:
```
./postgres/backup/
```

Se mantienen los últimos 5 backups automáticamente.

### Recursos

Límites de recursos por servicio:

- Frontend:
  - CPU: 0.5 cores
  - RAM: 512MB
- Strapi:
  - CPU: 1 core
  - RAM: 1GB
- PostgreSQL:
  - CPU: 1 core
  - RAM: 1GB
- SerpAPI:
  - CPU: 0.5 cores
  - RAM: 512MB

## Optimizaciones

### Frontend (Nginx)

- Compresión Gzip y Brotli
- Caché agresiva para archivos estáticos
- Headers de seguridad
- SSL optimizado
- Proxy inverso configurado

### Base de Datos

- Healthchecks configurados
- Backup automático
- Sistema de recuperación

### Seguridad

- Headers de seguridad configurados
- Límites de recursos establecidos
- Acceso restringido a archivos sensibles
- SSL/TLS optimizado

## Troubleshooting

### Verificar Estado de Servicios
```bash
docker-compose ps
```

### Ver Logs
```bash
docker-compose logs [servicio]
```

### Reiniciar Servicio
```bash
docker-compose restart [servicio]
```

### Backup Manual
```bash
docker-compose exec -T postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql
```

## URLs

- Frontend: http://localhost
- Strapi CMS: http://localhost:1337
- SerpAPI: http://localhost:3001
