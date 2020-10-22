FROM node:lts-buster-slim

# Recommended location of node.js applications in linux filesystem?
# https://unix.stackexchange.com/questions/35807/recommended-location-of-node-js-applications-in-linux-filesystem
#
# APP = distribution files
# CONFIG = placeholder for configuration files
# STATIC = static and run-time data (could be "/src/opt/spa2-ext")
# LOG = logs
ENV SPA2ETX_APP_FOLDER=/opt/spa2-ext/ \
    SPA2ETX_CONFIG_FOLDER=/etc/opt/spa2-ext/ \
    SPA2ETX_STATIC_FOLDER=/var/www/spa2-ext/ \
    SPA2ETX_LOG_FOLDER=/var/log/spa2-ext/

# As defaulting properties for a mount point, this must be run before VOLUME directive
RUN mkdir -p "${SPA2ETX_LOG_FOLDER}" \
    && chown node:node "${SPA2ETX_LOG_FOLDER}"

# Persisting data
VOLUME "${SPA2ETX_CONFIG_FOLDER}" \
       "${SPA2ETX_LOG_FOLDER}"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json "${SPA2ETX_APP_FOLDER}"

# Create app directory
WORKDIR "${SPA2ETX_APP_FOLDER}"

USER node

RUN npm install --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . "${SPA2ETX_APP_FOLDER}"

RUN npm run build && \
    npm cache clean --force

EXPOSE 3000

# tentar alterar isso para algo do tipo "node src/server.js", vide:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
CMD [ "npm", "start" ]
