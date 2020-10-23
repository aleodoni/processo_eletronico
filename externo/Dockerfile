FROM node:lts-buster-slim as build

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json /opt/spa2-externo/

# Create app directory
WORKDIR /opt/spa2-externo/

USER node

RUN npm install --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . /opt/spa2-externo/

RUN npm run build && \
    npm cache clean --force

# EXPOSE 3000

# # tentar alterar isso para algo do tipo "node src/server.js", vide:
# # https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
# CMD [ "npm", "start" ]

FROM nginx

ENV LOG_FOLDER=/var/log/nginx/

# Persisting data
VOLUME "${LOG_FOLDER}"

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build "/opt/spa2-externo/build" /usr/share/nginx/html
