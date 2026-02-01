/**
 * Automated Strapi Data Seeding Script
 * Run this to automatically create sample projects and insights
 * 
 * Usage: node scripts/seed.js
 */

const { sampleProjects, sampleInsights } = require('../src/seed-data');

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Helper: Fetch wrapper
async function strapiAPI(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify({ data });
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(error)}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Clear existing data
async function clearData() {
  console.log('🗑️  Clearing existing data...\n');
  
  try {
    // Get and delete existing projects
    const projects = await strapiAPI('/projects');
    for (const project of projects.data || []) {
      await strapiAPI(`/projects/${project.id}`, 'DELETE');
      console.log(`   Deleted project: ${project.attributes.title}`);
    }

    // Get and delete existing insights
    const insights = await strapiAPI('/insights');
    for (const insight of insights.data || []) {
      await strapiAPI(`/insights/${insight.id}`, 'DELETE');
      console.log(`   Deleted insight: ${insight.attributes.title}`);
    }
    
    console.log('\n✅ Existing data cleared!\n');
  } catch (error) {
    console.log('⚠️  No existing data to clear or permission denied\n');
  }
}

// Create projects
async function createProjects() {
  console.log('📁 Creating sample projects...\n');
  
  for (const project of sampleProjects) {
    try {
      // Prepare data for Strapi
      const projectData = {
        ...project,
        publishedAt: new Date().toISOString(), // Publish immediately
      };

      const result = await strapiAPI('/projects', 'POST', projectData);
      console.log(`   ✅ Created: ${project.title}`);
    } catch (error) {
      console.log(`   ❌ Failed: ${project.title} - ${error.message}`);
    }
  }
  
  console.log(`\n✅ Created ${sampleProjects.length} projects!\n`);
}

// Create insights
async function createInsights() {
  console.log('📝 Creating sample insights...\n');
  
  for (const insight of sampleInsights) {
    try {
      // Prepare data for Strapi
      const insightData = {
        ...insight,
        publishedAt: new Date().toISOString(), // Publish immediately
      };

      const result = await strapiAPI('/insights', 'POST', insightData);
      console.log(`   ✅ Created: ${insight.title}`);
    } catch (error) {
      console.log(`   ❌ Failed: ${insight.title} - ${error.message}`);
    }
  }
  
  console.log(`\n✅ Created ${sampleInsights.length} insights!\n`);
}

// Main execution
async function main() {
  console.log('\n🚀 Starting Strapi Data Seeding...\n');
  console.log('=' .repeat(60) + '\n');

  try {
    // Test connection
    console.log('🔌 Testing Strapi connection...');
    await fetch(STRAPI_URL);
    console.log('✅ Connected to Strapi!\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await clearData();

    // Create new data
    await createProjects();
    await createInsights();

    console.log('=' .repeat(60));
    console.log('\n🎉 Seeding completed successfully!\n');
    console.log('Next steps:');
    console.log('1. Visit http://localhost:1337/admin to see the data');
    console.log('2. Set API permissions: Settings → Roles → Public');
    console.log('3. Enable find & findOne for Projects and Insights');
    console.log('4. Test frontend: http://localhost:4322/portfolio\n');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Is Strapi running? (npm run develop in /cms)');
    console.log('- Have you set API permissions to Public?');
    console.log('- Check Strapi logs for errors\n');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { createProjects, createInsights, clearData };
