<template>
  <div class="home-view">
    <!-- Ambient Glow Backgrounds -->
    <div class="glow-ambient glow-blue" style="top: -150px; left: -100px;"></div>
    <div class="glow-ambient glow-orange" style="top: 250px; right: -150px;"></div>

    <!-- 1. Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <!-- Hero Content -->
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>{{ $t('hero.badge') }}</span>
          </div>

          <h1 class="hero-title">
            <span>{{ $t('hero.titleLine1') }}</span>
            <span class="text-gradient"> {{ $t('hero.titleLine2') }}</span>
          </h1>

          <p class="hero-description">
            {{ $t('hero.description') }}
          </p>

          <div class="hero-actions">
            <router-link to="/products" class="btn btn-primary btn-lg">
              <span>{{ $t('hero.primaryAction') }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>

            <router-link to="/about" class="btn btn-outline btn-lg">
              <span>{{ $t('hero.secondaryAction') }}</span>
            </router-link>
          </div>

          <!-- Hero Metrics Bar -->
          <div class="hero-metrics">
            <div class="metric-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0153c6" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>{{ $t('hero.metrics.downloads') }}</span>
            </div>
            <div class="metric-sep"></div>
            <div class="metric-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8600" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>{{ $t('hero.metrics.uptime') }}</span>
            </div>
            <div class="metric-sep"></div>
            <div class="metric-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>{{ $t('hero.metrics.platforms') }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Visual Mockup Preview -->
        <div class="hero-visual">
          <div class="mockup-frame">
            <div class="mockup-header">
              <div class="window-controls">
                <span class="ctrl ctrl-close"></span>
                <span class="ctrl ctrl-min"></span>
                <span class="ctrl ctrl-max"></span>
              </div>
              <div class="mockup-address-bar">vyliam-sentinel://system/kernel-telemetry</div>
            </div>
            <div class="mockup-body">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                alt="Vyliam Sentinel Preview" 
                class="mockup-img"
              />
              <div class="mockup-floating-tag">
                <span class="pulse-indicator"></span>
                <span>Active Kernel Daemon: 0.02% CPU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Featured Showcase -->
    <section class="section-featured">
      <div class="container">
        <div class="section-header-row">
          <div>
            <h2 class="section-title">{{ $t('home.featuredTitle') }}</h2>
            <p class="section-subtitle">{{ $t('home.featuredSubtitle') }}</p>
          </div>
          <router-link to="/products" class="btn btn-outline btn-sm view-all-btn">
            <span>{{ $t('home.viewAllProducts') }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in featuredList" 
            :key="product.id" 
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- 3. Why Vyliam / Core Pillars -->
    <section class="section-pillars">
      <div class="container">
        <div class="pillars-header text-center">
          <h2 class="section-title">{{ $t('home.whyVyliam.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.whyVyliam.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <!-- Pillar 1 -->
          <div class="pillar-card card">
            <div class="pillar-icon-box bg-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0153c6" stroke-width="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 class="pillar-title">{{ $t('home.whyVyliam.card1.title') }}</h3>
            <p class="pillar-desc">{{ $t('home.whyVyliam.card1.desc') }}</p>
          </div>

          <!-- Pillar 2 -->
          <div class="pillar-card card">
            <div class="pillar-icon-box bg-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8600" stroke-width="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 class="pillar-title">{{ $t('home.whyVyliam.card2.title') }}</h3>
            <p class="pillar-desc">{{ $t('home.whyVyliam.card2.desc') }}</p>
          </div>

          <!-- Pillar 3 -->
          <div class="pillar-card card">
            <div class="pillar-icon-box bg-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 class="pillar-title">{{ $t('home.whyVyliam.card3.title') }}</h3>
            <p class="pillar-desc">{{ $t('home.whyVyliam.card3.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Pre-Footer Call to Action -->
    <section class="section-cta">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          </div>
          <div class="cta-btn-wrapper">
            <router-link to="/products" class="btn btn-secondary btn-lg">
              <span>{{ $t('home.cta.button') }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFeaturedProducts } from '../data/products.js'
import ProductCard from '../components/ProductCard.vue'

const featuredList = computed(() => getFeaturedProducts())
</script>

<style scoped>
.home-view {
  position: relative;
  overflow: hidden;
}

/* 1. Hero Section */
.hero-section {
  padding: 5rem 0 4.5rem;
  position: relative;
  z-index: 1;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3.5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  background: var(--primary-subtle);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(1, 83, 198, 0.15);
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--secondary);
  box-shadow: 0 0 6px var(--secondary);
}

.hero-title {
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 2.2rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.hero-metrics {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border-subtle);
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-main);
}

.metric-sep {
  width: 1px;
  height: 14px;
  background: var(--border-subtle);
}

/* Mockup Frame */
.mockup-frame {
  background: #0f172a;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(1, 83, 198, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
  transition: transform var(--transition-smooth);
}

.mockup-frame:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px);
}

.mockup-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.window-controls {
  display: flex;
  gap: 6px;
}

.ctrl {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.ctrl-close { background: #ef4444; }
.ctrl-min { background: #f59e0b; }
.ctrl-max { background: #10b981; }

.mockup-address-bar {
  flex: 1;
  background: #0f172a;
  color: #94a3b8;
  font-family: monospace;
  font-size: 0.72rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  text-align: center;
}

.mockup-body {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.mockup-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mockup-floating-tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-family: monospace;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

/* 2. Featured Section */
.section-featured {
  padding: 5rem 0;
  background: var(--bg-subtle);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
}

.gap-6 {
  gap: 1.5rem;
}

/* 3. Pillars Section */
.section-pillars {
  padding: 5.5rem 0;
}

.pillars-header {
  max-width: 680px;
  margin: 0 auto 3.5rem;
  text-align: center;
}

.pillar-card {
  padding: 2rem 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pillar-icon-box {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.bg-blue { background: #eef5fe; }
.bg-orange { background: #fff6eb; }
.bg-green { background: #e8f9ef; }

.pillar-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.pillar-desc {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 4. Pre-Footer CTA */
.section-cta {
  padding: 2rem 0 5.5rem;
}

.cta-banner {
  background: linear-gradient(135deg, #0153c6 0%, #003a8c 100%);
  border-radius: var(--radius-xl);
  padding: 3.5rem 3rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0 20px 40px -10px rgba(1, 83, 198, 0.4);
}

.cta-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.cta-subtitle {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 580px;
}

@media (max-width: 960px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-metrics {
    justify-content: center;
  }

  .cta-banner {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 1.5rem;
  }

  .section-header-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
