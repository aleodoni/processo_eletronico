FROM node:lts-buster-slim

# bzip2 and git are used to decompress/install some packages in npm
RUN apt-get update \
    && apt-get install -y bzip2 git \
    && rm -rf /var/lib/apt/lists/*

# Recommended location of node.js applications in linux filesystem?
# https://unix.stackexchange.com/questions/35807/recommended-location-of-node-js-applications-in-linux-filesystem
#
# APP = distribution files
# CONFIG = placeholder for configuration files
# STATIC = static and run-time data (could be "/src/opt/spa2-api")
# LOG = logs
ENV SPA2API_APP_FOLDER=/opt/spa2-api/ \
    SPA2API_CONFIG_FOLDER=/etc/opt/spa2-api/ \
    SPA2API_STATIC_FOLDER=/var/www/spa2-api/ \
    SPA2API_LOG_FOLDER=/var/log/spa2-api/

# As default for a mount point, this must be run before VOLUME directive
RUN mkdir -p "${SPA2API_LOG_FOLDER}" \
    && chown node:node "${SPA2API_LOG_FOLDER}"

# Persisting data
VOLUME "${SPA2API_CONFIG_FOLDER}" \
       "${SPA2API_LOG_FOLDER}"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json "${SPA2API_APP_FOLDER}"

# Create app directory
WORKDIR "${SPA2API_APP_FOLDER}"

USER node

RUN npm install --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . "${SPA2API_APP_FOLDER}"

RUN npm run build && \
    npm cache clean --force

EXPOSE 3002

# tentar alterar isso para algo do tipo "node src/server.js", vide:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
CMD [ "npm", "start" ]
