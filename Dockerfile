# ---------- Install dependencies only when needed ----------
FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- Final production image ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Optional: expose port if needed (adjust if you're not using 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
    