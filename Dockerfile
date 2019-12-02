FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package*.json ./
COPY ./server.js ./
COPY --chown=node:node ./dist/locacao-app/* ./ 

USER node
RUN npm install
EXPOSE 3001
CMD [ "node", "server.js" ]
