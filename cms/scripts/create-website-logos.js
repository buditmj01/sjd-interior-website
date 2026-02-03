const Database = require('better-sqlite3');
const path = require('path');

const dbPath = '/Users/budi.triatmojo/Documents/Web Project/sjd-interior-design/cms/.tmp/data.db';
const db = new Database(dbPath);

try {
  const now = new Date().toISOString();

  // Check if website-logos already exists
  const existing = db.prepare('SELECT id FROM website_logos').all();

  if (existing.length === 0) {
    console.log('Creating empty Website Logos entry...');

    // Insert website-logos record
    const result = db.prepare(
      'INSERT INTO website_logos (created_at, updated_at, created_by_id, updated_by_id) VALUES (?, ?, NULL, NULL)'
    ).run(now, now);

    console.log('✅ Website Logos entry created successfully!');
    console.log('You can now upload logos through the Strapi admin panel.');
  } else {
    console.log('Website Logos entry already exists');
  }

  db.close();
} catch (error) {
  console.error('Error:', error);
  db.close();
  process.exit(1);
}
