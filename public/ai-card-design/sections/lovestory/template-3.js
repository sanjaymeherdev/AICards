/**
 * Template Name Template for LOVESTORY section
 * Template 3 of 10
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
  id: "lovestory-template-3",
  name: "Template Name",
  section: "lovestory",
  themeIndex: 3,

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
        "label": "Section Title",
        "required": true
    },
    {
        "key": "storyText",
        "type": "textarea",
        "label": "Love Story",
        "required": true
    },
    {
        "key": "timeline",
        "type": "textarea",
        "label": "Timeline (one event per line)",
        "required": false
    }
  ],

  defaults: {
    "title": "Our Love Story",
    "storyText": "From our first meeting to forever...",
    "timeline": "First Met: 2020\nEngaged: 2024\nWedding: 2026"
  },

  html: `
<section class="lovestory-section">
  <div class="lovestory-inner">
    <h2 class="lovestory-title reveal">{{title}}</h2>
    <p class="lovestory-text reveal">{{storyText}}</p>
    <div class="timeline-raw" style="display:none">{{timeline}}</div>
    <div class="timeline-container reveal">
      <div class="timeline-line"></div>
    </div>
  </div>
</section>`,

  css: `
.lovestory-section { padding: 5rem 1.5rem; background: var(--bg-page); }
.lovestory-inner { max-width: 700px; margin: 0 auto; }
.lovestory-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); text-align: center; margin-bottom: 1rem; letter-spacing: 1px; }
.lovestory-text { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--c-ivory); text-align: center; margin-bottom: 2.5rem; line-height: 1.8; }
.timeline-container { position: relative; padding: 1rem 0; }
.timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, transparent, var(--accent-gold), transparent); transform: translateX(-50%); }
.timeline-item { position: relative; width: 50%; padding: 0 2rem 2rem; box-sizing: border-box; }
.timeline-item:nth-child(odd) { left: 0; text-align: right; }
.timeline-item:nth-child(even) { left: 50%; text-align: left; }
.timeline-dot { position: absolute; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: var(--accent-gold); }
.timeline-item:nth-child(odd) .timeline-dot { right: -6px; }
.timeline-item:nth-child(even) .timeline-dot { left: -6px; }
.timeline-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--c-ivory); background: var(--bg-card); display: inline-block; padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid rgba(201,168,76,0.25); }
@media (max-width: 640px) {
  .timeline-item, .timeline-item:nth-child(odd), .timeline-item:nth-child(even) { width: 100%; left: 0; text-align: left; padding-left: 2rem; }
  .timeline-item:nth-child(odd) .timeline-dot, .timeline-item:nth-child(even) .timeline-dot { left: -6px; right: auto; }
}`,

  js: `

(function(){
  var root = document.querySelector('.lovestory-section');
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
  var raw = document.querySelector('.timeline-raw');
  var container = document.querySelector('.timeline-container');
  if (!raw || !container) return;
  var lines = raw.textContent.split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
  lines.forEach(function(line){
    var item = document.createElement('div');
    item.className = 'timeline-item';
    var dot = document.createElement('div');
    dot.className = 'timeline-dot';
    var content = document.createElement('div');
    content.className = 'timeline-content';
    var text = document.createElement('span');
    text.className = 'timeline-text';
    text.textContent = line;
    content.appendChild(text);
    item.appendChild(dot);
    item.appendChild(content);
    container.appendChild(item);
  });
})();`,

  layout: {
    "style": "centered",
    "decorativeElements": ["floral-corners","gold-border"]
  }
};
