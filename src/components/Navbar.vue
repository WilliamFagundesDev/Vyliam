<template>
  <header class="navbar-header" :class="{ 'scrolled': isScrolled, 'nav-hidden': !isVisible }">
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

      <!-- Right Actions: Language Switcher + Auth + CTA -->
      <div class="nav-actions">
        <LanguageSwitcher class="desktop-lang" />

        <!-- Logged-in User Menu or Login Button -->
        <div v-if="isAuthenticated" class="user-menu-wrapper" ref="userMenuRef">
          <button 
            type="button" 
            class="user-menu-btn" 
            @click="toggleUserDropdown" 
            :aria-expanded="isUserDropdownOpen"
          >
            <div class="user-avatar-circle">
              <span>{{ userInitial }}</span>
            </div>
            <span class="user-display-name">{{ userShortName }}</span>
            <svg class="chevron-icon" :class="{ 'rotate': isUserDropdownOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <transition name="dropdown-fade">
            <div v-if="isUserDropdownOpen" class="user-dropdown-menu">
              <div class="user-dropdown-header">
                <p class="user-full-name">{{ userFullName }}</p>
                <p class="user-email-text">{{ currentUser?.email }}</p>
              </div>
              <div class="dropdown-divider"></div>
              <button type="button" class="dropdown-item logout-item" @click="handleLogout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>{{ $t('auth.account.logout') }}</span>
              </button>
            </div>
          </transition>
        </div>

        <!-- Login / Account Button (when guest) -->
        <router-link 
          v-else
          to="/auth" 
          class="nav-auth-btn" 
          :aria-label="$t('nav.login')" 
          :title="$t('nav.login')"
          active-class="auth-active"
        >
          <svg class="auth-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="auth-label">{{ $t('nav.login') }}</span>
        </router-link>

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
          <!-- Mobile Auth Item -->
          <div v-if="isAuthenticated" class="mobile-user-card">
            <div class="mobile-user-row">
              <div class="user-avatar-circle">
                <span>{{ userInitial }}</span>
              </div>
              <div class="mobile-user-details">
                <p class="user-full-name">{{ userFullName }}</p>
                <p class="user-email-text">{{ currentUser?.email }}</p>
              </div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm w-full" @click="handleLogout">
              {{ $t('auth.account.logout') }}
            </button>
          </div>
          <router-link v-else to="/auth" class="mobile-item mobile-auth-item" @click="closeMobileMenu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{{ $t('nav.login') }}</span>
          </router-link>
        </div>
        <div class="mobile-drawer-footer">
          <!-- Mobile Dedicated Language Selector -->
          <div class="mobile-lang-section">
            <span class="mobile-lang-title">{{ $t('nav.switchLanguage') || 'Idioma' }}</span>
            <div class="mobile-lang-pills">
              <button 
                v-for="item in availableLocales" 
                :key="item.id"
                type="button"
                class="mobile-lang-pill"
                :class="{ 'active': locale === item.id }"
                @click="selectMobileLocale(item.id)"
              >
                <span class="mobile-pill-flag">{{ item.flag }}</span>
                <span class="mobile-pill-name">{{ item.name }}</span>
                <svg v-if="locale === item.id" class="mobile-pill-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <router-link to="/products" class="btn btn-primary w-full mobile-cta-btn" @click="closeMobileMenu">
            {{ $t('nav.getStarted') }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>
  <!-- Spacer to hold header height in document flow -->
  <div class="navbar-spacer" aria-hidden="true"></div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { locale } = useI18n()

const availableLocales = [
  { id: 'pt-br', code: 'PT-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { id: 'en', code: 'EN', name: 'English (US)', flag: '🇺🇸' },
  { id: 'es', code: 'ES', name: 'Español', flag: '🇪🇸' }
]

function selectMobileLocale(newLocale) {
  locale.value = newLocale
  localStorage.setItem('vyliam_locale', newLocale)
  closeMobileMenu()
}

const isScrolled = ref(false)
const isVisible = ref(true)
let lastScrollY = 0
let isTicking = false

const isMobileMenuOpen = ref(false)
const isUserDropdownOpen = ref(false)
const userMenuRef = ref(null)

const { currentUser, userProfile, isAuthenticated, logoutUser } = useAuth()

const userFullName = computed(() => {
  return userProfile.value?.name || currentUser.value?.displayName || currentUser.value?.email?.split('@')[0] || 'Cliente'
})

const userShortName = computed(() => {
  return userFullName.value.split(' ')[0]
})

const userInitial = computed(() => {
  return (userFullName.value || 'U')[0].toUpperCase()
})

function getScrollY() {
  return Math.max(0, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
}

function handleScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = getScrollY()

      // Top of page: always show navbar and remove extra shadow
      if (currentScrollY <= 40) {
        isVisible.value = true
        isScrolled.value = currentScrollY > 10
        lastScrollY = currentScrollY
        isTicking = false
        return
      }

      isScrolled.value = true

      // Keep navbar visible when mobile drawer is open
      if (isMobileMenuOpen.value) {
        isVisible.value = true
        lastScrollY = currentScrollY
        isTicking = false
        return
      }

      const diff = currentScrollY - lastScrollY

      // Minimum buffer threshold (6px) to avoid micro-jitter on touch devices
      if (Math.abs(diff) > 6) {
        if (diff > 0 && currentScrollY > 70) {
          // Scrolling DOWN -> hide navbar
          isVisible.value = false
          if (isUserDropdownOpen.value) {
            isUserDropdownOpen.value = false
          }
        } else if (diff < 0) {
          // Scrolling UP -> show navbar
          isVisible.value = true
        }
        lastScrollY = currentScrollY
      }

      isTicking = false
    })
    isTicking = true
  }
}

