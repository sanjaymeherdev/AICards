// Section: Invitation Message
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'sanjay',
  label: 'Invite Message',

  html: `
    <section class="message-section">
      <div class="section-inner">
        <div class="divider"><div class="divider-diamond"></div></div>
        <p class="invite-message">{{message}}</p>
      </div>
    </section>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;600;700&display=swap');
    :root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-gold:#c9a84c;--c-ivory:#f5e6c7;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;}
    .message-section{padding:80px 20px;background:linear-gradient(180deg,var(--bg-dark) 0%,var(--bg-mid) 50%,var(--bg-dark) 100%);border-top:1px solid rgba(201,168,76,0.15);border-bottom:1px solid rgba(201,168,76,0.15);}
    .section-inner{max-width:860px;margin:0 auto;}
    .divider{display:flex;align-items:center;gap:16px;margin:0 auto 32px;max-width:400px;}
    .divider::before,.divider::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--c-gold),transparent);}
    .divider-diamond{width:8px;height:8px;background:var(--c-gold);transform:rotate(45deg);flex-shrink:0;}
    .invite-message{font-size:clamp(1.1rem,3vw,1.4rem);font-style:italic;text-align:center;color:var(--c-ivory);line-height:1.9;max-width:680px;margin:0 auto;position:relative;padding:0 24px;}
    .invite-message::before,.invite-message::after{content:'"';font-family:var(--font-display);font-size:5rem;color:var(--c-gold);opacity:0.2;position:absolute;line-height:0;}
    .invite-message::before{top:20px;left:-8px;}
    .invite-message::after{bottom:-20px;right:-8px;}
  `,

  js: null,

  fields: [
    { key: 'message', type: 'text', label: 'Invitation Message', required: true }
  ],

  defaults: {
    message: 'With hearts full of joy, we invite you to witness the beginning of our forever. Your presence would mean the world to us as we celebrate this beautiful new chapter.'
  }
};
