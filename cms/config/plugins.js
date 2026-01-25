module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'id',
      locales: ['id', 'en'],
    },
  },
});
