/**
 * Warm Amber Template for HERO section
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
  id: "hero-template-8",
  name: "Warm Amber",
  section: "hero",
  themeIndex: 8,

  colors: {
    "--bg-page": "#1f1a0a",
    "--bg-card": "#3a2f1a",
    "--accent-gold": "#d4b068",
    "--accent-gold-light": "#f4d088",
    "--c-ivory": "#f8f0e0",
    "--text-muted": "#9a8a6a"
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

  html: `
<section class="hero-section">
  <div class="hero-inner">
    <div class="hero-top-line reveal"></div>
    <p class="hero-families reveal">{{brideFamily}} &amp; {{groomFamily}}</p>
    <p class="hero-invite reveal">joyfully invite you to the wedding of</p>
    <h1 class="hero-names reveal">{{brideName}} <span class="hero-amp">&amp;</span> {{groomName}}</h1>
    <div class="hero-divider reveal"><span class="hero-diamond"></span></div>
    <p class="hero-date reveal">{{date}}</p>
    <p class="hero-venue reveal">{{venue}}</p>
    <p class="hero-hashtag reveal">{{hashtag}}</p>
  </div>
</section>`,

  css: `
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-page);
  color: var(--c-ivory);
  text-align: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
}
.hero-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
.hero-top-line { width: 60px; height: 2px; background: var(--accent-gold); margin: 0 auto 1.5rem; }
.hero-families {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold-light);
  margin-bottom: 0.75rem;
}
.hero-invite {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.hero-names {
  font-family: 'Cinzel', serif;
  font-size: 3.2rem;
  line-height: 1.25;
  color: var(--accent-gold);
  margin: 0.5rem 0;
  text-shadow: 0 0 30px rgba(0,0,0,0.25);
}
.hero-amp { color: var(--c-ivory); font-size: 2.4rem; padding: 0 0.3rem; }
.hero-divider { margin: 1.75rem auto; width: 160px; height: 1px; background: linear-gradient(to right, transparent, var(--accent-gold), transparent); position: relative; }
.hero-diamond { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; background: var(--accent-gold); transform: translate(-50%, -50%) rotate(45deg); }
.hero-date { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; color: var(--c-ivory); letter-spacing: 1px; margin-bottom: 0.4rem; }
.hero-venue { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.hero-hashtag {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
  border-radius: 999px;
  padding: 0.4rem 1.1rem;
  letter-spacing: 0.5px;
}
@media (max-width: 640px) {
  .hero-names { font-size: 2.1rem; }
  .hero-date { font-size: 1.1rem; }
}`,

  js: `
(function(){
  var root = document.querySelector('.hero-section');
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
    "style": "card",
    "decorativeElements": ["classic-frame","embossed-text"]
  }
};
