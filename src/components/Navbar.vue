<template>
  <header class="navbar-header" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <!-- Logo Slot with fallback -->
      <router-link to="/" class="logo-link" aria-label="Vyliam Systems Home">
        <slot name="logo">
          <div class="default-logo">
            <svg class="logo-mark" width="34" height="34" viewBox="0 0 500 500" fill="none">
              <path d="M 13.711 48.848 C 6.152 49.481, 4.058 50.512, 4.015 53.621 C 4.007 54.238, 22.503 93.613, 45.117 141.121 C 67.731 188.630, 92.208 241.450, 99.511 258.500 C 138.941 350.566, 169.769 410.392, 190.806 435.671 C 202.371 449.568, 228.239 462.472, 248.500 464.452 C 279.778 467.508, 311.855 442.677, 335.319 397.245 C 339.330 389.479, 339.682 388.286, 338.456 386.609 C 337.106 384.763, 336.970 384.766, 332.288 386.761 C 317.805 392.933, 301.792 395.358, 290.737 393.054 C 277.115 390.215, 261.886 378.904, 252.663 364.774 C 248.707 358.715, 149 146.848, 149 144.502 C 149 143.391, 137.005 119.771, 133.309 113.603 C 109.124 73.249, 72.954 49.672, 33.500 48.541 C 26.900 48.352, 17.995 48.490, 13.711 48.848" fill="#0153c6"/>
              <path d="M 459.608 50.101 C 424.222 54.831, 392.775 74.341, 372.246 104.302 C 366.512 112.670, 259.819 343.569, 259.413 348.489 C 259.108 352.180, 265.014 359.460, 274.262 366.793 C 286.842 376.769, 298.848 380.694, 311.490 378.967 C 326.193 376.957, 348.277 362.565, 353.298 351.720 C 357.082 343.545, 492.018 60.926, 494.021 56.979 C 495.596 53.874, 495.636 53.223, 494.363 51.479 C 493.061 49.696, 491.613 49.484, 479.709 49.340 C 472.444 49.252, 463.399 49.594, 459.608 50.101" fill="#ff8600"/>
            </svg>
            <div class="logo-text">
              <span class="brand-title">VYLIAM</span>
              <span class="brand-sub">SYSTEMS</span>
            </div>
          </div>
        </slot>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <router-link to="/" class="nav-item" active-class="nav-active">
          {{ $t('nav.home') }}
        </router-link>
        <router-link to="/products" class="nav-item" active-class="nav-active">
          {{ $t('nav.products') }}
        </router-link>
        <router-link to="/about" class="nav-item" active-class="nav-active">
          {{ $t('nav.about') }}
        </router-link>
        <router-link to="/contact" class="nav-item" active-class="nav-active">
          {{ $t('nav.contact') }}
        </router-link>
      </nav>

      <!-- Right Actions: Language Switcher + CTA -->
      <div class="nav-actions">
        <LanguageSwitcher />

        <router-link to="/products" class="btn btn-primary btn-sm cta-btn">
          <span>{{ $t('nav.getStarted') }}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </router-link>

        <!-- Mobile Toggle Button -->
        <button 
          class="mobile-toggle" 
          @click="toggleMobileMenu" 
          aria-label="Toggle navigation menu"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-drawer">
        <div class="mobile-links">
          <router-link to="/" class="mobile-item" @click="closeMobileMenu">
            {{ $t('nav.home') }}
          </router-link>
          <router-link to="/products" class="mobile-item" @click="closeMobileMenu">
            {{ $t('nav.products') }}
          </router-link>
          <router-link to="/about" class="mobile-item" @click="closeMobileMenu">
            {{ $t('nav.about') }}
          </router-link>
          <router-link to="/contact" class="mobile-item" @click="closeMobileMenu">
            {{ $t('nav.contact') }}
          </router-link>
        </div>
        <div class="mobile-drawer-footer">
          <router-link to="/products" class="btn btn-primary w-full" @click="closeMobileMenu">
            {{ $t('nav.getStarted') }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 15
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
  transition: all var(--transition-base);
}

.navbar-header.scrolled {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 4px 20px -2px rgba(1, 83, 198, 0.06);
  border-bottom-color: var(--border-subtle);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* Logo Styling */
.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.default-logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.logo-mark {
  filter: drop-shadow(0 2px 8px rgba(1, 83, 198, 0.25));
  transition: transform var(--transition-base);
}

.logo-link:hover .logo-mark {
  transform: scale(1.05) rotate(-2deg);
}

.logo-text {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--text-main);
}

.brand-sub {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--primary);
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  position: relative;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition-fast);
  padding: 0.5rem 0;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: var(--radius-full);
  transition: transform var(--transition-base);
}

.nav-item:hover {
  color: var(--primary);
}

.nav-item:hover::after,
.nav-item.nav-active::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-item.nav-active {
  color: var(--primary);
  font-weight: 600;
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-main);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-item {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  transition: background var(--transition-fast);
}

.mobile-item:hover,
.mobile-item.router-link-active {
  background: var(--primary-subtle);
  color: var(--primary);
}

.mobile-drawer-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.w-full {
  width: 100%;
}

/* Responsive */
@media (max-width: 860px) {
  .desktop-nav,
  .cta-btn {
    display: none;
  }

  .mobile-toggle {
    display: inline-flex;
  }

  .mobile-drawer {
    display: block;
  }
}
</style>
