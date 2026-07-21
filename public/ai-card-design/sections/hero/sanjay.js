// Section: Hero (full — with families, date, venue, hashtag)
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'sanjay',
  label: 'Hero — Families & Hashtag',

  html: `
    <section class="hero">
      <div class="hero-families">{{brideFamily}} &middot; {{groomFamily}}</div>
      <h1 class="hero-names">
        <span>{{brideName}}</span>
        <span class="and-sign">&amp;</span>
        <span>{{groomName}}</span>
      </h1>
      <div class="hero-date">{{date}}</div>
      <div class="hero-venue-mini">{{venue}}</div>
      <div class="hero-hashtag">{{hashtag}}</div>
      <div class="scroll-hint">Scroll to explore</div>
    </section>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');
    :root{--bg-dark:#1a0505;--c-primary:#5c0f0f;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-primary-light:#7a1c1c;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;}
    .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(92,15,15,0.5) 0%,transparent 70%),var(--bg-dark);}
    .hero-families{font-family:var(--font-sans);font-size:0.75rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--text-muted);margin-bottom:32px;}
    .hero-names{font-family:var(--font-display);font-size:clamp(2.4rem,9vw,5rem);font-weight:600;line-height:1.05;color:var(--c-ivory);text-shadow:0 4px 30px rgba(0,0,0,0.6);margin-bottom:8px;}
    .hero-names .and-sign{display:block;font-family:var(--font-body);font-style:italic;font-size:0.45em;color:var(--c-gold);letter-spacing:0.1em;margin:4px 0;}
    .hero-date{font-family:var(--font-sans);font-size:0.85rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--c-gold-light);margin:28px 0 12px;}
    .hero-venue-mini{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1rem;margin-bottom:40px;}
    .hero-hashtag{font-family:var(--font-sans);font-size:0.8rem;letter-spacing:0.2em;color:var(--c-primary-light);border:1px solid var(--c-primary-light);padding:6px 20px;border-radius:40px;display:inline-block;}
    .scroll-hint{margin-top:60px;font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--text-muted);display:flex;flex-direction:column;align-items:center;gap:10px;animation:float 3s ease-in-out infinite;}
    .scroll-hint::after{content:'';width:1px;height:40px;background:linear-gradient(to bottom,var(--c-gold),transparent);}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  `,

  js: null,

  fields: [
    { key: 'brideFamily', type: 'text', label: "Bride's Family", required: true },
    { key: 'groomFamily', type: 'text', label: "Groom's Family", required: true },
    { key: 'brideName', type: 'text', label: 'Bride Name', required: true },
    { key: 'groomName', type: 'text', label: 'Groom Name', required: true },
    { key: 'date', type: 'text', label: 'Wedding Date & Time', required: true },
    { key: 'venue', type: 'text', label: 'Venue', required: true },
    { key: 'hashtag', type: 'text', label: 'Couple Hashtag', required: false }
  ],

  defaults: {
    brideFamily: 'The Sharma Family',
    groomFamily: 'The Verma Family',
    brideName: 'Vanya',
    groomName: 'Atharv',
    date: '23rd November 2026 &middot; 6:00 PM',
    venue: 'The Grand Palace, Delhi',
    hashtag: '#VanyaWedsAtharv'
  }
};
