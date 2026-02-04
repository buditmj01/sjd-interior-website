/**
 * Comprehensive Seed Script for MySQL
 * Seeds all content types for a fresh database
 */

const strapi = require('@strapi/strapi');

const sampleData = {
  heroBanner: {
    headline: 'Semua Berawal\nDari Rumah\ndengan desain interior yang personal dan fungsional.',
    headline_font_size_mobile: '48px',
    headline_font_size_tablet: '88px',
    headline_font_size_desktop: '128px',
    cta_text: 'Mulai Konsultasi',
    cta_type: 'whatsapp',
    cta_page_url: '/hubungi-kami',
  },

  siteSetting: {
    site_name: 'SJD Interior Design',
    tagline: 'Desain Interior Profesional untuk Rumah dan Bisnis Anda',
    site_description: 'Layanan desain interior profesional yang menghadirkan ruang impian Anda menjadi kenyataan dengan konsep modern dan fungsional.',
  },

  contactInfo: {
    email: 'hello@sjdinterior.com',
    phone: '+62 812 3456 7890',
    whatsapp: '+62 812 3456 7890',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan 12345',
  },

  faqs: [
    {
      question: 'Berapa lama proses desain interior biasanya?',
      answer: 'Proses desain biasanya memakan waktu 2-4 minggu untuk konsep awal, tergantung kompleksitas proyek.',
      order: 1,
    },
    {
      question: 'Apakah SJD menerima proyek renovasi kecil?',
      answer: 'Ya, kami menerima berbagai skala proyek, mulai dari renovasi satu ruangan hingga desain rumah lengkap.',
      order: 2,
    },
    {
      question: 'Bagaimana sistem pembayaran yang diterapkan?',
      answer: 'Kami menerapkan sistem pembayaran bertahap: 30% di awal, 40% di tengah proses, dan 30% setelah selesai.',
      order: 3,
    },
  ],

  projects: [
    {
      title: 'Modern Minimalist Living Room',
      slug: 'modern-minimalist-living-room',
      description: 'Desain ruang tamu minimalis modern dengan sentuhan kayu dan warna netral.',
      category: 'Rumah',
      location: 'Jakarta Selatan',
      area_size: '45 m²',
      theme: 'Modern Minimalis',
      completion_date: '2025-06-15',
      is_featured: true,
      order: 1,
    },
    {
      title: 'Scandinavian Bedroom Design',
      slug: 'scandinavian-bedroom-design',
      description: 'Kamar tidur bergaya Scandinavian dengan dominasi warna putih dan material kayu.',
      category: 'Rumah',
      location: 'BSD City',
      area_size: '20 m²',
      theme: 'Scandinavian',
      completion_date: '2025-07-20',
      is_featured: true,
      order: 2,
    },
    {
      title: 'Contemporary Office Space',
      slug: 'contemporary-office-space',
      description: 'Ruang kerja kontemporer dengan desain ergonomis dan pencahayaan optimal.',
      category: 'Kantor',
      location: 'Jakarta Pusat',
      area_size: '30 m²',
      theme: 'Contemporary',
      completion_date: '2025-09-05',
      is_featured: true,
      order: 3,
    },
    {
      title: 'Tropical Villa Living',
      slug: 'tropical-villa-living',
      description: 'Living area villa tropis yang memadukan indoor dan outdoor dengan material natural.',
      category: 'Rumah',
      location: 'Bogor',
      area_size: '80 m²',
      theme: 'Tropical Modern',
      completion_date: '2025-10-15',
      is_featured: true,
      order: 4,
    },
  ],

  insights: [
    {
      title: '5 Tren Desain Interior 2026 yang Wajib Kamu Tahu',
      slug: '5-tren-desain-interior-2026',
      excerpt: 'Dari sustainable design hingga biophilic elements, simak tren desain interior yang akan mendominasi tahun 2026.',
      content: '# 5 Tren Desain Interior 2026\n\n## 1. Sustainable Design\nMaterial ramah lingkungan semakin populer.\n\n## 2. Biophilic Design\nMengintegrasikan elemen alam ke dalam ruangan.',
      category: 'trends',
      reading_time: 5,
      is_featured: true,
      order: 1,
    },
    {
      title: 'Cara Memilih Warna Cat yang Tepat',
      slug: 'cara-memilih-warna-cat-ruangan',
      excerpt: 'Panduan lengkap memilih warna cat yang sesuai dengan fungsi dan mood setiap ruangan.',
      content: '# Cara Memilih Warna Cat\n\n## Ruang Tamu\nWarm neutrals (beige, soft grey)\n\n## Kamar Tidur\nCool tones (soft blue, lavender)',
      category: 'tips',
      reading_time: 7,
      is_featured: true,
      order: 2,
    },
    {
      title: 'Biophilic Design: Membawa Alam ke Dalam Rumah',
      slug: 'biophilic-design-alam-dalam-rumah',
      excerpt: 'Pelajari konsep biophilic design untuk meningkatkan kesehatan dan well-being.',
      content: '# Biophilic Design\n\n## Manfaat\n- Mengurangi stress\n- Meningkatkan produktivitas',
      category: 'inspiration',
      reading_time: 8,
      is_featured: true,
      order: 3,
    },
  ],

  author: {
    name: 'SJD Interior Team',
    bio: 'Tim desainer interior profesional dengan pengalaman lebih dari 15 tahun.',
    role: 'Interior Design Team',
  },
};

