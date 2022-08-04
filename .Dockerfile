# PROD config
FROM node:14-alpine as prod

WORKDIR /opt/app

ADD package.json package.json

RUN npm install

ADD . .

RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.ts"]

# DEV config
FROM prod as dev

RUN npm install -g nodemon
RUN npm install 

CMD [ "npm", "run", "dev" ]