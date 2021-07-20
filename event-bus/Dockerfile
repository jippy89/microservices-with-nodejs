# Step 1: Build this file
FROM node:14-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]