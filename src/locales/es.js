/**
 * Spanish (ES) Locale Structure - Ready for full translation
 * Matches the schema of src/locales/en.js
 */
export default {
  nav: {
    home: 'Inicio',
    products: 'Productos',
    about: 'Nosotros',
    contact: 'Contacto',
    getStarted: 'Explorar Productos',
    switchLanguage: 'Idioma'
  },
  hero: {
    badge: 'INGENIERÍA PARA WINDOWS Y ANDROID',
    titleLine1: 'Ingeniería de Software de Próxima Generación',
    titleLine2: ' para Windows y Android',
    description: 'Vyliam Systems diseña utilidades de escritorio de alto rendimiento, herramientas móviles y sistemas multiplataforma con velocidad implacable y estética refinada.',
    primaryAction: 'Explorar Productos',
    secondaryAction: 'Sobre Vyliam',
    metrics: {
      downloads: '100K+ Instalaciones Activas',
      uptime: '99.9% Sin Fallos',
      platforms: 'Listo para Windows 11 y Android 14'
    }
  },
  home: {
    featuredTitle: 'Aplicaciones Destacadas',
    featuredSubtitle: 'Software meticulosamente diseñado para máxima productividad y rendimiento.',
    viewAllProducts: 'Ver Catálogo Completo',
    whyVyliam: {
      title: 'Construido con Precisión y Altos Estándares',
      subtitle: 'Por qué ingenieros y usuarios avanzados confían en el software de Vyliam Systems.',
      card1: {
        title: 'Rendimiento Nativo',
        desc: 'Cero software innecesario. Núcleos compilados nativos con bajo uso de memoria y alta velocidad.'
      },
      card2: {
        title: 'Cero Fugas de Datos',
        desc: 'Privacidad y seguridad ante todo. Sus datos permanecen en su máquina local.'
      },
      card3: {
        title: 'Instaladores Directos y Limpios',
        desc: 'Sin paquetes publicitarios complejos. Binarios directos .exe, .msi y .apk verificados.'
      }
    },
    cta: {
      title: '¿Listo para elevar su flujo digital?',
      subtitle: 'Descargue nuestros últimos lanzamientos o conéctese con nuestro equipo de ingeniería.',
      button: 'Explorar Software'
    }
  },
  products: {
    badge: 'CATÁLOGO',
    title: 'Catálogo de Productos',
    subtitle: 'Explore nuestro catálogo de software nativo para escritorio Windows y dispositivos móviles Android.',
    searchPlaceholder: 'Buscar aplicaciones por nombre o palabra clave...',
    filters: {
      all: 'Todas las Plataformas',
      windows: 'Aplicaciones Windows',
      android: 'Aplicaciones Android',
      web: 'Aplicaciones Web'
    },
    count: 'Mostrando {count} aplicaciones',
    noResults: 'No se encontraron aplicaciones con los criterios seleccionados.',
    clearFilters: 'Restablecer filtros',
    badges: {
      windows: 'Windows',
      android: 'Android',
      web: 'Web App',
      both: 'Win & Android'
    },
    actions: {
      downloadInstaller: 'Descargar',
      downloadApk: 'Descargar APK',
      launchWebApp: 'Abrir Web',
      viewDetails: 'Ver Detalles',
      downloading: 'Descargando...',
      downloadSuccess: '¡Descarga iniciada!'
    },
    fileFormats: 'Formatos disponibles: {formats}'
  },
  productDetail: {
    backToCatalog: 'Volver a Productos',
    overview: 'Descripción General',
    galleryTitle: 'Vista Previa de la Interfaz',
    galleryHint: 'Haga clic en la imagen para ampliar',
    versionLabel: 'Versión',
    releaseDateLabel: 'Lanzamiento',
    fileSizeLabel: 'Tamaño',
    platformLabel: 'Plataforma',
    categoryLabel: 'Categoría',
    keyFeatures: 'Capacidades Clave',
    systemRequirements: 'Requisitos del Sistema',
    changelog: 'Historial de Versiones',
    directDownload: 'Descarga Directa',
    accessWebVersion: 'Iniciar App Web',
    verifiedInstaller: 'Instalador verificado con hash SHA-256',
    notFound: 'Producto No Encontrado',
    returnToProducts: 'Volver a Productos',
    categories: {
      system: 'Sistema',
      productivity: 'Productividad',
      security: 'Seguridad',
      developer: 'Desarrollador',
      enterprise: 'Empresarial'
    },
    lightbox: {
      close: 'Cerrar (Esc)',
      prev: 'Imagen anterior',
      next: 'Siguiente imagen',
      counter: '{current} de {total}'
    }
  },
  about: {
    badge: 'ACERCA DE VYLIAM SYSTEMS',
    title: 'Arquitectura de Software Eficiente',
    paragraph1: 'Vyliam Systems nació con una convicción clara: el software moderno debe ser rápido, elegante y sin complejidades innecesarias.',
    paragraph2: 'Nos especializamos en programación de sistemas para Windows, herramientas táctiles para Android y extensiones en la nube seguras.',
    vision: {
      title: 'Nuestra Filosofía de Ingeniería',
      point1Title: 'Velocidad como Función',
      point1Desc: 'Medimos la latencia en microsegundos y optimizamos el consumo de memoria obsesivamente.',
      point2Title: 'UX Minimalista',
      point2Desc: 'Interfaces diseñadas con espacio negativo, tipografía intencional y microinteracciones fluidas.',
      point3Title: 'Soberanía del Usuario',
      point3Desc: 'Arquitecturas offline-first, instaladores transparentes y privacidad de datos sin concesiones.'
    }
  },
  contact: {
    badge: 'CONTACTO',
    title: 'Conéctese con Vyliam Systems',
    subtitle: '¿Preguntas, consultas empresariales o comentarios sobre nuestro software? Escríbanos.',
    form: {
      title: 'Envíe un Mensaje Directo',
      name: 'Su Nombre',
      namePlaceholder: 'Nombre completo',
      email: 'Correo Electrónico',
      emailPlaceholder: 'correo@ejemplo.com',
      subject: 'Asunto',
      subjectPlaceholder: 'Consulta empresarial / Feedback',
      message: 'Mensaje',
      messagePlaceholder: '¿Cómo podemos ayudar a su equipo?',
      submit: 'Enviar Mensaje',
      submitting: 'Enviando mensaje...',
      success: '¡Mensaje enviado con éxito a vyliamsystems@gmail.com! Le responderemos a la brevedad.',
      activationNeeded: 'Aviso: FormSubmit envió un correo de activación a vyliamsystems@gmail.com. Por favor, confirme el enlace en su bandeja para habilitar los envíos.',
      error: 'No se pudo enviar automáticamente. Puede enviar directamente a través de su cliente de correo:',
      directMailtoBtn: 'Abrir en mi cliente de correo',
      alternativeDirect: '¿Prefiere enviar directamente desde su cliente de correo? Haga clic aquí'
    },
    directInfo: {
      title: 'Canales Directos',
      engineering: 'Ingeniería & Comercial',
      headquarters: 'Sede & Operaciones',
      availability: 'Disponibilidad',
      email: 'vyliamsystems{\'@\'}gmail.com',
      location: 'Río de Janeiro, RJ - Brasil / Remoto Global',
      responseRate: 'Respuesta típica en 24 horas hábiles'
    }
  },
  footer: {
    tagline: 'Ingeniería de software de vanguardia para Windows, Android y entornos web modernos.',
    products: 'Productos',
    company: 'Empresa',
    resources: 'Recursos',
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    status: 'Estado del Sistema: Todos los sistemas operativos'
  },
  privacy: {
    badge: 'LEGAL & PRIVACIDAD',
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Septiembre de 2026',
    intro: 'Vyliam Systems prioriza de manera absoluta la seguridad, confidencialidad y soberanía de los datos de sus usuarios. Esta política detalla el tratamiento de información en nuestro portal y revalida nuestra filosofía de software nativo sin telemetría intrusiva.',
    sections: [
      {
        title: '1. Filosofía Offline-First y No Recolección',
        content: 'Nuestras aplicaciones ejecutables de escritorio para Windows y herramientas móviles para Android se conciben con arquitectura offline-first. Ejecutan directamente en su hardware local sin transmitir telemetría, historiales de actividad o registros analíticos a servidores remotos.'
      },
      {
        title: '2. Información Recopilada en el Sitio Web',
        content: 'En nuestro portal web únicamente recopilamos la información enviada voluntariamente a través del formulario de contacto (nombre, dirección de correo electrónico y contenido del mensaje) con el exclusivo fin de atender consultas técnicas o solicitudes de licencias.'
      },
      {
        title: '3. Finalidad y Cero Reventa',
        content: 'Vyliam Systems nunca vende, arrienda ni comercializa información personal con intermediarios de datos o redes publicitarias de terceros. Los datos se utilizan estrictamente para la comunicación directa entre nuestro equipo y usted.'
      },
      {
        title: '4. Seguridad y Almacenamiento',
        content: 'Implementamos estándares avanzados de cifrado y estrictas medidas de seguridad técnica para proteger cualquier correspondencia contra accesos no autorizados.'
      },
      {
        title: '5. Sus Derechos Legales (LGPD / GDPR)',
        content: 'Conforme a los marcos normativos aplicables, usted tiene derecho a solicitar la confirmación, actualización, copia o eliminación definitiva de sus datos personales comunicados a través de nuestros canales.'
      },
      {
        title: '6. Contacto de Privacidad',
        content: 'Para ejercer sus derechos de privacidad o realizar consultas técnicas sobre el cumplimiento normativo de nuestros softwares, escríbanos a vyliamsystems{\'@\'}gmail.com.'
      }
    ]
  },
  terms: {
    badge: 'TÉRMINOS DE SERVICIO',
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: Septiembre de 2026',
    intro: 'Al acceder al portal de Vyliam Systems o al descargar, instalar y utilizar cualquiera de nuestras aplicaciones para Windows o Android, usted acepta expresamente los presentes Términos de Servicio.',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        content: 'El uso de nuestros productos y servicios digitales está condicionado a la aceptación íntegra de estos términos. Si no concuerda con alguna de las cláusulas, le rogamos abstenerse de utilizar nuestro software o sitio web.'
      },
      {
        title: '2. Concesión de Licencia',
        content: 'Vyliam Systems le otorga una licencia limitada, revocable, no exclusiva e intransferible para descargar, instalar y ejecutar las aplicaciones en dispositivos compatibles conforme a los parámetros de la licencia adquirida.'
      },
      {
        title: '3. Restricciones y Uso Adecuado',
        content: 'Queda estrictamente prohibido: (a) descompilar, realizar ingeniería inversa o intentar extraer el código fuente de binarios propietarios; (b) redistribuir instaladores modificados con software malicioso; o (c) destinar las herramientas a fines contrarios a la ley.'
      },
      {
        title: '4. Propiedad Intelectual',
        content: 'Todo el código original, binarios compilados, marcas registradas, logotipos e identidades visuales son propiedad exclusiva de Vyliam Systems o de sus respectivos licenciantes, protegidos por convenios internacionales de propiedad intelectual.'
      },
      {
        title: '5. Exención de Garantías',
        content: 'Nuestras aplicaciones se desarrollan bajo rigurosas pautas de rendimiento. No obstante, se proporcionan "tal cual" (as-is), sin garantías explícitas o implícitas más allá de las especificaciones técnicas oficiales publicadas.'
      },
      {
        title: '6. Limitación de Responsabilidad',
        content: 'En la máxima medida permitida por la ley aplicable, Vyliam Systems no asumirá responsabilidad por daños indirectos, pérdidas de beneficios o interrupción de operaciones resultantes del uso o imposibilidad de uso de las aplicaciones.'
      },
      {
        title: '7. Ley Aplicable y Jurisdicción',
        content: 'Estos términos se rigen por las leyes de la República Federativa de Brasil, acordando someter cualquier controversia a la jurisdicción exclusiva de los tribunales de Río de Janeiro - RJ.'
      }
    ]
  },
  auth: {
    loginTab: 'Iniciar Sesión',
    registerTab: 'Crear Cuenta',
    loginTitle: 'Acceda a su Cuenta',
    loginSubtitle: 'Inicie sesión para gestionar sus licencias de software y descargas activas.',
    registerTitle: 'Cree su Cuenta Vyliam',
    registerSubtitle: 'Regístrese para acceder a lanzamientos exclusivos e historial de licencias.',
    name: 'Nombre Completo',
    namePlaceholder: 'ej: Juan Pérez',
    email: 'Correo Electrónico',
    emailPlaceholder: 'correo{\'@\'}ejemplo.com',
    phone: 'Teléfono / WhatsApp',
    phonePlaceholder: '+34 600 000 000',
    password: 'Contraseña',
    passwordPlaceholder: 'Mínimo 6 caracteres',
    confirmPassword: 'Confirmar Contraseña',
    confirmPasswordPlaceholder: 'Repita su contraseña',
    rememberMe: 'Recordar en este dispositivo',
    forgotPassword: '¿Olvidó su contraseña?',
    submitLogin: 'Iniciar Sesión',
    submitRegister: 'Crear Mi Cuenta',
    orDivider: 'o continúe con',
    googleLogin: 'Acceder con Google',
    googleRegister: 'Registrarse con Google',
    agreeTerms: 'Acepto los',
    termsLink: 'Términos de Servicio',
    privacyLink: 'Política de Privacidad',
    and: 'y la',
    alreadyHaveAccount: '¿Ya tiene una cuenta?',
    dontHaveAccount: '¿Aún no tiene cuenta?',
    loginHere: 'Inicie sesión aquí',
    registerHere: 'Regístrese aquí',
    demoNotice: 'Entorno institucional integrado con Firebase Authentication y Cloud Firestore.',
    rules: {
      title: 'Requisitos de seguridad de la contraseña:',
      minChars: 'Mínimo de 6 caracteres',
      uppercase: 'Al menos 1 letra mayúscula (A-Z)',
      specialChar: 'Al menos 1 carácter especial (!{\'@\'}#$...)'
    },
    verification: {
      title: 'Confirme su dirección de correo',
      desc: 'Hemos enviado un mensaje de confirmación a:',
      checkInbox: 'Por favor, haga clic en el enlace enviado para activar el acceso completo a su cuenta. Recuerde revisar la carpeta de Spam o Correo no deseado si no lo encuentra.',
      resendBtn: 'Reenviar correo de confirmación',
      resendWait: 'Espere {seconds}s para reenviar',
      resendSuccess: '¡Nuevo correo de confirmación enviado con éxito!',
      pendingAlert: 'Su correo aún no ha sido confirmado. Por favor, revise su bandeja de entrada.',
      verifiedSuccess: '¡Correo verificado con éxito!'
    },
    reset: {
      title: 'Recuperar Contraseña',
      subtitle: 'Introduzca su correo registrado para recibir el enlace de restablecimiento:',
      sendBtn: 'Enviar Enlace de Restablecimiento',
      sentSuccess: '¡Enlace enviado a su correo! Por favor, revise su bandeja de entrada.',
      backToLogin: 'Volver a Iniciar Sesión'
    },
    account: {
      hello: 'Hola, {name}',
      client: 'Cliente Vyliam',
      unverified: 'Correo pendiente de verificación',
      verified: 'Cuenta verificada',
      logout: 'Cerrar Sesión'
    },
    optional: 'opcional',
    errors: {
      required: 'Este campo es obligatorio.',
      nameRequired: 'El campo Nombre Completo es obligatorio.',
      emailRequired: 'El campo Correo Electrónico es obligatorio.',
      passwordRequired: 'El campo Contraseña es obligatorio.',
      confirmPasswordRequired: 'Por favor, confirme su contraseña.',
      invalidEmail: 'Por favor, introduzca un correo electrónico válido.',
      emailAlreadyInUse: 'Este correo ya está registrado. Intente iniciar sesión o restablecer su contraseña.',
      invalidCredentials: 'Correo o contraseña incorrectos. Por favor, verifique sus credenciales.',
      passwordTooShort: 'La contraseña debe contener al menos 6 caracteres.',
      passwordNoUppercase: 'La contraseña debe contener al menos una letra mayúscula (A-Z).',
      passwordNoSpecial: 'La contraseña debe contener al menos un carácter especial (!{\'@\'}#$...).',
      passwordMismatch: 'La confirmación de la contraseña no coincide.',
      termsRequired: 'Debe aceptar los Términos de Servicio y la Política de Privacidad para continuar.',
      tooManyRequests: 'Acceso temporalmente bloqueado debido a varios intentos fallidos. Espere unos momentos o restablezca su contraseña.',
      userDisabled: 'Esta cuenta ha sido inhabilitada por el administrador.',
      popupClosed: 'El inicio de sesión con Google fue cancelado antes de completarse.',
      networkFailed: 'Error de conexión con los servidores. Verifique su acceso a internet.',
      missingPassword: 'Por favor, introduzca su contraseña.',
      generic: 'Ocurrió un error al procesar su solicitud. Inténtelo de nuevo.'
    }
  }
}
