FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first - separate layer from source code
# If package.json hasn't changed, Docker reuses the cached npm ci layer
# even when source files change
COPY package.json package-lock.json ./

# Install ONLY production dependencies
# --omit-dev excludes devDependencies (typescript, jest, eslint, etc...)
RUN npm ci --omit=dev

# Copy source code - this layer changes on every commit
COPY . .

EXPOSE 3000

# The user to run the process as
# Runnins as root inside a container is a security risk
USER node

CMD ["npm", "start"]