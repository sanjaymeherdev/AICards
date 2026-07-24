/**
 * Plum Velvet Template for SCRATCH section
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
  id: "scratch-template-6",
  name: "Plum Velvet",
  section: "scratch",
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
        "label": "Section Title",
        "required": true
    },
    {
        "key": "hiddenMessage",
        "type": "text",
        "label": "Hidden Message",
        "required": true
    },
    {
        "key": "instruction",
        "type": "text",
        "label": "Scratch Instruction",
        "required": false
    }
  ],

  defaults: {
    "title": "A Special Surprise",
    "hiddenMessage": "You are invited to our Sangeet!",
    "instruction": "Scratch to reveal!"
  },

  html: `
<section class="scratch-section">
  <div class="scratch-inner">
    <h2 class="scratch-title reveal">{{title}}</h2>
    <p class="scratch-instruction reveal">{{instruction}}</p>
    <div class="scratch-card reveal">
      <div class="scratch-message">{{hiddenMessage}}</div>
      <canvas class="scratch-canvas" width="320" height="180"></canvas>
    </div>
  </div>
</section>`,

  css: `
.scratch-section { padding: 5rem 1.5rem; background: var(--bg-page); text-align: center; }
.scratch-inner { max-width: 420px; margin: 0 auto; }
.scratch-title { font-family: 'Cinzel', serif; font-size: 2.2rem; color: var(--accent-gold); margin-bottom: 0.5rem; }
.scratch-instruction { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--text-muted); margin-bottom: 2rem; }
.scratch-card { position: relative; width: 320px; max-width: 100%; height: 180px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid rgba(201,168,76,0.3); }
.scratch-message {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 1rem; font-family: 'Cinzel', serif; font-size: 1.3rem; color: var(--accent-gold);
  background: var(--bg-card);
}
.scratch-canvas { position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer; touch-action: none; }`,

  js: `

(function(){
  var root = document.querySelector('.scratch-section');
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
  var canvas = document.querySelector('.scratch-canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;

  function paintOverlay() {
    var grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#2a1a2a');
    grad.addColorStop(0.5, '#3a2a3a');
    grad.addColorStop(1, '#1a0a1a');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.font = '600 16px sans-serif';
    ctx.fillStyle = '#c98ac9';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch here', w / 2, h / 2);
  }
  paintOverlay();

  var scratching = false;
  function pos(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    var cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x: cx * (w / rect.width), y: cy * (h / rect.height) };
  }
  function scratchAt(p) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
    ctx.fill();
  }
  function start(e) { scratching = true; scratchAt(pos(e)); }
  function move(e) { if (scratching) { e.preventDefault(); scratchAt(pos(e)); } }
  function end() { scratching = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', start, { passive: true });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);
})();`,

  layout: {
    "style": "ornate",
    "decorativeElements": ["art-deco","double-border"]
  }
};
