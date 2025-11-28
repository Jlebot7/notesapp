# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source files
COPY backend/ ./backend/

# Set proper permissions
RUN chown -R node:node /app


# Install psql for database initialization
RUN apk add --no-cache postgresql-client

# Copy database initialization script with proper permissions
COPY --chown=node:node backend/scripts/init-db.sql /docker-entrypoint-initdb.d/

# Expose the application port
EXPOSE 3000

# Switch to non-root user
USER node

# Start the application
CMD ["npm", "start"]
