FROM gitlab.ar.bsch:4567/cobranzadigital/pue/pe-docker-images/openresty:latest

COPY dist/ .

# Copy OpenResty config
COPY openresty/nginx.conf /usr/local/openresty/nginx/conf
