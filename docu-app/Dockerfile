FROM node:22.19.0

WORKDIR /docu-app

ENV PATH="/docu-app/node_modules/.bin:$PATH"

COPY package.json .
COPY yarn.lock .
COPY public ./public
COPY src ./src

RUN yarn install --production