FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9002

CMD [ "node", "treatments.service.js", "--seneca.test" ]