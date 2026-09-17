<template>
  <div class="auth-view">
    <div class="container container-auth" :class="{ 'is-register': activeTab === 'register' && !isForgotPassword }">
      <!-- Auth Card -->
      <div class="auth-card card" :class="{ 'card-register': activeTab === 'register' && !isForgotPassword }">
        <!-- Brand Header -->
        <div class="auth-header text-center">
          <router-link to="/" class="auth-brand" aria-label="Vyliam Systems Home">
            <svg class="brand-symbol" width="38" height="38" viewBox="0 0 500 500" fill="none">
              <path d="M 13.711 48.848 C 6.152 49.481, 4.058 50.512, 4.015 53.621 C 4.007 54.238, 22.503 93.613, 45.117 141.121 C 67.731 188.630, 92.208 241.450, 99.511 258.500 C 138.941 350.566, 169.769 410.392, 190.806 435.671 C 202.371 449.568, 228.239 462.472, 248.500 464.452 C 279.778 467.508, 311.855 442.677, 335.319 397.245 C 339.330 389.479, 339.682 388.286, 338.456 386.609 C 337.106 384.763, 336.970 384.766, 332.288 386.761 C 317.805 392.933, 301.792 395.358, 290.737 393.054 C 277.115 390.215, 261.886 378.904, 252.663 364.774 C 248.707 358.715, 149 146.848, 149 144.502 C 149 143.391, 137.005 119.771, 133.309 113.603 C 109.124 73.249, 72.954 49.672, 33.500 48.541 C 26.900 48.352, 17.995 48.490, 13.711 48.848" fill="#0153c6"/>
              <path d="M 459.608 50.101 C 424.222 54.831, 392.775 74.341, 372.246 104.302 C 366.512 112.670, 259.819 343.569, 259.413 348.489 C 259.108 352.180, 265.014 359.460, 274.262 366.793 C 286.842 376.769, 298.848 380.694, 311.490 378.967 C 326.193 376.957, 348.277 362.565, 353.298 351.720 C 357.082 343.545, 492.018 60.926, 494.021 56.979 C 495.596 53.874, 495.636 53.223, 494.363 51.479 C 493.061 49.696, 491.613 49.484, 479.709 49.340 C 472.444 49.252, 463.399 49.594, 459.608 50.101" fill="#ff8600"/>
            </svg>
            <div class="brand-text">
              <span class="brand-name">VYLIAM</span>
              <span class="brand-sub">SYSTEMS</span>
            </div>
          </router-link>

          <template v-if="!isForgotPassword">
            <h1 class="auth-title">
              {{ activeTab === 'login' ? $t('auth.loginTitle') : $t('auth.registerTitle') }}
            </h1>
            <p class="auth-subtitle">
              {{ activeTab === 'login' ? $t('auth.loginSubtitle') : $t('auth.registerSubtitle') }}
            </p>
          </template>
        </div>

        <!-- 1. FORGOT PASSWORD SCREEN -->
        <div v-if="isForgotPassword" class="forgot-card">
          <h2 class="auth-title text-center">{{ $t('auth.reset.title') }}</h2>
          <p class="auth-subtitle text-center">{{ $t('auth.reset.subtitle') }}</p>

          <!-- Feedback Banner -->
          <transition name="fade">
            <div v-if="feedbackMessage" class="feedback-banner" :class="'feedback-' + feedbackType">
              <span>{{ feedbackMessage }}</span>
            </div>
          </transition>

          <form @submit.prevent="handleSendPasswordReset" class="auth-form" novalidate>
            <div class="form-group">
              <label for="reset-email" class="form-label">{{ $t('auth.email') }}</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input 
                  id="reset-email" 
                  v-model="resetEmail" 
                  type="email" 
                  class="form-input" 
                  :placeholder="$t('auth.emailPlaceholder')" 
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-submit" :disabled="isLoading">
              <span v-if="!isLoading">{{ $t('auth.reset.sendBtn') }}</span>
              <span v-else class="spinner-row">
                <span class="btn-spinner"></span>
                <span>Enviando...</span>
              </span>
            </button>

            <button type="button" class="btn btn-ghost w-full back-btn" @click="isForgotPassword = false">
              &larr; {{ $t('auth.reset.backToLogin') }}
            </button>
          </form>
        </div>

        <!-- 3. NORMAL AUTH (LOGIN OR REGISTER) -->
        <template v-else>
          <!-- Segmented Tab Switcher -->
          <div class="tab-control">
            <button 
              type="button" 
              class="tab-btn" 
              :class="{ 'active': activeTab === 'login' }"
              @click="setTab('login')"
            >
              {{ $t('auth.loginTab') }}
            </button>
            <button 
              type="button" 
              class="tab-btn" 
              :class="{ 'active': activeTab === 'register' }"
              @click="setTab('register')"
            >
              {{ $t('auth.registerTab') }}
            </button>
          </div>

          <!-- Prominent User Feedback Banner -->
          <transition name="fade">
            <div v-if="feedbackMessage" class="feedback-banner" :class="'feedback-' + feedbackType">
              <!-- Success Icon -->
              <svg v-if="feedbackType === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="feedback-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <!-- Warning Icon -->
              <svg v-else-if="feedbackType === 'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="feedback-icon">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <!-- Error Icon -->
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="feedback-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <div class="feedback-content">
                <p class="feedback-text">{{ feedbackMessage }}</p>
              </div>
              <button type="button" class="feedback-close" @click="feedbackMessage = ''" aria-label="Fechar">&times;</button>
            </div>
          </transition>

          <!-- Forms Container with animation -->
          <transition name="auth-fade" mode="out-in">
            <!-- 1. LOGIN FORM -->
            <form v-if="activeTab === 'login'" key="login-form" @submit.prevent="handleLogin" class="auth-form" novalidate>
              <!-- Email -->
              <div class="form-group">
                <label for="login-email" class="form-label">{{ $t('auth.email') }}</label>
                <div class="input-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input 
                    id="login-email" 
                    v-model="loginData.email" 
                    type="email" 
                    class="form-input" 
                    :placeholder="$t('auth.emailPlaceholder')" 
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="form-group">
                <div class="label-row">
                  <label for="login-password" class="form-label">{{ $t('auth.password') }}</label>
                  <button type="button" @click="openForgotPassword" class="forgot-link-btn">
                    {{ $t('auth.forgotPassword') }}
                  </button>
                </div>
                <div class="input-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input 
                    id="login-password" 
                    v-model="loginData.password" 
                    :type="showLoginPassword ? 'text' : 'password'" 
                    class="form-input" 
                    :placeholder="$t('auth.passwordPlaceholder')" 
                    required
                  />
                  <button 
                    type="button" 
                    class="pwd-toggle" 
                    @click="showLoginPassword = !showLoginPassword"
                    :aria-label="showLoginPassword ? 'Hide password' : 'Show password'"
                  >
                    <svg v-if="!showLoginPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Remember me -->
              <div class="checkbox-row">
                <label class="custom-checkbox">
                  <input v-model="loginData.rememberMe" type="checkbox" />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">{{ $t('auth.rememberMe') }}</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary btn-submit" :disabled="isLoading">
                <span v-if="!isLoading">{{ $t('auth.submitLogin') }}</span>
                <span v-else class="spinner-row">
                  <span class="btn-spinner"></span>
                  <span>Conectando...</span>
                </span>
                <svg v-if="!isLoading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <!-- Divider -->
              <div class="auth-divider">
                <span>{{ $t('auth.orDivider') }}</span>
              </div>

              <!-- Google OAuth Button -->
              <button type="button" class="btn-google" @click="handleGoogleAuth" :disabled="isLoading">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{{ $t('auth.googleLogin') }}</span>
              </button>

              <!-- Bottom Toggle Link -->
              <p class="auth-toggle-hint">
                {{ $t('auth.dontHaveAccount') }} 
                <button type="button" class="link-btn" @click="setTab('register')">
                  {{ $t('auth.registerHere') }}
                </button>
              </p>
            </form>

            <!-- 2. REGISTER FORM -->
            <form v-else key="register-form" @submit.prevent="handleRegister" class="auth-form" novalidate>
              <div class="register-grid">
                <!-- Column 1: Dados Pessoais -->
                <div class="register-col">
                  <!-- Full Name (Firestore displayName) -->
                  <div class="form-group">
                    <label for="reg-name" class="form-label">
                      {{ $t('auth.name') }} <span class="required-star">*</span>
                    </label>
                    <div class="input-wrapper">
                      <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                      <input 
                        id="reg-name" 
                        v-model="registerData.name" 
                        type="text" 
                        class="form-input" 
                        :placeholder="$t('auth.namePlaceholder')" 
                      />
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="form-group">
                    <label for="reg-email" class="form-label">
                      {{ $t('auth.email') }} <span class="required-star">*</span>
                    </label>
                    <div class="input-wrapper">
                      <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </span>
                      <input 
                        id="reg-email" 
                        v-model="registerData.email" 
                        type="email" 
                        class="form-input" 
                        :placeholder="$t('auth.emailPlaceholder')" 
                      />
                    </div>
                  </div>

                  <!-- Phone / WhatsApp (Firestore field - optional) with automatic formatting -->
                  <div class="form-group">
                    <label for="reg-phone" class="form-label">
                      {{ $t('auth.phone') }} <span class="optional-tag">({{ $t('auth.optional') }})</span>
                    </label>
                    <div class="input-wrapper">
                      <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </span>
                      <input 
                        id="reg-phone" 
                        v-model="registerData.phone" 
                        @input="formatPhoneInput"
                        type="tel" 
                        class="form-input" 
                        :placeholder="$t('auth.phonePlaceholder')" 
                      />
                    </div>
                  </div>
                </div>

                <!-- Column 2: Credenciais & Segurança -->
                <div class="register-col">
                  <!-- Password -->
                  <div class="form-group">
                    <label for="reg-password" class="form-label">
                      {{ $t('auth.password') }} <span class="required-star">*</span>
                    </label>
                    <div class="input-wrapper">
                      <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                      <input 
                        id="reg-password" 
                        v-model="registerData.password" 
                        :type="showRegPassword ? 'text' : 'password'" 
                        class="form-input" 
                        :placeholder="$t('auth.passwordPlaceholder')" 
                      />
                      <button 
                        type="button" 
                        class="pwd-toggle" 
                        @click="showRegPassword = !showRegPassword"
                        :aria-label="showRegPassword ? 'Hide password' : 'Show password'"
                      >
                        <svg v-if="!showRegPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Confirm Password -->
                  <div class="form-group">
                    <label for="reg-confirm" class="form-label">
                      {{ $t('auth.confirmPassword') }} <span class="required-star">*</span>
                    </label>
                    <div class="input-wrapper">
                      <span class="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                      <input 
                        id="reg-confirm" 
                        v-model="registerData.confirmPassword" 
                        :type="showRegPassword ? 'text' : 'password'" 
                        class="form-input" 
                        :placeholder="$t('auth.confirmPasswordPlaceholder')" 
                      />
                    </div>
                  </div>

                  <!-- Password Policy Dynamic Visual Checklist -->
                  <div class="pwd-requirements">
                    <div class="pwd-requirement-title">{{ $t('auth.rules.title') }}</div>
                    <div class="pwd-badges">
                      <span class="pwd-badge" :class="{ 'valid': pwdStrength.hasMinLength }">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline v-if="pwdStrength.hasMinLength" points="20 6 9 17 4 12"></polyline>
                          <circle v-else cx="12" cy="12" r="6"></circle>
                        </svg>
                        <span>{{ $t('auth.rules.minChars') }}</span>
                      </span>
                      <span class="pwd-badge" :class="{ 'valid': pwdStrength.hasUppercase }">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline v-if="pwdStrength.hasUppercase" points="20 6 9 17 4 12"></polyline>
                          <circle v-else cx="12" cy="12" r="6"></circle>
                        </svg>
                        <span>{{ $t('auth.rules.uppercase') }}</span>
                      </span>
                      <span class="pwd-badge" :class="{ 'valid': pwdStrength.hasSpecialChar }">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline v-if="pwdStrength.hasSpecialChar" points="20 6 9 17 4 12"></polyline>
                          <circle v-else cx="12" cy="12" r="6"></circle>
                        </svg>
                        <span>{{ $t('auth.rules.specialChar') }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Terms agreement (Mandatory) -->
              <div class="checkbox-row" :class="{ 'has-terms-error': termsError }">
                <label class="custom-checkbox">
                  <input 
                    v-model="registerData.agreeTerms" 
                    type="checkbox" 
                    @change="termsError = false"
                  />
                  <span class="checkmark" :class="{ 'checkmark-error': termsError }"></span>
                  <span class="checkbox-text terms-text">
                    {{ $t('auth.agreeTerms') }} 
                    <router-link to="/terms" target="_blank" class="legal-link">{{ $t('auth.termsLink') }}</router-link> 
                    {{ $t('auth.and') }} 
                    <router-link to="/privacy" target="_blank" class="legal-link">{{ $t('auth.privacyLink') }}</router-link>
                    <span class="required-star">*</span>
                  </span>
                </label>
                <!-- Visual Inline Error when not checked -->
                <transition name="fade">
                  <p v-if="termsError" class="terms-error-msg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{{ $t('auth.errors.termsRequired') }}</span>
                  </p>
                </transition>
              </div>

              <!-- Action Buttons Row (Side by side on desktop) -->
              <div class="auth-actions-group">
                <button type="submit" class="btn btn-primary btn-submit" :disabled="isLoading">
                  <span v-if="!isLoading">{{ $t('auth.submitRegister') }}</span>
                  <span v-else class="spinner-row">
                    <span class="btn-spinner"></span>
                    <span>Criando conta...</span>
                  </span>
                  <svg v-if="!isLoading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <button type="button" class="btn-google" @click="handleGoogleAuth" :disabled="isLoading">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>{{ $t('auth.googleRegister') }}</span>
                </button>
              </div>

              <!-- Bottom Toggle Link -->
              <p class="auth-toggle-hint">
                {{ $t('auth.alreadyHaveAccount') }} 
                <button type="button" class="link-btn" @click="setTab('login')">
                  {{ $t('auth.loginHere') }}
                </button>
              </p>
            </form>
          </transition>
        </template>

        <!-- Institutional Footer -->
        <div class="auth-footer-badge">
          <span>&copy; Direitos reservados Vyliam Systems</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth, evaluatePasswordStrength } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const {
  registerUser,
  loginUser,
  loginWithGoogle,
  resetPassword,
  mapAuthError
} = useAuth()

