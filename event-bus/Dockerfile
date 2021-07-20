# Step 2: Push to Docker Hub
FROM node:14-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]