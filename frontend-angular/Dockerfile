FROM node:12-alpine
LABEL Author="okira-e"

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

RUN mkdir src
WORKDIR /src

COPY . .

EXPOSE 4200
