#!/bin/bash

# Colores para los mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para realizar backup de la base de datos
backup_database() {
    echo -e "${YELLOW}Realizando backup de la base de datos...${NC}"
    BACKUP_FILE="backup-$(date +%Y%m%d_%H%M%S).sql"
    docker-compose exec -T postgres pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > "./postgres/backup/${BACKUP_FILE}"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Backup completado: ${BACKUP_FILE}${NC}"
    else
        echo -e "${RED}Error al realizar el backup${NC}"
        exit 1
    fi
}

# Función para verificar la salud de un servicio
check_health() {
    local service=$1
    local max_attempts=30
    local attempt=1

    echo -e "${YELLOW}Verificando salud del servicio ${service}...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose ps $service | grep -q "Up"; then
            local health_status=$(docker inspect --format='{{.State.Health.Status}}' $(docker-compose ps -q $service))
            if [ "$health_status" = "healthy" ]; then
                echo -e "${GREEN}Servicio ${service} está saludable${NC}"
                return 0
            fi
        fi
        echo -n "."
        sleep 2
        ((attempt++))
    done

    echo -e "\n${RED}Error: El servicio ${service} no está saludable después de ${max_attempts} intentos${NC}"
    return 1
}

# Función para rollback
rollback() {
    echo -e "${RED}Error detectado. Iniciando rollback...${NC}"
    docker-compose down
    docker-compose up -d postgres
    sleep 10
    docker-compose up -d strapi
    sleep 10
    docker-compose up -d serpapi frontend
}

# Verificar requisitos
echo -e "${GREEN}Verificando requisitos...${NC}"

# Verificar si existe el archivo .env
if [ ! -f .env ]; then
    echo -e "${RED}Error: Archivo .env no encontrado${NC}"
    echo "Por favor, crea el archivo .env basándote en .env.example"
    exit 1
fi

# Verificar Docker y Docker Compose
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker y/o Docker Compose no están instalados${NC}"
    exit 1
fi

# Crear directorio de backup si no existe
mkdir -p postgres/backup

# Realizar backup antes del despliegue
if docker-compose ps | grep -q "Up"; then
    backup_database
fi

# Detener contenedores existentes
echo -e "${GREEN}Deteniendo contenedores existentes...${NC}"
docker-compose down

# Limpiar imágenes antiguas
echo -e "${YELLOW}Limpiando imágenes antiguas...${NC}"
docker image prune -f

# Construir las imágenes
echo -e "${GREEN}Construyendo imágenes de Docker...${NC}"
if ! docker-compose build; then
    echo -e "${RED}Error al construir las imágenes${NC}"
    exit 1
fi

# Levantar los servicios
echo -e "${GREEN}Levantando servicios...${NC}"
docker-compose up -d postgres
sleep 10

# Verificar salud de PostgreSQL
if ! check_health postgres; then
    echo -e "${RED}Error: PostgreSQL no está funcionando correctamente${NC}"
    rollback
    exit 1
fi

# Levantar Strapi
docker-compose up -d strapi
sleep 10

# Verificar salud de Strapi
if ! check_health strapi; then
    echo -e "${RED}Error: Strapi no está funcionando correctamente${NC}"
    rollback
    exit 1
fi

# Levantar servicios restantes
docker-compose up -d serpapi frontend

# Verificar salud de todos los servicios
for service in frontend serpapi; do
    if ! check_health $service; then
        echo -e "${RED}Error: ${service} no está funcionando correctamente${NC}"
        rollback
        exit 1
    fi
done

# Verificar el estado final de los servicios
echo -e "${GREEN}Verificando estado final de los servicios...${NC}"
docker-compose ps

echo -e "${GREEN}¡Despliegue completado exitosamente!${NC}"
echo -e "Frontend: http://localhost"
echo -e "Strapi CMS: http://localhost:1337"
echo -e "SerpAPI: http://localhost:3001"

# Limpiar backups antiguos (mantener últimos 5)
echo -e "${YELLOW}Limpiando backups antiguos...${NC}"
cd postgres/backup && ls -t | tail -n +6 | xargs -r rm --
cd ../..

exit 0