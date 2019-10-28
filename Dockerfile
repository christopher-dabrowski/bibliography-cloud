FROM nginx

COPY login.html /usr/share/nginx/html
COPY scripts /usr/share/nginx/html/scripts
COPY img /usr/share/nginx/html/img
COPY styles /usr/share/nginx/html/styles

COPY nginx.conf /etc/nginx/nginx.conf