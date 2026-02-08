/**
 * Entry point for cPanel Node.js App (Phusion Passenger)
 * Used by Biznet Gio "Setup Node.js App" feature
 *
 * Requirements:
 * - Node.js 18 (recommended for CloudLinux/Biznet Gio)
 * - Set NODE_OPTIONS=--max-old-space-size=512 in cPanel env vars
 */
const strapi = require('@strapi/strapi');
strapi().start();
