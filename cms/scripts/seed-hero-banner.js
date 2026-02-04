const strapi = require('@strapi/strapi');

async function seedHeroBanner() {
  let instance;

  try {
    console.log('🌱 Starting Strapi instance...');
    instance = await strapi().load();
    await instance.start();

    console.log('🌱 Seeding Hero Banner data...');

    // Check if hero banner already exists
    const existingBanner = await strapi.entityService.findMany('api::hero-banner.hero-banner');

    if (existingBanner) {
      console.log('✅ Hero Banner already exists, skipping seed.');
      await instance.destroy();
      process.exit(0);
    }

    // Create default hero banner
    const heroBanner = await strapi.entityService.create('api::hero-banner.hero-banner', {
      data: {
        headline: 'Semua Berawal\nDari Rumah\ndengan desain interior yang personal dan fungsional.',
        headline_font_size_mobile: '48px',
        headline_font_size_tablet: '88px',
        headline_font_size_desktop: '128px',
        cta_text: 'Mulai Konsultasi',
        cta_type: 'whatsapp',
        cta_page_url: '/hubungi-kami',
      },
    });

    console.log('✅ Hero Banner created successfully!');
    console.log('📝 Hero Banner ID:', heroBanner.id);
    console.log('');
    console.log('Next steps:');
    console.log('1. Go to Strapi admin: http://localhost:1337/admin');
    console.log('2. Navigate to Content Manager > Hero Banner');
    console.log('3. Upload your background image or video');
    console.log('4. Customize the headline and subheadline text');
    console.log('5. Save and publish!');

    await instance.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hero banner:', error);
    if (instance) {
      await instance.destroy();
    }
    process.exit(1);
  }
}

seedHeroBanner();
