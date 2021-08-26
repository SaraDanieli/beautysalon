###### Dockerfile adapted from: 
# Author: Maciej Cieślar. Source: https://blog.logrocket.com/containerized-development-nestjs-docker/ 
#  and 
# Author: Erez Hod. Source: https://dev.to/erezhod/setting-up-a-nestjs-project-with-docker-for-back-end-development-30lg


FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
