FROM node:24.5.0-alpine3.22
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app/
RUN npm run compile

CMD ["node", "build/server.js"]