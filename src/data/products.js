/**
 * Centralized Product Catalog for Vyliam Systems
 * 
 * Each product entry includes platform specifics, download/web endpoints,
 * multilingual descriptions (EN primary, with ready slots for PT-BR and ES),
 * technical requirements, and changelogs.
 */

export const products = [
  {
    id: 'flowpath', // ou 'vyliam-flowpath'
    name: 'FlowPath',
    logo: '/logos/FlowPath.png',
    banner: '/images/FlowPath_Banner.jpg',
    tagline: {
      en: 'Smart Downloads organizer with native Windows Explorer folder icon customization.',
      'pt-br': 'Organizador inteligente da pasta de Downloads com personalização nativa de ícones no Windows Explorer.',
      es: 'Organizador inteligente de descargas con personalización nativa de iconos en el Explorador de Windows.'
    },
    category: 'system',  // ou 'productivity'
    platform: 'windows', // 'windows' | 'android' | 'both'
    type: 'download',    // 'download' | 'web'
    downloadFormats: ['.exe'],
    fileSize: '88.5 MB',
    downloadUrl: '/downloads/FlowPath-Setup.exe',
    webUrl: null,
    version: 'v1.0.0',
    releaseDate: {
      en: 'September 2026',
      'pt-br': 'Setembro 2026',
      es: 'Septiembre 2026'
    },
    featured: true,
    accentColor: '#10b981',
    description: {
      en: 'FlowPath is a modern Windows desktop utility designed to eliminate Downloads folder clutter. It watches incoming files in real-time, categorizes them into dedicated folders, and dynamically injects high-resolution native icons directly into Windows Explorer via desktop.ini and automated ICO generation.',
      'pt-br': 'O FlowPath é um utilitário desktop moderno para Windows projetado para eliminar a desorganização da sua pasta de Downloads. Ele monitora novos arquivos em tempo real, separa por categorias e injeta ícones nativos de alta resolução diretamente no Windows Explorer através de arquivos desktop.ini e geração de ícones ICO.',
      es: 'FlowPath es una moderna utilidad de escritorio para Windows diseñada para eliminar el desorden en la carpeta de Descargas. Monitorea archivos en tiempo real, los clasifica en carpetas dedicadas e inyecta iconos nativos de alta resolución directamente en el Explorador de Windows.'
    },
    features: {
      en: [
        'Real-time background file monitoring with zero CPU overhead',
        'Native Windows Explorer folder icon injection via desktop.ini and ICO conversion',
        '9 pre-configured categories (Installers, 3D Models, Torrents, Spreadsheets, Media, etc.)',
        'One-click Reverse Organization to safely undo and restore all files to root',
        'Smart Cleanup module to detect and recycle inactive downloads (30/60/90+ days)',
        'Fluid Windows 11 style floating toast notifications with burst batching'
      ],
      'pt-br': [
        'Monitoramento de arquivos em segundo plano em tempo real com consumo zero de CPU',
        'Injeção de ícones nativos nas pastas do Windows Explorer via desktop.ini e conversão ICO',
        '9 categorias pré-configuradas (Instaladores, Modelos 3D, Torrents, Planilhas, Mídia, etc.)',
        'Processo Reverso com um clique para restaurar todos os arquivos e remover pastas vazias',
        'Módulo de Faxina Inteligente para identificar e reciclar arquivos inativos (30/60/90+ dias)',
        'Notificações flutuantes estilo Windows 11 com agrupamento em lote sem travamento'
      ],
      es: [
        'Monitoreo de descargas en segundo plano en tiempo real sin sobrecarga de CPU',
        'Inyección de iconos nativos en carpetas de Windows Explorer mediante desktop.ini e ICO',
        '9 categorías preconfiguradas (Instaladores, Modelos 3D, Torrents, Hojas de cálculo, etc.)',
        'Proceso inverso en un clic para restaurar archivos a la raíz y limpiar carpetas vacías',
        'Módulo de Limpieza Inteligente para enviar archivos inactivos a la Papelera de Reciclaje',
        'Notificaciones flotantes estilo Windows 11 con agrupación inteligente en lotes'
      ]
    },
    requirements: {
      en: [
        'Windows 10 / Windows 11 (64-bit)',
        'Intel Core i3 / AMD Ryzen 3 or higher',
        '4 GB RAM minimal (8 GB recommended)',
        '450 MB available storage'
      ],
      'pt-br': [
        'Windows 10 / Windows 11 (64-bit)',
        'Intel Core i3 / AMD Ryzen 3 ou superior',
        '4 GB de RAM mínimo (8 GB recomendado)',
        '450 MB de espaço disponível em disco'
      ],
      es: [
        'Windows 10 / Windows 11 (64 bits)',
        'Intel Core i3 / AMD Ryzen 3 o superior',
        '4 GB de RAM mínimo (8 GB recomendado)',
        '450 MB de espacio disponible en disco'
      ]
    },
    changelog: [
      {
        version: 'v1.0.0',
        date: {
          en: 'Sep 2026',
          'pt-br': 'Set 2026',
          es: 'Sep 2026'
        },
        notes: {
          en: 'Initial public launch with 9 factory rules, native Windows folder icon injection, burst notifications, and reverse organization engine.',
          'pt-br': 'Lançamento público com 9 regras de fábrica, injeção nativa de ícones no Windows Explorer, notificações em lote e motor de reversão.',
          es: 'Lanzamiento público con 9 reglas de fábrica, inyección nativa de iconos en Windows Explorer, notificaciones por lotes y motor de reversión.'
        }
      }
    ],
    screenshots: [
      {
        title: {
          en: 'Dashboard & Rules Engine',
          'pt-br': 'Painel do Sistema e Regras de Automação',
          es: 'Panel del Sistema y Reglas de Automatización'
        },
        url: '/images/FlowPath1.jpg'
      },
      {
        title: {
          en: 'Native Windows Explorer Integration',
          'pt-br': 'Integração Nativa com Windows Explorer',
          es: 'Integración Nativa con Windows Explorer'
        },
        url: '/images/FlowPath2.jpg'
      }
    ]
  },

  /*
  {
    id: 'aura-flow',
    name: 'Aura Flow Mobile',
    logo: '/logos/aura-flow.svg',
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
    logo: '/logos/vyliam-devtunnel.svg',
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
    logo: '/logos/nexus-cloud-console.svg',
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
    accentColor: '#6366f1',
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
    logo: '/logos/vyliam-cipher-vault.svg',
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
    accentColor: '#0284c7',
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
    logo: '/logos/pulse-focus.svg',
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
    accentColor: '#f43f5e',
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
  }*/
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
