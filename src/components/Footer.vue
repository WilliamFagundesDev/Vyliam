<template>
  <footer class="footer-root">
    <div class="container footer-container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Mission -->
        <div class="footer-brand-col">
          <router-link to="/" class="footer-logo">
            <svg class="logo-mark" width="30" height="30" viewBox="0 0 500 500" fill="none">
              <path d="M 13.711 48.848 C 6.152 49.481, 4.058 50.512, 4.015 53.621 C 4.007 54.238, 22.503 93.613, 45.117 141.121 C 67.731 188.630, 92.208 241.450, 99.511 258.500 C 138.941 350.566, 169.769 410.392, 190.806 435.671 C 202.371 449.568, 228.239 462.472, 248.500 464.452 C 279.778 467.508, 311.855 442.677, 335.319 397.245 C 339.330 389.479, 339.682 388.286, 338.456 386.609 C 337.106 384.763, 336.970 384.766, 332.288 386.761 C 317.805 392.933, 301.792 395.358, 290.737 393.054 C 277.115 390.215, 261.886 378.904, 252.663 364.774 C 248.707 358.715, 149 146.848, 149 144.502 C 149 143.391, 137.005 119.771, 133.309 113.603 C 109.124 73.249, 72.954 49.672, 33.500 48.541 C 26.900 48.352, 17.995 48.490, 13.711 48.848" fill="#0153c6"/>
              <path d="M 459.608 50.101 C 424.222 54.831, 392.775 74.341, 372.246 104.302 C 366.512 112.670, 259.819 343.569, 259.413 348.489 C 259.108 352.180, 265.014 359.460, 274.262 366.793 C 286.842 376.769, 298.848 380.694, 311.490 378.967 C 326.193 376.957, 348.277 362.565, 353.298 351.720 C 357.082 343.545, 492.018 60.926, 494.021 56.979 C 495.596 53.874, 495.636 53.223, 494.363 51.479 C 493.061 49.696, 491.613 49.484, 479.709 49.340 C 472.444 49.252, 463.399 49.594, 459.608 50.101" fill="#ff8600"/>
            </svg>
            <span class="footer-brand-name">VYLIAM <span class="text-blue">SYSTEMS</span></span>
          </router-link>
          
          <p class="footer-tagline">
            {{ $t('footer.tagline') }}
          </p>

          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-text">{{ $t('footer.status') }}</span>
          </div>
        </div>

        <!-- Col 2: Products -->
        <div class="footer-col">
          <h4 class="col-title">{{ $t('footer.products') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/products?platform=windows">Windows Applications</router-link></li>
            <li><router-link to="/products?platform=android">Android Apps</router-link></li>
            <li><router-link to="/products?platform=web">Cloud & Web Apps</router-link></li>
            <li><router-link to="/products">All Releases</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Company -->
        <div class="footer-col">
          <h4 class="col-title">{{ $t('footer.company') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
            <li><router-link to="/contact">{{ $t('nav.contact') }}</router-link></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Engineering</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <!-- Col 4: Tech Stack Highlights -->
        <div class="footer-col">
          <h4 class="col-title">Technology</h4>
          <div class="tech-pills">
            <span class="tech-pill">Rust</span>
            <span class="tech-pill">C++</span>
            <span class="tech-pill">Win32 API</span>
            <span class="tech-pill">Android NDK</span>
            <span class="tech-pill">Kotlin</span>
            <span class="tech-pill">Vue 3</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} Vyliam Systems. {{ $t('footer.rights') }}
        </p>
        <div class="legal-links">
          <a href="#">{{ $t('footer.privacy') }}</a>
          <span class="sep">&bull;</span>
          <a href="#">{{ $t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-root {
  margin-top: auto;
  background: #090d16;
  color: #94a3b8;
  border-top: 1px solid #1e293b;
  padding: 4.5rem 0 2.5rem;
}

.footer-container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr;
  gap: 3rem;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
}

.footer-brand-name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.05em;
}

.text-blue {
  color: #3b82f6;
}

.footer-tagline {
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 320px;
  margin-bottom: 1.5rem;
  color: #94a3b8;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.status-text {
  font-size: 0.75rem;
  color: #6ee7b7;
  font-weight: 500;
}

.col-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  font-size: 0.875rem;
  color: #94a3b8;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: #ffffff;
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-pill {
  font-size: 0.75rem;
  font-family: monospace;
  background: #1e293b;
  color: #cbd5e1;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid #334155;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid #1e293b;
  font-size: 0.8125rem;
}

.copyright {
  color: #64748b;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.legal-links a {
  color: #64748b;
}

.legal-links a:hover {
  color: #94a3b8;
}

.sep {
  color: #334155;
}

@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
