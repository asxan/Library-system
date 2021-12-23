# STAGE1

FROM node:16.13-alpine3.12 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build -- --prod

# STAGE 2

FROM nginx:1.20.2-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build  /usr/src/app/dist/library-spa/ /usr/share/nginx/html