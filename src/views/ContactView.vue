<template>
  <div class="contact-view">
    <div class="container contact-container">
      <div class="contact-grid">
        <!-- Left: Direct Info & Socials -->
        <div class="contact-info-col">
          <div class="contact-badge">
            <span>{{ $t('contact.badge') }}</span>
          </div>
          <h1 class="contact-title">{{ $t('contact.title') }}</h1>
          <p class="contact-subtitle">{{ $t('contact.subtitle') }}</p>

          <div class="direct-cards">
            <!-- Email -->
            <div class="direct-card card">
              <div class="direct-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <span class="direct-label">{{ $t('contact.directInfo.engineering') }}</span>
                <a :href="'mailto:' + $t('contact.directInfo.email')" class="direct-val">{{ $t('contact.directInfo.email') }}</a>
              </div>
            </div>

            <!-- Location -->
            <div class="direct-card card">
              <div class="direct-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" stroke-width="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <span class="direct-label">{{ $t('contact.directInfo.headquarters') }}</span>
                <span class="direct-val">{{ $t('contact.directInfo.location') }}</span>
              </div>
            </div>

            <!-- Response Rate -->
            <div class="direct-card card">
              <div class="direct-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <span class="direct-label">{{ $t('contact.directInfo.availability') }}</span>
                <span class="direct-val">{{ $t('contact.directInfo.responseRate') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Functional Contact Form -->
        <div class="contact-form-col">
          <div class="form-card card">
            <h2 class="form-title">{{ $t('contact.form.title') }}</h2>
            
            <form @submit.prevent="handleSubmit" class="contact-form">
              <!-- Name Input -->
              <div class="form-group">
                <label for="name" class="form-label">{{ $t('contact.form.name') }}</label>
                <input 
                  id="name"
                  v-model="formData.name"
                  type="text" 
                  required
                  :placeholder="$t('contact.form.namePlaceholder')"
                  class="form-input"
                />
              </div>

              <!-- Email Input -->
              <div class="form-group">
                <label for="email" class="form-label">{{ $t('contact.form.email') }}</label>
                <input 
                  id="email"
                  v-model="formData.email"
                  type="email" 
                  required
                  :placeholder="$t('contact.form.emailPlaceholder')"
                  class="form-input"
                />
              </div>

              <!-- Subject Input -->
              <div class="form-group">
                <label for="subject" class="form-label">{{ $t('contact.form.subject') }}</label>
                <input 
                  id="subject"
                  v-model="formData.subject"
                  type="text" 
                  required
                  :placeholder="$t('contact.form.subjectPlaceholder')"
                  class="form-input"
                />
              </div>

              <!-- Message Input -->
              <div class="form-group">
                <label for="message" class="form-label">{{ $t('contact.form.message') }}</label>
                <textarea 
                  id="message"
                  v-model="formData.message"
                  rows="4" 
                  required
                  :placeholder="$t('contact.form.messagePlaceholder')"
                  class="form-textarea"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="btn btn-primary btn-lg w-full"
                :disabled="isSubmitting"
              >
                <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                <svg v-else class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                </svg>
                <span>{{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}</span>
              </button>

              <!-- Alternative Direct Mailto Link -->
              <div class="alternative-box">
                <a :href="directMailtoLink" class="direct-alt-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>{{ $t('contact.form.alternativeDirect') }}</span>
                </a>
              </div>

              <!-- Alerts & Feedback -->
              <transition name="toast-fade">
                <!-- Success Alert -->
                <div v-if="submitStatus === 'success'" class="form-banner form-success-banner">
                  <svg class="banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div>
                    <strong class="banner-title">{{ $t('contact.form.success') }}</strong>
                  </div>
                </div>

                <!-- Activation Needed Banner (FormSubmit First-Time Verification) -->
                <div v-else-if="submitStatus === 'activation'" class="form-banner form-activation-banner">
                  <svg class="banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <div>
                    <div class="banner-text">{{ $t('contact.form.activationNeeded') }}</div>
                  </div>
                </div>

                <!-- Error Alert with Mailto Fallback -->
                <div v-else-if="submitStatus === 'error'" class="form-banner form-error-banner">
                  <svg class="banner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  <div class="error-content">
                    <div class="banner-text">{{ $t('contact.form.error') }}</div>
                    <a :href="mailtoFallbackUrl" class="btn-mailto-fallback">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>{{ $t('contact.form.directMailtoBtn') }}</span>
                    </a>
                  </div>
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null) // 'success' | 'activation' | 'error' | null

const directMailtoLink = computed(() => {
  const defaultSubject = encodeURIComponent('[Vyliam Systems] Contato Comercial / Suporte')
  return `mailto:vyliamsystems@gmail.com?subject=${defaultSubject}`
})

const mailtoFallbackUrl = computed(() => {
  const subject = encodeURIComponent(formData.subject ? `[Vyliam Systems] ${formData.subject}` : 'Contato via site Vyliam Systems')
  const body = encodeURIComponent(
    `Nome: ${formData.name || ''}\n` +
    `E-mail: ${formData.email || ''}\n` +
    `Assunto: ${formData.subject || ''}\n\n` +
    `Mensagem:\n${formData.message || ''}`
  )
  return `mailto:vyliamsystems@gmail.com?subject=${subject}&body=${body}`
})

async function handleSubmit() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitStatus.value = null

  try {
    const response = await fetch('https://formsubmit.co/ajax/vyliamsystems@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        _replyto: formData.email,
        _subject: `[Vyliam Systems] ${formData.subject} - De: ${formData.name}`,
        assunto: formData.subject,
        mensagem: formData.message,
        _template: 'table',
        _captcha: 'false'
      })
    })

    const data = await response.json().catch(() => null)

    if (response.ok && (data?.success === 'true' || data?.success === true)) {
      submitStatus.value = 'success'
      // Clear form
      formData.name = ''
      formData.email = ''
      formData.subject = ''
      formData.message = ''
    } else if (data?.message && data.message.toLowerCase().includes('activation')) {
      // First submission prompts activation email from FormSubmit
      submitStatus.value = 'activation'
    } else {
      submitStatus.value = 'error'
    }
  } catch (err) {
    console.error('Error submitting form:', err)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-view {
  padding: 4.5rem 0 6rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.contact-badge {
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background: var(--primary-subtle);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.contact-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 0.75rem;
}

.contact-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.direct-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.direct-card {
  padding: 1.25rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.direct-icon-box {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.direct-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.direct-val {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-main);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.direct-val:hover {
  color: var(--primary);
}

.form-card {
  padding: 2.5rem;
}

.form-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1.75rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--border-subtle);
  background: var(--bg-main);
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--text-main);
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-textarea {
  resize: vertical;
}

.w-full {
  width: 100%;
}

.alternative-box {
  margin-top: -0.25rem;
  text-align: center;
}

.direct-alt-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.direct-alt-link:hover {
  color: var(--primary);
  text-decoration: underline;
}

.form-banner {
  margin-top: 0.5rem;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  box-shadow: var(--shadow-sm);
  animation: bannerFade 0.3s ease-out;
}

.banner-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.banner-title {
  display: block;
  font-weight: 700;
}

.banner-text {
  font-weight: 500;
}

.form-success-banner {
  background: #ecfdf5;
  color: #065f46;
  border: 1.5px solid #a7f3d0;
}

.form-activation-banner {
  background: #fffbeb;
  color: #92400e;
  border: 1.5px solid #fde68a;
}

.form-error-banner {
  background: #fef2f2;
  color: #991b1b;
  border: 1.5px solid #fecaca;
}

.error-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.btn-mailto-fallback {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dc2626;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  align-self: flex-start;
  transition: background var(--transition-fast);
}

.btn-mailto-fallback:hover {
  background: #b91c1c;
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bannerFade {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .form-card {
    padding: 1.75rem;
  }
}
</style>
