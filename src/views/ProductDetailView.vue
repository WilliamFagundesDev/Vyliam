<template>
  <div v-if="product" class="detail-view">
    <div class="container detail-container">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb-nav">
        <router-link to="/products" class="breadcrumb-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>{{ $t('productDetail.backToCatalog') }}</span>
        </router-link>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">{{ product.name }}</span>
      </nav>

      <!-- Main Header Hero -->
      <div class="product-header-hero">
        <div class="header-main-info">
          <div class="hero-brand-header">
            <div class="hero-logo-box">
              <ProductLogo 
                :productId="product.id"
                :logoUrl="product.logo"
                :name="product.name"
                :accentColor="product.accentColor"
                size="lg"
              />
            </div>
            
            <div class="hero-header-text">
              <div class="platform-badge-row">
                <span v-if="product.platform === 'windows'" class="badge badge-windows">
                  Windows Application
                </span>
                <span v-else-if="product.platform === 'android'" class="badge badge-android">
                  Android App
                </span>
                <span v-else-if="product.platform === 'both'" class="badge badge-both">
                  Windows & Android
                </span>
                <span v-if="product.type === 'web'" class="badge badge-web">
                  Cloud Web App
                </span>
                <span class="badge badge-version">{{ product.version }}</span>
              </div>

              <h1 class="product-title">{{ product.name }}</h1>
            </div>
          </div>

          <p class="product-tagline-lg">{{ localizedTagline }}</p>

          <!-- Action CTA Group -->
          <div class="header-cta-group">
            <!-- If Downloadable -->
            <button 
              v-if="product.type === 'download'"
              class="btn btn-primary btn-lg download-main-btn"
              :class="{ 'btn-secondary': product.platform === 'android' }"
              @click="triggerDownload"
              type="button"
            >
              <svg v-if="!isDownloading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <svg v-else class="spin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
              </svg>
              <span>
                {{ isDownloading ? $t('products.actions.downloading') : (product.platform === 'android' ? $t('products.actions.downloadApk') : $t('products.actions.downloadInstaller')) }}
              </span>
            </button>

            <!-- If Web App -->
            <a 
              v-else 
              :href="product.webUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary btn-lg"
            >
              <span>{{ $t('productDetail.accessWebVersion') }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>

            <!-- Download notice feedback -->
            <transition name="toast-fade">
              <div v-if="downloadNotice" class="feedback-alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ $t('products.actions.downloadSuccess') }}</span>
              </div>
            </transition>
          </div>

          <p v-if="product.downloadFormats?.length" class="format-note">
            {{ $t('products.fileFormats', { formats: product.downloadFormats.join(', ') }) }} &bull; {{ product.fileSize }}
          </p>
        </div>

        <!-- Quick Meta Specs Box -->
        <div class="quick-meta-box card">
          <div class="meta-brand-summary">
            <ProductLogo 
              :productId="product.id" 
              :logoUrl="product.logo" 
              :name="product.name" 
              :accentColor="product.accentColor" 
              size="sm"
              :glow="false"
            />
            <div class="meta-brand-info">
              <span class="meta-brand-title">{{ product.name }}</span>
              <span class="meta-brand-version">{{ product.version }} &bull; {{ product.fileSize }}</span>
            </div>
          </div>

          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.versionLabel') }}</span>
            <span class="meta-value">{{ product.version }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.releaseDateLabel') }}</span>
            <span class="meta-value">{{ getLocalizedText(product.releaseDate) }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.fileSizeLabel') }}</span>
            <span class="meta-value">{{ product.fileSize }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.platformLabel') }}</span>
            <span class="meta-value uppercase">{{ localizedPlatform }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.categoryLabel') }}</span>
            <span class="meta-value uppercase">{{ localizedCategory }}</span>
          </div>
        </div>
      </div>

      <!-- Screenshot Gallery -->
      <section v-if="product.screenshots?.length" class="detail-section gallery-section">
        <div class="gallery-header">
          <h2 class="section-title-sm">{{ $t('productDetail.galleryTitle') }}</h2>
          <span class="gallery-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            {{ $t('productDetail.galleryHint') }}
          </span>
        </div>
        <div class="gallery-grid">
          <div 
            v-for="(shot, index) in product.screenshots" 
            :key="index" 
            class="gallery-item card"
            role="button"
            tabindex="0"
            :title="$t('productDetail.galleryHint')"
            @click="openLightbox(index)"
            @keydown.enter.prevent="openLightbox(index)"
            @keydown.space.prevent="openLightbox(index)"
          >
            <div class="gallery-img-wrap">
              <img :src="shot.url" :alt="getLocalizedText(shot.title)" class="gallery-img" />
              <div class="gallery-hover-overlay">
                <div class="zoom-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>{{ $t('productDetail.galleryHint') }}</span>
                </div>
              </div>
            </div>
            <div class="gallery-caption">
              <span>{{ getLocalizedText(shot.title) }}</span>
              <svg class="caption-expand-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- Grid Content: Description + Features + System Requirements -->
      <div class="detail-two-col">
        <!-- Left Col: Description & Features -->
        <div class="content-left">
          <section class="detail-section">
            <h2 class="section-title-sm">{{ $t('productDetail.overview') }}</h2>
            <p class="description-text">{{ localizedDescription }}</p>
          </section>

          <section class="detail-section">
            <h2 class="section-title-sm">{{ $t('productDetail.keyFeatures') }}</h2>
            <ul class="features-list">
              <li 
                v-for="(feature, idx) in localizedFeatures" 
                :key="idx" 
                class="feature-li"
              >
                <div class="check-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </section>

          <!-- Changelog -->
          <section class="detail-section">
            <h2 class="section-title-sm">{{ $t('productDetail.changelog') }}</h2>
            <div class="changelog-timeline">
              <div 
                v-for="(log, idx) in product.changelog" 
                :key="idx" 
                class="timeline-item"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="timeline-meta">
                    <span class="timeline-ver">{{ log.version }}</span>
                    <span class="timeline-date">{{ getLocalizedText(log.date) }}</span>
                  </div>
                  <p class="timeline-notes">{{ getLocalizedText(log.notes) }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Col: Requirements Card -->
        <div class="content-right">
          <div class="requirements-card card">
            <div class="req-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
              <h3 class="req-title">{{ $t('productDetail.systemRequirements') }}</h3>
            </div>

            <ul class="req-list">
              <li 
                v-for="(req, idx) in localizedRequirements" 
                :key="idx" 
                class="req-item"
              >
                <span class="req-bullet">&bull;</span>
                <span>{{ req }}</span>
              </li>
            </ul>

            <div class="security-seal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>{{ $t('productDetail.verifiedInstaller') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal for Screenshots -->
    <Teleport to="body">
      <transition name="lightbox-fade">
        <div 
          v-if="lightboxOpen" 
          class="lightbox-overlay" 
          @click.self="closeLightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="activeScreenshotTitle"
        >
          <!-- Top Bar with Counter and Close -->
          <div class="lightbox-header">
            <div class="lightbox-counter" v-if="product.screenshots?.length > 1">
              {{ $t('productDetail.lightbox.counter', { current: activePhotoIndex + 1, total: product.screenshots.length }) }}
            </div>
            <div v-else></div>
            <button 
              type="button" 
              class="lightbox-btn lightbox-close-btn" 
              @click="closeLightbox"
              :aria-label="$t('productDetail.lightbox.close')"
              :title="$t('productDetail.lightbox.close')"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Main Image Container -->
          <div class="lightbox-body" @click.self="closeLightbox">
            <button 
              v-if="product.screenshots?.length > 1"
              type="button" 
              class="lightbox-btn lightbox-nav-btn lightbox-prev-btn" 
              @click.stop="prevPhoto"
              :aria-label="$t('productDetail.lightbox.prev')"
              :title="$t('productDetail.lightbox.prev')"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div class="lightbox-media-container" @click.self="closeLightbox">
              <transition name="lightbox-zoom" mode="out-in">
                <div :key="activePhotoIndex" class="lightbox-figure">
                  <img 
                    :src="activeScreenshot?.url" 
                    :alt="activeScreenshotTitle" 
                    class="lightbox-image" 
                  />
                  <div class="lightbox-caption-bar">
                    <p class="lightbox-caption-text">{{ activeScreenshotTitle }}</p>
                  </div>
                </div>
              </transition>
            </div>

            <button 
              v-if="product.screenshots?.length > 1"
              type="button" 
              class="lightbox-btn lightbox-nav-btn lightbox-next-btn" 
              @click.stop="nextPhoto"
              :aria-label="$t('productDetail.lightbox.next')"
              :title="$t('productDetail.lightbox.next')"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>

  <!-- Fallback Not Found -->
  <div v-else class="container not-found-container">
    <h2>{{ $t('productDetail.notFound') }}</h2>
    <router-link to="/products" class="btn btn-primary mt-4">{{ $t('productDetail.returnToProducts') }}</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProductById } from '../data/products.js'
import ProductLogo from '../components/ProductLogo.vue'

const route = useRoute()
const { t, locale } = useI18n()

const product = computed(() => getProductById(route.params.id))

const isDownloading = ref(false)
const downloadNotice = ref(false)

// Lightbox modal state
const lightboxOpen = ref(false)
const activePhotoIndex = ref(0)

const activeScreenshot = computed(() => {
  if (!product.value?.screenshots?.length) return null
  return product.value.screenshots[activePhotoIndex.value] || null
})

const activeScreenshotTitle = computed(() => {
  if (!activeScreenshot.value) return ''
  return getLocalizedText(activeScreenshot.value.title)
})

function openLightbox(index) {
  activePhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextPhoto() {
  if (!product.value?.screenshots?.length) return
  activePhotoIndex.value = (activePhotoIndex.value + 1) % product.value.screenshots.length
}

function prevPhoto() {
  if (!product.value?.screenshots?.length) return
  activePhotoIndex.value = (activePhotoIndex.value - 1 + product.value.screenshots.length) % product.value.screenshots.length
}

function handleKeyDown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowRight') {
    nextPhoto()
  } else if (e.key === 'ArrowLeft') {
    prevPhoto()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

function getLocalizedText(val) {
  if (!val) return ''
  if (typeof val === 'object' && !Array.isArray(val)) {
    return val[locale.value] || val.en || Object.values(val)[0] || ''
  }
  return val
}

const localizedTagline = computed(() => {
  if (!product.value) return ''
  return getLocalizedText(product.value.tagline)
})

const localizedDescription = computed(() => {
  if (!product.value) return ''
  return getLocalizedText(product.value.description)
})

const localizedFeatures = computed(() => {
  if (!product.value?.features) return []
  if (Array.isArray(product.value.features)) return product.value.features
  return product.value.features[locale.value] || product.value.features.en || []
})

const localizedRequirements = computed(() => {
  if (!product.value?.requirements) return []
  if (Array.isArray(product.value.requirements)) return product.value.requirements
  return product.value.requirements[locale.value] || product.value.requirements.en || []
})

const localizedCategory = computed(() => {
  if (!product.value?.category) return ''
  const catKey = `productDetail.categories.${product.value.category}`
  const translated = t(catKey)
  return translated !== catKey ? translated : product.value.category
})

const localizedPlatform = computed(() => {
  if (!product.value?.platform) return ''
  const platKey = `products.badges.${product.value.platform}`
  const translated = t(platKey)
  return translated !== platKey ? translated : product.value.platform
})

function triggerDownload() {
  if (!product.value?.downloadUrl) return
  isDownloading.value = true

  // Real file download trigger
  const link = document.createElement('a')
  link.href = product.value.downloadUrl
  const fileName = (product.value.downloadUrl || '').split('/').pop() || `${product.value.id}-setup.exe`
  link.setAttribute('download', fileName)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
  }, 200)

  setTimeout(() => {
    isDownloading.value = false
    downloadNotice.value = true
    setTimeout(() => {
      downloadNotice.value = false
    }, 4000)
  }, 600)
}
</script>

<style scoped>
.detail-view {
  padding: 3rem 0 6rem;
}

.breadcrumb-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--primary);
  font-weight: 500;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-sep {
  color: var(--border-subtle);
}

.breadcrumb-current {
  color: var(--text-main);
  font-weight: 600;
}

.product-header-hero {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 4rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.hero-brand-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.hero-logo-box {
  flex-shrink: 0;
  display: inline-flex;
  padding: 6px;
  background: var(--bg-card);
  border-radius: 24px;
  box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-subtle);
}

.hero-header-text {
  flex: 1;
}

.platform-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.product-title {
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0;
}

.meta-brand-summary {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 1rem;
  margin-bottom: 0.35rem;
  border-bottom: 1px solid var(--border-subtle);
}

.meta-brand-info {
  display: flex;
  flex-direction: column;
}

.meta-brand-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-main);
  line-height: 1.2;
}

.meta-brand-version {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.product-tagline-lg {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 620px;
}

.header-cta-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.format-note {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.quick-meta-box {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--border-subtle);
}

.meta-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.meta-label {
  color: var(--text-muted);
}

.meta-value {
  font-weight: 600;
  color: var(--text-main);
}

.uppercase {
  text-transform: uppercase;
}

/* Gallery */
.gallery-section {
  margin-bottom: 3.5rem;
}

.gallery-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.gallery-header .section-title-sm {
  margin-bottom: 0;
}

.gallery-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
}

.section-title-sm {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  overflow: hidden;
  border-radius: var(--radius-lg);
  cursor: pointer;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  outline: none;
  display: flex;
  flex-direction: column;
}

.gallery-item:hover,
.gallery-item:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(1, 83, 198, 0.4);
  box-shadow: 0 12px 28px -4px rgba(15, 23, 42, 0.12);
}

