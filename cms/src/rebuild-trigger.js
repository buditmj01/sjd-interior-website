'use strict';

/**
 * Rebuild Trigger - Logs content changes in Strapi
 *
 * Subscribes to all content-type lifecycle events and logs when
 * the frontend needs to be rebuilt. Run `./build-and-upload.sh`
 * locally to deploy changes.
 */

const DEBOUNCE_MS = 30000; // 30 seconds debounce to batch rapid changes
let rebuildTimer = null;

function notifyRebuildNeeded(strapi, event) {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
  }

  rebuildTimer = setTimeout(() => {
    strapi.log.info(`[rebuild-trigger] Content changed (${event}). Run ./build-and-upload.sh to deploy.`);
  }, DEBOUNCE_MS);
}

function registerRebuildTrigger(strapi) {
  // Content types that affect the frontend
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
    'api::author.author',
    'api::portfolio-category.portfolio-category',
  ];

  strapi.db.lifecycles.subscribe({
    models: watchedTypes,

    afterCreate(event) {
      const model = event.model?.uid || 'unknown';
      notifyRebuildNeeded(strapi, `${model}:create`);
    },

    afterUpdate(event) {
      const model = event.model?.uid || 'unknown';
      notifyRebuildNeeded(strapi, `${model}:update`);
    },

    afterDelete(event) {
      const model = event.model?.uid || 'unknown';
      notifyRebuildNeeded(strapi, `${model}:delete`);
    },
  });

  strapi.log.info(`[rebuild-trigger] Watching ${watchedTypes.length} content types for changes`);
}

module.exports = { registerRebuildTrigger };
