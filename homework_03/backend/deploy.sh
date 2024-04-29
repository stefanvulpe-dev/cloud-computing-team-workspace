#!/bin/sh

set -xe

appName="tasty-bites-be"
registry="tastybitesregistry.azurecr.io"

npm run build

docker build -t $appName .

az login
az acr login --name TastyBitesRegistry

docker tag $appName $registry/$appName:latest
docker push $registry/$appName:latest