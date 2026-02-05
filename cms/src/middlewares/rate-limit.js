'use strict';

/**
 * Simple in-memory rate limiting middleware for Strapi
 * Note: For production, use a reverse proxy (nginx, Cloudflare) for rate limiting
 */

const rateLimitStore = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.windowStart > 60000) {
      rateLimitStore.delete(key);
    }
  }
}, 300000);

module.exports = (config, { strapi }) => {
  const {
    windowMs = 60000, // 1 minute window
    maxRequests = 100, // max requests per window
    message = 'Too many requests, please try again later.',
  } = config;

  return async (ctx, next) => {
    // Skip rate limiting for admin routes (handled by admin auth)
    if (ctx.path.startsWith('/admin')) {
      return next();
    }

    const clientIP = ctx.request.ip || ctx.request.headers['x-forwarded-for'] || 'unknown';
    const key = `${clientIP}:${ctx.path}`;
    const now = Date.now();

    let clientData = rateLimitStore.get(key);

    if (!clientData || now - clientData.windowStart > windowMs) {
      // Start new window
      clientData = {
        windowStart: now,
        requests: 1,
      };
    } else {
      clientData.requests++;
    }

    rateLimitStore.set(key, clientData);

    // Set rate limit headers
    ctx.set('X-RateLimit-Limit', maxRequests);
    ctx.set('X-RateLimit-Remaining', Math.max(0, maxRequests - clientData.requests));
    ctx.set('X-RateLimit-Reset', new Date(clientData.windowStart + windowMs).toISOString());

    if (clientData.requests > maxRequests) {
      ctx.status = 429;
      ctx.body = { error: { message, status: 429 } };
      strapi.log.warn(`Rate limit exceeded for IP: ${clientIP} on path: ${ctx.path}`);
      return;
    }

    await next();
  };
};
