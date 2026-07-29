FROM node:22 AS build
WORKDIR /app

COPY personal-home-page/package*.json ./
RUN npm install

COPY personal-home-page/ .
RUN npm run build

FROM nginx:alpine
#s
COPY --from=build /app/dist/personal-home-page/browser /usr/share/nginx/html
EXPOSE 80