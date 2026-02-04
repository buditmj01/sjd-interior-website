/**
 * Configure Permissions Script for MySQL
 * Run this to enable public access to APIs
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

async function configurePermissions() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USERNAME || 'sjd_user',
    password: process.env.DATABASE_PASSWORD || 'SjdSecure2026',
    database: process.env.DATABASE_NAME || 'sjd_dev',
  });

  try {
    console.log('🔧 Configuring API permissions for MySQL...\n');

    // Get public role ID
    const [roles] = await connection.execute(
      'SELECT id FROM up_roles WHERE type = ?',
      ['public']
    );

    if (roles.length === 0) {
      throw new Error('Public role not found');
    }

    const publicRoleId = roles[0].id;
    console.log(`✅ Found public role (ID: ${publicRoleId})\n`);

    // Define permissions to create
    const permissions = [
      'api::project.project.find',
      'api::project.project.findOne',
      'api::insight.insight.find',
      'api::insight.insight.findOne',
      'api::author.author.find',
      'api::author.author.findOne',
      'api::site-setting.site-setting.find',
      'api::footer.footer.find',
      'api::contact-info.contact-info.find',
      'api::stats.stats.find',
      'api::website-logos.website-logos.find',
      'api::faq.faq.find',
      'api::faq.faq.findOne',
      'api::hero-banner.hero-banner.find',
      'api::navigation.navigation.find',
      'api::portfolio-category.portfolio-category.find',
      'api::portfolio-category.portfolio-category.findOne',
      'api::workflow-hero.workflow-hero.find',
    ];

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    for (const action of permissions) {
      // Check if permission exists
      const [existing] = await connection.execute(
        'SELECT id FROM up_permissions WHERE action = ?',
        [action]
      );

      let permissionId;

      if (existing.length > 0) {
        permissionId = existing[0].id;
        
        // Check if already linked to public role
        const [links] = await connection.execute(
          'SELECT * FROM up_permissions_role_links WHERE permission_id = ? AND role_id = ?',
          [permissionId, publicRoleId]
        );

        if (links.length === 0) {
          await connection.execute(
            'INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order) VALUES (?, ?, ?)',
            [permissionId, publicRoleId, 1]
          );
          console.log(`✅ Enabled: ${action}`);
        } else {
          console.log(`ℹ️  Already enabled: ${action}`);
        }
      } else {
        // Create new permission
        const [result] = await connection.execute(
          'INSERT INTO up_permissions (action, created_at, updated_at) VALUES (?, ?, ?)',
          [action, now, now]
        );

        permissionId = result.insertId;

        // Link to public role
        await connection.execute(
          'INSERT INTO up_permissions_role_links (permission_id, role_id, permission_order) VALUES (?, ?, ?)',
          [permissionId, publicRoleId, 1]
        );

        console.log(`✅ Created and enabled: ${action}`);
      }
    }

    console.log('\n✅ Permissions configured successfully!');
    console.log('🔄 Restart Strapi for changes to take effect.\n');

  } finally {
    await connection.end();
  }
}

configurePermissions()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed to configure permissions:', err);
    process.exit(1);
  });
