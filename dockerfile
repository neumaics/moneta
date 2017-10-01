FROM node:slim

WORKDIR /app/moneta

COPY package.json package-lock.json ./

RUN npm install

COPY . .
COPY .env.example ./.env

EXPOSE 80

CMD npm run-script serve
