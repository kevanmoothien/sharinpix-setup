FROM node:current-alpine

# manually installing chrome
RUN apk add chromium

# skips puppeteer installing chrome and points to correct binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 3000
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"] .
RUN yarn install
RUN yarn start
