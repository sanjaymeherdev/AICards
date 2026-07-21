/**
 * Sanjay Template for COUNTDOWN section
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
  section: 'countdown',
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
    { key: 'title', type: 'text', label: 'Section Title', required: true },
    { key: 'subtitle', type: 'text', label: 'Subtitle', required: false },
    { key: 'targetDateTime', type: 'text', label: 'Target Date/Time (ISO)', required: true }
  ],
  
  defaults: {
    title: 'Counting Down',
    subtitle: 'Until we say "I do"',
    targetDateTime: '2026-11-23T18:00:00'
  },

  html: `
<section class="countdown-section">
  <div class="section-inner center">
    <h2 class="section-title">{{title}}</h2>
    <p class="section-subtitle">{{subtitle}}</p>
    <div class="countdown-grid" data-target="{{targetDateTime}}" id="countdown-grid">
      <div class="count-block"><span class="count-number" id="cd-days">00</span><span class="count-label">Days</span></div>
      <div class="count-block"><span class="count-number" id="cd-hours">00</span><span class="count-label">Hours</span></div>
      <div class="count-block"><span class="count-number" id="cd-mins">00</span><span class="count-label">Minutes</span></div>
      <div class="count-block"><span class="count-number" id="cd-secs">00</span><span class="count-label">Seconds</span></div>
    </div>
  </div>
</section>`,

  css: `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,400&display=swap');
:root{--bg-dark:#1a0505;--c-gold:#c9a84c;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;--glow:0 0 30px rgba(201,168,76,0.3);}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg-dark);min-height:100%;color:var(--c-ivory);}
.countdown-section{padding:80px 20px;}
.section-inner.center{max-width:860px;margin:0 auto;text-align:center;}
.section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;margin-bottom:8px;}
.section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;margin-bottom:48px;}
.countdown-grid{display:flex;justify-content:center;align-items:stretch;gap:clamp(6px,2vw,20px);flex-wrap:nowrap;width:100%;max-width:420px;margin:0 auto;}
.count-block{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;flex:1 1 0;min-width:0;padding:clamp(8px,3vw,16px) 4px;border:1px solid rgba(201,168,76,0.25);border-radius:10px;background:rgba(92,15,15,0.15);}
.count-number{font-family:var(--font-display);font-size:clamp(1rem,6vw,2.2rem);color:var(--c-gold);text-shadow:var(--glow);line-height:1;white-space:nowrap;}
.count-label{font-family:var(--font-sans);font-size:clamp(0.5rem,1.8vw,0.65rem);letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;}`,

  js: `
(function(){
  var grid=document.getElementById('countdown-grid');
  var target=new Date(grid.getAttribute('data-target')).getTime();
  function update(){
    var diff=target-Date.now();
    if(diff<=0) diff=0;
    var d=Math.floor(diff/86400000), h=Math.floor((diff%86400000)/3600000), m=Math.floor((diff%3600000)/60000), s=Math.floor((diff%60000)/1000);
    document.getElementById('cd-days').textContent=String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent=String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent=String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent=String(s).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
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
