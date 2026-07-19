/**
 * Plum Velvet Template for DRESSCODE section
 * Template 6 of 10
 * 
 * CSS Variables use descriptive names for easy AI editing:
 * - --bg-page: main page background
 * - --bg-card: card/container background  
 * - --accent-gold: primary accent/decorative color
 * - --accent-gold-light: lighter accent variant
 * - --c-ivory: primary text color
 * - --text-muted: secondary/muted text color
 */

module.exports = {
  id: 'dresscode-template-6',
  name: 'Plum Velvet',
  section: 'dresscode',
  themeIndex: 6,
  
  colors: {
    '--bg-page': '#1a0a1a',
    '--bg-card': '#2a1a2a',
    '--accent-gold': '#c98ac9',
    '--accent-gold-light': '#e8aae8',
    '--c-ivory': '#f8e8f8',
    '--text-muted': '#a07aa0'
  },
  
  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Dress Code Title",
        "required": true
    },
    {
        "key": "description",
        "type": "textarea",
        "label": "Dress Code Description",
        "required": true
    },
    {
        "key": "colorPalette",
        "type": "text",
        "label": "Suggested Colors",
        "required": false
    }
],
  
  defaults: {
  "title": "Dress Code",
  "description": "Traditional Indian attire preferred",
  "colorPalette": "Gold, Maroon, Navy, Emerald"
},
  
  // Layout hints for this theme
  layout: {
    style: 'ornate',
    decorativeElements: ["art-deco","double-border"]
  }
};

/**
 * CSS Variable Reference for AI Editing:
 * * --bg-page: main page background color
 * * --bg-card: card or container background color
 * * --accent-gold: primary accent and decorative element color
 * * --accent-gold-light: lighter variant of accent color for highlights
 * * --c-ivory: primary text and heading color
 * * --text-muted: secondary, caption, and muted text color
 * 
 * IMPORTANT: When modifying colors, ONLY change the specific variable mentioned.
 * - To change background: modify --bg-page or --bg-card ONLY
 * - To change text color: modify --c-ivory or --text-muted ONLY  
 * - To change accents: modify --accent-gold or --accent-gold-light ONLY
 */
