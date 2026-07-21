// Section: Events (celebrations grid — up to 3 events)
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'sanjay',
  label: 'Events / Celebrations Grid',

  html: `
    <section class="events-section">
      <div class="section-inner">
        <h2 class="section-title">{{title}}</h2>
        <p class="section-subtitle">{{subtitle}}</p>
        <div class="events-grid">
          <div class="event-card">
            <div class="event-icon">{{event1Icon}}</div>
            <div class="event-name">{{event1Name}}</div>
            <div class="event-date">{{event1Date}}</div>
            <div class="event-time">{{event1Time}}</div>
            <div class="event-venue">{{event1Venue}}</div>
          </div>
          <div class="event-card">
            <div class="event-icon">{{event2Icon}}</div>
            <div class="event-name">{{event2Name}}</div>
            <div class="event-date">{{event2Date}}</div>
            <div class="event-time">{{event2Time}}</div>
            <div class="event-venue">{{event2Venue}}</div>
          </div>
          <div class="event-card">
            <div class="event-icon">{{event3Icon}}</div>
            <div class="event-name">{{event3Name}}</div>
            <div class="event-date">{{event3Date}}</div>
            <div class="event-time">{{event3Time}}</div>
            <div class="event-venue">{{event3Venue}}</div>
          </div>
        </div>
      </div>
    </section>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,400&display=swap');
    :root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-primary:#5c0f0f;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;color:var(--c-ivory);}
    .events-section{padding:80px 20px;}
    .section-inner{max-width:900px;margin:0 auto;}
    .section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;text-align:center;margin-bottom:8px;}
    .section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;text-align:center;margin-bottom:48px;}
    .events-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;}
    .event-card{background:linear-gradient(160deg,rgba(92,15,15,0.18),rgba(43,10,10,0.7));border:1px solid rgba(201,168,76,0.25);border-radius:12px;padding:28px 24px;position:relative;overflow:hidden;transition:transform 0.3s ease,box-shadow 0.3s ease;}
    .event-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.4),0 0 0 1px var(--c-gold);}
    .event-icon{font-size:1.8rem;margin-bottom:12px;}
    .event-name{font-family:var(--font-display);font-size:1.05rem;color:var(--c-gold-light);letter-spacing:0.06em;margin-bottom:10px;}
    .event-date{font-size:0.9rem;color:var(--c-ivory);}
    .event-time{font-size:0.85rem;color:var(--text-muted);margin-bottom:4px;}
    .event-venue{font-size:0.85rem;color:var(--text-muted);font-style:italic;}
  `,

  js: null,

  fields: [
    { key: 'title', type: 'text', label: 'Section Title', required: true },
    { key: 'subtitle', type: 'text', label: 'Subtitle', required: false },
    { key: 'event1Icon', type: 'text', label: 'Event 1 Icon (emoji)', required: false },
    { key: 'event1Name', type: 'text', label: 'Event 1 Name', required: true },
    { key: 'event1Date', type: 'text', label: 'Event 1 Date', required: true },
    { key: 'event1Time', type: 'text', label: 'Event 1 Time', required: false },
    { key: 'event1Venue', type: 'text', label: 'Event 1 Venue', required: false },
    { key: 'event2Icon', type: 'text', label: 'Event 2 Icon (emoji)', required: false },
    { key: 'event2Name', type: 'text', label: 'Event 2 Name', required: true },
    { key: 'event2Date', type: 'text', label: 'Event 2 Date', required: true },
    { key: 'event2Time', type: 'text', label: 'Event 2 Time', required: false },
    { key: 'event2Venue', type: 'text', label: 'Event 2 Venue', required: false },
    { key: 'event3Icon', type: 'text', label: 'Event 3 Icon (emoji)', required: false },
    { key: 'event3Name', type: 'text', label: 'Event 3 Name', required: true },
    { key: 'event3Date', type: 'text', label: 'Event 3 Date', required: true },
    { key: 'event3Time', type: 'text', label: 'Event 3 Time', required: false },
    { key: 'event3Venue', type: 'text', label: 'Event 3 Venue', required: false }
  ],

  defaults: {
    title: 'Celebrations',
    subtitle: 'Join us across all the festivities',
    event1Icon: '\\u{1F33F}', event1Name: 'Mehendi', event1Date: '21 Nov 2026', event1Time: '4:00 PM', event1Venue: 'Sharma Residence',
    event2Icon: '\\u{1F483}', event2Name: 'Sangeet', event2Date: '22 Nov 2026', event2Time: '7:00 PM', event2Venue: 'The Grand Palace, Lawn',
    event3Icon: '\\u{1F48D}', event3Name: 'Wedding', event3Date: '23 Nov 2026', event3Time: '6:00 PM', event3Venue: 'The Grand Palace, Delhi'
  }
};
