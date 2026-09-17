<template>
  <div class="about-view">
    <div class="container container-narrow">
      <!-- Section Header -->
      <div class="about-header text-center">
        <div class="about-badge">
          <span>{{ $t('about.badge') }}</span>
        </div>
        <h1 class="about-title">{{ $t('about.title') }}</h1>
        <p class="about-lead">
          {{ $t('about.paragraph1') }}
        </p>
      </div>

      <!-- Narrative Section -->
      <div class="narrative-card card">
        <p class="narrative-p">
          {{ $t('about.paragraph2') }}
        </p>
        <p class="narrative-p">
          By refusing bloated web-wrappers where native executables are required, we deliver software with sub-millisecond execution, minimal memory consumption, and zero telemetry tracking.
        </p>
      </div>

      <!-- Engineering Principles Grid -->
      <div class="principles-section">
        <h2 class="principles-heading">{{ $t('about.vision.title') }}</h2>

        <div class="principles-grid">
          <div class="principle-item card">
            <div class="principle-num">01</div>
            <h3 class="principle-name">{{ $t('about.vision.point1Title') }}</h3>
            <p class="principle-desc">{{ $t('about.vision.point1Desc') }}</p>
          </div>

          <div class="principle-item card">
            <div class="principle-num">02</div>
            <h3 class="principle-name">{{ $t('about.vision.point2Title') }}</h3>
            <p class="principle-desc">{{ $t('about.vision.point2Desc') }}</p>
          </div>

          <div class="principle-item card">
            <div class="principle-num">03</div>
            <h3 class="principle-name">{{ $t('about.vision.point3Title') }}</h3>
            <p class="principle-desc">{{ $t('about.vision.point3Desc') }}</p>
          </div>
        </div>
      </div>

      <!-- Engineering Stack Matrix -->
      <div class="stack-matrix card">
        <h3 class="matrix-title">Core Systems Engineering Stack</h3>
        <div class="matrix-tags">
          <span class="matrix-pill">Rust Kernel Telemetry</span>
          <span class="matrix-pill">Modern C++ (C++20)</span>
          <span class="matrix-pill">Win32 & Windows App SDK</span>
          <span class="matrix-pill">Android NDK / C++</span>
          <span class="matrix-pill">Kotlin Native Coroutines</span>
          <span class="matrix-pill">SQLite Encrypted WAL</span>
          <span class="matrix-pill">Vue 3 / Vite Frontends</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  padding: 4.5rem 0 6rem;
}

.about-header {
  margin-bottom: 3.5rem;
}

.text-center {
  text-align: center;
}

.about-badge {
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  background: var(--primary-subtle);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.about-title {
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.about-lead {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 680px;
  margin: 0 auto;
}

.narrative-card {
  padding: 2.5rem;
  margin-bottom: 4rem;
  background: linear-gradient(180deg, #ffffff 0%, var(--bg-subtle) 100%);
}

.narrative-p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-main);
  margin-bottom: 1.25rem;
}

.narrative-p:last-child {
  margin-bottom: 0;
}

.principles-section {
  margin-bottom: 4rem;
}

.principles-heading {
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.principle-item {
  padding: 2rem 1.6rem;
  position: relative;
}

.principle-num {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.15;
  margin-bottom: 0.5rem;
}

.principle-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.principle-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.stack-matrix {
  padding: 2rem 2.5rem;
  text-align: center;
}

.matrix-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text-main);
}

.matrix-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
}

.matrix-pill {
  font-size: 0.8125rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #334155;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

@media (max-width: 800px) {
  .principles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-view {
    padding: 2rem 0 3.5rem;
  }

  .about-header {
    margin-bottom: 2rem;
  }

  .about-title {
    font-size: clamp(1.65rem, 6.5vw, 2.3rem);
  }

  .about-lead {
    font-size: 1rem;
    line-height: 1.55;
  }

  .narrative-card {
    padding: 1.25rem 1rem;
    margin-bottom: 2.5rem;
  }

  .narrative-p {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .principles-heading {
    font-size: 1.35rem;
    margin-bottom: 1.5rem;
  }

  .principle-item {
    padding: 1.25rem 1rem;
  }

  .principle-num {
    font-size: 2rem;
  }

  .stack-matrix {
    padding: 1.5rem 1rem;
  }
}
</style>
