# Use a lightweight version of Node.js
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
# note we need to do it this way so as not to copy the node_modules folder from the host because
# it will may be a different architecture from the one in the container
COPY ./index.js ./
COPY ./db.js ./
COPY ./web ./web


# Expose the port your app runs on
EXPOSE 4000

# Start your app
CMD [ "node", "index.js" ]