FROM node:10

COPY package.json /home/node/
USER node
WORKDIR /home/node
RUN npm i

USER root
COPY . /home/node/
RUN chown -R node.node /home/node

USER node
WORKDIR /home/node

RUN npm run-script build

CMD ["npm", "run", "dev"]
