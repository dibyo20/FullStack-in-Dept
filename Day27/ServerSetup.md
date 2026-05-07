# 🚀 VPS Deployment Guide (React + Node + Nginx + PM2 + SSL)

A clean production deployment flow for:

- Frontend: React/Vite
- Backend: Node.js + Express API
- Database: MongoDB Atlas (or VPS-hosted MongoDB)
- Infra: Ubuntu VPS, Nginx, PM2, UFW, Let's Encrypt SSL

---

## ✅ Prerequisites

- VPS with Ubuntu 22.04 LTS
- Minimum 2 GB RAM
- Domain/subdomain pointing to VPS IP
- GitHub repository with separate frontend and backend folders
- Optional: SSH key authentication

---

## 1) Create and Access VPS 🖥️

```bash
ssh root@[vps-ip]
```

---

## 2) Initial Server Setup ⚙️

```bash
sudo apt update && sudo apt upgrade -y
sudo adduser [username]
sudo usermod -aG sudo [username]
su - [username]
```

---

## 3) Install Core Tools 🧰

### Node.js + npm

```bash
sudo apt install -y nodejs npm
node -v
npm -v
```

### PM2

```bash
sudo npm install -g pm2
pm2 -v
```

### Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo ufw allow 'Nginx Full'
```

### Git

```bash
sudo apt install -y git
```

---

## 4) Clone Project 📦

```bash
mkdir -p ~/Sites
cd ~/Sites
git clone [repo-url]
cd [repo-name]
```

---

## 5) Backend Setup (Express API) 🔧

```bash
cd backend
npm install
```

Create a .env file and add required backend environment variables.

### Test Backend Locally on VPS

```bash
npm start
# or
node server.js
```

Test endpoint:

```text
http://[vps-ip]:[backend-port]/api/health
```

If working, stop with Ctrl + C.

### Run Backend with PM2

```bash
pm2 start server.js --name "[project-name]-api"
pm2 save
pm2 startup
pm2 list
```

Logs:

```bash
pm2 logs [project-name]-api
```

---

## 6) Frontend Setup (React/Vite) 🎨

```bash
cd ../frontend
npm install
# if dependency issues:
# npm install --legacy-peer-deps
```

Create a .env file if needed.

Build frontend:

```bash
npm run build
```

This creates a production dist folder.

---

## 7) Domain DNS Setup 🌐

At your domain provider:

- Add an A record pointing your domain/subdomain to your VPS IP.
- Wait for propagation (usually minutes, up to 24 hours).

---

## 8) Nginx Configuration 🛡️

Create config file:

```bash
sudo nano /etc/nginx/sites-available/[project-name]
```

### Option A: Frontend + Backend (Reverse Proxy /api)

```nginx
server {
    listen 80;
    server_name [your-domain.com] www.[your-domain.com];

    location / {
        root /home/[username]/Sites/[repo-name]/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:[backend-port]/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option B: Frontend Only

```nginx
server {
    listen 80;
    server_name [your-domain.com] www.[your-domain.com];

    location / {
        root /home/[username]/Sites/[repo-name]/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable config and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/[project-name] /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Note: If default Nginx site conflicts, remove it:

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

---

## 9) Firewall Setup 🔐

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 10) SSL with Let's Encrypt 🔒

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d [your-domain.com] -d www.[your-domain.com]
```

Verify:

- Frontend: https://[your-domain.com]
- Backend: https://[your-domain.com]/api/health

---

## 11) Deployment Update Flow 🔄

### Backend updates

```bash
cd ~/Sites/[repo-name]/backend
git pull origin main
npm install
pm2 restart [project-name]-api
```

### Frontend updates

```bash
cd ~/Sites/[repo-name]/frontend
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

---

## 12) Troubleshooting 🧪

### Backend not responding

```bash
pm2 list
pm2 logs [project-name]-api
sudo ufw status
ss -tuln | grep [backend-port]
curl http://127.0.0.1:[backend-port]/api/health
```

### Frontend not loading

```bash
ls /home/[username]/Sites/[repo-name]/frontend/dist
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Nginx issues

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 13) Handy Commands 📚

### PM2

```bash
pm2 list
pm2 logs [project-name]-api
pm2 restart [project-name]-api
pm2 stop [project-name]-api
pm2 delete [project-name]-api
pm2 save
pm2 startup
```

### Nginx

```bash
sudo systemctl status nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
sudo systemctl disable nginx
sudo nginx -t
```

---

## ✅ Final Architecture

Internet -> Nginx -> Frontend static files (Vite build)

Internet -> Nginx reverse proxy (/api) -> Node.js backend (PM2) -> MongoDB Atlas
