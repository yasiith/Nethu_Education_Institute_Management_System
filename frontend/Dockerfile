# Use Node.js base image
FROM node:20-alpine
# Set working directory
WORKDIR /app
# Copy package files
COPY package.json package-lock.json ./
# Install dependencies with --force flag to ignore platform checks
RUN npm install --force
# Copy app files
COPY . .
# Build Next.js app
RUN npm run build
# Expose frontend port
EXPOSE 3000
# Start Next.js app
CMD ["npm", "run", "start"]