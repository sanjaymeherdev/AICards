// Script to generate 10 template variations for each wedding card section
// Each template has unique color schemes, themes, and design variations

const fs = require('fs');
const path = require('path');

// Theme configurations with varied colors and styles
const themes = [
  {
    name: 'Royal Burgundy',
    bgDark: '#1a0505',
    bgMid: '#2b0a0a',
    primary: '#5c0f0f',
    gold: '#c9a84c',
    goldLight: '#e8c97a',
    ivory: '#f5e6c7',
    muted: '#a08575',
    accent: '#7a1c1c'
  },
  {
    name: 'Emerald Forest',
    bgDark: '#0a1a0f',
    bgMid: '#0f2b1a',
    primary: '#1a5c3a',
    gold: '#7ac9a8',
    goldLight: '#a8e8c9',
    ivory: '#e7f5e7',
    muted: '#75a085',
    accent: '#2a7a4c'
  },
  {
    name: 'Midnight Navy',
    bgDark: '#050a1a',
    bgMid: '#0a1a2b',
    primary: '#0f1a5c',
    gold: '#4c6fc9',
    goldLight: '#7a9ce8',
    ivory: '#e7eef5',
    muted: '#7585a0',
    accent: '#1c3a7a'
  },
  {
    name: 'Rose Gold Blush',
    bgDark: '#1a0a0f',
    bgMid: '#2b0f1a',
    primary: '#5c1a2f',
    gold: '#c97a8c',
    goldLight: '#e8a8bc',
    ivory: '#f5e7ea',
    muted: '#a07585',
    accent: '#7a2a4c'
  },
  {
    name: 'Sage & Cream',
    bgDark: '#0f1a0a',
    bgMid: '#1a2b0f',
    primary: '#3a5c1a',
    gold: '#a8c97a',
    goldLight: '#c9e8a8',
    ivory: '#f0f5e7',
    muted: '#85a075',
    accent: '#4c7a2a'
  },
  {
    name: 'Plum Velvet',
    bgDark: '#1a0515',
    bgMid: '#2b0a25',
    primary: '#5c0f4a',
    gold: '#c97ab8',
    goldLight: '#e8a8dc',
    ivory: '#f5e7f2',
    muted: '#a07595',
    accent: '#7a1c6a'
  },
  {
    name: 'Ocean Teal',
    bgDark: '#051a1a',
    bgMid: '#0a2b2b',
    primary: '#0f5c5c',
    gold: '#4cc9c9',
    goldLight: '#7ae8e8',
    ivory: '#e7f5f5',
    muted: '#75a0a0',
    accent: '#1c7a7a'
  },
  {
    name: 'Amber Sunset',
    bgDark: '#1a1005',
    bgMid: '#2b1a0a',
    primary: '#5c3a0f',
    gold: '#c9a04c',
    goldLight: '#e8d07a',
    ivory: '#f5f0e7',
    muted: '#a09075',
    accent: '#7a5a1c'
  },
  {
    name: 'Lavender Mist',
    bgDark: '#0f0a1a',
    bgMid: '#1a0f2b',
    primary: '#2f0f5c',
    gold: '#8c7ac9',
    goldLight: '#bca8e8',
    ivory: '#ece7f5',
    muted: '#8575a0',
    accent: '#4c1c7a'
  },
  {
    name: 'Copper Bronze',
    bgDark: '#1a0f05',
    bgMid: '#2b1a0a',
    primary: '#5c3a0f',
    gold: '#c98c4c',
    goldLight: '#e8b87a',
    ivory: '#f5efe7',
    muted: '#a08575',
    accent: '#7a4c1c'
  }
];

const fontPairs = [
  { display: "'Cinzel', serif", body: "'Cormorant Garamond', serif", sans: "'Raleway', sans-serif" },
  { display: "'Playfair Display', serif", body: "'Lora', serif", sans: "'Montserrat', sans-serif" },
  { display: "'Abril Fatface', serif", body: "'Merriweather', serif", sans: "'Open Sans', sans-serif" },
  { display: "'Prata', serif", body: "'Crimson Text', serif", sans: "'Source Sans Pro', sans-serif" },
  { display: "'Bodoni Moda', serif", body: "'EB Garamond', serif", sans: "'Nunito', sans-serif" },
  { display: "'Italiana', serif", body: "'Libre Baskerville', serif", sans: "'Lato', sans-serif" },
  { display: "'Cormorant', serif", body: "'Gentium Plus', serif", sans: "'Karla', sans-serif" },
  { display: "'Tenor Sans', sans-serif", body: "'Josefin Sans', sans-serif", sans: "'Poppins', sans-serif" },
  { display: "'Forum', serif", body: "'Fauna One', serif", sans: "'Fira Sans', sans-serif" },
  { display: "'Vidaloka', serif", body: "'Alegreya', serif", sans: "'Work Sans', sans-serif" }
];

// Generate cover section templates
function generateCoverTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `cover-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Envelope`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate hero section templates
function generateHeroTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `hero-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Hero`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate lovestory templates
function generateLovestoryTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `lovestory-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Message`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate scratch templates
function generateScratchTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `scratch-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Scratch Card`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate countdown templates
function generateCountdownTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `countdown-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Timer`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate events templates
function generateEventsTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `events-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Events`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate dresscode templates
function generateDresscodeTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `dresscode-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Dress Code`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate gallery templates
function generateGalleryTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `gallery-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Gallery`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate venue templates
function generateVenueTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `venue-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Venue`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate rsvp templates
function generateRsvpDataTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `rsvp-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} RSVP`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Generate music templates
function generateMusicTemplates() {
  const templates = [];
  
  for (let i = 0; i < 10; i++) {
    const theme = themes[i];
    const fonts = fontPairs[i];
    
    templates.push({
      id: `music-template-${String(i+1).padStart(2, '0')}`,
      label: `${theme.name} Music Player`,
      themeIndex: i,
      fonts: fonts
    });
  }
  
  return templates;
}

// Export all generators
module.exports = {
  themes,
  fontPairs,
  generateCoverTemplates,
  generateHeroTemplates,
  generateLovestoryTemplates,
  generateScratchTemplates,
  generateCountdownTemplates,
  generateEventsTemplates,
  generateDresscodeTemplates,
  generateGalleryTemplates,
  generateVenueTemplates,
  generateRsvpDataTemplates,
  generateMusicTemplates
};
