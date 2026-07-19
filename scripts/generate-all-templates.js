/**
 * Generate 10 template variations for each wedding card section
 * Each template uses descriptive CSS variable names for AI clarity
 */

const fs = require('fs');
const path = require('path');

// Color theme definitions - each with distinct palette
const COLOR_THEMES = [
  {
    name: 'Royal Burgundy',
    vars: { '--bg-page': '#1a0505', '--bg-card': '#2b0a0a', '--accent-gold': '#c9a84c', '--accent-gold-light': '#e8c97a', '--c-ivory': '#f5e6c7', '--text-muted': '#a08575' }
  },
  {
    name: 'Emerald Garden',
    vars: { '--bg-page': '#0a1f1a', '--bg-card': '#1a3a2f', '--accent-gold': '#d4af37', '--accent-gold-light': '#f4d03f', '--c-ivory': '#f0ead6', '--text-muted': '#8fa89e' }
  },
  {
    name: 'Midnight Blue',
    vars: { '--bg-page': '#0a1628', '--bg-card': '#1a2f4a', '--accent-gold': '#c9b037', '--accent-gold-light': '#e8d47a', '--c-ivory': '#e8f0f8', '--text-muted': '#7a8fa8' }
  },
  {
    name: 'Blush Romance',
    vars: { '--bg-page': '#2a1a1f', '--bg-card': '#3a2a2f', '--accent-gold': '#d4a8a8', '--accent-gold-light': '#f4c8c8', '--c-ivory': '#f8e8e8', '--text-muted': '#a88a8a' }
  },
  {
    name: 'Forest Moss',
    vars: { '--bg-page': '#0f1a0f', '--bg-card': '#1a2a1a', '--accent-gold': '#a8b868', '--accent-gold-light': '#c8d888', '--c-ivory': '#e8f0e0', '--text-muted': '#7a8a6a' }
  },
  {
    name: 'Plum Velvet',
    vars: { '--bg-page': '#1a0a1a', '--bg-card': '#2a1a2a', '--accent-gold': '#c98ac9', '--accent-gold-light': '#e8aae8', '--c-ivory': '#f8e8f8', '--text-muted': '#a07aa0' }
  },
  {
    name: 'Ocean Teal',
    vars: { '--bg-page': '#0a1a1f', '--bg-card': '#1a2f3a', '--accent-gold': '#68b8c8', '--accent-gold-light': '#88d8e8', '--c-ivory': '#e0f0f8', '--text-muted': '#6a8a9a' }
  },
  {
    name: 'Warm Amber',
    vars: { '--bg-page': '#1f1a0a', '--bg-card': '#3a2f1a', '--accent-gold': '#d4b068', '--accent-gold-light': '#f4d088', '--c-ivory': '#f8f0e0', '--text-muted': '#9a8a6a' }
  },
  {
    name: 'Slate Silver',
    vars: { '--bg-page': '#0f1218', '--bg-card': '#1a1f2a', '--accent-gold': '#a8b0b8', '--accent-gold-light': '#c8d0d8', '--c-ivory': '#e8eef8', '--text-muted': '#7a808a' }
  },
  {
    name: 'Rose Gold',
    vars: { '--bg-page': '#1f0f14', '--bg-card': '#3a1a24', '--accent-gold': '#d48898', '--accent-gold-light': '#f4a8b8', '--c-ivory': '#f8e0e8', '--text-muted': '#9a6a7a' }
  }
];

const SECTIONS = ['cover', 'hero', 'lovestory', 'scratch', 'countdown', 'music', 'gallery', 'venue', 'rsvp', 'events', 'dresscode'];

