/**
 * Warm Amber Template for EVENTS section
 * Template 8 of 10
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
  id: 'events-template-8',
  name: 'Warm Amber',
  section: 'events',
  themeIndex: 8,
  
  colors: {
    '--bg-page': '#1f1a0a',
    '--bg-card': '#3a2f1a',
    '--accent-gold': '#d4b068',
    '--accent-gold-light': '#f4d088',
    '--c-ivory': '#f8f0e0',
    '--text-muted': '#9a8a6a'
  },
  
  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Events Title",
        "required": true
    },
    {
        "key": "eventsList",
        "type": "textarea",
        "label": "Events (format: Date | Event | Location)",
        "required": true
    },
    {
        "key": "subtitle",
        "type": "text",
        "label": "Subtitle",
        "required": false
    }
],
  
  defaults: {
  "title": "Wedding Events",
  "eventsList": "Nov 21 | Sangeet | Dance Floor Arena\nNov 22 | Mehendi | Garden Court\nNov 23 | Wedding Ceremony | Main Hall",
  "subtitle": "Join us for the celebrations"
},
  
  // Layout hints for this theme
  layout: {
    style: 'card',
    decorativeElements: ["classic-frame","embossed-text"]
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
