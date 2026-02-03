/**
 * Script to populate Portfolio Projects and Insights content
 * Usage: node scripts/populate-content.js
 */

const { portfolioProjects, insightArticles } = require('./seed-portfolio-insights');

async function populateContent() {
  const STRAPI_URL = 'http://localhost:1337';

  console.log('🚀 Starting content population...\n');

  try {
    // Get or create author first
    console.log('📝 Checking for author...');
    const authorsRes = await fetch(`${STRAPI_URL}/api/authors`);
    const authorsData = await authorsRes.json();

    let authorId;
    if (authorsData.data && authorsData.data.length > 0) {
      authorId = authorsData.data[0].id;
      console.log(`✅ Using existing author (ID: ${authorId})\n`);
    } else {
      console.log('⚠️  No author found. Please create an author in Strapi admin first.\n');
    }

    // Populate Portfolio Projects
    console.log('📦 Creating Portfolio Projects...');
    for (const project of portfolioProjects) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              ...project,
              publishedAt: new Date().toISOString(),
            }
          })
        });

        if (response.ok) {
          console.log(`  ✅ Created: ${project.title}`);
        } else {
          const error = await response.json();
          console.log(`  ❌ Failed: ${project.title} - ${error.error?.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${project.title}: ${error.message}`);
      }
    }
    console.log('');

    // Populate Insights
    console.log('📰 Creating Insight Articles...');
    for (const article of insightArticles) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/insights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              ...article,
              author: authorId,
              publishedAt: article.published_at.toISOString(),
            }
          })
        });

        if (response.ok) {
          console.log(`  ✅ Created: ${article.title}`);
        } else {
          const error = await response.json();
          console.log(`  ❌ Failed: ${article.title} - ${error.error?.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${article.title}: ${error.message}`);
      }
    }
    console.log('');

    console.log('🎉 Content population completed!');
    console.log('\n📊 Summary:');
    console.log(`  - Portfolio Projects: ${portfolioProjects.length}`);
    console.log(`  - Insight Articles: ${insightArticles.length}`);
    console.log('\n✅ All done! Check your Strapi admin to verify.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
populateContent();
