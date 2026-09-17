<template>
  <div class="lang-switcher" ref="dropdownRef">
    <button 
      class="lang-btn" 
      @click="toggleDropdown" 
      :aria-expanded="isOpen"
      aria-label="Switch Language"
      type="button"
    >
      <span class="lang-flag">{{ currentLocaleData.flag }}</span>
      <span class="lang-code">{{ currentLocaleData.code }}</span>
      <svg class="chevron-icon" :class="{ 'rotate': isOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <transition name="dropdown-fade">
      <div v-if="isOpen" class="lang-menu">
        <button
          v-for="item in availableLocales"
          :key="item.id"
          class="lang-option"
          :class="{ 'active': locale === item.id }"
          @click="selectLocale(item.id)"
          type="button"
        >
          <span class="option-flag">{{ item.flag }}</span>
          <span class="option-name">{{ item.name }}</span>
          <span class="option-code">{{ item.code }}</span>
          <svg v-if="locale === item.id" class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref(null)

const availableLocales = [
  { id: 'en', code: 'EN', name: 'English', flag: '🇺🇸' },
  { id: 'pt-br', code: 'PT-BR', name: 'Português', flag: '🇧🇷' },
  { id: 'es', code: 'ES', name: 'Español', flag: '🇪🇸' }
]

const currentLocaleData = computed(() => {
  return availableLocales.find(item => item.id === locale.value) || availableLocales[0]
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectLocale(newLocale) {
  locale.value = newLocale
  localStorage.setItem('vyliam_locale', newLocale)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-block;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.lang-btn:hover {
  border-color: var(--primary);
  background: var(--primary-subtle);
  color: var(--primary);
}

.lang-flag {
  font-size: 1.05rem;
  line-height: 1;
}

.lang-code {
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.chevron-icon {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 170px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 0.35rem;
  z-index: 50;
  backdrop-filter: blur(12px);
}

.lang-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-main);
  transition: all var(--transition-fast);
  text-align: left;
}

.lang-option:hover {
  background: var(--primary-subtle);
  color: var(--primary);
}

.lang-option.active {
  background: #f1f7ff;
  color: var(--primary);
  font-weight: 600;
}

.option-flag {
  font-size: 1.1rem;
}

.option-name {
  flex: 1;
}

.option-code {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

.check-icon {
  color: var(--primary);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 480px) {
  .lang-btn {
    padding: 0.35rem 0.55rem;
    gap: 0.3rem;
    font-size: 0.75rem;
  }
}
</style>
