# Use lightweight node alpine image
FROM node:20.12.2-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main"]