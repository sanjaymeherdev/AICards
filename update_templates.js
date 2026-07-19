const fs = require('fs');
const path = require('path');

// Base template configurations for each section type
const sectionTemplates = {
  hero: {
    fields: [
      { key: "brideFamily", type: "text", label: "Bride's Family", required: true },
      { key: "groomFamily", type: "text", label: "Groom's Family", required: true },
      { key: "brideName", type: "text", label: "Bride Name", required: true },
      { key: "groomName", type: "text", label: "Groom Name", required: true },
      { key: "date", type: "text", label: "Wedding Date & Time", required: true },
      { key: "venue", type: "text", label: "Venue", required: true },
      { key: "hashtag", type: "text", label: "Couple Hashtag", required: false }
    ],
    defaults: {
      brideFamily: "The Sharma Family",
      groomFamily: "The Verma Family",
      brideName: "Vanya",
      groomName: "Atharv",
      date: "23rd November 2026 at 6:00 PM",
      venue: "The Grand Palace, Delhi",
      hashtag: "#VanyaWedsAtharv"
    }
  },
  countdown: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true },
      { key: "weddingDateTime", type: "datetime", label: "Wedding Date & Time", required: true }
    ],
    defaults: {
      title: "Counting Down",
      subtitle: "Until we say 'I do'",
      weddingDateTime: "2026-11-23T18:00:00"
    }
  },
  dresscode: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true },
      { key: "attireType", type: "text", label: "Dress Code Type", required: true },
      { key: "colors", type: "text", label: "Suggested Colors", required: true }
    ],
    defaults: {
      title: "Dress Code",
      subtitle: "Come dressed to celebrate",
      attireType: "Formal / Black Tie",
      colors: "Emerald, Gold, Ivory"
    }
  },
  events: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true }
    ],
    defaults: {
      title: "Celebrations",
      subtitle: "Join us across all the festivities"
    }
  },
  gallery: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true }
    ],
    defaults: {
      title: "Our Story",
      subtitle: "A glimpse of us"
    }
  },
  venue: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true },
      { key: "venueName", type: "text", label: "Venue Name", required: true },
      { key: "address", type: "text", label: "Address", required: true },
      { key: "mapEmbedUrl", type: "text", label: "Google Maps Embed URL", required: true },
      { key: "directionsLink", type: "text", label: "Directions Link", required: true }
    ],
    defaults: {
      title: "The Venue",
      subtitle: "Where the magic happens",
      venueName: "The Grand Palace",
      address: "123 Wedding Lane, Delhi, India",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789!2d77.123456!3d28.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzEyMy40Ik4gNzdcrjM0JzEyMy40IkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
      directionsLink: "https://goo.gl/maps/example"
    }
  },
  rsvp: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true },
      { key: "deadline", type: "text", label: "RSVP Deadline", required: true },
      { key: "whatsappNumber", type: "text", label: "WhatsApp Number (optional)", required: false }
    ],
    defaults: {
      title: "RSVP",
      subtitle: "Kindly respond by",
      deadline: "1st November 2026",
      whatsappNumber: "+919876543210"
    }
  },
  scratch: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true },
      { key: "revealLabel", type: "text", label: "Reveal Label", required: true },
      { key: "revealDate", type: "text", label: "Date to Reveal", required: true },
      { key: "clearedMessage", type: "text", label: "Cleared Message", required: true }
    ],
    defaults: {
      title: "Scratch to Reveal",
      subtitle: "Our special date is hidden below",
      revealLabel: "We are getting married on",
      revealDate: "23rd November 2026",
      clearedMessage: "✦ Mark the date! See you there ✦"
    }
  },
  lovestory: {
    fields: [
      { key: "title", type: "text", label: "Section Title", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", required: true }
    ],
    defaults: {
      title: "Our Love Story",
      subtitle: "How it all began"
    }
  },
  cover: {
    fields: [
      { key: "tagline", type: "text", label: "Opening Tagline", required: true },
      { key: "initials", type: "text", label: "Couple Initials", required: true },
      { key: "label", type: "text", label: "Card Label", required: true },
      { key: "date", type: "text", label: "Wedding Date", required: true },
      { key: "openButtonText", type: "text", label: "Open Button Text", required: true }
    ],
    defaults: {
      tagline: "You are cordially invited",
      initials: "V & A",
      label: "Wedding Invitation",
      date: "23rd November 2026",
      openButtonText: "Click to Open"
    }
  },
  music: {
    fields: [
      { key: "musicUrl", type: "text", label: "Music URL", required: false },
      { key: "musicLabel", type: "text", label: "Music Tooltip", required: false }
    ],
    defaults: {
      musicUrl: "",
      musicLabel: "Background Music"
    }
  }
};

