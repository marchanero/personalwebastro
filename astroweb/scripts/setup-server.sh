#!/bin/bash

# Variables
SERVER_IP="185.216.203.54"
SERVER_USER="root"
SERVER_PASS="orangepi.dev"
DEPLOY_PATH="/var/www/html"

# Generar clave SSH para despliegue
ssh-keygen -t rsa -b 4096 -C "deploy@astroweb" -f ./deploy_key -N ""

# Mostrar la clave pública para añadir a GitHub Secrets
echo "===== CLAVE PÚBLICA PARA GITHUB SECRETS ====="
cat deploy_key
echo "==========================================="

# Configurar el servidor
sshpass -p "$SERVER_PASS" ssh-copy-id -i deploy_key.pub "$SERVER_USER@$SERVER_IP"

# Crear directorio de despliegue
ssh -i deploy_key "$SERVER_USER@$SERVER_IP" "mkdir -p $DEPLOY_PATH && chown -R $SERVER_USER:$SERVER_USER $DEPLOY_PATH"

# Instalar nginx si no está instalado
ssh -i deploy_key "$SERVER_USER@$SERVER_IP" "
if ! command -v nginx &> /dev/null; then
    apt-get update
    apt-get install -y nginx
fi
"

# Configurar nginx
cat > nginx.conf << EOL
server {
    listen 80;
    server_name $SERVER_IP;
    root $DEPLOY_PATH;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires max;
        log_not_found off;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOL

# Copiar configuración de nginx
scp -i deploy_key nginx.conf "$SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/astroweb"

# Activar el sitio y reiniciar nginx
ssh -i deploy_key "$SERVER_USER@$SERVER_IP" "
ln -sf /etc/nginx/sites-available/astroweb /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
"

echo "===== INSTRUCCIONES ====="
echo "1. Añade la clave privada mostrada arriba como secreto 'SSH_PRIVATE_KEY' en GitHub"
echo "2. La configuración del servidor está completa"
echo "3. El sitio estará disponible en http://$SERVER_IP"
echo "======================="