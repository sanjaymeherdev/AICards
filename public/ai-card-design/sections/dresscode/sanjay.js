/**
 * Sanjay Template for DRESSCODE section
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
  id: 'sanjay',
  name: 'Sanjay',
  section: 'dresscode',
  themeIndex: 1,
  
  colors: {
    '--bg-page': '#1a0505',
    '--bg-card': '#2b0a0a',
    '--accent-gold': '#c9a84c',
    '--accent-gold-light': '#e8c97a',
    '--c-ivory': '#f5e6c7',
    '--text-muted': '#a08575'
  },
  
  fields: [
    { key: 'title', type: 'text', label: 'Section Title', required: true },
    { key: 'subtitle', type: 'text', label: 'Subtitle', required: false },
    { key: 'dressType', type: 'text', label: 'Dress Type', required: true },
    { key: 'dressColors', type: 'text', label: 'Suggested Colors', required: false }
  ],
  
  defaults: {
    title: 'Dress Code',
    subtitle: 'Come dressed to celebrate',
    dressType: 'Indian Formal',
    dressColors: 'Gold, Maroon & Ivory tones preferred'
  },

  html: `
<section class="dresscode-section">
  <div class="section-inner center">
    <h2 class="section-title">{{title}}</h2>
    <p class="section-subtitle">{{subtitle}}</p>
    <div class="dresscode-card">
      <div class="dress-label">Attire</div>
      <div class="dress-type">{{dressType}}</div>
      <div class="dress-colors">{{dressColors}}</div>
    </div>
  </div>
</section>`,

  css: `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
:root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-primary:#5c0f0f;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg-mid);min-height:100%;color:var(--c-ivory);}
.dresscode-section{padding:80px 20px;background:var(--bg-mid);border-top:1px solid rgba(201,168,76,0.1);border-bottom:1px solid rgba(201,168,76,0.1);}
.section-inner.center{max-width:860px;margin:0 auto;text-align:center;}
.section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;margin-bottom:8px;}
.section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;margin-bottom:48px;}
.dresscode-card{background:linear-gradient(135deg,rgba(92,15,15,0.2),rgba(43,10,10,0.6));border:1px solid rgba(201,168,76,0.3);border-radius:14px;padding:40px 32px;text-align:center;max-width:480px;margin:0 auto;}
.dress-label{font-family:var(--font-sans);font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px;}
.dress-type{font-family:var(--font-display);font-size:1.5rem;color:var(--c-ivory);margin-bottom:16px;}
.dress-colors{font-family:var(--font-body);font-style:italic;color:var(--c-gold-light);font-size:1.05rem;}`,

  js: `null`,
  
  layout: {
    style: 'centered',
    decorativeElements: ["floral-corners","gold-border"]
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
