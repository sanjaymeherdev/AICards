/**
 * Ocean Teal Template for VENUE section
 * Template 7 of 10
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
  id: "venue-template-7",
  name: "Ocean Teal",
  section: "venue",
  themeIndex: 7,

  colors: {
    "--bg-page": "#0a1a1f",
    "--bg-card": "#1a2f3a",
    "--accent-gold": "#68b8c8",
    "--accent-gold-light": "#88d8e8",
    "--c-ivory": "#e0f0f8",
    "--text-muted": "#6a8a9a"
  },

  fields: [
    {
        "key": "venueName",
        "type": "text",
        "label": "Venue Name",
        "required": true
    },
    {
        "key": "address",
        "type": "textarea",
        "label": "Full Address",
        "required": true
    },
    {
        "key": "mapLink",
        "type": "text",
        "label": "Google Maps Link",
        "required": false
    },
    {
        "key": "directions",
        "type": "textarea",
        "label": "Directions",
        "required": false
    }
  ],

  defaults: {
    "venueName": "The Grand Palace",
    "address": "123 Wedding Lane, Delhi, India",
    "mapLink": "https://maps.google.com",
    "directions": "Take the main highway exit 12"
  },

  html: `
<section class="venue-section">
  <div class="venue-inner">
    <h2 class="venue-name reveal">{{venueName}}</h2>
    <p class="venue-address reveal">{{address}}</p>
    <a class="venue-map-btn reveal" href="{{mapLink}}" target="_blank" rel="noopener noreferrer">Get Directions</a>
    <p class="venue-directions reveal">{{directions}}</p>
  </div>
</section>`,

  css: `
.venue-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.venue-inner { max-width: 560px; margin: 0 auto; }
.venue-name { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.75rem; }
.venue-address { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--c-ivory); line-height: 1.7; margin-bottom: 1.5rem; white-space: pre-line; }
.venue-map-btn {
  display: inline-block; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600;
  color: var(--bg-page); background: var(--accent-gold);
  border-radius: 999px; padding: 0.7rem 2rem; text-decoration: none; letter-spacing: 0.5px; margin-bottom: 1.5rem;
}
.venue-directions { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--text-muted); line-height: 1.6; white-space: pre-line; }`,

  js: `
(function(){
  var root = document.querySelector('.venue-section');
  if (!root) return;
  var els = root.querySelectorAll('.reveal');
  els.forEach(function(el, i){
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(function(){
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 120 * i);
  });
})();`,

  layout: {
    "style": "gradient",
    "decorativeElements": ["watercolor-splash","rounded-corners"]
  }
};
