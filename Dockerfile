FROM node:alpine3.12
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm run build

ENTRYPOINT [ "node", "__sapper__/build/" ]