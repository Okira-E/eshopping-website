FROM node:12-alpine
LABEL name="okira-e"


COPY package*.json ./
RUN npm i

RUN mkdir src
WORKDIR /src

COPY . .

EXPOSE 3200
EXPOSE 27017
