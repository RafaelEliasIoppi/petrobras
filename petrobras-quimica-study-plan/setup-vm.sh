#!/bin/bash
set -e

DOMAIN="petrobrasacademy.com.br"
APP_DIR="/opt/petrobras"
NODE_VERSION="20"

echo "================================================"
echo "  Setup VM - Petrobras Academy"
echo "  Dominio: $DOMAIN"
echo "================================================"

echo -e "\n[1/6] Atualizando sistema..."
apt update && apt upgrade -y

echo -e "\n[2/6] Instalando Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
  apt install -y nodejs
fi
echo "Node $(node -v) | npm $(npm -v)"

echo -e "\n[3/6] Instalando Nginx..."
apt install -y nginx

echo -e "\n[4/6] Configurando Nginx como reverse proxy..."
cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name petrobrasacademy.com.br www.petrobrasacademy.com.br;

    # Cloudflare Flexible SSL — Nginx escuta HTTP puro
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "Nginx configurado e rodando."

echo -e "\n[5/6] Criando diretorio da app..."
mkdir -p $APP_DIR/dist
mkdir -p $APP_DIR/planos

echo -e "\n[6/6] Criando servico systemd..."
cat > /etc/systemd/system/petrobras.service << 'SERVICE'
[Unit]
Description=Petrobras Study Tracker
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/petrobras
ExecStart=/usr/bin/node /opt/petrobras/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable petrobras.service
systemctl start petrobras.service

echo -e "\n================================================"
echo "  Setup concluido!"
echo ""
echo "  Proximos passos:"
echo "  1. No Cloudflare, adicione o dominio $DOMAIN"
echo "  2. Crie um registro A:"
echo "     Nome: @"
echo "     IPv4: $(curl -s ifconfig.me)"
echo "     Proxy: Ligado (laranja)"
echo "  3. No Registrobr, troque os nameservers"
echo "     para os que o Cloudflare fornecer"
echo "  4. Execute deploy.ps1 do Windows para"
echo "     enviar a build para a VM"
echo ""
echo "  URL final: https://$DOMAIN"
echo "================================================"