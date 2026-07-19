/**
 * Slate Silver Template for GALLERY section
 * Template 9 of 10
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
  id: "gallery-template-9",
  name: "Slate Silver",
  section: "gallery",
  themeIndex: 9,

  colors: {
    "--bg-page": "#0f1218",
    "--bg-card": "#1a1f2a",
    "--accent-gold": "#a8b0b8",
    "--accent-gold-light": "#c8d0d8",
    "--c-ivory": "#e8eef8",
    "--text-muted": "#7a808a"
  },

  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Gallery Title",
        "required": true
    },
    {
        "key": "images",
        "type": "textarea",
        "label": "Image URLs (one per line)",
        "required": true
    },
    {
        "key": "caption",
        "type": "text",
        "label": "Gallery Caption",
        "required": false
    }
  ],

  defaults: {
    "title": "Our Memories",
    "images": "https://placehold.co/400x400\nhttps://placehold.co/400x400",
    "caption": "Moments we cherish"
  },

  html: `
<section class="gallery-section">
  <div class="gallery-inner">
    <h2 class="gallery-title reveal">{{title}}</h2>
    <div class="gallery-raw" style="display:none">{{images}}</div>
    <div class="gallery-grid reveal"></div>
    <p class="gallery-caption reveal">{{caption}}</p>
  </div>
</section>`,

  css: `
.gallery-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.gallery-inner { max-width: 900px; margin: 0 auto; }
.gallery-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 2rem; }
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.gallery-grid img { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(201,168,76,0.25); }
.gallery-placeholder {
  width: 100%; height: 160px; border-radius: 8px;
  border: 1px dashed rgba(201,168,76,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; color: var(--accent-gold-light); background: var(--bg-card);
}
.gallery-caption { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05rem; color: var(--text-muted); margin-top: 1.5rem; }
@media (max-width: 640px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }`,

  js: `

(function(){
  var root = document.querySelector('.gallery-section');
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
  var raw = document.querySelector('.gallery-raw');
  var grid = document.querySelector('.gallery-grid');
  if (!raw || !grid) return;
  var urls = raw.textContent.split(/[\n,]/).map(function(s){ return s.trim(); }).filter(Boolean);
  if (urls.length === 0) {
    for (var i = 0; i < 3; i++) {
      var ph = document.createElement('div');
      ph.className = 'gallery-placeholder';
      ph.textContent = '\ud83d\uddbc';
      grid.appendChild(ph);
    }
    return;
  }
  urls.forEach(function(url){
    var img = document.createElement('img');
    img.src = url;
    img.loading = 'lazy';
    img.alt = '';
    grid.appendChild(img);
  });
})();`,

  layout: {
    "style": "full-bleed",
    "decorativeElements": ["modern-lines","dot-pattern"]
  }
};
