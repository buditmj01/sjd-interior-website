/**
 * Script to populate Portfolio Projects and Insights content with fixed field names
 * Usage: node scripts/populate-fixed.js
 */

const { portfolioProjects, insightArticles } = require('./seed-data-fixed');

async function populateContent() {
  const STRAPI_URL = 'http://localhost:1337';

  console.log('🚀 Starting content population...\n');

  try {
    // Get or create author first
    console.log('📝 Checking for author...');
    const authorsRes = await fetch(`${STRAPI_URL}/api/authors?populate=*`);
    const authorsData = await authorsRes.json();

    let authorId;
    if (authorsData.data && authorsData.data.length > 0) {
      authorId = authorsData.data[0].id;
      console.log(`✅ Using existing author (ID: ${authorId})\n`);
    } else {
      console.log('⚠️  No author found. Please create an author in Strapi admin first.\n');
    }

    // Check existing projects to avoid duplicates
    console.log('🔍 Checking existing projects...');
    const existingProjectsRes = await fetch(`${STRAPI_URL}/api/projects`);
    const existingProjectsData = await existingProjectsRes.json();
    const existingSlugs = existingProjectsData.data?.map(p => p.attributes?.slug) || [];
    console.log(`  Found ${existingSlugs.length} existing projects\n`);

    // Populate Portfolio Projects
    console.log('📦 Creating Portfolio Projects...');
    for (const project of portfolioProjects) {
      try {
        // Skip if already exists
        if (existingSlugs.includes(project.slug)) {
          console.log(`  ⏭️  Skipped (already exists): ${project.title}`);
          continue;
        }

        const response = await fetch(`${STRAPI_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: project
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`  ✅ Created: ${project.title} (ID: ${result.data.id})`);
        } else {
          const error = await response.json();
          console.log(`  ❌ Failed: ${project.title}`);
          console.log(`     Error: ${error.error?.message || JSON.stringify(error)}`);
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${project.title}: ${error.message}`);
      }
    }
    console.log('');

    // Check existing insights to avoid duplicates
    console.log('🔍 Checking existing insights...');
    const existingInsightsRes = await fetch(`${STRAPI_URL}/api/insights`);
    const existingInsightsData = await existingInsightsRes.json();
    const existingInsightSlugs = existingInsightsData.data?.map(i => i.attributes?.slug) || [];
    console.log(`  Found ${existingInsightSlugs.length} existing insights\n`);

    // Populate Insights
    console.log('📰 Creating Insight Articles...');
    for (const article of insightArticles) {
      try {
        // Skip if already exists
        if (existingInsightSlugs.includes(article.slug)) {
          console.log(`  ⏭️  Skipped (already exists): ${article.title}`);
          continue;
        }

        const response = await fetch(`${STRAPI_URL}/api/insights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              ...article,
              author: authorId
            }
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`  ✅ Created: ${article.title} (ID: ${result.data.id})`);
        } else {
          const error = await response.json();
          console.log(`  ❌ Failed: ${article.title}`);
          console.log(`     Error: ${error.error?.message || JSON.stringify(error)}`);
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${article.title}: ${error.message}`);
      }
    }
    console.log('');

    console.log('🎉 Content population completed!');
    console.log('\n📊 Summary:');
    console.log(`  - Portfolio Projects in seed data: ${portfolioProjects.length}`);
    console.log(`  - Insight Articles in seed data: ${insightArticles.length}`);
    console.log('\n✅ All done! Check your Strapi admin to verify.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
populateContent();
