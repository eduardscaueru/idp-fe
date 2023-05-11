FROM node:18.16.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Serve Application using Nginx Server

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ipd-fe /usr/share/nginx/html

EXPOSE 80