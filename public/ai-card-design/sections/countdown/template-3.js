/**
 * Midnight Blue Template for COUNTDOWN section
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
  id: "countdown-template-3",
  name: "Midnight Blue",
  section: "countdown",
  themeIndex: 3,

  colors: {
    "--bg-page": "#0a1628",
    "--bg-card": "#1a2f4a",
    "--accent-gold": "#c9b037",
    "--accent-gold-light": "#e8d47a",
    "--c-ivory": "#e8f0f8",
    "--text-muted": "#7a8fa8"
  },

  fields: [
    {
        "key": "title",
        "type": "text",
        "label": "Section Title",
        "required": true
    },
    {
        "key": "targetDate",
        "type": "text",
        "label": "Target Date & Time (e.g. 2026-11-23T18:00:00)",
        "required": true
    },
    {
        "key": "message",
        "type": "text",
        "label": "Message",
        "required": false
    }
  ],

  defaults: {
    "title": "Counting Down",
    "targetDate": "2026-11-23T18:00:00",
    "message": "Until we say \"I do\""
  },

  html: `
<section class="countdown-section">
  <div class="countdown-inner">
    <h2 class="countdown-title reveal">{{title}}</h2>
    <p class="countdown-message reveal">{{message}}</p>
    <div class="countdown-grid reveal" data-target="{{targetDate}}">
      <div class="count-block"><span class="count-number" data-unit="days">00</span><span class="count-label">Days</span></div>
      <div class="count-block"><span class="count-number" data-unit="hours">00</span><span class="count-label">Hours</span></div>
      <div class="count-block"><span class="count-number" data-unit="mins">00</span><span class="count-label">Minutes</span></div>
      <div class="count-block"><span class="count-number" data-unit="secs">00</span><span class="count-label">Seconds</span></div>
    </div>
  </div>
</section>`,

  css: `
.countdown-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.countdown-inner { max-width: 720px; margin: 0 auto; }
.countdown-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.5rem; }
.countdown-message { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; color: var(--text-muted); margin-bottom: 2.5rem; }
.countdown-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.count-block { background: var(--bg-card); border: 1px solid rgba(201,168,76,0.25); border-radius: 12px; padding: 1.5rem 0.5rem; }
.count-number { display: block; font-family: 'Cinzel', serif; font-size: 2.4rem; color: var(--accent-gold); line-height: 1; }
.count-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 1px; }
@media (max-width: 640px) {
  .countdown-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .count-number { font-size: 1.8rem; }
}`,

  js: `

(function(){
  var root = document.querySelector('.countdown-section');
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
  var grid = document.querySelector('.countdown-grid');
  if (!grid) return;
  var target = new Date(grid.getAttribute('data-target')).getTime();
  var days = grid.querySelector('[data-unit="days"]');
  var hours = grid.querySelector('[data-unit="hours"]');
  var mins = grid.querySelector('[data-unit="mins"]');
  var secs = grid.querySelector('[data-unit="secs"]');
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    if (isNaN(target)) return;
    var diff = target - Date.now();
    if (diff < 0) diff = 0;
    days.textContent = pad(Math.floor(diff / 86400000));
    hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    mins.textContent = pad(Math.floor((diff % 3600000) / 60000));
    secs.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
})();`,

  layout: {
    "style": "overlay",
    "decorativeElements": ["heart-motif","soft-shadow"]
  }
};
