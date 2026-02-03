const fs = require('fs');
const path = require('path');

async function setupHeroBanner() {
  const dbPath = path.join(__dirname, '../.tmp/data.db');

  console.log('🔧 Setting up Hero Banner...');
  console.log('');

  try {
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(dbPath);

    // Enable hero-banner public permissions
    console.log('📝 Enabling public permissions for Hero Banner API...');

    db.run(`
      INSERT OR IGNORE INTO up_permissions (action, subject, properties, conditions, created_at, updated_at, created_by_id, updated_by_id)
      VALUES (
        'api::hero-banner.hero-banner.find',
        NULL,
        '{}',
        '[]',
        datetime('now'),
        datetime('now'),
        NULL,
        NULL
      )
    `, function(err) {
      if (err) {
        console.error('❌ Error creating permission:', err.message);
      } else {
        console.log('✅ Permission created');
      }
    });

    // Link permission to public role
    db.all(`SELECT id FROM up_roles WHERE type = 'public'`, [], (err, roles) => {
      if (err) {
        console.error('❌ Error finding public role:', err.message);
        return;
      }

      if (roles.length === 0) {
        console.error('❌ Public role not found');
        return;
      }

      const publicRoleId = roles[0].id;

      db.all(`SELECT id FROM up_permissions WHERE action = 'api::hero-banner.hero-banner.find'`, [], (err, perms) => {
        if (err) {
          console.error('❌ Error finding permission:', err.message);
          return;
        }

        if (perms.length === 0) {
          console.error('❌ Hero banner permission not found');
          return;
        }

        const permId = perms[0].id;

        db.run(`
          INSERT OR IGNORE INTO up_permissions_role_links (permission_id, role_id, permission_order)
          VALUES (?, ?, 1)
        `, [permId, publicRoleId], function(err) {
          if (err) {
            console.error('❌ Error linking permission to role:', err.message);
          } else {
            console.log('✅ Permission linked to public role');
          }
        });
      });
    });

    // Create default hero banner content
    console.log('📝 Creating default Hero Banner content...');

    db.run(`
      INSERT OR IGNORE INTO hero_banner (
        headline,
        subheadline,
        background_type,
        created_at,
        updated_at,
        created_by_id,
        updated_by_id
      ) VALUES (
        'Wujudkan ruang impian dengan desain interior yang personal dan fungsional.',
        'Kami hadir untuk mewujudkan ruang impian Anda dengan desain interior yang tidak hanya indah, tetapi juga mencerminkan kepribadian dan gaya hidup Anda.',
        'image',
        datetime('now'),
        datetime('now'),
        NULL,
        NULL
      )
    `, function(err) {
      if (err) {
        console.error('❌ Error creating hero banner:', err.message);
      } else {
        console.log('✅ Hero Banner content created');
      }

      db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
        }

        console.log('');
        console.log('✅ Setup complete!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Restart Strapi CMS');
        console.log('2. Go to http://localhost:1337/admin');
        console.log('3. Navigate to Content Manager → Hero Banner');
        console.log('4. Upload your background image or video');
        console.log('5. Customize the text and save!');

        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Manual setup required:');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Settings → Users & Permissions → Roles → Public');
    console.log('3. Enable "find" permission for Hero-banner');
    console.log('4. Content Manager → Hero Banner → Create entry');
    process.exit(1);
  }
}

setupHeroBanner();
