import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Use this before rendering any CMS content with set:html
 */
export function sanitize(dirty, options = {}) {
  if (!dirty) return '';

  const defaultOptions = {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'a', 'blockquote', 'code', 'pre',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span',
    ],
    allowedAttributes: {
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['class', 'id', 'style'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    // Force safe link behavior
    transformTags: {
      'a': (tagName, attribs) => {
        return {
          tagName,
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
            target: attribs.target || '_blank',
          },
        };
      },
    },
  };

  return sanitizeHtml(dirty, { ...defaultOptions, ...options });
}

/**
 * Sanitize plain text and convert newlines to <br> tags
 * Use for simple text fields like addresses
 */
export function sanitizeText(text) {
  if (!text) return '';

  // First sanitize to strip any HTML, then convert newlines
  const clean = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return clean.replace(/\n/g, '<br>');
}
