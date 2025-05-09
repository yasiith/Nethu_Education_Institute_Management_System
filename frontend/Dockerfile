# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build Next.js app
RUN npm run build

# Expose frontend port (e.g., 3000)
EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "start"]
