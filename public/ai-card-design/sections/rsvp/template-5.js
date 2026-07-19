/**
 * Forest Moss Template for RSVP section
 * Template 5 of 10
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
  id: 'rsvp-template-5',
  name: 'Forest Moss',
  section: 'rsvp',
  themeIndex: 5,
  
  colors: {
    '--bg-page': '#0f1a0f',
    '--bg-card': '#1a2a1a',
    '--accent-gold': '#a8b868',
    '--accent-gold-light': '#c8d888',
    '--c-ivory': '#e8f0e0',
    '--text-muted': '#7a8a6a'
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
    style: 'minimal',
    decorativeElements: ["mandala-corner","gradient-overlay"]
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
