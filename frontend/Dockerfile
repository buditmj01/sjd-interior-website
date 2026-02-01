# =============================================================================
# SJD Interior Design - Astro.js Frontend Dockerfile
# Multi-stage build with static site generation and nginx serving
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Dependencies - Install and cache node_modules
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps

# Install libc6-compat for native dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies with clean install for reproducibility
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 2: Builder - Build the Astro static site
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Build arguments for environment configuration at build time
ARG PUBLIC_SITE_URL=http://localhost:4321
ARG PUBLIC_STRAPI_URL=http://localhost:1337
ARG PUBLIC_STRAPI_TOKEN=""

# Set environment variables for build
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
ENV PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL}
ENV PUBLIC_STRAPI_TOKEN=${PUBLIC_STRAPI_TOKEN}

# Build the static site
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Production - Nginx static server (recommended for production)
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Create non-root user for nginx
RUN addgroup --system --gid 1001 frontend \
    && adduser --system --uid 1001 --ingroup frontend frontend

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper ownership
RUN chown -R frontend:frontend /usr/share/nginx/html \
    && chown -R frontend:frontend /var/cache/nginx \
    && chown -R frontend:frontend /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown frontend:frontend /var/run/nginx.pid

# Create nginx temp directories with proper permissions
RUN mkdir -p /tmp/nginx/client_body \
    && mkdir -p /tmp/nginx/proxy \
    && mkdir -p /tmp/nginx/fastcgi \
    && mkdir -p /tmp/nginx/uwsgi \
    && mkdir -p /tmp/nginx/scgi \
    && chown -R frontend:frontend /tmp/nginx

# Switch to non-root user
USER frontend

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

# -----------------------------------------------------------------------------
# Stage 4: Node SSR Production (alternative for SSR mode)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS ssr-production

RUN apk add --no-cache dumb-init libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 frontend \
    && adduser --system --uid 1001 --ingroup frontend frontend

WORKDIR /app

# Copy package files
COPY --from=builder --chown=frontend:frontend /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application
COPY --from=builder --chown=frontend:frontend /app/dist ./dist

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

USER frontend

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4321', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "./dist/server/entry.mjs"]

# -----------------------------------------------------------------------------
# Stage 5: Development - Full development environment with hot reload
# -----------------------------------------------------------------------------
FROM node:20-alpine AS development

RUN apk add --no-cache dumb-init libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 frontend \
    && adduser --system --uid 1001 --ingroup frontend frontend

WORKDIR /app

# Copy package files
COPY --chown=frontend:frontend package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files
COPY --chown=frontend:frontend . .

# Set development environment
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=4321

USER frontend

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4321', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]

# Start development server with hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
