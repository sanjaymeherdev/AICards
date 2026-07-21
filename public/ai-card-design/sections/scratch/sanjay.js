/**
 * Sanjay Template for SCRATCH section
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
  section: 'scratch',
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
    { key: 'hintText', type: 'text', label: 'Scratch Hint Text', required: false },
    { key: 'date', type: 'text', label: 'Wedding Date', required: true },
    { key: 'clearedMsg', type: 'text', label: 'Message After Scratching', required: false }
  ],
  
  defaults: {
    title: 'Scratch to Reveal',
    subtitle: 'Our special date is hidden below',
    hintText: 'Scratch with your finger or mouse \\u2726',
    date: '23rd November 2026',
    clearedMsg: '\\u2726 Mark the date! See you there \\u2726'
  },

  html: `
<section class="scratch-section">
      <div class="section-inner center">
        <h2 class="section-title">{{title}}</h2>
        <p class="section-subtitle">{{subtitle}}</p>
        <div class="scratch-wrapper">
          <div class="scratch-hint">{{hintText}}</div>
          <div class="scratch-container" id="scratch-container">
            <div class="scratch-reveal">
              <div class="reveal-label">We are getting married on</div>
              <div class="reveal-date">{{date}}</div>
            </div>
            <canvas class="scratch-canvas" id="scratch-canvas"></canvas>
          </div>
          <div class="scratch-cleared-msg" id="scratch-cleared-msg">{{clearedMsg}}</div>
        </div>
      </div>
    </section>`,

  css: `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');
    :root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-primary:#5c0f0f;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;--glow:0 0 30px rgba(201,168,76,0.3);--shadow-deep:0 20px 60px rgba(0,0,0,0.5);}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;color:var(--c-ivory);}
    .scratch-section{padding:80px 20px;background:var(--bg-mid);}
    .section-inner.center{max-width:860px;margin:0 auto;text-align:center;}
    .section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;margin-bottom:8px;}
    .section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;margin-bottom:48px;}
    .scratch-wrapper{display:flex;flex-direction:column;align-items:center;gap:24px;}
    .scratch-hint{font-family:var(--font-sans);font-size:0.8rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--text-muted);}
    .scratch-container{position:relative;width:320px;max-width:90vw;height:160px;border-radius:12px;overflow:hidden;box-shadow:var(--shadow-deep),0 0 0 1px var(--c-gold);cursor:crosshair;user-select:none;}
    .scratch-reveal{position:absolute;inset:0;background:linear-gradient(135deg,var(--c-primary) 0%,var(--bg-mid) 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}
    .reveal-label{font-family:var(--font-sans);font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--c-gold-light);}
    .reveal-date{font-family:var(--font-display);font-size:1.8rem;color:var(--c-ivory);text-shadow:var(--glow);}
    .scratch-canvas{position:absolute;inset:0;touch-action:none;}
    .scratch-cleared-msg{font-family:var(--font-body);font-style:italic;color:var(--c-gold-light);font-size:1rem;opacity:0;transition:opacity 0.6s;text-align:center;}
    .scratch-cleared-msg.show{opacity:1;}`,

  js: `
(function(){
      var canvas=document.getElementById('scratch-canvas');
      var ctx=canvas.getContext('2d');
      var wrap=document.getElementById('scratch-container');
      var clearedMsg=document.getElementById('scratch-cleared-msg');
      var drawing=false, cleared=false;
      function resize(){
        canvas.width=wrap.clientWidth; canvas.height=wrap.clientHeight;
        ctx.fillStyle='#c9a84c'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#1a0505'; ctx.font='16px Raleway, Arial, sans-serif'; ctx.textAlign='center';
        ctx.fillText('\\u2726 Scratch Here \\u2726', canvas.width/2, canvas.height/2);
      }
      if(document.fonts) document.fonts.ready.then(resize); else window.addEventListener('load', resize);
      window.addEventListener('resize', resize);
      setTimeout(resize, 50);
      function getPos(e){
        var r=canvas.getBoundingClientRect();
        var src=e.touches?e.touches[0]:e;
        return { x: src.clientX-r.left, y: src.clientY-r.top };
      }
      function scratch(x,y){ ctx.globalCompositeOperation='destination-out'; ctx.beginPath(); ctx.arc(x,y,20,0,Math.PI*2); ctx.fill(); }
      function check(){
        if(cleared) return;
        var d=ctx.getImageData(0,0,canvas.width,canvas.height).data; var t=0;
        for(var i=3;i<d.length;i+=4) if(d[i]===0) t++;
        if(t/(canvas.width*canvas.height)>0.5){
          cleared=true; canvas.style.opacity=0; canvas.style.pointerEvents='none';
          clearedMsg.classList.add('show');
        }
      }
      canvas.addEventListener('mousedown', function(e){ drawing=true; var p=getPos(e); scratch(p.x,p.y); });
      canvas.addEventListener('mousemove', function(e){ if(!drawing)return; var p=getPos(e); scratch(p.x,p.y); check(); });
      canvas.addEventListener('mouseup', function(){ drawing=false; });
      canvas.addEventListener('touchstart', function(e){ e.preventDefault(); drawing=true; var p=getPos(e); scratch(p.x,p.y); }, {passive:false});
      canvas.addEventListener('touchmove', function(e){ e.preventDefault(); if(!drawing)return; var p=getPos(e); scratch(p.x,p.y); check(); }, {passive:false});
      canvas.addEventListener('touchend', function(){ drawing=false; });
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
