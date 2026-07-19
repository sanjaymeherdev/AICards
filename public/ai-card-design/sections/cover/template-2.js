/**
 * Template for COVER section
 */

module.exports = {
  id: 'cover-template-2',
  name: 'Template 2',
  section: 'cover',
  themeIndex: 2,
  
  colors: {
    '--bg-page': '#1a0505',
    '--bg-card': '#2b0a0a',
    '--accent-gold': '#c9a84c',
    '--accent-gold-light': '#e8c97a',
    '--c-ivory': '#f5e6c7',
    '--text-muted': '#a08575'
  },
  
  fields: [
    {"key": "coupleNames", "type": "text", "label": "Couple Names", "required": true},
    {"key": "weddingDate", "type": "text", "label": "Wedding Date", "required": true},
    {"key": "welcomeText", "type": "text", "label": "Welcome Text", "required": false}
  ],
  
  defaults: {
    "coupleNames": "Vanya & Atharv",
    "weddingDate": "23rd November 2026",
    "welcomeText": "Together with their families"
  },

  html: `
<div class="cover-section">
  <div class="cover-content">
    <div class="cover-ornament top"></div>
    <p class="cover-welcome fade-in">{{welcomeText}}</p>
    <h1 class="cover-names fade-in">{{coupleNames}}</h1>
    <div class="cover-divider fade-in">
      <div class="divider-diamond"></div>
    </div>
    <p class="cover-date fade-in">{{weddingDate}}</p>
    <div class="cover-ornament bottom"></div>
  </div>
</div>`,

  css: `
.cover-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.cover-content {
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
}

.cover-welcome {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: var(--text-muted);
  letter-spacing: 3px;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.cover-names {
  font-family: 'Cinzel', serif;
  font-size: 4rem;
  color: var(--accent-gold);
  margin: 1rem 0;
  text-shadow: 0 0 30px rgba(201, 168, 76, 0.5);
  line-height: 1.2;
}

.cover-divider {
  margin: 2rem auto;
  width: 200px;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--accent-gold), transparent);
  position: relative;
}

.divider-diamond {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 20px;
  height: 20px;
  background: var(--accent-gold);
  box-shadow: 0 0 20px var(--accent-gold);
}

.cover-date {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: var(--c-ivory);
  letter-spacing: 2px;
  margin-top: 2rem;
}

.cover-ornament {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .cover-names { font-size: 2.5rem; }
  .cover-welcome { font-size: 1rem; }
  .cover-date { font-size: 1.2rem; }
}`,

  js: `
(function initCoverAnimation() {
  const elements = document.querySelectorAll('.cover-section .fade-in');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 200);
  });
})();`,
  
  layout: {
    style: 'centered',
    decorativeElements: ["floral-corners","gold-border"]
  }
};
