<template>
  <div class="legal-view">
    <div class="container container-narrow">
      <!-- Interactive Segmented Switch Button -->
      <div class="switch-container">
        <div class="switch-control" role="tablist">
          <button 
            type="button"
            class="switch-btn" 
            :class="{ 'btn-active privacy-active': activeTab === 'privacy' }"
            @click="switchTab('privacy')"
            role="tab"
            :aria-selected="activeTab === 'privacy'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>{{ $t('footer.privacy') }}</span>
          </button>

          <button 
            type="button"
            class="switch-btn" 
            :class="{ 'btn-active terms-active': activeTab === 'terms' }"
            @click="switchTab('terms')"
            role="tab"
            :aria-selected="activeTab === 'terms'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>{{ $t('footer.terms') }}</span>
          </button>
        </div>
      </div>

      <!-- Animated Content Switcher -->
      <transition name="legal-fade" mode="out-in">
        <!-- 1. PRIVACY POLICY TAB -->
        <div v-if="activeTab === 'privacy'" key="privacy" class="legal-content">
          <!-- Header -->
          <div class="legal-header">
            <div class="legal-badge badge-privacy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>{{ $t('privacy.badge') }}</span>
            </div>
            <h1 class="legal-title">{{ $t('privacy.title') }}</h1>
            <p class="legal-date">{{ $t('privacy.lastUpdated') }}</p>
          </div>

          <!-- Intro Card -->
          <div class="legal-intro-card border-blue">
            <p class="intro-p">{{ $t('privacy.intro') }}</p>
          </div>

          <!-- Clauses -->
          <div class="legal-sections">
            <article 
              v-for="(section, idx) in $tm('privacy.sections')" 
              :key="idx" 
              class="legal-clause"
            >
              <h2 class="clause-title">{{ $rt(section.title) }}</h2>
              <p class="clause-content">{{ $rt(section.content) }}</p>
            </article>
          </div>

          <!-- Support Box -->
          <div class="legal-support-card">
            <div class="support-icon icon-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="support-title">Dúvidas sobre Privacidade? / Privacy Questions?</h3>
              <p class="support-desc">
                Entre em contato com nossa equipe técnica: 
                <a href="mailto:vyliamsystems@gmail.com" class="support-link">vyliamsystems@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <!-- 2. TERMS OF SERVICE TAB -->
        <div v-else key="terms" class="legal-content">
          <!-- Header -->
          <div class="legal-header">
            <div class="legal-badge badge-terms">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>{{ $t('terms.badge') }}</span>
            </div>
            <h1 class="legal-title">{{ $t('terms.title') }}</h1>
            <p class="legal-date">{{ $t('terms.lastUpdated') }}</p>
          </div>

          <!-- Intro Card -->
          <div class="legal-intro-card border-orange">
            <p class="intro-p">{{ $t('terms.intro') }}</p>
          </div>

          <!-- Clauses -->
          <div class="legal-sections">
            <article 
              v-for="(section, idx) in $tm('terms.sections')" 
              :key="idx" 
              class="legal-clause"
            >
              <h2 class="clause-title">{{ $rt(section.title) }}</h2>
              <p class="clause-content">{{ $rt(section.content) }}</p>
            </article>
          </div>

          <!-- Support Box -->
          <div class="legal-support-card">
            <div class="support-icon icon-orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div>
              <h3 class="support-title">Dúvidas Contratuais ou Licenciamento?</h3>
              <p class="support-desc">
                Para suporte legal e acordos comerciais customizados: 
                <a href="mailto:vyliamsystems@gmail.com" class="support-link link-orange">vyliamsystems@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { tm, rt } = useI18n()

// Initialize based on URL path (/terms or /privacy)
const activeTab = ref(route.path.includes('terms') ? 'terms' : 'privacy')

// Switch tab in-place with animation, syncing URL without reloading
function switchTab(tab) {
  if (activeTab.value === tab) return
  activeTab.value = tab
  const newPath = '/' + tab
  if (route.path !== newPath) {
    window.history.replaceState(null, '', newPath)
  }
}

// Watch route changes if user clicks footer links while on the page
watch(() => route.path, (newPath) => {
  if (newPath.includes('terms')) {
    activeTab.value = 'terms'
  } else if (newPath.includes('privacy')) {
    activeTab.value = 'privacy'
  }
})

onMounted(() => {
  if (route.path.includes('terms')) {
    activeTab.value = 'terms'
  }
})
</script>

<style scoped>
.legal-view {
  padding: 3.5rem 0 6rem;
  background-color: var(--bg-main);
  min-height: 80vh;
}

/* Switch Button Container */
.switch-container {
  display: flex;
  margin-bottom: 2.5rem;
}

.switch-control {
  display: inline-flex;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-full);
  padding: 0.3rem;
  gap: 0.35rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
}

.switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  transition: all var(--transition-base);
  user-select: none;
}

.switch-btn:hover {
  color: #0f172a;
}

.switch-btn.btn-active.privacy-active {
  background: var(--primary);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 12px var(--primary-glow);
}

.switch-btn.btn-active.terms-active {
  background: var(--secondary);
  color: #ffffff;
  font-weight: 600;
  box-shadow: var(--shadow-orange);
}

/* Content Transitions */
.legal-fade-enter-active,
.legal-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.legal-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.legal-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Header */
.legal-header {
  margin-bottom: 2rem;
}

.legal-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.badge-privacy {
  background: #eef5fe;
  color: #0153c6;
  border: 1px solid rgba(1, 83, 198, 0.25);
}

.badge-terms {
  background: #fff6eb;
  color: #ea580c;
  border: 1px solid rgba(255, 134, 0, 0.3);
}

.legal-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

.legal-date {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

/* Intro Card */
.legal-intro-card {
  padding: 1.75rem 2rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  margin-bottom: 2rem;
}

.border-blue {
  border-left: 4px solid var(--primary);
}

.border-orange {
  border-left: 4px solid var(--secondary);
}

.intro-p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #1e293b;
  margin: 0;
  font-weight: 450;
}

/* Clauses List */
.legal-sections {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.legal-clause {
  padding: 1.75rem 2rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
  transition: all var(--transition-base);
}

.legal-clause:hover {
  border-color: #cbd5e1;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  transform: translateY(-2px);
}

.clause-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.clause-content {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #475569;
  margin: 0;
}

/* Support Card */
.legal-support-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
}

.support-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-blue {
  background: #eef5fe;
  color: #0153c6;
}

.icon-orange {
  background: #fff6eb;
  color: #ff8600;
}

.support-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.2rem;
}

.support-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.support-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.support-link:hover {
  color: var(--primary-hover);
}

.link-orange {
  color: var(--secondary);
}

.link-orange:hover {
  color: var(--secondary-hover);
}

@media (max-width: 640px) {
  .legal-view {
    padding: 2rem 0 3.5rem;
  }

  .legal-title {
    font-size: clamp(1.65rem, 6vw, 2.3rem);
  }

  .switch-container {
    width: 100%;
  }

  .switch-control {
    width: 100%;
  }

  .switch-btn {
    flex: 1;
    justify-content: center;
    padding: 0.5rem 0.5rem;
    font-size: 0.8rem;
    gap: 0.35rem;
  }

  .legal-intro-card,
  .legal-clause,
  .legal-support-card {
    padding: 1.25rem 1rem;
  }

  .intro-p,
  .clause-content {
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .legal-support-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }
}
</style>
