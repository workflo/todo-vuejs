FROM node:10

COPY . /home/node/
RUN chown -R node.node /home/node

USER node
WORKDIR /home/node

RUN npm i
