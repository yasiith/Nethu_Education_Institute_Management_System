# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy app files
COPY . .

# Expose backend port (e.g., 5000)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
