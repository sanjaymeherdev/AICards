/**
 * Slate Silver Template for RSVP section
 * Template 9 of 10
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
  id: 'rsvp-template-9',
  name: 'Slate Silver',
  section: 'rsvp',
  themeIndex: 9,
  
  colors: {
    '--bg-page': '#0f1218',
    '--bg-card': '#1a1f2a',
    '--accent-gold': '#a8b0b8',
    '--accent-gold-light': '#c8d0d8',
    '--c-ivory': '#e8eef8',
    '--text-muted': '#7a808a'
  },
  
  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "RSVP Title",
        "required": true
    },
    {
        "key": "deadline",
        "type": "text",
        "label": "RSVP Deadline",
        "required": true
    },
    {
        "key": "formAction",
        "type": "text",
        "label": "Form Endpoint",
        "required": false
    },
    {
        "key": "instructions",
        "type": "textarea",
        "label": "RSVP Instructions",
        "required": false
    }
],
  
  defaults: {
  "title": "Please RSVP",
  "deadline": "November 1st, 2026",
  "formAction": "/submit-rsvp",
  "instructions": "Let us know if you can make it!"
},
  
  // Layout hints for this theme
  layout: {
    style: 'full-bleed',
    decorativeElements: ["modern-lines","dot-pattern"]
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
