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
                <span class="direct-label">Engineering & Commercial</span>
                <a href="mailto:contact@vyliam.com" class="direct-val">contact@vyliam.com</a>
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
                <span class="direct-label">Headquarters</span>
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
                <span class="direct-label">Availability</span>
                <span class="direct-val">{{ $t('contact.directInfo.responseRate') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Functional Contact Form -->
        <div class="contact-form-col">
          <div class="form-card card">
            <h2 class="form-title">Send a Direct Message</h2>
            
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

              <!-- Success Alert -->
              <transition name="toast-fade">
                <div v-if="submittedSuccess" class="form-success-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{{ $t('contact.form.success') }}</span>
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
import { reactive, ref } from 'vue'

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submittedSuccess = ref(false)

function handleSubmit() {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    submittedSuccess.value = true
    
    // Clear form
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    
    setTimeout(() => {
      submittedSuccess.value = false
    }, 5000)
  }, 900)
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

.form-success-banner {
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  border-radius: var(--radius-md);
  background: #e8f9ef;
  color: #065f46;
  border: 1px solid #a7f3d0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
