FROM node:18.16.0-alpine AS build

WORKDIR /app

COPY . .

RUN rm -rf node_modules 

RUN rm -rf package-lock.json

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]

# Serve Application using Nginx Server

# FROM nginx:alpine

# COPY --from=build /app/dist/ipd-fe/ /usr/share/nginx/html

# EXPOSE 80