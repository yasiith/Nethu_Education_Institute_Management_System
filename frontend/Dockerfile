# Stage 1: Build the app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to ensure npm install is based on the lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . ./

# Stage 2: Run the app in development mode
FROM node:18-alpine

WORKDIR /app

# Copy the built app from the build stage
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 3000

# Run the app in development mode (this replaces the build and start commands)
CMD ["npm", "run", "dev"]