// Section-specific field definitions
const SECTION_CONFIGS = {
  cover: {
    fields: [
      { key: 'coupleNames', type: 'text', label: 'Couple Names', required: true },
      { key: 'weddingDate', type: 'text', label: 'Wedding Date', required: true },
      { key: 'welcomeText', type: 'text', label: 'Welcome Text', required: false }
    ],
    defaults: { coupleNames: 'Vanya & Atharv', weddingDate: '23rd November 2026', welcomeText: 'Together with their families' }
  },
  hero: {
    fields: [
      { key: 'brideFamily', type: 'text', label: "Bride's Family", required: true },
      { key: 'groomFamily', type: 'text', label: "Groom's Family", required: true },
      { key: 'brideName', type: 'text', label: 'Bride Name', required: true },
      { key: 'groomName', type: 'text', label: 'Groom Name', required: true },
      { key: 'date', type: 'text', label: 'Wedding Date & Time', required: true },
      { key: 'venue', type: 'text', label: 'Venue', required: true },
      { key: 'hashtag', type: 'text', label: 'Couple Hashtag', required: false }
    ],
    defaults: { brideFamily: 'The Sharma Family', groomFamily: 'The Verma Family', brideName: 'Vanya', groomName: 'Atharv', date: '23rd November 2026 at 6:00 PM', venue: 'The Grand Palace, Delhi', hashtag: '#VanyaWedsAtharv' }
  },
  lovestory: {
    fields: [
      { key: 'title', type: 'text', label: 'Section Title', required: true },
      { key: 'storyText', type: 'textarea', label: 'Love Story', required: true },
      { key: 'timeline', type: 'textarea', label: 'Timeline (one event per line)', required: false }
    ],
    defaults: { title: 'Our Love Story', storyText: 'From our first meeting to forever...', timeline: 'First Met: 2020\nEngaged: 2024\nWedding: 2026' }
  },
  scratch: {
    fields: [
      { key: 'title', type: 'text', label: 'Section Title', required: true },
      { key: 'hiddenMessage', type: 'text', label: 'Hidden Message', required: true },
      { key: 'instruction', type: 'text', label: 'Scratch Instruction', required: false }
    ],
    defaults: { title: 'A Special Surprise', hiddenMessage: 'You are invited to our Sangeet!', instruction: 'Scratch to reveal!' }
  },
  countdown: {
    fields: [
      { key: 'title', type: 'text', label: 'Section Title', required: true },
      { key: 'targetDate', type: 'text', label: 'Target Date', required: true },
      { key: 'message', type: 'text', label: 'Countdown Message', required: false }
    ],
    defaults: { title: 'Counting Down to Forever', targetDate: '2026-11-23T18:00:00', message: 'Days until we say I do!' }
  },
  music: {
    fields: [
      { key: 'footerNote', type: 'text', label: 'Footer Note', required: true },
      { key: 'musicUrl', type: 'text', label: 'Background Music URL', required: false },
      { key: 'musicLabel', type: 'text', label: 'Music Button Tooltip', required: false }
    ],
    defaults: { footerNote: 'Made with love, for our favorite people.', musicUrl: '', musicLabel: 'Click to play our playlist' }
  },
  gallery: {
    fields: [
      { key: 'title', type: 'text', label: 'Gallery Title', required: true },
      { key: 'images', type: 'textarea', label: 'Image URLs (one per line)', required: true },
      { key: 'caption', type: 'text', label: 'Gallery Caption', required: false }
    ],
    defaults: { title: 'Our Memories', images: 'https://placehold.co/400x400\nhttps://placehold.co/400x400', caption: 'Moments we cherish' }
  },
  venue: {
    fields: [
      { key: 'venueName', type: 'text', label: 'Venue Name', required: true },
      { key: 'address', type: 'textarea', label: 'Full Address', required: true },
      { key: 'mapLink', type: 'text', label: 'Google Maps Link', required: false },
      { key: 'directions', type: 'textarea', label: 'Directions', required: false }
    ],
    defaults: { venueName: 'The Grand Palace', address: '123 Wedding Lane, Delhi, India', mapLink: 'https://maps.google.com', directions: 'Take the main highway exit 12' }
  },
  rsvp: {
    fields: [
      { key: 'title', type: 'text', label: 'RSVP Title', required: true },
      { key: 'deadline', type: 'text', label: 'RSVP Deadline', required: true },
      { key: 'formAction', type: 'text', label: 'Form Endpoint', required: false },
      { key: 'instructions', type: 'textarea', label: 'RSVP Instructions', required: false }
    ],
    defaults: { title: 'Please RSVP', deadline: 'November 1st, 2026', formAction: '/submit-rsvp', instructions: 'Let us know if you can make it!' }
  },
  events: {
    fields: [
      { key: 'title', type: 'text', label: 'Events Title', required: true },
      { key: 'eventsList', type: 'textarea', label: 'Events (format: Date | Event | Location)', required: true },
      { key: 'subtitle', type: 'text', label: 'Subtitle', required: false }
    ],
    defaults: { title: 'Wedding Events', eventsList: 'Nov 21 | Sangeet | Dance Floor Arena\nNov 22 | Mehendi | Garden Court\nNov 23 | Wedding Ceremony | Main Hall', subtitle: 'Join us for the celebrations' }
  },
  dresscode: {
    fields: [
      { key: 'title', type: 'text', label: 'Dress Code Title', required: true },
      { key: 'description', type: 'textarea', label: 'Dress Code Description', required: true },
      { key: 'colorPalette', type: 'text', label: 'Suggested Colors', required: false }
    ],
    defaults: { title: 'Dress Code', description: 'Traditional Indian attire preferred', colorPalette: 'Gold, Maroon, Navy, Emerald' }
  }
};

