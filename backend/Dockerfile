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
# STATIC = static and run-time data (could be "/src/opt/spae-api")
# LOG = logs
# FILES = placeholder for user files
ENV SPAEAPI_APP_FOLDER=/opt/spae-api/ \
    SPAEAPI_CONFIG_FOLDER=/etc/opt/spae-api/ \
    SPAEAPI_STATIC_FOLDER=/var/www/spae-api/ \
    SPAEAPI_LOG_FOLDER=/var/log/spae-api/ \
    SPAEAPI_FILES_FOLDER=/opt/spae-api/arquivos/
# ATENÇÃO: ajuste estes caminhos de acordo com o configurado no ''.env'

# As default for a mount point, this must be run before VOLUME directive
RUN mkdir -p "${SPAEAPI_LOG_FOLDER}" \
    && chown node:node "${SPAEAPI_LOG_FOLDER}"

# Persisting data
VOLUME "${SPAEAPI_CONFIG_FOLDER}" \
       "${SPAEAPI_LOG_FOLDER}"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json "${SPAEAPI_APP_FOLDER}"

# Create app directory
WORKDIR "${SPAEAPI_APP_FOLDER}"

USER node

RUN npm install --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . "${SPAEAPI_APP_FOLDER}"

RUN npm run build && \
    npm cache clean --force

EXPOSE 3002

# tentar alterar isso para algo do tipo "node src/server.js", vide:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
CMD [ "npm", "start" ]