async function seedDatabase() {
  let instance;

  try {
    console.log('🌱 Starting Strapi instance for MySQL seeding...');
    instance = await strapi().load();

    // Access entityService from the instance
    const entityService = instance.entityService;

    // 1. Seed Hero Banner
    console.log('\n📌 Seeding Hero Banner...');
    try {
      const existingHero = await entityService.findMany('api::hero-banner.hero-banner');
      if (!existingHero || existingHero.length === 0) {
        await entityService.create('api::hero-banner.hero-banner', { data: sampleData.heroBanner });
        console.log('✅ Hero Banner created');
      } else {
        console.log('ℹ️  Hero Banner already exists');
      }
    } catch (e) {
      console.log('⚠️  Hero Banner:', e.message);
    }

    // 2. Seed Site Settings
    console.log('\n📌 Seeding Site Settings...');
    try {
      const existingSettings = await entityService.findMany('api::site-setting.site-setting');
      if (!existingSettings || existingSettings.length === 0) {
        await entityService.create('api::site-setting.site-setting', { data: sampleData.siteSetting });
        console.log('✅ Site Settings created');
      } else {
        console.log('ℹ️  Site Settings already exists');
      }
    } catch (e) {
      console.log('⚠️  Site Settings:', e.message);
    }

    // 3. Seed Contact Info
    console.log('\n📌 Seeding Contact Info...');
    try {
      const existingContact = await entityService.findMany('api::contact-info.contact-info');
      if (!existingContact || existingContact.length === 0) {
        await entityService.create('api::contact-info.contact-info', { data: sampleData.contactInfo });
        console.log('✅ Contact Info created');
      } else {
        console.log('ℹ️  Contact Info already exists');
      }
    } catch (e) {
      console.log('⚠️  Contact Info:', e.message);
    }

    // 4. Seed Author
    console.log('\n📌 Seeding Author...');
    let authorId;
    try {
      const existingAuthors = await entityService.findMany('api::author.author');
      if (!existingAuthors || existingAuthors.length === 0) {
        const author = await entityService.create('api::author.author', { 
          data: { ...sampleData.author, publishedAt: new Date() }
        });
        authorId = author.id;
        console.log('✅ Author created');
      } else {
        authorId = existingAuthors[0].id;
        console.log('ℹ️  Author already exists');
      }
    } catch (e) {
      console.log('⚠️  Author:', e.message);
    }

    // 5. Seed FAQs
    console.log('\n📌 Seeding FAQs...');
    try {
      const existingFaqs = await entityService.findMany('api::faq.faq');
      if (!existingFaqs || existingFaqs.length === 0) {
        for (const faq of sampleData.faqs) {
          await entityService.create('api::faq.faq', { 
            data: { ...faq, publishedAt: new Date() }
          });
        }
        console.log(`✅ ${sampleData.faqs.length} FAQs created`);
      } else {
        console.log('ℹ️  FAQs already exist');
      }
    } catch (e) {
      console.log('⚠️  FAQs:', e.message);
    }

    // 6. Seed Projects
    console.log('\n📌 Seeding Projects...');
    try {
      const existingProjects = await entityService.findMany('api::project.project');
      if (!existingProjects || existingProjects.length === 0) {
        for (const project of sampleData.projects) {
          await entityService.create('api::project.project', {
            data: { ...project, publishedAt: new Date() },
          });
        }
        console.log(`✅ ${sampleData.projects.length} Projects created`);
      } else {
        console.log('ℹ️  Projects already exist');
      }
    } catch (e) {
      console.log('⚠️  Projects:', e.message);
    }

    // 7. Seed Insights
    console.log('\n📌 Seeding Insights...');
    try {
      const existingInsights = await entityService.findMany('api::insight.insight');
      if (!existingInsights || existingInsights.length === 0) {
        for (const insight of sampleData.insights) {
          const data = { ...insight, publishedAt: new Date() };
          if (authorId) data.author = authorId;
          await entityService.create('api::insight.insight', { data });
        }
        console.log(`✅ ${sampleData.insights.length} Insights created`);
      } else {
        console.log('ℹ️  Insights already exist');
      }
    } catch (e) {
      console.log('⚠️  Insights:', e.message);
    }

    console.log('\n🎉 Database seeding completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to Strapi admin: http://localhost:1337/admin');
    console.log('2. Create an admin account');
    console.log('3. Upload images for projects and insights');

    await instance.destroy();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error(error.stack);
    if (instance) {
      await instance.destroy();
    }
    process.exit(1);
  }
}

seedDatabase();
