<template>
  <div 
    class="product-card card" 
    :style="{ '--card-accent': product.accentColor || 'var(--primary)' }"
  >
    <!-- Top Header Banner with Ambient Mesh & Badges -->
    <div class="card-header-banner">
      <div class="banner-mesh"></div>
      <div class="banner-glow"></div>
      
      <!-- Top Badges Floating -->
      <div class="header-badges">
        <!-- Platform Badge -->
        <span v-if="product.platform === 'windows'" class="badge badge-platform badge-windows">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
          </svg>
          {{ $t('products.badges.windows') }}
        </span>
        <span v-else-if="product.platform === 'android'" class="badge badge-platform badge-android">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.856 8.136 12 8.136c-1.856 0-3.5902.275-5.1368.8137L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.152 5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
          </svg>
          {{ $t('products.badges.android') }}
        </span>
        <span v-else-if="product.platform === 'both'" class="badge badge-platform badge-both">
          {{ $t('products.badges.both') }}
        </span>
        
        <!-- Web Badge -->
        <span v-if="product.type === 'web'" class="badge badge-platform badge-web">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          {{ $t('products.badges.web') }}
        </span>

        <!-- Version Badge -->
        <span class="badge badge-version">
          {{ product.version }}
        </span>
      </div>
    </div>

    <!-- Product Branding Row (Logo + Identity) -->
    <div class="card-brand-row">
      <div class="logo-slot">
        <ProductLogo 
          :productId="product.id"
          :logoUrl="product.logo"
          :name="product.name"
          :accentColor="product.accentColor"
          size="md"
        />
      </div>

      <div class="brand-meta-tags">
        <span class="category-pill">{{ product.category }}</span>
        <span class="specs-pill">
          {{ product.fileSize }}
        </span>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <h3 class="product-name">
        <router-link :to="`/products/${product.id}`" class="name-link">
          <span>{{ product.name }}</span>
          <svg class="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </router-link>
      </h3>

      <p class="product-tagline">
        {{ getLocalizedTagline() }}
      </p>

      <!-- Key Capabilities Snippet -->
      <div class="features-snippet">
        <div 
          v-for="(feat, idx) in (product.features?.en || []).slice(0, 2)" 
          :key="idx" 
          class="feature-bullet"
        >
          <div class="check-icon-wrap">
            <svg class="bullet-check" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="feature-text">{{ feat }}</span>
        </div>
      </div>
    </div>

    <!-- Card Footer Actions (Overflow-Proof Flexbox) -->
    <div class="card-actions">
      <!-- Download Button for Local Windows / Android Apps -->
      <button 
        v-if="product.type === 'download'" 
        class="btn action-btn-main"
        :class="{ 'btn-android': product.platform === 'android', 'btn-win': product.platform === 'windows' || product.platform === 'both' }"
        @click="handleDownload(product)"
        type="button"
        :title="isDownloading ? $t('products.actions.downloading') : downloadButtonLabel"
      >
        <svg v-if="!isDownloading" class="btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <svg v-else class="spin-icon btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span class="btn-text">
          {{ isDownloading ? $t('products.actions.downloading') : downloadButtonLabel }}
        </span>
      </button>

      <!-- Web App Launch Button -->
      <a 
        v-else 
        :href="product.webUrl" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn action-btn-main btn-web"
        :title="$t('products.actions.launchWebApp')"
      >
        <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        <span class="btn-text">{{ $t('products.actions.launchWebApp') }}</span>
      </a>

      <!-- Details Route Link -->
      <router-link 
        :to="`/products/${product.id}`" 
        class="btn action-btn-secondary" 
        :aria-label="`${$t('products.actions.viewDetails')} - ${product.name}`"
        :title="$t('products.actions.viewDetails')"
      >
        <span class="btn-text">{{ $t('products.actions.viewDetails') }}</span>
        <svg class="btn-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </router-link>
    </div>

    <!-- Download Notification Toast -->
    <transition name="toast-fade">
      <div v-if="downloadNotice" class="download-toast">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{{ $t('products.actions.downloadSuccess') }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductLogo from './ProductLogo.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { t, locale } = useI18n()
const isDownloading = ref(false)
const downloadNotice = ref(false)

const downloadButtonLabel = computed(() => {
  if (props.product.platform === 'android') {
    return t('products.actions.downloadApk')
  }
  return t('products.actions.downloadInstaller')
})

function getLocalizedTagline() {
  if (props.product.tagline && typeof props.product.tagline === 'object') {
    return props.product.tagline[locale.value] || props.product.tagline.en || ''
  }
  return props.product.tagline || ''
}

function handleDownload(item) {
  isDownloading.value = true
  
  setTimeout(() => {
    isDownloading.value = false
    downloadNotice.value = true
    
    // Simulate real file download link trigger
    const link = document.createElement('a')
    link.href = item.downloadUrl || '#'
    link.setAttribute('download', `${item.id}-setup`)
    link.target = '_blank'
    
    setTimeout(() => {
      downloadNotice.value = false
    }, 3500)
  }, 700)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  box-sizing: border-box;
  width: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(1, 83, 198, 0.28);
  box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.08), 0 6px 12px -3px rgba(1, 83, 198, 0.06);
}

