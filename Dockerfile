FROM node:current-alpine

# Manually installing Chrome
RUN apk add --no-cache chromium

# Skips Puppeteer installing Chrome and points to the correct binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "./src/index.js"]
