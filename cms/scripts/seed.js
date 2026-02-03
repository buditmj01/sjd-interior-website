#!/usr/bin/env node

/**
 * Seed Script for Strapi CMS
 * Populates database with sample projects and insights
 *
 * Usage: node scripts/seed.js
 */

const { sampleProjects, sampleInsights } = require('../src/seed-data');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sjdstudiodesain@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'YourNewPassword123';

let authToken = null;

// Authenticate with Strapi
async function authenticate() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${errorText}`);
    }

    const data = await response.json();
    authToken = data.data.token;
    console.log('✅ Authenticated successfully');
    return authToken;
  } catch (error) {
    console.error('❌ Authentication error:', error.message);
    console.log('\n💡 Make sure Strapi is running and admin credentials are correct.');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log('   Password: [hidden]');
    process.exit(1);
  }
}

// Create a project
async function createProject(projectData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          ...projectData,
          slug: projectData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
          publishedAt: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();
    console.log(`✅ Created project: ${projectData.title}`);
    return data;
  } catch (error) {
    console.error(`❌ Error creating project "${projectData.title}":`, error.message);
  }
}

// Create an insight
async function createInsight(insightData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        data: {
          ...insightData,
          slug: insightData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
          publishedAt: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();
    console.log(`✅ Created insight: ${insightData.title}`);
    return data;
  } catch (error) {
    console.error(`❌ Error creating insight "${insightData.title}":`, error.message);
  }
}

// Clear existing data (optional)
async function clearData() {
  console.log('\n🗑️  Clearing existing data...\n');

  try {
    // Get all projects
    const projectsRes = await fetch(`${STRAPI_URL}/api/projects`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    const projects = await projectsRes.json();

    // Delete each project
    for (const project of projects.data || []) {
      await fetch(`${STRAPI_URL}/api/projects/${project.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      console.log(`🗑️  Deleted project: ${project.attributes.title}`);
    }

    // Get all insights
    const insightsRes = await fetch(`${STRAPI_URL}/api/insights`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    const insights = await insightsRes.json();

    // Delete each insight
    for (const insight of insights.data || []) {
      await fetch(`${STRAPI_URL}/api/insights/${insight.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      console.log(`🗑️  Deleted insight: ${insight.attributes.title}`);
    }

    console.log('\n✅ Cleared all existing data\n');
  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
  }
}

// Main seed function
async function seed() {
  console.log('🌱 Starting seed process...\n');

  // Authenticate first
  await authenticate();

  // Ask if user wants to clear existing data
  const args = process.argv.slice(2);
  if (args.includes('--clear')) {
    await clearData();
  }

  // Seed projects
  console.log('\n📁 Creating sample projects...\n');
  for (const project of sampleProjects) {
    await createProject(project);
  }

  // Seed insights
  console.log('\n📝 Creating sample insights...\n');
  for (const insight of sampleInsights) {
    await createInsight(insight);
  }

  console.log('\n✅ Seed process completed!\n');
  console.log('📊 Summary:');
  console.log(`   - ${sampleProjects.length} projects created`);
  console.log(`   - ${sampleInsights.length} insights created`);
  console.log('\n🎉 Your Strapi CMS is now populated with sample data!\n');
  console.log('👉 Visit http://localhost:1337/admin to view your content\n');
}

// Run the seed
seed().catch(error => {
  console.error('❌ Seed process failed:', error);
  process.exit(1);
});
