import type { Attribute, Schema } from '@strapi/strapi';

export interface FooterLink extends Schema.Component {
  collectionName: 'components_footer_links';
  info: {
    description: 'A simple link with label and URL';
    displayName: 'Link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface FooterSocialLink extends Schema.Component {
  collectionName: 'components_footer_social_links';
  info: {
    description: 'Social media link with platform name, URL, and SVG icon path';
    displayName: 'Social Link';
  };
  attributes: {
    icon_path: Attribute.Text & Attribute.Required;
    platform: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface NavigationMenuItem extends Schema.Component {
  collectionName: 'components_navigation_menu_items';
  info: {
    description: 'Navigation menu item with label and URL';
    displayName: 'Menu Item';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

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

export interface SharedStatItem extends Schema.Component {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Individual statistic item with value and label';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'footer.link': FooterLink;
      'footer.social-link': FooterSocialLink;
      'navigation.menu-item': NavigationMenuItem;
      'settings.website-logos': SettingsWebsiteLogos;
      'shared.social-media': SharedSocialMedia;
      'shared.stat-item': SharedStatItem;
    }
  }
}
