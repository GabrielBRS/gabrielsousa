# ─────────────────────────────────────────────────────────────────────────
# Modo "artifact": build no PC, imagem mínima só com nginx + estáticos.
# Antes de buildar a imagem, rode no PC:
#
#   npm ci
#   npm run build     # prerender de / e /en sai em dist/personal-home-page/browser
#
# Mesmo com outputMode "server" no angular.json, as rotas prerenderizadas
# são emitidas como HTML estático dentro de browser/ — o server.mjs não é
# necessário para servir este site (igual ao site da Ortzion).
# ─────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/personal-home-page/browser /usr/share/nginx/html

EXPOSE 80