function generateTemplate(section, themeIndex, theme) {
  const config = SECTION_CONFIGS[section];
  const templateNum = themeIndex + 1;
  
  return `/**
 * ${theme.name} Template for ${section.toUpperCase()} section
 * Template ${templateNum} of 10
 * 
 * CSS Variables use descriptive names for easy AI editing:
 * - --bg-page: main page background
 * - --bg-card: card/container background  
 * - --accent-gold: primary accent/decorative color
 * - --accent-gold-light: lighter accent variant
 * - --c-ivory: primary text color
 * - --text-muted: secondary/muted text color
 */

export default {
  id: '${section}-template-${templateNum}',
  name: '${theme.name}',
  section: '${section}',
  themeIndex: ${templateNum},
  
  colors: {
${Object.entries(theme.vars).map(([key, value]) => `    '${key}': '${value}'`).join(',\n')}
  },
  
  fields: ${JSON.stringify(config.fields, null, 4)},
  
  defaults: ${JSON.stringify(config.defaults, null, 2)},
  
  // Layout hints for this theme
  layout: {
    style: '${getLayoutStyle(section, themeIndex)}',
    decorativeElements: ${getDecorativeElements(themeIndex)}
  }
};

/**
 * CSS Variable Reference for AI Editing:
 * ${Object.entries(theme.vars).map(([key, value]) => `* ${key}: ${getVariableDescription(key)}`).join('\n * ')}
 * 
 * IMPORTANT: When modifying colors, ONLY change the specific variable mentioned.
 * - To change background: modify --bg-page or --bg-card ONLY
 * - To change text color: modify --c-ivory or --text-muted ONLY  
 * - To change accents: modify --accent-gold or --accent-gold-light ONLY
 */
`;
}

function getLayoutStyle(section, themeIndex) {
  const styles = ['centered', 'split', 'overlay', 'bordered', 'minimal', 'ornate', 'gradient', 'card', 'full-bleed', 'framed'];
  return styles[themeIndex % styles.length];
}

function getDecorativeElements(themeIndex) {
  const elements = [
    ['floral-corners', 'gold-border'],
    ['geometric-pattern', 'divider-line'],
    ['heart-motif', 'soft-shadow'],
    ['vine-border', 'textured-bg'],
    ['mandala-corner', 'gradient-overlay'],
    ['art-deco', 'double-border'],
    ['watercolor-splash', 'rounded-corners'],
    ['classic-frame', 'embossed-text'],
    ['modern-lines', 'dot-pattern'],
    ['romantic-swirl', 'glow-effect']
  ];
  return JSON.stringify(elements[themeIndex]);
}

function getVariableDescription(varName) {
  const descriptions = {
    '--bg-page': 'main page background color',
    '--bg-card': 'card or container background color',
    '--accent-gold': 'primary accent and decorative element color',
    '--accent-gold-light': 'lighter variant of accent color for highlights',
    '--c-ivory': 'primary text and heading color',
    '--text-muted': 'secondary, caption, and muted text color'
  };
  return descriptions[varName] || 'custom color variable';
}

// Main execution
console.log('Generating templates for all sections...\n');

SECTIONS.forEach(section => {
  const templatesDir = path.join(__dirname, '..', 'public', 'ai-card-design', 'sections', section, 'templates');
  
  // Ensure directory exists
  if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir, { recursive: true });
    console.log(`Created directory: ${templatesDir}`);
  }
  
  // Remove any existing template files
  const existingFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.js'));
  existingFiles.forEach(file => {
    fs.unlinkSync(path.join(templatesDir, file));
  });
  if (existingFiles.length > 0) {
    console.log(`Removed ${existingFiles.length} old template(s) from ${section}`);
  }
  
  // Generate 10 templates
  COLOR_THEMES.forEach((theme, index) => {
    const templateContent = generateTemplate(section, index, theme);
    const filename = `template-${index + 1}.js`;
    const filepath = path.join(templatesDir, filename);
    
    fs.writeFileSync(filepath, templateContent);
    console.log(`✓ Created ${section}/templates/${filename} (${theme.name})`);
  });
  
  console.log(`  → Completed ${section}: 10 templates generated\n`);
});

console.log('✅ All templates generated successfully!');
console.log(`Total: ${SECTIONS.length} sections × 10 themes = ${SECTIONS.length * 10} template files`);
