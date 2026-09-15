<template>
  <div class="filter-wrapper">
    <!-- Filter Pills -->
    <div class="filter-pills" role="tablist">
      <button
        v-for="tab in filterTabs"
        :key="tab.id"
        class="filter-pill"
        :class="{ 'active': currentFilter === tab.id }"
        @click="setFilter(tab.id)"
        type="button"
        role="tab"
        :aria-selected="currentFilter === tab.id"
      >
        <span class="pill-icon" v-html="tab.icon"></span>
        <span class="pill-label">{{ $t(tab.labelKey) }}</span>
        <span v-if="tab.count !== undefined" class="pill-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Search Input -->
    <div class="search-box">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        :placeholder="$t('products.searchPlaceholder')"
        class="search-input"
        aria-label="Search applications"
      />
      <button 
        v-if="searchQuery" 
        @click="$emit('update:searchQuery', '')" 
        class="clear-search-btn"
        aria-label="Clear search"
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentFilter: {
    type: String,
    default: 'all'
  },
  searchQuery: {
    type: String,
    default: ''
  },
  counts: {
    type: Object,
    default: () => ({ all: 0, windows: 0, android: 0, web: 0 })
  }
})

const emit = defineEmits(['update:currentFilter', 'update:searchQuery'])

const filterTabs = computed(() => [
  {
    id: 'all',
    labelKey: 'products.filters.all',
    count: props.counts.all,
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
  },
  {
    id: 'windows',
    labelKey: 'products.filters.windows',
    count: props.counts.windows,
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>`
  },
  {
    id: 'android',
    labelKey: 'products.filters.android',
    count: props.counts.android,
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.856 8.136 12 8.136c-1.856 0-3.5902.275-5.1368.8137L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.152 5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>`
  },
  {
    id: 'web',
    labelKey: 'products.filters.web',
    count: props.counts.web,
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
  }
])

function setFilter(id) {
  emit('update:currentFilter', id)
}
</script>

<style scoped>
.filter-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-base);
}

.filter-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-subtle);
}

.filter-pill.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
  box-shadow: 0 4px 12px var(--primary-glow);
}

.pill-icon {
  display: inline-flex;
  align-items: center;
}

.pill-count {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
  background: rgba(15, 23, 42, 0.08);
  color: inherit;
}

.filter-pill.active .pill-count {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 280px;
  flex: 0 1 320px;
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.55rem 2.2rem 0.55rem 2.4rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  background: var(--bg-card);
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--text-main);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  color: var(--text-muted);
}

.clear-search-btn:hover {
  color: var(--text-main);
}

@media (max-width: 768px) {
  .search-box {
    min-width: 100%;
    flex: 1 1 100%;
  }
}
</style>
