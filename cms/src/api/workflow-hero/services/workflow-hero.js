'use strict';

/**
 * workflow-hero service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::workflow-hero.workflow-hero');
