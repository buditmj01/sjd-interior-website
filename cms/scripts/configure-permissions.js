/**
 * Configure Permissions Script
 * Run this to enable public access to Projects and Insights APIs
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');

function configurePermissions() {
  const db = new Database(dbPath);

  try {
    console.log('🔧 Configuring API permissions...\n');

    // Get public role ID
    const role = db.prepare('SELECT id FROM up_roles WHERE type = ?').get('public');

    if (!role) {
      console.error('Public role not found');
      db.close();
      throw new Error('Public role not found');
    }

    const publicRoleId = role.id;
    console.log(`✅ Found public role (ID: ${publicRoleId})\n`);

    // Define permissions to create
    const permissions = [
      { action: 'api::project.project.find' },
      { action: 'api::project.project.findOne' },
      { action: 'api::insight.insight.find' },
      { action: 'api::insight.insight.findOne' },
      { action: 'api::author.author.find' },
      { action: 'api::author.author.findOne' },
      { action: 'api::footer.footer.find' },
      { action: 'api::contact-info.contact-info.find' },
      { action: 'api::stats.stats.find' },
      { action: 'api::website-logos.website-logos.find' },
      { action: 'api::faq.faq.find' },
      { action: 'api::faq.faq.findOne' },
    ];

    const now = new Date().toISOString();

    permissions.forEach(perm => {
      // First, check if permission exists
      const existing = db.prepare('SELECT id FROM up_permissions WHERE action = ?').get(perm.action);

      if (existing) {
        // Permission exists, now check if it's linked to public role
        const link = db.prepare(
          'SELECT * FROM up_permissions_role_links WHERE permission_id = ? AND role_id = ?'
        ).get(existing.id, publicRoleId);

        if (!link) {
          // Create link
          db.prepare(
            'INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order) VALUES (?, ?, ?)'
          ).run(existing.id, publicRoleId, 1);
          console.log(`✅ Enabled: ${perm.action}`);
        } else {
          console.log(`ℹ️  Already enabled: ${perm.action}`);
        }
      } else {
        // Create new permission
        const result = db.prepare(
          'INSERT INTO up_permissions (action, created_at, updated_at) VALUES (?, ?, ?)'
        ).run(perm.action, now, now);

        const permissionId = result.lastInsertRowid;

        // Link to public role
        db.prepare(
          'INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order) VALUES (?, ?, ?)'
        ).run(permissionId, publicRoleId, 1);

        console.log(`✅ Created and enabled: ${perm.action}`);
      }
    });

    console.log('\n✅ Permissions configured successfully!');
    console.log('🔄 Restart Strapi for changes to take effect.\n');
    db.close();
  } catch (error) {
    db.close();
    throw error;
  }
}

// Run the configuration
try {
  configurePermissions();
  process.exit(0);
} catch (err) {
  console.error('Failed to configure permissions:', err);
  process.exit(1);
}
