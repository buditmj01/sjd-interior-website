const strapi = require('@strapi/strapi');

async function seedWorkflow() {
  let instance;

  try {
    console.log('🌱 Starting Strapi instance...');
    instance = await strapi().load();
    await instance.start();

    console.log('🌱 Seeding Workflow data...');

    // Check if workflow already exists
    const existingWorkflow = await strapi.entityService.findMany('api::workflow.workflow');

    if (existingWorkflow) {
      console.log('✅ Workflow already exists, skipping seed.');
      await instance.destroy();
      process.exit(0);
    }

    // Create default workflow with steps
    const workflow = await strapi.entityService.create('api::workflow.workflow', {
      data: {
        page_title: 'Alur Kerja',
        page_subtitle: 'Proses kerja kami dari awal sampai akhir',
        steps: [
          {
            label: 'MULAI DARI SINI',
            title: 'Konsultasi',
            description: 'Ceritakan kebutuhan dan impian ruang Anda. Tim kami akan menganalisis gaya hidup, preferensi, dan budget Anda secara mendetail.',
            position: 'left',
            order: 1
          },
          {
            label: 'KUNJUNGAN',
            title: 'Survei Lokasi',
            description: 'Desainer kami akan mengunjungi lokasi untuk mengukur ruangan, memahami pencahayaan alami, dan menemukan potensi tersembunyi dari ruang Anda.',
            position: 'right',
            order: 2
          },
          {
            label: 'PERENCANAAN',
            title: 'Design & Anggaran',
            description: 'Desain disusun berdasarkan referensi dan kebutuhan Anda, lengkap dengan perhitungan RAB yang terukur. Setelah disetujui, proses dilanjutkan dengan persetujuan RAB sebagai dasar pelaksanaan proyek.',
            position: 'left',
            order: 3
          },
          {
            label: 'DESAIN',
            title: 'Presentasi Konsep',
            description: 'Kami sajikan konsep desain lengkap dengan moodboard, 3D rendering dan gambar teknis arsitektur.',
            milestone_after: 'Penerimaan & TTD RAB dengan <b>DP 50%</b>',
            position: 'right',
            order: 4
          },
          {
            label: 'PERSIAPAN',
            title: 'Pengadaan Material',
            description: 'Seluruh furniture dikerjakan di workshop kami hingga selesai, kemudian dikirim ke lokasi setelah proses pembayaran tahap selanjutnya.',
            milestone_after: '<b>Termin 25%:</b> Dibayarkan saat produksi selesai dan siap kirim',
            position: 'left',
            order: 5
          },
          {
            label: 'EKSEKUSI',
            title: 'Pengerjaan di Lokasi',
            description: 'Tim kami melakukan instalasi dan pengerjaan langsung di lokasi sesuai desain yang telah disepakati. Setiap proses dijalankan dengan rapi, terukur, dan diawasi hingga hasil akhir sesuai ekspektasi Anda.',
            position: 'right',
            order: 6
          },
          {
            label: 'FINALISASI',
            title: 'Serah terima & pembayaran',
            description: 'Tahap akhir penyelesaian proyek dilakukan melalui proses pengecekan bersama untuk memastikan seluruh pekerjaan sesuai desain dan standar kualitas. Setelah progress 100% dan pembayaran final dilakukan serah terima.',
            position: 'left',
            order: 7
          }
        ]
      },
    });

    console.log('✅ Workflow created successfully!');
    console.log('📝 Workflow ID:', workflow.id);
    console.log('');
    console.log('Next steps:');
    console.log('1. Go to Strapi admin: http://localhost:1337/admin');
    console.log('2. Navigate to Content Manager > Workflow / Alur Kerja');
    console.log('3. Upload images for each workflow step');
    console.log('4. Customize the step titles, descriptions, and milestones');
    console.log('5. Save and publish!');

    await instance.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding workflow:', error);
    if (instance) {
      await instance.destroy();
    }
    process.exit(1);
  }
}

seedWorkflow();
