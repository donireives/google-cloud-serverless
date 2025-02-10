# Use lightweight node alpine image
FROM node:20.12.2-alpine3.19

# Add tzdata for timezone support and other required dependencies
RUN apk add --no-cache tzdata

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
# Use --production flag for production build
# Clean npm cache to reduce image size
RUN npm ci --production && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build && \
    # Remove source and dev dependencies after build
    rm -rf src/ && \
    rm -rf node_modules/ && \
    # Reinstall only production dependencies
    npm ci --production && \
    npm cache clean --force

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main"]