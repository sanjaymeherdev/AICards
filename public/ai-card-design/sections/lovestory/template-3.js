/**
 * Template for LOVESTORY section
 */

module.exports = {
  id: 'lovestory-template-3',
  name: 'Template Name',
  section: 'lovestory',
  themeIndex: 3,
  
  colors: {
    '--bg-page': '#1a0505',
    '--bg-card': '#2b0a0a',
    '--accent-gold': '#c9a84c',
    '--accent-gold-light': '#e8c97a',
    '--c-ivory': '#f5e6c7',
    '--text-muted': '#a08575'
  },
  
  fields: [
    {"key": "title", "type": "text", "label": "Section Title", "required": true},
    {"key": "storyText", "type": "textarea", "label": "Love Story", "required": true},
    {"key": "timeline", "type": "textarea", "label": "Timeline (one event per line)", "required": false}
  ],
  
  defaults: {
    "title": "Our Love Story",
    "storyText": "From our first meeting to forever...",
    "timeline": "First Met: 2020\nEngaged: 2024\nWedding: 2026"
  },

  html: `
<section class="section lovestory-section">
  <div class="section-inner center">
    <h2 class="section-title fade-in">{{title}}</h2>
    <p class="section-subtitle fade-in">{{storyText}}</p>
    
    <div class="timeline-container fade-in">
      <div class="timeline-line"></div>
      {{#each timeline}}
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-text">{{this}}</span>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
</section>`,

  css: `
.lovestory-section {
  padding: 80px 20px;
  background: var(--bg-page);
}

.lovestory-section .section-inner {
  max-width: 800px;
  margin: 0 auto;
}

.lovestory-section .section-title {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  color: var(--accent-gold);
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.lovestory-section .section-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: var(--c-ivory);
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent-gold), var(--accent-gold-light), var(--accent-gold));
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  position: relative;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: var(--accent-gold);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px var(--accent-gold);
  z-index: 2;
}

.timeline-content {
  background: var(--bg-card);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  border: 1px solid var(--accent-gold);
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(201, 168, 76, 0.2);
}

.timeline-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: var(--c-ivory);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline-line { left: 20px; }
  .timeline-dot { left: 20px; }
  .timeline-item { justify-content: flex-start; padding-left: 50px; }
  .timeline-content { text-align: left; }
}`,

  js: `
(function initTimelineAnimation() {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  items.forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
  });
})();`,
  
  layout: {
    style: 'centered',
    decorativeElements: ["floral-corners","gold-border"]
  }
};
