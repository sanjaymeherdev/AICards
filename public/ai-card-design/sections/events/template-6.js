/**
 * Plum Velvet Template for EVENTS section
 * Template 6 of 10
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
  id: "events-template-6",
  name: "Plum Velvet",
  section: "events",
  themeIndex: 6,

  colors: {
    "--bg-page": "#1a0a1a",
    "--bg-card": "#2a1a2a",
    "--accent-gold": "#c98ac9",
    "--accent-gold-light": "#e8aae8",
    "--c-ivory": "#f8e8f8",
    "--text-muted": "#a07aa0"
  },

  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Events Title",
        "required": true
    },
    {
        "key": "eventsList",
        "type": "textarea",
        "label": "Events (format: Date | Event | Location)",
        "required": true
    },
    {
        "key": "subtitle",
        "type": "text",
        "label": "Subtitle",
        "required": false
    }
  ],

  defaults: {
    "title": "Wedding Events",
    "eventsList": "Nov 21 | Sangeet | Dance Floor Arena\nNov 22 | Mehendi | Garden Court\nNov 23 | Wedding Ceremony | Main Hall",
    "subtitle": "Join us for the celebrations"
  },

  html: `
<section class="events-section">
  <div class="events-inner">
    <h2 class="events-title reveal">{{title}}</h2>
    <p class="events-subtitle reveal">{{subtitle}}</p>
    <div class="events-raw" style="display:none">{{eventsList}}</div>
    <div class="events-list reveal"></div>
  </div>
</section>`,

  css: `
.events-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.events-inner { max-width: 640px; margin: 0 auto; }
.events-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.5rem; }
.events-subtitle { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; }
.events-list { display: flex; flex-direction: column; gap: 1rem; text-align: left; }
.event-item { background: var(--bg-card); border-left: 3px solid var(--accent-gold); border-radius: 8px; padding: 1rem 1.25rem; }
.event-name { font-family: 'Cinzel', serif; font-size: 1.2rem; color: var(--accent-gold-light); margin-bottom: 0.25rem; }
.event-meta { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--c-ivory); }
.event-time { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem; }`,

  js: `

(function(){
  var root = document.querySelector('.events-section');
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
  var raw = document.querySelector('.events-raw');
  var list = document.querySelector('.events-list');
  if (!raw || !list) return;
  var lines = raw.textContent.split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
  lines.forEach(function(line){
    var parts = line.split('|').map(function(s){ return s.trim(); });
    var item = document.createElement('div');
    item.className = 'event-item';
    var name = document.createElement('div');
    name.className = 'event-name';
    name.textContent = parts[0] || '';
    item.appendChild(name);
    if (parts[1]) {
      var meta = document.createElement('div');
      meta.className = 'event-meta';
      meta.textContent = parts[1];
      item.appendChild(meta);
    }
    if (parts[2]) {
      var time = document.createElement('div');
      time.className = 'event-time';
      time.textContent = parts[2];
      item.appendChild(time);
    }
    list.appendChild(item);
  });
})();`,

  layout: {
    "style": "ornate",
    "decorativeElements": ["art-deco","double-border"]
  }
};
