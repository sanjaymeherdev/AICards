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
  id: "rsvp-template-5",
  name: "Forest Moss",
  section: "rsvp",
  themeIndex: 5,

  colors: {
    "--bg-page": "#0f1a0f",
    "--bg-card": "#1a2a1a",
    "--accent-gold": "#a8b868",
    "--accent-gold-light": "#c8d888",
    "--c-ivory": "#e8f0e0",
    "--text-muted": "#7a8a6a"
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

  html: `
<section class="rsvp-section">
  <div class="rsvp-inner">
    <h2 class="rsvp-title reveal">{{title}}</h2>
    <p class="rsvp-instructions reveal">{{instructions}}</p>
    <p class="rsvp-deadline reveal">Kindly respond by {{deadline}}</p>
    <a class="rsvp-btn reveal" href="{{formAction}}" target="_blank" rel="noopener noreferrer">RSVP Now</a>
  </div>
</section>`,

  css: `
.rsvp-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.rsvp-inner { max-width: 560px; margin: 0 auto; }
.rsvp-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 1rem; }
.rsvp-instructions { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--c-ivory); line-height: 1.7; margin-bottom: 1rem; }
.rsvp-deadline { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem; letter-spacing: 0.5px; }
.rsvp-btn {
  display: inline-block; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600;
  color: var(--bg-page); background: var(--accent-gold);
  border-radius: 999px; padding: 0.8rem 2.2rem; text-decoration: none; letter-spacing: 0.5px;
}`,

  js: `
(function(){
  var root = document.querySelector('.rsvp-section');
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
    "style": "minimal",
    "decorativeElements": ["mandala-corner","gradient-overlay"]
  }
};
