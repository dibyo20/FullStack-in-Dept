# Connect to VPS
ssh root@your_server_ip

sudo apt update && sudo apt upgrade -y

sudo apt install nginx -y

sudo systemctl status nginx # Active/Running

sudo systemctl enable nginx # Enable Nginx to start on boot

sudo systemctl start nginx

sudo systemctl stop nginx

sudo systemctl restart nginx # when you pull and build some changes

sudo systemctl reload nginx # when you do come changes in config

sudo nginx -t #Test Config

# NGINX running?
systemctl status nginx

# Port 80 is allowed or not?
sudo ufw status # you will get a list to check if it's allowed or not

# Is Another Service using port 80?
ss -tulpn | grep :80

# Nginx Configs
nginx.conf -> main config file for nginx
conf.d -> extra config included by nginx.conf
sites-available -> virtual hosts
sites-enabled -> enabled virtual hosts
snippets -> reusable config snippets
mime.types -> maps file extensions to MIME Types
modules-enabled -> enable the modules
proxy_params -> common proxy settings

# Errors
Connection refused -> NGINX status & ports
403 Forbidden -> File permissions
404 Not Found -> Document root and location
502 Bad Gateway -> Express process and proxy
504 Gateway Timeout -> Upstream response and timeout
Port already in use -> ss -tulpn
Nginx fails to start -> nginx -t

/var/log/nginx/error.log -> problems
/var/log/nginx/access.log -> who, what, when, status code

# Development
npm run dev

# Production
npm run build
dist(static files) #will serve through nginx