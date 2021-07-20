# Step 3: Build the image again
# Run `docker build -t [your docker hub username]/[image name] .`
# In this case I'm running it as `docker build -t irfandyjip89/microservices_posts .`
FROM node:14-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]