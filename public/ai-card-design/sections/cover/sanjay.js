/**
 * Sanjay Template for COVER section
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
  section: 'cover',
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
    { key: 'brideInitial', type: 'text', label: 'Bride Initial', required: true },
    { key: 'groomInitial', type: 'text', label: 'Groom Initial', required: true },
    { key: 'date', type: 'text', label: 'Wedding Date', required: true },
    { key: 'buttonText', type: 'text', label: 'Open Button Text', required: true },
    { key: 'brideName', type: 'text', label: 'Bride Name', required: true },
    { key: 'groomName', type: 'text', label: 'Groom Name', required: true },
    { key: 'revealMessage', type: 'text', label: 'Reveal Subtext', required: false }
  ],
  
  defaults: {
    brideInitial: 'V',
    groomInitial: 'A',
    date: '23rd November 2026',
    buttonText: 'Click to Open',
    brideName: 'Vanya',
    groomName: 'Atharv',
    revealMessage: 'Scroll down to explore our story'
  },

  html: `
<div class="door-overlay" id="door-overlay">
  <div class="door-tagline">You are cordially invited</div>
  <div class="invite-card" id="open-card">
    <div class="card-face">
      <div class="card-shimmer"></div>
      <div class="card-body">
        <div class="card-flourish">&#10022; &#10022; &#10022;</div>
        <div class="card-monogram">
          <span>{{brideInitial}}</span><span class="amp">&amp;</span><span>{{groomInitial}}</span>
        </div>
        <div class="card-rule"></div>
        <div class="card-label">Wedding Invitation</div>
        <div class="card-date">{{date}}</div>
      </div>
    </div>
  </div>
  <button class="open-btn" id="open-btn"><span class="btn-line"></span> {{buttonText}} <span class="btn-line r"></span></button>
</div>
<div class="reveal-content" id="reveal-content">
  <div class="reveal-names">{{brideName}} &amp; {{groomName}}</div>
  <div class="reveal-sub">{{revealMessage}}</div>
</div>`,

  css: `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');
:root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-primary:#5c0f0f;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg-dark);min-height:100%;font-family:var(--font-body);color:var(--c-ivory);}
.door-overlay{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;background:var(--bg-dark);transition:opacity .8s ease .3s;}
.door-overlay.gone{opacity:0;pointer-events:none;}
.door-tagline{font-family:var(--font-sans);letter-spacing:.3em;text-transform:uppercase;font-size:.75rem;color:var(--text-muted);}
.invite-card{width:220px;cursor:pointer;transition:transform .4s ease;}
.invite-card:hover{transform:translateY(-4px) scale(1.02);}
.card-face{position:relative;border:1px solid var(--c-gold);border-radius:10px;background:linear-gradient(160deg,var(--c-primary),var(--bg-mid));box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden;}
.card-shimmer{position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(232,201,122,.25) 50%,transparent 70%);animation:shimmer 3s linear infinite;}
@keyframes shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}
.card-body{position:relative;padding:32px 20px;text-align:center;}
.card-flourish{color:var(--c-gold);font-size:.75rem;letter-spacing:.3em;margin-bottom:14px;}
.card-monogram{font-family:var(--font-display);font-size:1.8rem;color:var(--c-gold-light);}
.card-monogram .amp{margin:0 8px;font-style:italic;color:var(--c-gold);}
.card-rule{width:50px;height:1px;background:var(--c-gold);margin:16px auto;opacity:.5;}
.card-label{font-family:var(--font-sans);letter-spacing:.2em;text-transform:uppercase;font-size:.65rem;color:var(--text-muted);margin-bottom:6px;}
.card-date{font-family:var(--font-body);font-style:italic;color:var(--c-ivory);}
.open-btn{background:transparent;border:1px solid var(--c-gold);color:var(--c-gold);font-family:var(--font-sans);font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;padding:12px 26px;border-radius:40px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:background .3s,color .3s;}
.open-btn:hover{background:var(--c-gold);color:var(--bg-dark);}
.btn-line{width:20px;height:1px;background:currentColor;opacity:.6;}
.reveal-content{display:none;min-height:100vh;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;opacity:0;transition:opacity .8s ease;}
.reveal-content.visible{display:flex;opacity:1;}
.reveal-names{font-family:var(--font-display);font-size:2.2rem;color:var(--c-gold);}
.reveal-sub{font-family:var(--font-body);font-style:italic;color:var(--text-muted);}`,

  js: `
(function(){
  var overlay=document.getElementById('door-overlay');
  var card=document.getElementById('open-card');
  var btn=document.getElementById('open-btn');
  var reveal=document.getElementById('reveal-content');
  var opened=false;
  var style=document.createElement('style');
  style.textContent='@keyframes sparkle-fly{to{transform:translate(var(--dx),var(--dy));opacity:0;}}';
  document.head.appendChild(style);
  function openDoor(){
    if(opened)return; opened=true;
    for(var i=0;i<24;i++){
      var s=document.createElement('div');
      var angle=(i/24)*Math.PI*2, dist=80+Math.random()*80;
      s.style.cssText='position:fixed;left:50%;top:50%;width:5px;height:5px;border-radius:50%;background:#c9a84c;pointer-events:none;--dx:'+(Math.cos(angle)*dist)+'px;--dy:'+(Math.sin(angle)*dist)+'px;animation:sparkle-fly .9s ease forwards;';
      document.body.appendChild(s);
      (function(el){ setTimeout(function(){ el.remove(); }, 900); })(s);
    }
    overlay.classList.add('gone');
    setTimeout(function(){ reveal.classList.add('visible'); }, 500);
  }
  card.addEventListener('click', openDoor);
  btn.addEventListener('click', openDoor);
})();`,
  
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
