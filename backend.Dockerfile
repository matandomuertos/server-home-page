FROM node:lts-alpine3.16

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node backend/ .

#To be able to access docker.socket you can use root or any user with privileges to run Docker commands
USER root

RUN npm install

EXPOSE 8000

CMD [ "node", "index.js" ]