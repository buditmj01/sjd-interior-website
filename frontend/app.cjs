/**
 * Entry point for cPanel Node.js App (Phusion Passenger)
 * Bridges Passenger (CommonJS) to Astro SSR (ESM)
 */
const http = require('http');

const fs = require('fs');
const path = require('path');

async function start() {
  console.log('--- ASTRO MIDDLEWARE STARTUP ---');
  try {
    const { handler } = await import('./dist/server/entry.mjs');

    const server = http.createServer((req, res) => {
      // Basic static file server for dist/client
      // Passenger serves these files usually, but we bridge them here for safety
      const urlPath = req.url.split('?')[0];
      const filePath = path.join(__dirname, 'dist', 'client', urlPath === '/' ? 'index.html' : urlPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.woff': 'application/font-woff',
          '.ttf': 'application/font-ttf',
          '.otf': 'application/font-otf',
          '.wasm': 'application/wasm'
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
        return;
      }

      // Fallback to Astro SSR handler
      handler(req, res);
    });

    const PORT = process.env.PORT || 4321;
    server.listen(PORT, () => {
      console.log('Astro SSR bridge with static server on port:', PORT);
    });
  } catch (error) {
    console.error('CRITICAL: Failed to start Astro SSR:', error);
    process.exit(1);
  }
}

start();
