FROM node:8.5.0-slim

WORKDIR /app/moneta

COPY package.json package-lock.json ./

RUN npm install

COPY . .
COPY .env.example ./.env

EXPOSE 3000

CMD npm run-script serve
