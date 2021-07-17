# An Open Source E-commerce Website

## How to run?

Requirements: Docker Engine, docker-compose tools.

1. In the parent directory, run "bash ./after_cloning.sh" for the first time.

2. Modify "backend-node/config/dev.env" and add a MONGO_URI for your account in https://www.mongodb.com/cloud/atlas, as well as specify the PORT.

3. Run "docker-compose up --build".

4. Go to http://localhost:4200/ in a web browser of your choice.

## What are the technologies used in this project?

Node.js (JavaScript)

Angular 9 (TypeScript)

MongoDB - Cloud Cluster

Dockerization