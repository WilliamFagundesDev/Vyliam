/**
 * Centralized Product Catalog for Vyliam Systems
 * 
 * Each product entry includes platform specifics, download/web endpoints,
 * multilingual descriptions (EN primary, with ready slots for PT-BR and ES),
 * technical requirements, and changelogs.
 */

export const products = [
  {
    id: 'vyliam-sentinel',
    name: 'Vyliam Sentinel',
    tagline: {
      en: 'Real-time telemetry, memory optimization, and hardware diagnostics for Windows.',
      'pt-br': 'Telemetria em tempo real, otimização de memória e diagnóstico de hardware para Windows.',
      es: 'Telemetría en tiempo real, optimización de memoria y diagnósticos de hardware para Windows.'
    },
    category: 'system',
    platform: 'windows', // 'windows' | 'android' | 'both'
    type: 'download',    // 'download' | 'web'
    downloadFormats: ['.exe', '.msi'],
    fileSize: '42.8 MB',
    downloadUrl: '/downloads/VyliamSentinel-Setup-v2.4.1.exe',
    webUrl: null,
    version: 'v2.4.1',
    releaseDate: 'August 2026',
    featured: true,
    accentColor: '#0153c6',
    description: {
      en: 'Vyliam Sentinel is a high-performance Windows desktop diagnostic tool engineered with native C++/Rust kernels for low-latency kernel monitoring, smart RAM deallocation, CPU thermal management, and zero background CPU overhead.',
      'pt-br': 'Vyliam Sentinel é uma ferramenta de diagnóstico desktop de alta performance projetada com núcleos nativos C++/Rust para monitoramento com latência ultrabaixa e alocação inteligente de recursos.',
      es: 'Vyliam Sentinel es una herramienta de diagnóstico de alto rendimiento diseñada con núcleos nativos C++/Rust para monitoreo de baja latencia y optimización inteligente.'
    },
    features: {
      en: [
        'Kernel-level microsecond latency process analyzer',
        'Dynamic working-set RAM compression without freeze spikes',
        'Hardware health telemetry & GPU/CPU thermal throttling alerts',
        'Portable and Installer packages (.exe / .msi)'
      ]
    },
    requirements: [
      'Windows 10 / Windows 11 (64-bit)',
      'Intel Core i3 8th Gen / AMD Ryzen 3 or higher',
      '4 GB RAM minimal (8 GB recommended)',
      '100 MB available NVMe or SSD storage'
    ],
    changelog: [
      { version: 'v2.4.1', date: 'Aug 2026', notes: 'Optimized thread pool polling down to 0.02% CPU usage idle.' },
      { version: 'v2.4.0', date: 'Jul 2026', notes: 'Added direct MSI unattended deployment switches for sysadmins.' }
    ],
    screenshots: [
      {
        title: 'Main Dashboard',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Thermal & Process Monitor',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'aura-flow',
    name: 'Aura Flow Mobile',
    tagline: {
      en: 'Minimalist offline-first canvas and visual knowledge workspace for Android.',
      'pt-br': 'Workspace visual e gerenciador de notas offline-first para Android.',
      es: 'Espacio de trabajo visual y notas offline-first para Android.'
    },
    category: 'productivity',
    platform: 'android',
    type: 'download',
    downloadFormats: ['.apk'],
    fileSize: '18.4 MB',
    downloadUrl: '/downloads/AuraFlow-Release-v1.8.0.apk',
    webUrl: null,
    version: 'v1.8.0',
    releaseDate: 'July 2026',
    featured: true,
    accentColor: '#059669',
    description: {
      en: 'Aura Flow is a hyper-responsive infinite canvas built specifically for Android tablets and smartphones. Designed around tactile gestures, Markdown-native bi-directional links, and zero cloud lock-in with localized SQLite/CRDT syncing.',
      'pt-br': 'Aura Flow é uma tela infinita com suporte nativo a gestos, links bidirecionais e armazenamento 100% local com sincronização segura para Android.',
      es: 'Aura Flow es un lienzo infinito con soporte nativo para gestos, enlaces bidireccionales y almacenamiento 100% local para Android.'
    },
    features: {
      en: [
        'Fluid 120Hz gesture navigation and infinite pinch-to-zoom canvas',
        'AES-256 local encrypted vaults with zero mandatory cloud account',
        'Bi-directional Markdown wikilinks and dynamic graph visualization',
        'Direct APK download with automatic built-in update verification'
      ]
    },
    requirements: [
      'Android 9.0 (Pie) or higher',
      'ARM64 or x86_64 architecture',
      '3 GB RAM minimum',
      '50 MB internal storage'
    ],
    changelog: [
      { version: 'v1.8.0', date: 'Jul 2026', notes: 'Native stylus palm rejection and pressure sensitivity engine.' },
      { version: 'v1.7.2', date: 'Jun 2026', notes: 'Instant graph view indexing for vaults exceeding 10,000 nodes.' }
    ],
    screenshots: [
      {
        title: 'Infinite Canvas Workspace',
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Mind Mapping & Nodes',
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'vyliam-devtunnel',
    name: 'Vyliam DevTunnel',
    tagline: {
      en: 'Instant, encrypted localhost reverse-tunneling with live HTTP/WS traffic replay.',
      'pt-br': 'Túneis reversos criptografados instantâneos para localhost com inspeção HTTP/WS.',
      es: 'Túneles inversos encriptados instantáneos para localhost con inspección HTTP/WS.'
    },
    category: 'developer',
    platform: 'both',
    type: 'download',
    downloadFormats: ['.exe', '.apk'],
    fileSize: '29.1 MB',
    downloadUrl: '/downloads/VyliamDevTunnel-Windows-v3.1.0.exe',
    webUrl: null,
    version: 'v3.1.0',
    releaseDate: 'September 2026',
    featured: true,
    accentColor: '#ff8600',
    description: {
      en: 'Expose local services to the internet securely within milliseconds. Includes a desktop companion for Windows and an Android remote inspection app to monitor webhook payloads, replay WebSocket frames, and debug mobile APIs on the fly.',
      'pt-br': 'Exponha servidores locais para a internet com segurança e inspecione requisições em tempo real tanto no Windows quanto no Android.',
      es: 'Exponga servidores locales a Internet de forma segura e inspeccione solicitudes en tiempo real en Windows y Android.'
    },
    features: {
      en: [
        'Zero configuration TLS termination and custom vanity subdomains',
        'Integrated Webhook replay engine and payload modifier',
        'Cross-platform support: Windows desktop daemon + Android inspector companion',
        'End-to-end WireGuard-based tunneling protocols'
      ]
    },
    requirements: [
      'Windows 10/11 or Android 10+',
      'Stable broadband connection',
      'Port forwarding not required'
    ],
    changelog: [
      { version: 'v3.1.0', date: 'Sep 2026', notes: 'Added HTTP/3 and gRPC streaming inspection.' },
      { version: 'v3.0.4', date: 'Aug 2026', notes: 'Enhanced mobile companion live log streaming buffer.' }
    ],
    screenshots: [
      {
        title: 'Traffic Inspector',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'nexus-cloud-console',
    name: 'Nexus Cloud Console',
    tagline: {
      en: 'Cloud control plane for centralized Vyliam software fleet configuration & license licensing.',
      'pt-br': 'Painel de controle em nuvem para gerenciamento de frotas e licenças de software Vyliam.',
      es: 'Panel de control en la nube para gestionar flotas y licencias de software Vyliam.'
    },
    category: 'enterprise',
    platform: 'both',
    type: 'web',
    downloadFormats: [],
    fileSize: 'Web Application',
    downloadUrl: null,
    webUrl: 'https://console.vyliam.com',
    version: 'v4.2 (Cloud)',
    releaseDate: 'Continuous',
    featured: false,
    accentColor: '#0153c6',
    description: {
      en: 'Nexus Cloud Console is our centralized browser-based management portal. Monitor deployments of Vyliam Sentinel and DevTunnel across enterprise endpoints, distribute automated policy updates, and manage team seats.',
      'pt-br': 'Nexus Cloud Console é o nosso portal web centralizado para monitorar implantações, distribuir políticas de segurança e gerenciar equipes.',
      es: 'Nexus Cloud Console es nuestro portal web para monitorear despliegues, distribuir políticas y gestionar licencias.'
    },
    features: {
      en: [
        'Single Sign-On (SAML 2.0 / OIDC / Google Workspace)',
        'Fleet health dashboards and vulnerability posture metrics',
        'Zero-trust policy propagation to remote endpoints in under 500ms',
        'Responsive web interface optimized for desktop and mobile browsers'
      ]
    },
    requirements: [
      'Any modern browser (Chrome 110+, Firefox 115+, Edge, Safari 16+)',
      'Internet connectivity'
    ],
    changelog: [
      { version: 'v4.2.0', date: 'Sep 2026', notes: 'Launched enterprise audit log exports into AWS S3 and Datadog.' }
    ],
    screenshots: [
      {
        title: 'Fleet Dashboard',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'vyliam-cipher-vault',
    name: 'Vyliam Cipher Vault',
    tagline: {
      en: 'Hardware-backed zero-knowledge credential and sensitive file encryption suite for Windows.',
      'pt-br': 'Suíte de criptografia de arquivos e credenciais com suporte a TPM para Windows.',
      es: 'Suite de cifrado de archivos y credenciales con soporte TPM para Windows.'
    },
    category: 'security',
    platform: 'windows',
    type: 'download',
    downloadFormats: ['.exe'],
    fileSize: '34.6 MB',
    downloadUrl: '/downloads/VyliamCipherVault-Setup-v1.4.2.exe',
    webUrl: null,
    version: 'v1.4.2',
    releaseDate: 'August 2026',
    featured: false,
    accentColor: '#0f172a',
    description: {
      en: 'Military-grade file encryption tool leveraging Windows TPM 2.0 and Argon2id key derivation. Create virtual encrypted drives mounted on demand without leaving plaintext traces on physical storage.',
      'pt-br': 'Criptografia militar de arquivos utilizando TPM 2.0 do Windows e derivação de chaves com Argon2id.',
      es: 'Cifrado de archivos de grado militar utilizando TPM 2.0 de Windows y derivación Argon2id.'
    },
    features: {
      en: [
        'TPM 2.0 hardware binding and Windows Hello biometric unlocking',
        'Transparent on-the-fly virtual disk mounting driver',
        'Shredder with DoD 5220.22-M sanitization standards',
        'Zero telemetry, 100% air-gapped safe'
      ]
    },
    requirements: [
      'Windows 10 / 11 64-bit',
      'TPM 2.0 module recommended',
      'Administrator rights for virtual disk driver installation'
    ],
    changelog: [
      { version: 'v1.4.2', date: 'Aug 2026', notes: 'Fixed virtual disk unmount on sudden system hibernation.' }
    ],
    screenshots: [
      {
        title: 'Vault Manager',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'pulse-focus',
    name: 'Pulse Focus Tracker',
    tagline: {
      en: 'Distraction-blocking and flow-state analytics companion for Android power users.',
      'pt-br': 'Bloqueador de distrações e métricas de foco para usuários Android.',
      es: 'Bloqueador de distracciones y análisis de estado de flujo para Android.'
    },
    category: 'productivity',
    platform: 'android',
    type: 'download',
    downloadFormats: ['.apk'],
    fileSize: '14.2 MB',
    downloadUrl: '/downloads/PulseFocus-v2.0.1.apk',
    webUrl: null,
    version: 'v2.0.1',
    releaseDate: 'June 2026',
    featured: false,
    accentColor: '#ff8600',
    description: {
      en: 'Reclaim your cognitive focus. Pulse Focus integrates with Android Accessibility and Digital Wellbeing APIs to enforce strict deep work intervals, block notification triggers, and visualize your daily mental stamina.',
      'pt-br': 'Aplicativo Android de bloqueio inteligente e métricas de produtividade profunda.',
      es: 'Aplicación Android de bloqueo inteligente y análisis de productividad profunda.'
    },
    features: {
      en: [
        'Hardcore app locking with emergency bypass penalty mechanisms',
        'Ambient binaural sound generator embedded',
        'Offline daily stamina and context-switching metrics',
        'Battery-efficient background scheduler (< 1% daily battery)'
      ]
    },
    requirements: [
      'Android 8.0 (Oreo) or later',
      'Usage Access & Notification Listener permissions'
    ],
    changelog: [
      { version: 'v2.0.1', date: 'Jun 2026', notes: 'Integrated binaural wave frequencies for deep coding sessions.' }
    ],
    screenshots: [
      {
        title: 'Focus Timer & Stats',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
]

/**
 * Helper to fetch a product by its slug ID
 */
export function getProductById(id) {
  return products.find(p => p.id === id)
}

/**
 * Helper to filter products by platform
 */
export function getProductsByPlatform(platform) {
  if (!platform || platform === 'all') return products
  if (platform === 'windows') {
    return products.filter(p => p.platform === 'windows' || p.platform === 'both')
  }
  if (platform === 'android') {
    return products.filter(p => p.platform === 'android' || p.platform === 'both')
  }
  if (platform === 'web') {
    return products.filter(p => p.type === 'web')
  }
  return products
}

/**
 * Helper to fetch featured products for Home view
 */
export function getFeaturedProducts() {
  return products.filter(p => p.featured)
}
