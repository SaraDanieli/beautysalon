FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9003

CMD [ "node", "appointments.service.js", "--seneca.test" ]

