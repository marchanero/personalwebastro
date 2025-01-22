#!/bin/bash

# Colores para los mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Iniciando despliegue de la aplicación...${NC}"

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

# Detener contenedores existentes
echo -e "${GREEN}Deteniendo contenedores existentes...${NC}"
docker-compose down

# Construir las imágenes
echo -e "${GREEN}Construyendo imágenes de Docker...${NC}"
docker-compose build

# Levantar los servicios
echo -e "${GREEN}Levantando servicios...${NC}"
docker-compose up -d

# Verificar el estado de los servicios
echo -e "${GREEN}Verificando estado de los servicios...${NC}"
docker-compose ps

echo -e "${GREEN}Despliegue completado!${NC}"
echo -e "Frontend: http://localhost"
echo -e "Strapi CMS: http://localhost:1337"
echo -e "SerpAPI: http://localhost:3001"