// Ensure navbar is always visible upon route navigation
watch(() => route.path, () => {
  isVisible.value = true
  closeMobileMenu()
  isUserDropdownOpen.value = false
})

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function toggleUserDropdown() {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

async function handleLogout() {
  isUserDropdownOpen.value = false
  closeMobileMenu()
  await logoutUser()
}

function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserDropdownOpen.value = false
  }
}

onMounted(() => {
  lastScrollY = getScrollY()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  will-change: transform;
}

.navbar-header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 20px -2px rgba(1, 83, 198, 0.08);
  border-bottom-color: var(--border-subtle);
}

.navbar-header.nav-hidden {
  transform: translateY(-100%) !important;
  box-shadow: none;
}

.navbar-spacer {
  height: 72px;
  width: 100%;
  pointer-events: none;
}

@media (max-width: 480px) {
  .navbar-spacer {
    height: 62px;
  }
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

/* Auth Navigation Button */
.nav-auth-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.nav-auth-btn .auth-icon {
  color: var(--primary);
  transition: transform var(--transition-fast);
}

.nav-auth-btn:hover {
  background: var(--primary-subtle);
  border-color: rgba(1, 83, 198, 0.3);
  color: var(--primary);
  transform: translateY(-1px);
}

.nav-auth-btn:hover .auth-icon {
  transform: scale(1.1);
}

.nav-auth-btn.auth-active {
  background: var(--primary-subtle);
  border-color: var(--primary);
  color: var(--primary);
}

.mobile-auth-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  margin-top: 0.25rem;
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

/* User Session Menu */
.user-menu-wrapper {
  position: relative;
}

.user-menu-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem 0.35rem 0.4rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.user-menu-btn:hover {
  background: var(--primary-subtle);
  border-color: rgba(1, 83, 198, 0.3);
}

.user-avatar-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, #003b90 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(1, 83, 198, 0.2);
}

.user-display-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
}

.chevron-icon {
  color: #94a3b8;
  transition: transform var(--transition-fast);
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.user-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
  padding: 0.75rem 0;
  z-index: 110;
  animation: dropdownIn 0.15s ease-out;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.user-dropdown-header {
  padding: 0.5rem 1rem;
}

.user-full-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email-text {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-verif-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.6875rem;
  font-weight: 600;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.badge-verified {
  background: #f0fdf4;
  color: #16a34a;
}

.badge-verified .badge-dot {
  background: #16a34a;
}

.badge-unverified {
  background: #fffbeb;
  color: #b45309;
}

.badge-unverified .badge-dot {
  background: #f59e0b;
}

.dropdown-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 0.5rem 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.dropdown-item:hover {
  background: #f8fafc;
  color: var(--primary);
}

.logout-item:hover {
  color: #dc2626;
  background: #fef2f2;
}

/* Mobile user session card */
.mobile-user-card {
  padding: 0.85rem 1rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.mobile-user-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-user-details {
  flex: 1;
  min-width: 0;
}

/* Responsive */
@media (max-width: 1060px) and (min-width: 861px) {
  .nav-auth-btn .auth-label,
  .user-display-name {
    display: none;
  }
  .nav-auth-btn {
    padding: 0.5rem;
    border-radius: var(--radius-md);
  }
  .user-menu-btn {
    padding: 0.35rem;
  }
}

/* Mobile Drawer Language Selector */
.mobile-lang-section {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
}

.mobile-lang-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}

.mobile-lang-pills {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.mobile-lang-pill {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.mobile-lang-pill:hover {
  border-color: var(--primary);
  background: var(--primary-subtle);
}

.mobile-lang-pill.active {
  background: #f1f7ff;
  border-color: var(--primary);
  color: var(--primary);
  font-weight: 600;
}

.mobile-pill-flag {
  font-size: 1.15rem;
  line-height: 1;
}

.mobile-pill-name {
  flex: 1;
}

.mobile-pill-check {
  color: var(--primary);
  flex-shrink: 0;
}

@media (max-width: 860px) {
  .desktop-nav,
  .cta-btn,
  .desktop-lang {
    display: none !important;
  }

  .nav-auth-btn {
    padding: 0.45rem;
    border-radius: var(--radius-md);
  }

  .nav-auth-btn .auth-label {
    display: none;
  }

  .user-display-name {
    display: none;
  }

  .user-menu-btn {
    padding: 0.3rem;
  }

  .mobile-toggle {
    display: inline-flex;
  }

  .mobile-drawer {
    display: block;
  }

  .nav-actions {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    height: 62px;
  }

  .logo-mark {
    width: 28px;
    height: 28px;
  }

  .brand-title {
    font-size: 1.1rem;
  }

  .brand-sub {
    font-size: 0.95rem;
  }

  .nav-actions {
    gap: 0.35rem;
  }
}

@media (max-width: 360px) {
  .brand-sub {
    display: none;
  }
}
</style>
