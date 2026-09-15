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
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.versionLabel') }}</span>
            <span class="meta-value">{{ product.version }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.releaseDateLabel') }}</span>
            <span class="meta-value">{{ product.releaseDate }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.fileSizeLabel') }}</span>
            <span class="meta-value">{{ product.fileSize }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.platformLabel') }}</span>
            <span class="meta-value uppercase">{{ product.platform }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">{{ $t('productDetail.categoryLabel') }}</span>
            <span class="meta-value uppercase">{{ product.category }}</span>
          </div>
        </div>
      </div>

      <!-- Screenshot Gallery -->
      <section v-if="product.screenshots?.length" class="detail-section gallery-section">
        <h2 class="section-title-sm">Interface & Workflow Preview</h2>
        <div class="gallery-grid">
          <div 
            v-for="(shot, index) in product.screenshots" 
            :key="index" 
            class="gallery-item card"
          >
            <img :src="shot.url" :alt="shot.title" class="gallery-img" />
            <div class="gallery-caption">{{ shot.title }}</div>
          </div>
        </div>
      </section>

      <!-- Grid Content: Description + Features + System Requirements -->
      <div class="detail-two-col">
        <!-- Left Col: Description & Features -->
        <div class="content-left">
          <section class="detail-section">
            <h2 class="section-title-sm">Overview</h2>
            <p class="description-text">{{ localizedDescription }}</p>
          </section>

          <section class="detail-section">
            <h2 class="section-title-sm">{{ $t('productDetail.keyFeatures') }}</h2>
            <ul class="features-list">
              <li 
                v-for="(feature, idx) in (product.features?.en || [])" 
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
                    <span class="timeline-date">{{ log.date }}</span>
                  </div>
                  <p class="timeline-notes">{{ log.notes }}</p>
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
                v-for="(req, idx) in product.requirements" 
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
  </div>

  <!-- Fallback Not Found -->
  <div v-else class="container not-found-container">
    <h2>Product Not Found</h2>
    <router-link to="/products" class="btn btn-primary mt-4">Return to Products</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProductById } from '../data/products.js'

const route = useRoute()
const { locale } = useI18n()

const product = computed(() => getProductById(route.params.id))

const isDownloading = ref(false)
const downloadNotice = ref(false)

const localizedTagline = computed(() => {
  if (!product.value) return ''
  if (typeof product.value.tagline === 'object') {
    return product.value.tagline[locale.value] || product.value.tagline.en || ''
  }
  return product.value.tagline || ''
})

const localizedDescription = computed(() => {
  if (!product.value) return ''
  if (typeof product.value.description === 'object') {
    return product.value.description[locale.value] || product.value.description.en || ''
  }
  return product.value.description || ''
})

function triggerDownload() {
  if (!product.value) return
  isDownloading.value = true
  
  setTimeout(() => {
    isDownloading.value = false
    downloadNotice.value = true

    const link = document.createElement('a')
    link.href = product.value.downloadUrl || '#'
    link.setAttribute('download', `${product.value.id}-installer`)
    link.target = '_blank'
    
    setTimeout(() => {
      downloadNotice.value = false
    }, 4000)
  }, 800)
}
</script>

<style scoped>
.detail-view {
  padding: 3rem 0 6rem;
}

.breadcrumb-nav {
  display: flex;
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

.platform-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.product-title {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.85rem;
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
}

.gallery-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.03);
}

.gallery-caption {
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
  background: var(--bg-card);
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
</style>
