'use strict';

/**
 * Rebuild Trigger - Triggers GitHub Actions workflow when content changes in Strapi
 *
 * This subscribes to all content-type lifecycle events and sends a
 * repository_dispatch event to GitHub to rebuild the static frontend.
 */

const GITHUB_REPO = 'buditmj01/sjd-interior-website';
const DEBOUNCE_MS = 30000; // 30 seconds debounce to batch rapid changes

let rebuildTimer = null;
let lastTriggerTime = 0;

async function triggerRebuild(strapi, event) {
  const token = process.env.GITHUB_REBUILD_TOKEN;
  if (!token) {
    strapi.log.warn('[rebuild-trigger] GITHUB_REBUILD_TOKEN not set, skipping rebuild');
    return;
  }

  const now = Date.now();

  // Debounce: if a rebuild was triggered recently, delay this one
  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
  }

  rebuildTimer = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'strapi-content-update',
            client_payload: {
              trigger: event,
              timestamp: new Date().toISOString(),
            },
          }),
        }
      );

      if (response.status === 204) {
        lastTriggerTime = Date.now();
        strapi.log.info(`[rebuild-trigger] Frontend rebuild triggered (${event})`);
      } else {
        const text = await response.text();
        strapi.log.error(`[rebuild-trigger] Failed to trigger rebuild: ${response.status} ${text}`);
      }
    } catch (error) {
      strapi.log.error(`[rebuild-trigger] Error triggering rebuild: ${error.message}`);
    }
  }, DEBOUNCE_MS);

  strapi.log.info(`[rebuild-trigger] Rebuild scheduled in ${DEBOUNCE_MS / 1000}s (${event})`);
}

function registerRebuildTrigger(strapi) {
  // Content types that should trigger a rebuild
  const watchedTypes = [
    'api::hero-banner.hero-banner',
    'api::project.project',
    'api::insight.insight',
    'api::footer.footer',
    'api::stats.stats',
    'api::site-setting.site-setting',
    'api::navigation.navigation',
    'api::contact-info.contact-info',
    'api::homepage-gallery.homepage-gallery',
    'api::workflow-hero.workflow-hero',
    'api::faq.faq',
    'api::website-logos.website-logos',
  ];

  // Lifecycle events that should trigger rebuild
  const events = ['afterCreate', 'afterUpdate', 'afterDelete'];

  strapi.db.lifecycles.subscribe({
    models: watchedTypes,

    afterCreate(event) {
      const model = event.model?.uid || 'unknown';
      triggerRebuild(strapi, `${model}:create`);
    },

    afterUpdate(event) {
      const model = event.model?.uid || 'unknown';
      triggerRebuild(strapi, `${model}:update`);
    },

    afterDelete(event) {
      const model = event.model?.uid || 'unknown';
      triggerRebuild(strapi, `${model}:delete`);
    },
  });

  strapi.log.info(`[rebuild-trigger] Watching ${watchedTypes.length} content types for changes`);
}

module.exports = { registerRebuildTrigger };
