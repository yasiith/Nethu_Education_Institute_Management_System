# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies and axios explicitly
RUN npm install --production && npm install axios

# Copy app files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]