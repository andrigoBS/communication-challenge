FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY public /usr/src/app/public
COPY src /usr/src/app/src
COPY tsconfig.json /usr/src/app/tsconfig.json
RUN npm run build

FROM node:lts-alpine
ENV NODE_ENV production
USER node
WORKDIR /usr/src/node
COPY --from=build /usr/src/app/build /usr/src/node
RUN npm ci --only=production
EXPOSE 80
CMD ["node", "src/server.js"]

#### Dockerfile only used to production #####