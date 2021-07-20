# Step 4: Push the image to the docker hub
# Run `docker push [your docker hub username]/[image name]`
# In this case I'm running it as `docker push irfandyjip89/microservices_posts`
FROM node:14-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]