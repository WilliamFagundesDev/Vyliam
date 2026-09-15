<template>
  <div class="product-card card">
    <!-- Card Header / Thumbnail Area -->
    <div class="card-media">
      <img 
        :src="product.screenshots[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'" 
        :alt="product.name" 
        class="card-img"
        loading="lazy"
      />
      <div class="media-overlay"></div>
      
      <!-- Top Badges Floating -->
      <div class="floating-badges">
        <!-- Platform Badge -->
        <span v-if="product.platform === 'windows'" class="badge badge-windows">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
          </svg>
          {{ $t('products.badges.windows') }}
        </span>
        <span v-else-if="product.platform === 'android'" class="badge badge-android">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.856 8.136 12 8.136c-1.856 0-3.5902.275-5.1368.8137L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.152 5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
          </svg>
          {{ $t('products.badges.android') }}
        </span>
        <span v-else-if="product.platform === 'both'" class="badge badge-both">
          {{ $t('products.badges.both') }}
        </span>
        
        <!-- Web Badge -->
        <span v-if="product.type === 'web'" class="badge badge-web">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    <!-- Card Content -->
    <div class="card-body">
      <div class="card-title-row">
        <h3 class="product-name">
          <router-link :to="`/products/${product.id}`" class="name-link">
            {{ product.name }}
          </router-link>
        </h3>
        <span class="file-size-tag">{{ product.fileSize }}</span>
      </div>

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
          <svg class="bullet-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ feat }}</span>
        </div>
      </div>
    </div>

    <!-- Card Footer / Smart Actions -->
    <div class="card-actions">
      <!-- Download Button for Local Windows / Android Apps -->
      <button 
        v-if="product.type === 'download'" 
        class="btn btn-primary btn-sm action-btn"
        :class="{ 'btn-secondary': product.platform === 'android' }"
        @click="handleDownload(product)"
        type="button"
      >
        <svg v-if="!isDownloading" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <svg v-else class="spin-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>
          {{ isDownloading ? $t('products.actions.downloading') : (product.platform === 'android' ? $t('products.actions.downloadApk') : $t('products.actions.downloadInstaller')) }}
        </span>
      </button>

      <!-- Web App Launch Button -->
      <a 
        v-else 
        :href="product.webUrl" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn btn-primary btn-sm action-btn web-action-btn"
      >
        <span>{{ $t('products.actions.launchWebApp') }}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>

      <!-- Details Route Link -->
      <router-link 
        :to="`/products/${product.id}`" 
        class="btn btn-outline btn-sm details-btn" 
        aria-label="View product details"
      >
        <span>{{ $t('products.actions.viewDetails') }}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        <span>{{ $t('products.actions.downloadSuccess') }} ({{ product.downloadFormats?.join(', ') }})</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { locale } = useI18n()
const isDownloading = ref(false)
const downloadNotice = ref(false)

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
    // If not real local file yet, mock without page reload
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
}

.card-media {
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  background: #0f172a;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-smooth);
}

.product-card:hover .card-img {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.65) 100%);
}

.floating-badges {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  right: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  z-index: 2;
}

.card-body {
  padding: 1.25rem 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main);
}

.name-link:hover {
  color: var(--primary);
}

.file-size-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.product-tagline {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.features-snippet {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border-subtle);
}

.feature-bullet {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  color: var(--text-main);
}

.bullet-check {
  color: var(--primary);
  flex-shrink: 0;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.4rem 1.25rem;
  background: var(--bg-subtle);
  border-top: 1px solid var(--border-subtle);
}

.action-btn {
  flex: 1.2;
}

.details-btn {
  flex: 0.8;
  font-size: 0.8125rem;
}

.download-toast {
  position: absolute;
  bottom: 60px;
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
  box-shadow: var(--shadow-md);
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
</style>