.gallery-img-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0b1120;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.04);
}

.gallery-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 15, 29, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.gallery-item:hover .gallery-hover-overlay,
.gallery-item:focus-visible .gallery-hover-overlay {
  opacity: 1;
}

.zoom-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transform: translateY(4px);
  transition: transform var(--transition-base);
}

.gallery-item:hover .zoom-badge {
  transform: translateY(0);
}

.gallery-caption {
  padding: 0.85rem 1.15rem;
  font-size: 0.875rem;
  color: var(--text-main);
  font-weight: 500;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.caption-expand-icon {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: color var(--transition-base), transform var(--transition-base);
}

.gallery-item:hover .caption-expand-icon {
  color: var(--primary);
  transform: scale(1.15);
}

/* Lightbox Modal */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(7, 11, 22, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  user-select: none;
}

.lightbox-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  pointer-events: none;
}

.lightbox-counter {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  pointer-events: auto;
}

.lightbox-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-base), transform var(--transition-base), border-color var(--transition-base);
  pointer-events: auto;
}

.lightbox-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.35);
  transform: scale(1.08);
}

.lightbox-close-btn {
  width: 44px;
  height: 44px;
}

.lightbox-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
}

.lightbox-nav-btn {
  width: 52px;
  height: 52px;
  z-index: 10;
  flex-shrink: 0;
}

