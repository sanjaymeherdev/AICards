/**
 * Midnight Blue Template for HERO section
 * Template 3 of 10
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
  id: 'hero-template-3',
  name: 'Midnight Blue',
  section: 'hero',
  themeIndex: 3,
  
  colors: {
    '--bg-page': '#0a1628',
    '--bg-card': '#1a2f4a',
    '--accent-gold': '#c9b037',
    '--accent-gold-light': '#e8d47a',
    '--c-ivory': '#e8f0f8',
    '--text-muted': '#7a8fa8'
  },
  
  fields: [
    {
        "key": "brideFamily",
        "type": "text",
        "label": "Bride's Family",
        "required": true
    },
    {
        "key": "groomFamily",
        "type": "text",
        "label": "Groom's Family",
        "required": true
    },
    {
        "key": "brideName",
        "type": "text",
        "label": "Bride Name",
        "required": true
    },
    {
        "key": "groomName",
        "type": "text",
        "label": "Groom Name",
        "required": true
    },
    {
        "key": "date",
        "type": "text",
        "label": "Wedding Date & Time",
        "required": true
    },
    {
        "key": "venue",
        "type": "text",
        "label": "Venue",
        "required": true
    },
    {
        "key": "hashtag",
        "type": "text",
        "label": "Couple Hashtag",
        "required": false
    }
],
  
  defaults: {
  "brideFamily": "The Sharma Family",
  "groomFamily": "The Verma Family",
  "brideName": "Vanya",
  "groomName": "Atharv",
  "date": "23rd November 2026 at 6:00 PM",
  "venue": "The Grand Palace, Delhi",
  "hashtag": "#VanyaWedsAtharv"
},
  
  // Layout hints for this theme
  layout: {
    style: 'overlay',
    decorativeElements: ["heart-motif","soft-shadow"]
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
