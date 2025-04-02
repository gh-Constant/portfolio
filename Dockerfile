# Use an official Node.js runtime as a parent image (Alpine for smaller size)
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies using npm (adjust if using yarn or pnpm)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application for production
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

WORKDIR /app

# Copy built assets and necessary files from the build stage
COPY --from=base /app/.output ./.output
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Set environment variables for production
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0 # Listen on all interfaces within the container
ENV NUXT_PORT=3000    # Default Nuxt port

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", ".output/server/index.mjs"] 