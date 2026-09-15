<template>
  <div class="products-view">
    <div class="container products-container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span>CATALOG</span>
        </div>
        <h1 class="page-title">{{ $t('products.title') }}</h1>
        <p class="page-subtitle">{{ $t('products.subtitle') }}</p>
      </div>

      <!-- Filter and Search Bar -->
      <ProductFilter 
        v-model:currentFilter="selectedPlatform"
        v-model:searchQuery="searchQuery"
        :counts="platformCounts"
      />

      <!-- Results Stats Row -->
      <div class="results-meta-row">
        <span class="results-count">
          {{ $t('products.count', { count: filteredProducts.length }) }}
        </span>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-3 gap-6">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state card">
        <div class="empty-icon-box">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-title">{{ $t('products.noResults') }}</h3>
        <p class="empty-desc">Try clearing your search query or selecting another platform filter.</p>
        <button class="btn btn-outline btn-sm" @click="resetFilters">
          {{ $t('products.clearFilters') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.vue'
import ProductFilter from '../components/ProductFilter.vue'

const route = useRoute()
const router = useRouter()

const selectedPlatform = ref(route.query.platform || 'all')
const searchQuery = ref('')

// Synchronize with URL query parameter
watch(() => route.query.platform, (newVal) => {
  if (newVal) {
    selectedPlatform.value = newVal
  } else {
    selectedPlatform.value = 'all'
  }
})

watch(selectedPlatform, (newPlatform) => {
  if (newPlatform === 'all') {
    router.replace({ query: {} })
  } else {
    router.replace({ query: { platform: newPlatform } })
  }
})

// Counts for filter pills
const platformCounts = computed(() => {
  return {
    all: products.length,
    windows: products.filter(p => p.platform === 'windows' || p.platform === 'both').length,
    android: products.filter(p => p.platform === 'android' || p.platform === 'both').length,
    web: products.filter(p => p.type === 'web').length
  }
})

// Filtered and Searched list
const filteredProducts = computed(() => {
  return products.filter(product => {
    // 1. Platform match
    let matchesPlatform = true
    if (selectedPlatform.value === 'windows') {
      matchesPlatform = product.platform === 'windows' || product.platform === 'both'
    } else if (selectedPlatform.value === 'android') {
      matchesPlatform = product.platform === 'android' || product.platform === 'both'
    } else if (selectedPlatform.value === 'web') {
      matchesPlatform = product.type === 'web'
    }

    // 2. Search match
    const query = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      (product.tagline?.en || '').toLowerCase().includes(query) ||
      (product.description?.en || '').toLowerCase().includes(query) ||
      product.platform.toLowerCase().includes(query)

    return matchesPlatform && matchesSearch
  })
})

function resetFilters() {
  selectedPlatform.value = 'all'
  searchQuery.value = ''
}
</script>

<style scoped>
.products-view {
  padding: 3.5rem 0 6rem;
  min-height: 80vh;
}

.page-header {
  margin-bottom: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  background: var(--primary-subtle);
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.page-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 600px;
}

.results-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
}

.gap-6 {
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-icon-box {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.empty-desc {
  color: var(--text-muted);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}
</style>