/* Header Banner */
.card-header-banner {
  position: relative;
  width: 100%;
  height: 78px;
  background: linear-gradient(135deg, #090d16 0%, #111827 60%, #1e293b 100%);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.85rem 1rem;
  box-sizing: border-box;
}

.banner-mesh {
  position: absolute;
  inset: 0;
  background-size: 16px 16px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  opacity: 0.7;
}

.banner-glow {
  position: absolute;
  top: -20px;
  left: 20px;
  width: 120px;
  height: 90px;
  background: radial-gradient(circle, var(--card-accent, #0153c6) 0%, transparent 70%);
  opacity: 0.35;
  filter: blur(24px);
  pointer-events: none;
  transition: opacity var(--transition-base);
}

.product-card:hover .banner-glow {
  opacity: 0.6;
}

/* Floating Badges */
.header-badges {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.badge-platform {
  font-size: 0.7rem;
  padding: 0.2rem 0.55rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  backdrop-filter: blur(6px);
}

.badge-windows {
  background: rgba(1, 83, 198, 0.25);
  color: #7dd3fc;
  border: 1px solid rgba(56, 189, 248, 0.35);
}

.badge-android {
  background: rgba(5, 150, 105, 0.25);
  color: #6ee7b7;
  border: 1px solid rgba(52, 211, 153, 0.35);
}

.badge-both {
  background: rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.badge-web {
  background: rgba(99, 102, 241, 0.25);
  color: #a5b4fc;
  border: 1px solid rgba(165, 180, 252, 0.35);
}

.badge-version {
  background: rgba(0, 0, 0, 0.35);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: monospace;
  font-size: 0.68rem;
  padding: 0.2rem 0.5rem;
}

/* Brand Row with Inset Logo */
.card-brand-row {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 1.25rem;
  margin-top: -26px;
  z-index: 3;
}

.logo-slot {
  display: inline-flex;
  padding: 4px;
  background: var(--bg-card);
  border-radius: 18px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.brand-meta-tags {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 4px;
}

.category-pill {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
}

.specs-pill {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
}

/* Card Body */
.card-body {
  padding: 0.85rem 1.25rem 1.15rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.45rem;
}

.name-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-main);
  transition: color var(--transition-fast);
}

.name-link:hover {
  color: var(--card-accent, var(--primary));
}

.arrow-icon {
  opacity: 0;
  transform: translate(-3px, 3px);
  transition: all var(--transition-fast);
  color: var(--card-accent, var(--primary));
  flex-shrink: 0;
}

.product-card:hover .arrow-icon {
  opacity: 1;
  transform: translate(0, 0);
}

.product-tagline {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.52;
  margin-bottom: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Features */
.features-snippet {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.feature-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.785rem;
  color: var(--text-main);
  line-height: 1.4;
}

.check-icon-wrap {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--card-accent, var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-text {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Actions (Footer) - Solves Overflow Definitively */
.card-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.25rem 1rem;
  background: #fbfcfe;
  border-top: 1px solid var(--border-subtle);
  box-sizing: border-box;
  width: 100%;
}

.action-btn-main {
  flex: 1 1 0%;
  min-width: 0;
  padding: 0.55rem 0.85rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(1, 83, 198, 0.18);
  transition: all var(--transition-base);
  box-sizing: border-box;
}

.btn-win {
  background: var(--primary);
}

.btn-win:hover {
  background: var(--primary-hover);
  box-shadow: 0 4px 14px var(--primary-glow);
  transform: translateY(-1px);
}

.btn-android {
  background: #059669;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
}

.btn-android:hover {
  background: #047857;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
  transform: translateY(-1px);
}

.btn-web {
  background: #4f46e5;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
}

.btn-web:hover {
  background: #4338ca;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  transform: translateY(-1px);
}

.btn-icon {
  flex-shrink: 0;
}

.btn-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-btn-secondary {
  flex: 0 0 auto;
  min-width: 0;
  padding: 0.55rem 0.8rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--border-subtle);
  background: #ffffff;
  color: var(--text-main);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all var(--transition-base);
  box-sizing: border-box;
}

.action-btn-secondary:hover {
  border-color: var(--card-accent, var(--primary));
  color: var(--card-accent, var(--primary));
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn-chevron {
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.action-btn-secondary:hover .btn-chevron {
  transform: translateX(2px);
}

/* Toast Notification */
.download-toast {
  position: absolute;
  bottom: 66px;
  left: 1rem;
  right: 1rem;
  background: #ffffff;
  color: #065f46;
  border: 1px solid #a7f3d0;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-md);
  font-size: 0.78rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 400px) {
  .card-actions {
    padding: 0.75rem 1rem;
    gap: 0.4rem;
  }

  .action-btn-main,
  .action-btn-secondary {
    padding: 0.5rem 0.65rem;
    font-size: 0.78rem;
  }
}
</style>
