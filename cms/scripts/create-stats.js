const Database = require('better-sqlite3');
const path = require('path');

const dbPath = '/Users/budi.triatmojo/Documents/Web Project/sjd-interior-design/cms/.tmp/data.db';
const db = new Database(dbPath);

try {
  const now = new Date().toISOString();

  // Check if stats already exists
  const existing = db.prepare('SELECT id FROM site_statistics').all();

  if (existing.length === 0) {
    console.log('Creating default stats...');

    // Insert stats record
    const result = db.prepare(
      'INSERT INTO site_statistics (created_at, updated_at, created_by_id, updated_by_id) VALUES (?, ?, NULL, NULL)'
    ).run(now, now);

    const statsId = result.lastInsertRowid;

    // Create stat items for each stat
    const stats = [
      { value: '500+', label: 'Proyek Selesai' },
      { value: '300+', label: 'Klien Puas' },
      { value: '15+', label: 'Tahun Pengalaman' },
      { value: '98%', label: 'Tingkat Kepuasan' }
    ];

    stats.forEach((stat, index) => {
      // Insert into components_shared_stat_items table
      const statResult = db.prepare(
        'INSERT INTO components_shared_stat_items (value, label) VALUES (?, ?)'
      ).run(stat.value, stat.label);

      const statItemId = statResult.lastInsertRowid;

      // Link to stats entity
      const field = `stats${index + 1}`;
      db.prepare(
        'INSERT INTO site_statistics_components (entity_id, component_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)'
      ).run(statsId, statItemId, 'shared.stat-item', field, 1);

      console.log(`  ✅ Created ${field}: ${stat.value} - ${stat.label}`);
    });

    console.log('✅ Stats created successfully!');
  } else {
    console.log('Stats already exist');
  }

  db.close();
} catch (error) {
  console.error('Error:', error);
  db.close();
  process.exit(1);
}
