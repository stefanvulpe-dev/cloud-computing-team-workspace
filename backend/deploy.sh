#!/bin/sh

set -xe

appName="tasty-bites-be"
registry="europe-west3-docker.pkg.dev"
repo="tribal-primer-419117/tasty-bites-be"

docker build -t $appName .

docker tag $appName $registry/$repo/$appName:latest
cat gcp-account-key.json | docker login -u _json_key --password-stdin "https://$registry"
docker push $registry/$repo/$appName:latest