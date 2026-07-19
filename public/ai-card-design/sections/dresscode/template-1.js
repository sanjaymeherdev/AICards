/**
 * Royal Burgundy Template for DRESSCODE section
 * Template 1 of 10
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
  id: "dresscode-template-1",
  name: "Royal Burgundy",
  section: "dresscode",
  themeIndex: 1,

  colors: {
    "--bg-page": "#1a0505",
    "--bg-card": "#2b0a0a",
    "--accent-gold": "#c9a84c",
    "--accent-gold-light": "#e8c97a",
    "--c-ivory": "#f5e6c7",
    "--text-muted": "#a08575"
  },

  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Dress Code Title",
        "required": true
    },
    {
        "key": "description",
        "type": "textarea",
        "label": "Dress Code Description",
        "required": true
    },
    {
        "key": "colorPalette",
        "type": "text",
        "label": "Suggested Colors",
        "required": false
    }
  ],

  defaults: {
    "title": "Dress Code",
    "description": "Traditional Indian attire preferred",
    "colorPalette": "Gold, Maroon, Navy, Emerald"
  },

  html: `
<section class="dresscode-section">
  <div class="dresscode-inner">
    <h2 class="dresscode-title reveal">{{title}}</h2>
    <p class="dresscode-description reveal">{{description}}</p>
    <div class="dresscode-raw" style="display:none">{{colorPalette}}</div>
    <div class="dresscode-palette reveal"></div>
  </div>
</section>`,

  css: `
.dresscode-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.dresscode-inner { max-width: 640px; margin: 0 auto; }
.dresscode-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.75rem; }
.dresscode-description { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--c-ivory); line-height: 1.7; margin-bottom: 2rem; }
.dresscode-palette { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
.dresscode-chip {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--c-ivory);
  border: 1px solid rgba(201,168,76,0.35); border-radius: 999px;
  padding: 0.4rem 1rem 0.4rem 0.5rem; background: var(--bg-card);
}
.dresscode-dot { width: 18px; height: 18px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); flex-shrink: 0; }`,

  js: `

(function(){
  var root = document.querySelector('.dresscode-section');
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
})();
(function(){
  var raw = document.querySelector('.dresscode-raw');
  var container = document.querySelector('.dresscode-palette');
  if (!raw || !container) return;
  var tokens = raw.textContent.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
  tokens.forEach(function(token){
    var chip = document.createElement('span');
    chip.className = 'dresscode-chip';
    var dot = document.createElement('span');
    dot.className = 'dresscode-dot';
    dot.style.background = token;
    var label = document.createElement('span');
    label.textContent = token;
    chip.appendChild(dot);
    chip.appendChild(label);
    container.appendChild(chip);
  });
})();`,

  layout: {
    "style": "centered",
    "decorativeElements": ["floral-corners","gold-border"]
  }
};
