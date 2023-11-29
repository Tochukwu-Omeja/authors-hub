#DOCKERFILE => DOCKER CLIENT/CLI => DOCKER SERVER
FROM node:gallium-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

COPY ./ ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]