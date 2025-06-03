# Use the latest version of Node.js as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY express-api-demo/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files
COPY express-api-demo/ .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
