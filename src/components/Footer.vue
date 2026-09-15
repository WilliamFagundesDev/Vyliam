<template>
  <footer class="footer-root">
    <div class="container footer-container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Mission -->
        <div class="footer-brand-col">
          <router-link to="/" class="footer-logo">
            <svg class="logo-mark" width="30" height="30" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#0153c6"/>
              <path d="M12 14L24 34L36 14" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24 24L31 34" stroke="#ff8600" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="36" cy="14" r="3" fill="#ff8600"/>
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
