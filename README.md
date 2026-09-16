<div align="center">

# ⚡ Vyliam Systems
### Engineering Next-Gen Software for Windows & Android

[![Vue 3](https://img.shields.io/badge/Vue.js-3.5.x-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Platforms](https://img.shields.io/badge/Platforms-Windows%20%7C%20Android%20%7C%20Web-0153c6?style=for-the-badge)](https://vyliam.com)
[![License](https://img.shields.io/badge/License-Proprietary-ff8600?style=for-the-badge)](#)

<p align="center">
  A high-performance institutional portal and modern software showcase engineered for <b>Vyliam Systems</b>. Featuring direct installer downloads (<code>.exe</code>, <code>.msi</code>, <code>.apk</code>), web app access, multi-language internationalization architecture, and a minimalist design system inspired by top-tier creative studios.
</p>

[Explore Catalog](#-catalog-preview) • [Architecture](#-system-architecture) • [Getting Started](#-getting-started) • [Design System](#-design-system)

</div>

---

## 💎 Project Overview

**Vyliam Systems** is a software engineering house specializing in low-latency desktop utilities for Windows, fluid tactile productivity tools for Android, and zero-trust cloud orchestration.

This repository hosts the official web storefront and product showcase. It is built strictly with **Pure Modern JavaScript** and **Vue 3 Composition API**, ensuring blazing-fast execution, zero bloated abstractions, and seamless developer onboarding.

---

## 🎨 Visual Identity & Brand System

Inspired by modern minimalist engineering aesthetics, the design combines intentional negative space, glassmorphism, micro-interactions, and high contrast:

| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `rgb(1, 83, 198)` / `#0153c6` | Brand anchor, header highlights, primary call-to-actions, active indicators |
| **Secondary Orange** | `rgb(255, 134, 0)` / `#ff8600` | High-energy accents, conversion badges, interactive hover states |
| **Pure White** | `rgb(255, 255, 255)` / `#ffffff` | Clean surfaces, card elevations, maximum contrast |
| **Slate Dark** | `#090d16` & `#0f172a` | Deep contrast footers, terminal badges, and mockups |

---

## 🏛️ System Architecture

```
Vyliam/
├── .gitignore                    # Clean Git configuration (node_modules, dist, logs)
├── index.html                    # HTML5 entry with Google Fonts (Outfit & Inter)
├── package.json                  # Dependencies: Vue 3, Vite, Vue Router, Vue I18n
├── vite.config.js                # Vite configuration with alias (@ -> ./src)
├── README.md                     # Comprehensive corporate architecture documentation
│
├── public/                       # Static public assets
│   ├── favicon.svg               # Vector brandmark icon
│   ├── favicon.png               # Raster brandmark icon
│   ├── logo.png                  # High-resolution brandmark
│   └── downloads/                # Installer binary mocks (.exe, .msi, .apk)
│
└── src/
    ├── main.js                   # Application bootstrap & plugin registration
    ├── App.vue                   # Application shell (Navbar, RouterView, Footer)
    │
    ├── assets/
    │   ├── main.css              # Global design system, CSS tokens, animations & resets
    │   └── logo.svg              # Official Vyliam Systems vector mark & wordmark
    │
    ├── components/
    │   ├── Navbar.vue            # Sticky glassmorphic header with logo slot & mobile drawer
    │   ├── LanguageSwitcher.vue  # Accessible language selector (EN | PT-BR | ES)
    │   ├── ProductCard.vue       # Dynamic card with platform badges & smart download actions
    │   ├── ProductFilter.vue     # Platform tabs & real-time search input
    │   └── Footer.vue            # Corporate footer with system status & engineering links
    │
    ├── views/
    │   ├── HomeView.vue          # Hero section, value pillars, and featured showcases
    │   ├── ProductsView.vue      # Complete catalog with real-time platform filters & search
    │   ├── ProductDetailView.vue # Technical specs, screenshot gallery, changelog & downloads
    │   ├── AboutView.vue         # Company vision, architectural values, and systems stack
    │   └── ContactView.vue       # Direct contact channels and interactive inquiry form
    │
    ├── data/
    │   └── products.js           # Centralized reactive product catalog in Pure JavaScript
    │
    ├── locales/
    │   ├── en.js                 # Complete Master English dictionary
    │   ├── pt-br.js              # Portuguese structured dictionary (ready for localization)
    │   └── es.js                 # Spanish structured dictionary (ready for localization)
    │
    ├── router/
    │   └── index.js              # Vue Router 4 (HTML5 history mode, smooth scrolling)
    │
    └── i18n.js                   # vue-i18n instance (EN default, locale persistence)
```

---

## 🛠️ Technology Stack & Engineering Rules

- **Vue.js 3 (`<script setup>` Composition API):** Clean reactive components without boilerplate.
- **Vite 6:** Instant HMR (Hot Module Replacement) and optimized Rollup production builds.
- **Strictly 100% Pure JavaScript:** **No TypeScript** — zero `.ts` files, no interfaces, and no compile overhead.
- **Vue Router 4:** Client-side routing with automatic page title synchronization and smooth scroll-to-top.
- **Vue I18n 9:** Multilingual architecture defaulting to English (**EN**), with structured translation templates ready for Brazilian Portuguese (**PT-BR**) and Spanish (**ES**).
- **Vanilla Scoped CSS:** Native CSS custom properties, responsive grids, and spring cubic-bezier transitions.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v24.x recommended)
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WilliamFagundesDev/Vyliam.git
   cd Vyliam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to view the live site.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 📦 Adding New Products to the Catalog

All software entries are centralized in [`src/data/products.js`](src/data/products.js). To add a new software, simply append a new object to the `products` array:

```javascript
{
  id: 'my-new-tool',
  name: 'Vyliam Tool Name',
  tagline: {
    en: 'Ultra-fast utility description.',
    'pt-br': 'Descrição do utilitário.',
    es: 'Descripción de la utilidad.'
  },
  category: 'system', // 'system' | 'productivity' | 'developer' | 'security'
  platform: 'windows', // 'windows' | 'android' | 'both'
  type: 'download',    // 'download' | 'web'
  downloadFormats: ['.exe', '.msi'],
  fileSize: '32.4 MB',
  downloadUrl: '/downloads/MyTool-Setup.exe',
  webUrl: null,
  version: 'v1.0.0',
  releaseDate: 'September 2026',
  featured: true,
  description: {
    en: 'Detailed technical overview...',
    'pt-br': 'Visão técnica detalhada...',
    es: 'Descripción técnica detallada...'
  },
  features: {
    en: [
      'Microsecond latency response',
      'Zero telemetry overhead'
    ]
  },
  requirements: [
    'Windows 10/11 (64-bit)',
    '4 GB RAM'
  ],
  changelog: [
    { version: 'v1.0.0', date: 'Sep 2026', notes: 'Initial public stable release.' }
  ],
  screenshots: [
    { title: 'Dashboard', url: 'https://...' }
  ]
}
```

---

## 🌐 Internationalization (i18n)

The application ships with full **English (EN)** content and configured architecture for **Portuguese (PT-BR)** and **Spanish (ES)**:
- English master dictionary: [`src/locales/en.js`](src/locales/en.js)
- Portuguese localization template: [`src/locales/pt-br.js`](src/locales/pt-br.js)
- Spanish localization template: [`src/locales/es.js`](src/locales/es.js)
- Instance & persistence: [`src/i18n.js`](src/i18n.js)

Language preference is persisted automatically to `localStorage.getItem('vyliam_locale')`.

---

## 📄 License & Intellectual Property

&copy; 2026 **Vyliam Systems**. All rights reserved.  
Software installers, branding marks, and proprietary applications displayed within this catalog are protected by intellectual property laws.
