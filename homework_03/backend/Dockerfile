FROM node:18

RUN apt-get update -y && apt-get install -y openssl

RUN apt-get update && \
  apt-get install -y curl apt-transport-https lsb-release gnupg && \
  curl -sL https://aka.ms/InstallAzureCLIDeb | bash

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd src && npx prisma generate && cd ..

EXPOSE 3000

CMD ["npm", "start"]

