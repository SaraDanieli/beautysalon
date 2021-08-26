FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9004

CMD [ "node", "confirmation.service.js", "--seneca.test" ]