# Start with the official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Expose the port (doesn't matter for Fly, just for reference)
EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main"]