// Tab state: 'login' or 'register'
const activeTab = ref(route.query.tab === 'register' || route.path.includes('register') ? 'register' : 'login')

// Secondary UI states
const isForgotPassword = ref(false)
const resetEmail = ref('')
const termsError = ref(false)

function setTab(tab) {
  activeTab.value = tab
  isForgotPassword.value = false
  feedbackMessage.value = ''
  termsError.value = false
}

// Watch route changes
watch(() => route.query.tab, (newTab) => {
  if (newTab === 'register' || newTab === 'login') {
    activeTab.value = newTab
    isForgotPassword.value = false
    feedbackMessage.value = ''
    termsError.value = false
  }
})

// Form data
const loginData = reactive({
  email: '',
  password: '',
  rememberMe: true
})

const registerData = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// Dynamic Password strength evaluation for Firebase console policy
const pwdStrength = computed(() => evaluatePasswordStrength(registerData.password))

// Automatic Phone Formatter for Brazilian standard (XX) XXXXX-XXXX
function formatPhoneInput(event) {
  let val = event.target.value.replace(/\D/g, '')
  if (val.length > 11) val = val.slice(0, 11)
  if (val.length > 6) {
    registerData.phone = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`
  } else if (val.length > 2) {
    registerData.phone = `(${val.slice(0, 2)}) ${val.slice(2)}`
  } else if (val.length > 0) {
    registerData.phone = `(${val}`
  } else {
    registerData.phone = ''
  }
}

// UI state
const showLoginPassword = ref(false)
const showRegPassword = ref(false)
const isLoading = ref(false)
const feedbackMessage = ref('')
const feedbackType = ref('success') // 'success' | 'error' | 'warning'

function showFeedback(msg, type = 'success', autoClose = true) {
  feedbackMessage.value = msg
  feedbackType.value = type
  if (autoClose && type !== 'error' && type !== 'warning') {
    setTimeout(() => {
      if (feedbackMessage.value === msg) {
        feedbackMessage.value = ''
      }
    }, 6000)
  }
}

// Action: Handle User Registration
async function handleRegister() {
  feedbackMessage.value = ''
  termsError.value = false

  // 1. Mandatory Fields Validation
  if (!registerData.name || !registerData.name.trim()) {
    showFeedback(t('auth.errors.nameRequired'), 'error')
    return
  }
  if (!registerData.email || !registerData.email.trim()) {
    showFeedback(t('auth.errors.emailRequired'), 'error')
    return
  }
  if (!registerData.password) {
    showFeedback(t('auth.errors.passwordRequired'), 'error')
    return
  }
  if (!registerData.confirmPassword) {
    showFeedback(t('auth.errors.confirmPasswordRequired'), 'error')
    return
  }

  // 2. Password Confirmation Match Check
  if (registerData.password !== registerData.confirmPassword) {
    showFeedback(t('auth.errors.passwordMismatch'), 'error')
    return
  }

  // 3. Firebase Password Policy Checks
  if (!pwdStrength.value.hasMinLength) {
    showFeedback(t('auth.errors.passwordTooShort'), 'error')
    return
  }
  if (!pwdStrength.value.hasUppercase) {
    showFeedback(t('auth.errors.passwordNoUppercase'), 'error')
    return
  }
  if (!pwdStrength.value.hasSpecialChar) {
    showFeedback(t('auth.errors.passwordNoSpecial'), 'error')
    return
  }

  // 4. Mandatory Terms and Conditions Check
  if (!registerData.agreeTerms) {
    termsError.value = true
    showFeedback(t('auth.errors.termsRequired'), 'error')
    return
  }

  isLoading.value = true

  try {
    await registerUser({
      name: registerData.name.trim(),
      email: registerData.email.trim(),
      phone: registerData.phone ? registerData.phone.trim() : '',
      password: registerData.password
    })

    showFeedback('Conta criada com sucesso! Acessando plataforma...', 'success')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    console.error('Registration error:', err)
    const friendlyMsg = mapAuthError(err, t)
    showFeedback(friendlyMsg, 'error')
  } finally {
    isLoading.value = false
  }
}

// Action: Handle User Login
async function handleLogin() {
  feedbackMessage.value = ''
  if (!loginData.email || !loginData.email.trim()) {
    showFeedback(t('auth.errors.emailRequired'), 'error')
    return
  }
  if (!loginData.password) {
    showFeedback(t('auth.errors.passwordRequired'), 'error')
    return
  }

  isLoading.value = true

  try {
    await loginUser(loginData.email.trim(), loginData.password)
    showFeedback('Login realizado com sucesso! Redirecionando...', 'success')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    console.error('Login error:', err)
    const friendlyMsg = mapAuthError(err, t)
    showFeedback(friendlyMsg, 'error')
  } finally {
    isLoading.value = false
  }
}

// Action: Handle Google Sign In
async function handleGoogleAuth() {
  feedbackMessage.value = ''
  isLoading.value = true

  try {
    await loginWithGoogle()
    showFeedback('Autenticado com sucesso via Google!', 'success')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    console.error('Google auth error:', err)
    const friendlyMsg = mapAuthError(err, t)
    showFeedback(friendlyMsg, 'error')
  } finally {
    isLoading.value = false
  }
}

// Action: Open Forgot Password Form
function openForgotPassword() {
  resetEmail.value = loginData.email || ''
  isForgotPassword.value = true
  feedbackMessage.value = ''
  termsError.value = false
}

// Action: Send Password Reset Link
async function handleSendPasswordReset() {
  if (!resetEmail.value || !resetEmail.value.trim()) {
    showFeedback(t('auth.errors.invalidEmail'), 'error')
    return
  }

  isLoading.value = true
  feedbackMessage.value = ''

  try {
    await resetPassword(resetEmail.value.trim())
    showFeedback(t('auth.reset.sentSuccess'), 'success', false)
    setTimeout(() => {
      isForgotPassword.value = false
    }, 3000)
  } catch (err) {
    console.error('Password reset error:', err)
    showFeedback(mapAuthError(err, t), 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-view {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem 3.5rem;
  background-color: var(--bg-subtle);
  position: relative;
  overflow-x: hidden;
  max-width: 100%;
}

.auth-view::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: min(750px, 100vw);
  height: 550px;
  background: radial-gradient(circle, rgba(1, 83, 198, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.container-auth {
  max-width: 480px;
  width: 100%;
  transition: max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 768px) {
  .container-auth.is-register {
    max-width: 860px;
  }
}

.auth-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-xl);
  padding: 2.25rem 2rem;
  box-shadow: 0 12px 36px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(1, 83, 198, 0.04);
  transition: padding 0.3s ease;
}

@media (min-width: 768px) {
  .auth-card.card-register {
    padding: 2.5rem 2.75rem;
  }
}

/* Brand Header */
.auth-header {
  margin-bottom: 2rem;
}

.auth-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
}

.brand-symbol {
  filter: drop-shadow(0 2px 8px rgba(1, 83, 198, 0.2));
  transition: transform var(--transition-base);
}

.auth-brand:hover .brand-symbol {
  transform: scale(1.05) rotate(-2deg);
}

.brand-text {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--text-main);
}

.brand-sub {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--primary);
}

.auth-title {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.4rem;
  letter-spacing: -0.015em;
}

.auth-subtitle {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.45;
  max-width: 520px;
  margin: 0 auto;
}

/* Segmented Tab Switcher */
.tab-control {
  display: flex;
  background: #f1f5f9;
  padding: 0.35rem;
  border-radius: var(--radius-md);
  margin: 0 auto 1.5rem;
  border: 1px solid #e2e8f0;
  max-width: 360px;
  width: 100%;
}

.tab-btn {
  flex: 1;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #64748b;
  border-radius: calc(var(--radius-md) - 3px);
  background: transparent;
  transition: all var(--transition-fast);
  text-align: center;
}

.tab-btn:hover:not(.active) {
  color: var(--text-main);
}

.tab-btn.active {
  background: #ffffff;
  color: var(--primary);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
}

/* Feedback Alert Banner */
.feedback-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.45;
  animation: slideDown 0.25s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.feedback-content {
  flex: 1;
}

.feedback-text {
  margin: 0;
  font-weight: 500;
}

.feedback-close {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  padding: 0 0.25rem;
  transition: opacity 0.15s;
}

.feedback-close:hover {
  opacity: 1;
}

.feedback-success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
}

.feedback-warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #b45309;
}

.feedback-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
}

.alert-resend-btn {
  margin-top: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #b45309;
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.alert-resend-btn:hover {
  color: #78350f;
}

/* Form Styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

/* 2-Column Register Grid on PC */
.register-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.15rem;
}

.register-col {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

@media (min-width: 768px) {
  .register-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
  display: flex;
  align-items: center;
}

.required-star {
  color: #dc2626;
  font-weight: 700;
  margin-left: 3px;
  line-height: 1;
}

.optional-tag {
  color: #94a3b8;
  font-size: 0.78rem;
  font-weight: 400;
  margin-left: 6px;
}

.forgot-link-btn {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--primary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition-fast);
}

.forgot-link-btn:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 2.75rem 0 2.75rem;
  border-radius: var(--radius-md);
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: var(--text-main);
  font-size: 0.9375rem;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(1, 83, 198, 0.12);
}

.form-input::placeholder {
  color: #94a3b8;
  font-size: 0.875rem;
}

.pwd-toggle {
  position: absolute;
  right: 0.75rem;
  padding: 0.5rem;
  color: #94a3b8;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
}

.pwd-toggle:hover {
  color: var(--text-main);
}

/* Password Requirements Checklist */
.pwd-requirements {
  margin-top: 0;
  padding: 0.75rem 0.95rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-sm);
}

.pwd-requirement-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pwd-badges {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.pwd-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: #94a3b8;
  transition: color var(--transition-fast);
}

.pwd-badge.valid {
  color: #16a34a;
  font-weight: 600;
}

.pwd-badge.valid svg {
  color: #16a34a;
}

/* Checkbox Row */
.checkbox-row {
  margin: 0.2rem 0;
}

.custom-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.65rem;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.custom-checkbox input:checked ~ .checkmark {
  background: var(--primary);
  border-color: var(--primary);
}

.custom-checkbox input:checked ~ .checkmark::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.checkbox-text {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.4;
}

.terms-text {
  font-size: 0.8125rem;
}

.legal-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: underline;
}

.legal-link:hover {
  color: var(--primary-hover);
}

.checkmark-error {
  border-color: #dc2626 !important;
  background-color: #fef2f2 !important;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.25);
  animation: checkmarkShake 0.35s ease-in-out;
}

@keyframes checkmarkShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
}

.terms-error-msg {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: #dc2626;
  font-size: 0.8125rem;
  font-weight: 500;
  margin-top: 0.5rem;
  padding: 0.45rem 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-sm);
  animation: slideDown 0.2s ease-out;
}

.terms-error-msg svg {
  flex-shrink: 0;
  color: #dc2626;
}

/* Submit Button */
.btn-submit {
  width: 100%;
  height: 48px;
  font-size: 0.9375rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px rgba(1, 83, 198, 0.25);
  margin-top: 0.25rem;
}

.spinner-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Actions Group (Side by side on desktop) */
.auth-actions-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

@media (min-width: 640px) {
  .auth-actions-group {
    flex-direction: row;
    align-items: stretch;
    gap: 1rem;
  }

  .auth-actions-group .btn-submit,
  .auth-actions-group .btn-google {
    flex: 1;
    margin-top: 0;
  }
}

/* Divider */
.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.auth-divider span {
  padding: 0 0.85rem;
  font-size: 0.8125rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* Google Button */
.btn-google {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-google:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #94a3b8;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.btn-google:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Bottom Hint */
.auth-toggle-hint {
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

.link-btn {
  background: transparent;
  border: none;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.2rem;
  font-size: inherit;
  transition: color var(--transition-fast);
}

.link-btn:hover {
  text-decoration: underline;
  color: var(--primary-hover);
}

/* Verification Screen */
.verification-card {
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.verif-icon-wrap {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.25rem;
  border-radius: 50%;
  background: rgba(1, 83, 198, 0.08);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 8px rgba(1, 83, 198, 0.03);
}

.verif-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.verif-desc {
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.verif-target-email {
  color: var(--text-main);
  font-weight: 700;
}

.verif-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 1.75rem;
}

.verif-box svg {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 1px;
}

.verif-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Forgot Password Card */
.forgot-card {
  animation: fadeIn 0.3s ease;
}

.back-btn {
  margin-top: 0.5rem;
  color: #64748b;
}

.back-btn:hover {
  color: var(--text-main);
}

/* Institutional Footer Badge */
.auth-footer-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  font-size: 0.75rem;
  color: #94a3b8;
  letter-spacing: 0.02em;
}

.auth-footer-badge svg {
  color: #64748b;
}

/* Transitions */
.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.auth-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.auth-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 640px) {
  .auth-view {
    padding: 1.5rem 1rem 2.5rem;
  }

  .auth-card {
    padding: 1.6rem 1.15rem;
    border-radius: var(--radius-lg);
  }

  .auth-title {
    font-size: 1.35rem;
  }

  .auth-subtitle {
    font-size: 0.875rem;
  }

  .tab-control {
    max-width: 100%;
    width: 100%;
  }

  .tab-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 400px) {
  .auth-card {
    padding: 1.35rem 0.95rem;
  }
}
</style>
