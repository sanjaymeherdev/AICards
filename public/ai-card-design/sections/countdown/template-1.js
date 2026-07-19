/**
 * Royal Burgundy Template for COUNTDOWN section
 * Template 1 of 10
 */

module.exports = {
  id: 'countdown-template-1',
  name: 'Royal Burgundy',
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
    { "key": "title", "type": "text", "label": "Section Title", "required": true },
    { "key": "subtitle", "type": "text", "label": "Subtitle", "required": true }
  ],

  defaults: {
    "title": "Counting Down",
    "subtitle": "Until we say \"I do\""
  },

  html: `<section id="countdown-section" class="section"><div class="section-inner center"><h2 class="section-title fade-in">{{title}}</h2><p class="section-subtitle fade-in">{{subtitle}}</p><div class="countdown-grid stagger" id="countdown-grid"><div class="count-block"><span class="count-number" id="cd-days">00</span><span class="count-label">Days</span></div><div class="count-block"><span class="count-number" id="cd-hours">00</span><span class="count-label">Hours</span></div><div class="count-block"><span class="count-number" id="cd-mins">00</span><span class="count-label">Minutes</span></div><div class="count-block"><span class="count-number" id="cd-secs">00</span><span class="count-label">Seconds</span></div></div></div></section>`,

  css: `.section{padding:5rem 2rem}.section-inner{max-width:1000px;margin:0 auto}.center{text-align:center}.fade-in{opacity:0;transform:translateY(30px);transition:opacity 0.8s ease,transform 0.8s ease}.fade-in.visible{opacity:1;transform:translateY(0)}.section-title{font-family:'Cinzel',serif;font-size:2.5rem;color:var(--accent-gold);margin-bottom:0.5rem}.section-subtitle{font-family:'Lato',sans-serif;font-size:1.1rem;color:var(--text-muted);margin-bottom:3rem}.countdown-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;max-width:700px;margin:0 auto}.count-block{background:var(--bg-card);padding:2rem 1rem;border-radius:10px;border:1px solid rgba(201,168,76,0.2)}.count-number{display:block;font-family:'Cinzel',serif;font-size:3.5rem;color:var(--accent-gold);line-height:1}.count-label{display:block;font-family:'Lato',sans-serif;font-size:0.9rem;color:var(--text-muted);margin-top:0.5rem;text-transform:uppercase;letter-spacing:0.1em}.stagger{opacity:0;transform:translateY(20px);transition:all 0.6s ease}.stagger.visible{opacity:1;transform:translateY(0)}@media(max-width:768px){.countdown-grid{grid-template-columns:repeat(2,1fr)}.count-number{font-size:2.5rem}}`,

  js: `(function(){const target=new Date(WEDDING.weddingDateTime).getTime();function tick(){const diff=target-Date.now();if(diff<=0)return;const d=Math.floor(diff/86400000);const h=Math.floor((diff%86400000)/3600000);const m=Math.floor((diff%3600000)/60000);const s=Math.floor((diff%60000)/1000);document.getElementById('cd-days').textContent=String(d).padStart(2,'0');document.getElementById('cd-hours').textContent=String(h).padStart(2,'0');document.getElementById('cd-mins').textContent=String(m).padStart(2,'0');document.getElementById('cd-secs').textContent=String(s).padStart(2,'0')}tick();setInterval(tick,1000)})()`,

  layout: {
    style: 'centered',
    decorativeElements: ["floral-corners","gold-border"]
  }
};
