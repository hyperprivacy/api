FROM node:11.8.0-alpine

WORKDIR /server

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4000

CMD npm start