// Template variations with different styles
const templateVariations = {
  hero: [
    {
      name: "Royal Burgundy",
      colors: { '--bg-page': '#1a0505', '--bg-card': '#2b0a0a', '--accent-gold': '#c9a84c', '--accent-gold-light': '#e8c97a', '--c-ivory': '#f5e6c7', '--text-muted': '#a08575' },
      html: `
<section id="hero" class="section hero-section">
  <div class="section-inner center">
    <p class="hero-families fade-in">{{brideFamily}} · {{groomFamily}}</p>
    <div class="hero-names fade-in">
      <span class="bride-name">{{brideName}}</span>
      <span class="and-sign">&</span>
      <span class="groom-name">{{groomName}}</span>
    </div>
    <div class="divider fade-in"><div class="divider-diamond"></div></div>
    <p class="hero-date fade-in">{{date}}</p>
    <p class="hero-venue-mini fade-in">{{venue}}</p>
    <span class="hero-hashtag fade-in">{{hashtag}}</span>
    <div class="scroll-hint fade-in">Scroll to explore</div>
  </div>
</section>`,
      css: `
.hero-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-page); position: relative; overflow: hidden; }
.hero-section .section-inner { max-width: 800px; padding: 2rem; text-align: center; }
.hero-families { font-family: 'Cinzel', serif; font-size: 1.1rem; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 2rem; text-transform: uppercase; }
.hero-names { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 2rem; }
.bride-name, .groom-name { font-family: 'Great Vibes', cursive; font-size: 4rem; color: var(--c-ivory); line-height: 1.2; }
.and-sign { font-family: 'Cinzel', serif; font-size: 2.5rem; color: var(--accent-gold); }
.divider { display: flex; align-items: center; justify-content: center; margin: 2rem 0; }
.divider-diamond { width: 20px; height: 20px; background: var(--accent-gold); transform: rotate(45deg); box-shadow: 0 0 20px rgba(201, 168, 76, 0.5); }
.hero-date { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--accent-gold); letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.hero-venue-mini { font-family: 'Lato', sans-serif; font-size: 1rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.hero-hashtag { display: inline-block; font-family: 'Lato', sans-serif; font-size: 0.95rem; color: var(--accent-gold-light); padding: 0.5rem 1.5rem; border: 1px solid var(--accent-gold); border-radius: 50px; margin-bottom: 3rem; }
.scroll-hint { font-family: 'Lato', sans-serif; font-size: 0.85rem; color: var(--text-muted); letter-spacing: 0.1em; animation: bounce 2s infinite; }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 768px) { .bride-name, .groom-name { font-size: 2.5rem; } .and-sign { font-size: 1.5rem; } }`
    },
    {
      name: "Elegant White",
      colors: { '--bg-page': '#faf9f7', '--bg-card': '#ffffff', '--accent-gold': '#d4af37', '--accent-gold-light': '#f4d03f', '--c-ivory': '#2c2c2c', '--text-muted': '#6b6b6b' },
      html: `
<section id="hero" class="section hero-section hero-elegant">
  <div class="section-inner center">
    <div class="floral-ornament top"></div>
    <p class="hero-families fade-in">{{brideFamily}} & {{groomFamily}}</p>
    <div class="hero-names fade-in">
      <span class="bride-name">{{brideName}}</span>
      <span class="and-symbol">&</span>
      <span class="groom-name">{{groomName}}</span>
    </div>
    <div class="decorative-line fade-in"></div>
    <p class="hero-date fade-in">{{date}}</p>
    <p class="hero-venue fade-in">{{venue}}</p>
    <span class="hero-hashtag fade-in">{{hashtag}}</span>
    <div class="scroll-indicator fade-in">▼</div>
  </div>
</section>`,
      css: `
.hero-elegant { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-page); }
.hero-elegant .section-inner { max-width: 700px; padding: 3rem 2rem; text-align: center; position: relative; }
.floral-ornament.top { width: 100px; height: 60px; margin: 0 auto 2rem; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cpath d='M50 0 Q75 30 100 60 Q50 45 0 60 Q25 30 50 0' fill='none' stroke='%23d4af37' stroke-width='2'/%3E%3C/svg%3E") no-repeat center; opacity: 0.6; }
.hero-families { font-family: 'Playfair Display', serif; font-size: 1rem; letter-spacing: 0.2em; color: var(--text-muted); margin-bottom: 2.5rem; text-transform: uppercase; }
.hero-names { margin-bottom: 2rem; }
.bride-name, .groom-name { font-family: 'Great Vibes', cursive; font-size: 4.5rem; color: var(--c-ivory); display: block; line-height: 1.1; }
.and-symbol { font-family: 'Playfair Display', serif; font-size: 3rem; color: var(--accent-gold); display: block; margin: 0.5rem 0; }
.decorative-line { width: 200px; height: 2px; background: linear-gradient(90deg, transparent, var(--accent-gold), transparent); margin: 2rem auto; }
.hero-date { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--accent-gold); margin-bottom: 0.5rem; }
.hero-venue { font-family: 'Lato', sans-serif; font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2rem; }
.hero-hashtag { font-family: 'Lato', sans-serif; font-size: 0.9rem; color: var(--accent-gold); border-top: 1px solid var(--accent-gold); border-bottom: 1px solid var(--accent-gold); padding: 0.5rem 0; display: inline-block; min-width: 150px; }
.scroll-indicator { font-size: 1.5rem; color: var(--accent-gold); margin-top: 3rem; animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
.fade-in { opacity: 0; transform: translateY(20px); transition: all 0.8s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }`
    }
  ],
  countdown: [
    {
      name: "Classic Gold",
      colors: { '--bg-page': '#1a1a1a', '--bg-card': '#2a2a2a', '--accent-gold': '#c9a84c', '--accent-gold-light': '#e8c97a', '--c-ivory': '#f5f5f5', '--text-muted': '#999999' },
      html: `
<section id="countdown-section" class="section countdown-section">
  <div class="section-inner center">
    <h2 class="section-title fade-in">{{title}}</h2>
    <p class="section-subtitle fade-in">{{subtitle}}</p>
    <div class="countdown-grid stagger" id="countdown-grid">
      <div class="count-block">
        <span class="count-number" id="cd-days">00</span>
        <span class="count-label">Days</span>
      </div>
      <div class="count-block">
        <span class="count-number" id="cd-hours">00</span>
        <span class="count-label">Hours</span>
      </div>
      <div class="count-block">
        <span class="count-number" id="cd-mins">00</span>
        <span class="count-label">Minutes</span>
      </div>
      <div class="count-block">
        <span class="count-number" id="cd-secs">00</span>
        <span class="count-label">Seconds</span>
      </div>
    </div>
  </div>
</section>`,
      css: `
.countdown-section { padding: 5rem 2rem; background: var(--bg-page); }
.countdown-section .section-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.section-title { font-family: 'Cinzel', serif; font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 0.5rem; }
.section-subtitle { font-family: 'Lato', sans-serif; font-size: 1.1rem; color: var(--text-muted); margin-bottom: 3rem; }
.countdown-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; max-width: 700px; margin: 0 auto; }
.count-block { background: var(--bg-card); padding: 2rem 1rem; border-radius: 10px; border: 1px solid rgba(201, 168, 76, 0.2); }
.count-number { display: block; font-family: 'Cinzel', serif; font-size: 3.5rem; color: var(--accent-gold); line-height: 1; }
.count-label { display: block; font-family: 'Lato', sans-serif; font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; }
.stagger { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.stagger.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 768px) { .countdown-grid { grid-template-columns: repeat(2, 1fr); } .count-number { font-size: 2.5rem; } }`,
      js: `
(function initCountdown() {
  const target = new Date('{{weddingDateTime}}').getTime();
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
})();`
    }
  ]
};

console.log('Template update script ready');
console.log('Sections:', Object.keys(sectionTemplates));
