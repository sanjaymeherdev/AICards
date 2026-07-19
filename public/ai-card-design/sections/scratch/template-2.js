/**
 * Emerald Garden Template for SCRATCH section
 * Template 2 of 10
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
  id: 'scratch-template-2',
  name: 'Emerald Garden',
  section: 'scratch',
  themeIndex: 2,
  
  colors: {
    '--bg-page': '#0a1f1a',
    '--bg-card': '#1a3a2f',
    '--accent-gold': '#d4af37',
    '--accent-gold-light': '#f4d03f',
    '--c-ivory': '#f0ead6',
    '--text-muted': '#8fa89e'
  },
  
  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Section Title",
        "required": true
    },
    {
        "key": "hiddenMessage",
        "type": "text",
        "label": "Hidden Message",
        "required": true
    },
    {
        "key": "instruction",
        "type": "text",
        "label": "Scratch Instruction",
        "required": false
    }
],
  
  defaults: {
  "title": "A Special Surprise",
  "hiddenMessage": "You are invited to our Sangeet!",
  "instruction": "Scratch to reveal!"
},
  
  // Layout hints for this theme
  layout: {
    style: 'split',
    decorativeElements: ["geometric-pattern","divider-line"]
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
