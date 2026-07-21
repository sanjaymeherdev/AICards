// Section: Gallery / Slideshow (up to 3 photos)
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'sanjay',
  label: 'Gallery Slideshow',

  html: `
    <section class="gallery-section">
      <div class="section-inner center">
        <h2 class="section-title">{{title}}</h2>
        <p class="section-subtitle">{{subtitle}}</p>
        <div class="slideshow-wrap">
          <div class="slideshow-track" id="slideshow-track">
            <img src="{{photo1Url}}" class="slide-img" onerror="this.src='https://placehold.co/800x460/1a4a3a/c9a84c?text=Photo+1'" />
            <img src="{{photo2Url}}" class="slide-img" onerror="this.src='https://placehold.co/800x460/1a4a3a/c9a84c?text=Photo+2'" />
            <img src="{{photo3Url}}" class="slide-img" onerror="this.src='https://placehold.co/800x460/1a4a3a/c9a84c?text=Photo+3'" />
          </div>
          <button class="slide-btn prev" id="slide-prev">&lsaquo;</button>
          <button class="slide-btn next" id="slide-next">&rsaquo;</button>
          <div class="slide-dots" id="slide-dots"></div>
        </div>
      </div>
    </section>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@1,400&display=swap');
    :root{--bg-dark:#1a0505;--c-gold:#c9a84c;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--shadow-deep:0 20px 60px rgba(0,0,0,0.5);}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;color:var(--c-ivory);}
    .gallery-section{padding:80px 20px;}
    .section-inner.center{max-width:860px;margin:0 auto;text-align:center;}
    .section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;margin-bottom:8px;}
    .section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;margin-bottom:48px;}
    .slideshow-wrap{position:relative;max-width:720px;margin:0 auto;border-radius:14px;overflow:hidden;box-shadow:var(--shadow-deep),0 0 0 1px rgba(201,168,76,0.3);}
    .slideshow-track{display:flex;transition:transform 0.7s cubic-bezier(0.77,0,0.18,1);}
    .slide-img{min-width:100%;height:340px;object-fit:cover;}
    .slide-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(43,10,10,0.7);border:1px solid var(--c-gold);color:var(--c-gold);font-size:1.4rem;width:44px;height:44px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;z-index:2;}
    .slide-btn:hover{background:rgba(92,15,15,0.8);}
    .slide-btn.prev{left:14px;} .slide-btn.next{right:14px;}
    .slide-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:2;}
    .slide-dot{width:7px;height:7px;border-radius:50%;background:rgba(201,168,76,0.3);cursor:pointer;transition:background 0.3s,transform 0.3s;}
    .slide-dot.active{background:var(--c-gold);transform:scale(1.3);}
  `,

  js: `
    (function(){
      var track=document.getElementById('slideshow-track');
      var dotsWrap=document.getElementById('slide-dots');
      var count=track.querySelectorAll('.slide-img').length;
      var cur=0;
      for(var i=0;i<count;i++){
        var dot=document.createElement('div');
        dot.className='slide-dot'+(i===0?' active':'');
        (function(idx){ dot.addEventListener('click', function(){ go(idx); }); })(i);
        dotsWrap.appendChild(dot);
      }
      function go(n){
        cur=(n+count)%count;
        track.style.transform='translateX(-'+(cur*100)+'%)';
        var dots=dotsWrap.querySelectorAll('.slide-dot');
        for(var i=0;i<dots.length;i++) dots[i].classList.toggle('active', i===cur);
      }
      document.getElementById('slide-prev').onclick=function(){ go(cur-1); };
      document.getElementById('slide-next').onclick=function(){ go(cur+1); };
      setInterval(function(){ go(cur+1); }, 4000);
    })();
  `,

  fields: [
    { key: 'title', type: 'text', label: 'Section Title', required: true },
    { key: 'subtitle', type: 'text', label: 'Subtitle', required: false },
    { key: 'photo1Url', type: 'text', label: 'Photo 1 URL', required: false },
    { key: 'photo2Url', type: 'text', label: 'Photo 2 URL', required: false },
    { key: 'photo3Url', type: 'text', label: 'Photo 3 URL', required: false }
  ],

  defaults: {
    title: 'Our Story',
    subtitle: 'A glimpse of us',
    photo1Url: '',
    photo2Url: '',
    photo3Url: ''
  }
};
