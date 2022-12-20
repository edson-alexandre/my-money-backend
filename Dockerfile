FROM node:14.17.6

WORKDIR /src/app/my-money-backend

COPY ./package*.json ./

RUN apt-get update && \
  yarn && \
  npm install typescript -g

COPY . .

CMD ["yarn","dev"]