.lightbox-prev-btn {
  margin-right: 1rem;
}

.lightbox-next-btn {
  margin-left: 1rem;
}

.lightbox-media-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 88vw;
  overflow: hidden;
}

.lightbox-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 86vh;
  max-width: 100%;
}

.lightbox-image {
  max-width: 100%;
  max-height: 76vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.lightbox-caption-bar {
  margin-top: 1rem;
  text-align: center;
  max-width: 600px;
}

.lightbox-caption-text {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  margin: 0;
}

/* Lightbox Transitions */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.28s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-zoom-enter-active {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.lightbox-zoom-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.lightbox-zoom-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.lightbox-zoom-leave-to {
  transform: scale(1.03);
  opacity: 0;
}

/* Detail Columns */
.detail-two-col {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 3rem;
}

.detail-section {
  margin-bottom: 3rem;
}

.description-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.feature-li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-main);
}

.check-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary-subtle);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Timeline */
.changelog-timeline {
  display: flex;
  flex-direction: column;
  border-left: 2px solid var(--border-subtle);
  padding-left: 1.25rem;
  margin-left: 0.5rem;
  gap: 1.5rem;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: calc(-1.25rem - 6px);
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px var(--primary-subtle);
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.35rem;
}

.timeline-ver {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-main);
  font-family: monospace;
}

