const config = {
  locales: ['id', 'en'],
  translations: {
    id: {
      'app.components.LeftMenu.navbrand.title': 'SJD Interior',
      'app.components.LeftMenu.navbrand.workplace': 'Dashboard',
      'Auth.form.welcome.title': 'Selamat Datang di SJD Interior CMS',
      'Auth.form.welcome.subtitle': 'Masuk ke akun admin Anda',
    },
    en: {
      'app.components.LeftMenu.navbrand.title': 'SJD Interior',
      'app.components.LeftMenu.navbrand.workplace': 'Dashboard',
      'Auth.form.welcome.title': 'Welcome to SJD Interior CMS',
      'Auth.form.welcome.subtitle': 'Log in to your admin account',
    },
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
