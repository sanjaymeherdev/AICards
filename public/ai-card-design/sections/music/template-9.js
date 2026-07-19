/**
 * Template for MUSIC section
 */

module.exports = {
  id: 'music-template-9',
  name: 'Template 9',
  section: 'music',
  themeIndex: 9,
  
  colors: {
    '--bg-page': '#1a0505',
    '--bg-card': '#2b0a0a',
    '--accent-gold': '#c9a84c',
    '--accent-gold-light': '#e8c97a',
    '--c-ivory': '#f5e6c7',
    '--text-muted': '#a08575'
  },
  
  fields: [
    {"key": "footerNote", "type": "text", "label": "Footer Note", "required": true},
    {"key": "musicUrl", "type": "text", "label": "Background Music URL", "required": false},
    {"key": "musicLabel", "type": "text", "label": "Music Button Tooltip", "required": false}
  ],
  
  defaults: {
    "footerNote": "Made with love, for our favorite people.",
    "musicUrl": "",
    "musicLabel": "Click to play our playlist"
  },

  html: `
<footer class="music-footer">
  <div class="footer-divider">✦ ✦ ✦</div>
  <p class="footer-note">{{footerNote}}</p>
  <button class="music-btn" onclick="toggleMusic()" title="{{musicLabel}}">♪</button>
  <span class="music-tooltip">{{musicLabel}}</span>
  <audio id="bg-music" loop src="{{musicUrl}}"></audio>
</footer>`,

  css: `
.music-footer {
  padding: 60px 20px;
  background: var(--bg-page);
  text-align: center;
  position: relative;
}

.footer-divider {
  font-size: 1.5rem;
  color: var(--accent-gold);
  letter-spacing: 1rem;
  margin-bottom: 2rem;
}

.footer-note {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 2rem;
}

.music-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--accent-gold);
  color: var(--accent-gold);
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(201, 168, 76, 0.6);
}

.music-btn.playing {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.music-tooltip {
  display: block;
  margin-top: 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  color: var(--text-muted);
  opacity: 0.7;
}`,

  js: `
let musicPlaying = false;

function toggleMusic() {
  const btn = document.querySelector('.music-btn');
  const audio = document.getElementById('bg-music');
  
  if (musicPlaying) {
    audio.pause();
    btn.textContent = '♪';
    btn.classList.remove('playing');
  } else {
    audio.volume = 0.35;
    audio.play().catch(() => {});
    btn.textContent = '♫';
    btn.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
}`,
  
  layout: {
    style: 'centered',
    decorativeElements: ["floral-corners","gold-border"]
  }
};
