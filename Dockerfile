FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