.timeline-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.timeline-notes {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Requirements Card */
.requirements-card {
  padding: 1.75rem;
  position: sticky;
  top: 90px;
}

.req-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}

.req-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.req-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.req-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.req-bullet {
  color: var(--primary);
  font-weight: bold;
}

.security-seal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  border-radius: var(--radius-md);
  background: #e8f9ef;
  color: #065f46;
  font-size: 0.75rem;
  font-weight: 600;
}

.feedback-alert {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-md);
  background: #e8f9ef;
  color: #065f46;
  font-size: 0.8125rem;
  font-weight: 600;
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.not-found-container {
  padding: 6rem 0;
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

@media (max-width: 860px) {
  .product-header-hero,
  .detail-two-col {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .lightbox-header {
    padding: 1rem;
  }
  .lightbox-body {
    padding: 0.75rem;
  }
  .lightbox-nav-btn {
    width: 42px;
    height: 42px;
    position: absolute;
    bottom: 2rem;
  }
  .lightbox-prev-btn {
    left: 1.5rem;
  }
  .lightbox-next-btn {
    right: 1.5rem;
  }
  .lightbox-image {
    max-height: 68vh;
  }
}

@media (max-width: 640px) {
  .detail-view {
    padding: 1.5rem 0 4rem;
  }

  .breadcrumb-nav {
    margin-bottom: 1.5rem;
  }

  .hero-brand-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .platform-badge-row {
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .header-cta-group .btn {
    width: 100%;
  }

  .quick-meta-box {
    padding: 1.25rem;
  }
}
</style>
