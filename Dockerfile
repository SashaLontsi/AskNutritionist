# Dockerfile
FROM node:18-bullseye

WORKDIR /app

# Copy package.json and lock first (for caching)
COPY package.json package-lock.json ./

# Install deps (this is where lucide-react gets installed)
RUN npm install

# Then copy the rest of your app (src, public, etc.)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
