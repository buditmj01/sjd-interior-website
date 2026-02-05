module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'global::rate-limit',
    config: {
      windowMs: 60000, // 1 minute
      maxRequests: 100, // 100 requests per minute per IP/path
      message: 'Too many requests, please try again later.',
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
            'market-assets.strapi.io',
            'cdn.jsdelivr.net',
            'strapi.io',
            'https://sjdinterior.com',
            'https://staging.sjdinterior.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
            'market-assets.strapi.io',
            'https://sjdinterior.com',
            'https://staging.sjdinterior.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
      xssFilter: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      frameguard: {
        action: 'deny',
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:4321',
        'http://localhost:3000',
        'http://127.0.0.1:4321',
        'https://sjdinterior.com',
        'https://www.sjdinterior.com',
        'https://staging.sjdinterior.com',
      ],
      methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: false,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
