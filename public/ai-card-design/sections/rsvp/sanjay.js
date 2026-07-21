// Section: RSVP (form -> WhatsApp)
// { id, label, html, css, js, fields, defaults }

module.exports = {
  id: 'sanjay',
  label: 'RSVP Form',

  html: `
    <section class="rsvp-section">
      <div class="section-inner center">
        <h2 class="section-title">RSVP</h2>
        <p class="section-subtitle">Kindly respond by {{rsvpDeadline}}</p>
        <div class="rsvp-card" data-whatsapp="{{whatsappNumber}}">
          <div id="rsvp-form-wrap">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="rsvp-name" />
            </div>
            <div class="form-group">
              <label>WhatsApp / Phone</label>
              <input type="text" id="rsvp-phone" />
            </div>
            <div class="form-group">
              <label>Attending</label>
              <select id="rsvp-attending">
                <option value="">&mdash; Please select &mdash;</option>
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
            </div>
            <div class="form-group">
              <label>Number of Guests</label>
              <input type="text" id="rsvp-guests" value="1" />
            </div>
            <div class="form-group">
              <label>Message (optional)</label>
              <input type="text" id="rsvp-msg" />
            </div>
            <button class="btn-rsvp" id="rsvp-submit-btn">Send RSVP &#10022;</button>
          </div>
          <div class="rsvp-success" id="rsvp-success">
            <div class="checkmark">&#9989;</div>
            <p>Thank you! We can't wait to celebrate with you.</p>
          </div>
        </div>
      </div>
    </section>
  `,

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
    :root{--bg-dark:#1a0505;--bg-mid:#2b0a0a;--c-primary:#5c0f0f;--c-primary-light:#7a1c1c;--c-gold:#c9a84c;--c-gold-light:#e8c97a;--c-ivory:#f5e6c7;--text-muted:#a08575;--font-display:'Cinzel',serif;--font-body:'Cormorant Garamond',serif;--font-sans:'Raleway',sans-serif;--glow:0 0 30px rgba(201,168,76,0.3);}
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg-dark);min-height:100%;color:var(--c-ivory);}
    .rsvp-section{padding:80px 20px;background:var(--bg-dark);}
    .section-inner.center{max-width:860px;margin:0 auto;text-align:center;}
    .section-title{font-family:var(--font-display);font-size:clamp(1.4rem,4vw,2rem);letter-spacing:0.15em;color:var(--c-gold);text-transform:uppercase;margin-bottom:8px;}
    .section-subtitle{font-family:var(--font-body);font-style:italic;color:var(--text-muted);font-size:1.1rem;margin-bottom:48px;}
    .rsvp-card{background:linear-gradient(160deg,rgba(92,15,15,0.18),rgba(43,10,10,0.7));border:1px solid rgba(201,168,76,0.3);border-radius:16px;padding:48px 40px;max-width:560px;margin:0 auto;text-align:left;}
    .form-group{margin-bottom:20px;}
    .form-group label{display:block;font-family:var(--font-sans);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;}
    .form-group input,.form-group select{width:100%;background:rgba(43,10,10,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:8px;color:var(--c-ivory);font-family:var(--font-body);font-size:1rem;padding:12px 16px;outline:none;transition:border-color 0.3s;}
    .form-group input:focus,.form-group select:focus{border-color:var(--c-gold);}
    .btn-rsvp{width:100%;background:linear-gradient(135deg,var(--c-primary),var(--c-primary-light));border:1px solid var(--c-gold);color:var(--c-gold-light);font-family:var(--font-display);font-size:0.9rem;letter-spacing:0.2em;text-transform:uppercase;padding:16px;border-radius:8px;cursor:pointer;transition:background 0.3s,box-shadow 0.3s;margin-top:8px;}
    .btn-rsvp:hover{background:linear-gradient(135deg,var(--c-primary-light),var(--c-primary));box-shadow:var(--glow);}
    .rsvp-success{text-align:center;display:none;flex-direction:column;align-items:center;gap:12px;}
    .rsvp-success .checkmark{font-size:3rem;}
    .rsvp-success p{font-style:italic;color:var(--c-gold-light);font-size:1.1rem;}
  `,

  js: `
    (function(){
      var card=document.querySelector('.rsvp-card');
      var waNumber=card.getAttribute('data-whatsapp');
      document.getElementById('rsvp-submit-btn').addEventListener('click', function(){
        var n=document.getElementById('rsvp-name').value.trim();
        var p=document.getElementById('rsvp-phone').value.trim();
        var a=document.getElementById('rsvp-attending').value;
        var g=document.getElementById('rsvp-guests').value;
        var m=document.getElementById('rsvp-msg').value.trim();
        if(!n||!a){ alert('Please fill name and attendance.'); return; }
        var txt='*Wedding RSVP*\\nName: '+n+'\\nPhone: '+p+'\\nAttending: '+(a==='yes'?'Yes':'No')+'\\nGuests: '+(g||1)+'\\nMessage: '+(m||'-');
        if(waNumber){
          window.open('https://wa.me/'+waNumber.replace(/\\D/g,'')+'?text='+encodeURIComponent(txt), '_blank');
        }
        document.getElementById('rsvp-form-wrap').style.display='none';
        document.getElementById('rsvp-success').style.display='flex';
      });
    })();
  `,

  fields: [
    { key: 'rsvpDeadline', type: 'text', label: 'RSVP Deadline', required: true },
    { key: 'whatsappNumber', type: 'text', label: 'WhatsApp Number (for RSVP)', required: false }
  ],

  defaults: {
    rsvpDeadline: '1st November 2026',
    whatsappNumber: '919999999999'
  }
};
