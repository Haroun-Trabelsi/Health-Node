# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# ARG values should be used as needed, but are fine here.
ARG MONGODB_URI
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 1. Copy the standalone server and its required package.json directly to the root WORKDIR (/app).
# This is the file CMD ["node", "server.js"] needs to execute.
COPY --from=builder /app/.next/standalone/server.js ./server.js
COPY --from=builder /app/.next/standalone/package.json ./package.json

# 2. Copy the minimized production node_modules from the standalone output
COPY --from=builder /app/.next/standalone/node_modules ./node_modules

# 3. Copy the static assets and internal build files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
# The rest of the internal build files must be copied inside ./.next/
COPY --from=builder /app/.next/standalone/.next ./.next

EXPOSE 3000

# The application entry point
CMD ["node", "server.js"]