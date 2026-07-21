/**
 * Sanjay Template for VENUE section
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
  section: 'venue',
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
    { key: 'venueName', type: 'text', label: 'Venue Name', required: true },
    { key: 'venueAddress', type: 'text', label: 'Venue Address', required: true },
    { key: 'mapLink', type: 'text', label: 'Google Maps Link', required: false },
    { key: 'mapEmbedUrl', type: 'text', label: 'Map Embed URL', required: false }
  ],
  
  defaults: {
    title: 'The Venue',
    subtitle: 'Where the magic happens',
    venueName: 'The Grand Palace',
    venueAddress: 'MG Road, New Delhi, India',
    mapLink: 'https://maps.google.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.2!3d28.6!2m3'
  },

  html: `
<section class="venue-section">
      <div class="section-inner">
        <h2 class="section-title">{{title}}</h2>
        <p class="section-subtitle">{{subtitle}}</p>
        <div class="venue-content">
          <div class="venue-details">
            <h3 class="venue-name">{{venueName}}</h3>
            <p class="venue-address">{{venueAddress}}</p>
            <a href="{{mapLink}}" class="btn-directions" target="_blank">&#128205; Get Directions</a>
          </div>
          <div class="map-wrap">
            <iframe src="{{mapEmbedUrl}}" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </section>`,

  css: `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
    :root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-gold:#c9a84c;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;--shadow-deep:0 20px 60px rgba(0,0,0,0.5);}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-mid);min-height:100%;color:var(--c-ivory);}
    .venue-section{padding:80px 20px;background:var(--bg-mid);}
    .section-inner{max-width:900px;margin:0 auto;}
    .section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;text-align:center;margin-bottom:8px;}
    .section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;text-align:center;margin-bottom:48px;}
    .venue-content{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
    @media(max-width:640px){.venue-content{grid-template-columns:1fr;}}
    .venue-name{font-family:var(--font-display);font-size:1.6rem;color:var(--c-ivory);margin-bottom:8px;}
    .venue-address{color:var(--text-muted);font-style:italic;margin-bottom:28px;line-height:1.6;}
    .btn-directions{display:inline-flex;align-items:center;gap:8px;background:transparent;border:1px solid var(--c-gold);color:var(--c-gold);font-family:var(--font-sans);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;padding:12px 24px;border-radius:40px;cursor:pointer;text-decoration:none;transition:background 0.3s,color 0.3s;}
    .btn-directions:hover{background:var(--c-gold);color:var(--bg-dark);}
    .map-wrap{border-radius:12px;overflow:hidden;border:1px solid rgba(201,168,76,0.3);box-shadow:var(--shadow-deep);height:280px;}
    .map-wrap iframe{width:100%;height:100%;border:none;filter:saturate(0.7) brightness(0.8);}`,

  js: null,
  
    
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
