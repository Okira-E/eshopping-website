FROM node:12-alpine
LABEL Author="okira-e"


COPY package*.json ./
RUN npm i

RUN mkdir src
WORKDIR /src

COPY . .

EXPOSE 3200