FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.config /etc/nginx/conf.d/
