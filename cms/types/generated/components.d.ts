import type { Attribute, Schema } from '@strapi/strapi';

export interface SettingsWebsiteLogos extends Schema.Component {
  collectionName: 'components_settings_website_logos';
  info: {
    description: 'Logo images for website header, footer, and favicon';
    displayName: 'Website Logos';
  };
  attributes: {
    favicon: Attribute.Media<'images'>;
    footerLogo: Attribute.Media<'images'>;
    logo: Attribute.Media<'images'>;
    logoLight: Attribute.Media<'images'>;
  };
}

export interface SharedSocialMedia extends Schema.Component {
  collectionName: 'components_shared_social_media';
  info: {
    description: 'Social media links';
    displayName: 'Social Media';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    linkedin: Attribute.String;
    twitter: Attribute.String;
    whatsapp: Attribute.String;
    youtube: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'settings.website-logos': SettingsWebsiteLogos;
      'shared.social-media': SharedSocialMedia;
    }
  }
}
