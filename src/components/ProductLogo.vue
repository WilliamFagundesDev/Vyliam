<template>
  <div 
    class="product-logo-wrapper"
    :class="[`logo-${sizeClass}`, { 'with-glow': glow }]"
    :style="customStyles"
  >
    <div 
      v-if="glow" 
      class="logo-ambient-glow" 
      :style="{ background: glowColor }"
    ></div>
    
    <img 
      :src="computedLogoUrl" 
      :alt="alt || `${productId} logo`"
      class="product-logo-img"
      loading="lazy"
      @error="onImageError"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  productId: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: 'md' // 'xs', 'sm', 'md', 'lg', 'xl' or number in px
  },
  accentColor: {
    type: String,
    default: ''
  },
  glow: {
    type: Boolean,
    default: true
  }
})

const hasError = ref(false)

const computedLogoUrl = computed(() => {
  if (hasError.value) {
    return '/logo.svg' // Fallback to main brand logo
  }
  if (props.logoUrl) {
    return props.logoUrl
  }
  return `/logos/${props.productId}.svg`
})

const sizeClass = computed(() => {
  if (typeof props.size === 'string' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) {
    return props.size
  }
  return 'custom'
})

const customStyles = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`
    }
  }
  return {}
})

const glowColor = computed(() => {
  if (props.accentColor) {
    return props.accentColor
  }
  // Default accent colors map
  const colorMap = {
    'vyliam-sentinel': '#0153c6',
    'aura-flow': '#059669',
    'vyliam-devtunnel': '#ff8600',
    'nexus-cloud-console': '#6366f1',
    'vyliam-cipher-vault': '#0284c7',
    'pulse-focus': '#f43f5e'
  }
  return colorMap[props.productId] || 'var(--primary)'
})

function onImageError() {
  hasError.value = true
}
</script>

<style scoped>
.product-logo-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 18px;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.logo-ambient-glow {
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  filter: blur(14px);
  opacity: 0.45;
  z-index: 0;
  transition: opacity var(--transition-base), filter var(--transition-base);
  pointer-events: none;
}

.product-logo-wrapper:hover .logo-ambient-glow {
  opacity: 0.75;
  filter: blur(18px);
}

.product-logo-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
  z-index: 1;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: transform var(--transition-base);
}

.product-logo-wrapper:hover .product-logo-img {
  transform: scale(1.04);
}

/* Preset Sizes */
.logo-xs {
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.logo-sm {
  width: 38px;
  height: 38px;
  border-radius: 11px;
}

.logo-md {
  width: 52px;
  height: 52px;
  border-radius: 14px;
}

.logo-lg {
  width: 68px;
  height: 68px;
  border-radius: 18px;
}

.logo-xl {
  width: 88px;
  height: 88px;
  border-radius: 22px;
}
</style>
