/**
 * Royal Burgundy Template for LOVESTORY section
 * Template 1 of 10
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
  id: 'lovestory-template-1',
  name: 'Royal Burgundy',
  section: 'lovestory',
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
    {
        "key": "title",
        "type": "text",
        "label": "Section Title",
        "required": true
    },
    {
        "key": "storyText",
        "type": "textarea",
        "label": "Love Story",
        "required": true
    },
    {
        "key": "timeline",
        "type": "textarea",
        "label": "Timeline (one event per line)",
        "required": false
    }
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
  .timeline-line {
    left: 20px;
  }
  
  .timeline-dot {
    left: 20px;
  }
  
  .timeline-item {
    justify-content: flex-start;
    padding-left: 50px;
  }
  
  .timeline-content {
    text-align: left;
  }
}`,

  js: `
// Timeline animation on scroll
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
  
  // Layout hints for this theme
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
