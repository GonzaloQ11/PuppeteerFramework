FROM node:14.16.0-buster-slim@sha256:ffc15488e56d99dbc9b90d496aaf47901c6a940c077bc542f675ae351e769a12
RUN  apt-get update \
     && apt-get install -y wget gnupg procps \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable libxss1 \
     && rm -rf /var/lib/apt/lists/*

ENV HEADLESS=true

COPY package.json package-lock.json babel.config.js /
COPY /tests/ /tests/
COPY /pages/ /pages/
COPY /utils/ /utils/
RUN npm install
