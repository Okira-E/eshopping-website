# !/bin/bash
mkdir backend-node/images
mkdir backend-node/config
touch backend-node/config/dev.env
echo "PORT=
MONGO_URI=" > backend-node/config/dev.env
