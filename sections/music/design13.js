// Section: Footer + Music Player
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'design13',
  label: 'Footer with Music Player',

  html: `
    <footer class="wedding-footer">
      <div class="footer-note">{{footerNote}}</div>
      <div class="footer-divider">&#10022; &#10022; &#10022;</div>
    </footer>
    <button id="music-btn" data-src="{{musicUrl}}">&#9834;</button>
    <div class="music-label-tooltip">{{musicLabel}}</div>
    <audio id="bg-music" loop></audio>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400&family=Raleway:wght@300;400;500&display=swap');
    :root{--bg-dark:#1a0505;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--text-muted:#a08575;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;color:#f5e6c7;}
    .wedding-footer{background:var(--bg-dark);border-top:1px solid rgba(201,168,76,0.15);padding:48px 20px;text-align:center;}
    .footer-note{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1rem;margin-bottom:16px;}
    .footer-divider{color:var(--c-gold);letter-spacing:0.4em;font-size:0.8rem;}
    #music-btn{position:fixed;bottom:24px;right:24px;z-index:900;background:rgba(43,10,10,0.85);border:1px solid var(--c-gold);color:var(--c-gold);width:52px;height:52px;border-radius:50%;font-size:1.3rem;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:background 0.3s,transform 0.2s;}
    #music-btn:hover{background:rgba(92,15,15,0.85);transform:scale(1.05);}
    #music-btn.playing{animation:spin-slow 8s linear infinite;}
    @keyframes spin-slow{to{transform:rotate(360deg);}}
    .music-label-tooltip{position:fixed;bottom:88px;right:24px;z-index:900;background:rgba(43,10,10,0.9);border:1px solid rgba(201,168,76,0.3);color:var(--c-gold-light);font-family:var(--font-sans);font-size:0.7rem;letter-spacing:0.1em;padding:6px 12px;border-radius:20px;white-space:nowrap;opacity:0;transition:opacity 0.3s;pointer-events:none;}
    #music-btn:hover + .music-label-tooltip{opacity:1;}
  `,

  js: `
    (function(){
      var btn=document.getElementById('music-btn');
      var audio=document.getElementById('bg-music');
      var src=btn.getAttribute('data-src');
      if(!src){ btn.style.display='none'; return; }
      audio.src=src;
      btn.addEventListener('click', function(){
        if(audio.paused){ audio.volume=0.35; audio.play().catch(function(){}); btn.textContent='\\u266B'; btn.classList.add('playing'); }
        else { audio.pause(); btn.textContent='\\u266A'; btn.classList.remove('playing'); }
      });
    })();
  `,

  fields: [
    { key: 'footerNote', type: 'text', label: 'Footer Note', required: true },
    { key: 'musicUrl', type: 'text', label: 'Background Music URL', required: false },
    { key: 'musicLabel', type: 'text', label: 'Music Button Tooltip', required: false }
  ],

  defaults: {
    footerNote: 'Made with love, for our favorite people.',
    musicUrl: '',
    musicLabel: 'Play Music'
  }
};
