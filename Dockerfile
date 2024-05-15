# Verwende einen Nginx-Base-Image
FROM nginx:latest

# Kopiere die HTML-, CSS- und JavaScript-Dateien in das Nginx-Standardverzeichnis
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY backgrounds /usr/share/nginx/html/backgrounds
COPY icons /usr/share/nginx/html/icons
COPY images /usr/share/nginx/html/images

