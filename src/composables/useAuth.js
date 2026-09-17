import { ref, computed } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, googleProvider } from '../firebase/config.js'

// Global reactive states
const currentUser = ref(null)
const userProfile = ref(null)
const authLoading = ref(true)

// Password Policy Evaluator (Matches Firebase Console settings: min 6 chars, uppercase, special char)
export function evaluatePasswordStrength(password) {
  const pwd = password || ''
  return {
    hasMinLength: pwd.length >= 6,
    hasUppercase: /[A-Z]/.test(pwd),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\\/]/.test(pwd),
  }
}

export function isPasswordPolicyCompliant(password) {
  const { hasMinLength, hasUppercase, hasSpecialChar } = evaluatePasswordStrength(password)
  return hasMinLength && hasUppercase && hasSpecialChar
}

// Fetch or initialize Firestore User Profile
async function fetchUserProfile(uid) {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      userProfile.value = docSnap.data()
    } else {
      userProfile.value = null
    }
  } catch (err) {
    console.error('Error fetching Firestore user profile:', err)
  }
}

// Global Auth State Observer
onAuthStateChanged(auth, async (user) => {
  currentUser.value = user
  if (user) {
    await fetchUserProfile(user.uid)
    // If email was verified recently, update Firestore record
    if (user.emailVerified && userProfile.value && !userProfile.value.emailVerified) {
      try {
        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, { emailVerified: true, updatedAt: serverTimestamp() })
        userProfile.value.emailVerified = true
      } catch (err) {
        console.warn('Could not update emailVerified flag in Firestore:', err)
      }
    }
  } else {
    userProfile.value = null
  }
  authLoading.value = false
})

export function useAuth() {
  const isAuthenticated = computed(() => !!currentUser.value)
  const isEmailVerified = computed(() => !!currentUser.value?.emailVerified)

  /**
   * Register a new user with email and password
   */
  async function registerUser({ name, email, phone, password }) {
    const cleanEmail = email.trim()
    const cleanName = name.trim()
    const cleanPhone = phone.trim()

    // Validate password policy before sending to Firebase
    const { hasMinLength, hasUppercase, hasSpecialChar } = evaluatePasswordStrength(password)
    if (!hasMinLength) {
      const err = new Error('A senha deve ter no mínimo 6 caracteres.')
      err.code = 'auth/password-too-short'
      throw err
    }
    if (!hasUppercase) {
      const err = new Error('A senha deve conter pelo menos uma letra maiúscula.')
      err.code = 'auth/password-no-uppercase'
      throw err
    }
    if (!hasSpecialChar) {
      const err = new Error('A senha deve conter pelo menos um caractere especial.')
      err.code = 'auth/password-no-special'
      throw err
    }

    // 1. Create user in Firebase Authentication
    const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password)
    const user = credential.user

    // 2. Set displayName in Firebase Auth
    if (cleanName) {
      await updateProfile(user, { displayName: cleanName })
    }

    // 3. Save profile in Cloud Firestore 'users' collection
    try {
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        uid: user.uid,
        name: cleanName,
        email: cleanEmail.toLowerCase(),
        phone: cleanPhone,
        role: 'client',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      await fetchUserProfile(user.uid)
    } catch (dbErr) {
      console.error('Error saving user to Firestore:', dbErr)
    }

    return user
  }

  /**
   * Sign in existing user with email and password
   */
  async function loginUser(email, password) {
    const cleanEmail = email.trim()
    const credential = await signInWithEmailAndPassword(auth, cleanEmail, password)
    const user = credential.user

    await fetchUserProfile(user.uid)
    return user
  }

  /**
   * Sign in with Google Popup
   */
  async function loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider)
    const user = credential.user

    // Ensure Firestore profile document exists
    const userRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(userRef)

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || '',
        email: (user.email || '').toLowerCase(),
        phone: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        role: 'client',
        emailVerified: true,
        provider: 'google',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    }
    await fetchUserProfile(user.uid)
    return user
  }

  /**
   * Resend email verification to the current user
   */
  async function resendVerificationEmail() {
    if (!auth.currentUser) {
      throw new Error('Nenhum usuário logado.')
    }
    await sendEmailVerification(auth.currentUser)
    return true
  }

  /**
   * Send Password Reset Email
   */
  async function resetPassword(email) {
    const cleanEmail = email.trim()
    if (!cleanEmail) {
      throw new Error('Informe o e-mail para recuperação.')
    }
    await sendPasswordResetEmail(auth, cleanEmail)
    return true
  }

  /**
   * Reload current user to check updated emailVerified status
   */
  async function reloadUser() {
    if (auth.currentUser) {
      await auth.currentUser.reload()
      currentUser.value = { ...auth.currentUser }
      if (auth.currentUser.emailVerified && userProfile.value && !userProfile.value.emailVerified) {
        try {
          const userRef = doc(db, 'users', auth.currentUser.uid)
          await updateDoc(userRef, { emailVerified: true, updatedAt: serverTimestamp() })
          userProfile.value.emailVerified = true
        } catch (e) {
          console.warn(e)
        }
      }
    }
    return currentUser.value
  }

  /**
   * Sign out current user
   */
  async function logoutUser() {
    await signOut(auth)
    currentUser.value = null
    userProfile.value = null
  }

  /**
   * Translate Firebase Auth error codes to user-friendly messages
   */
  function mapAuthError(err, t) {
    if (!err) return ''
    const code = err.code || ''

    switch (code) {
      case 'auth/email-already-in-use':
        return t ? t('auth.errors.emailAlreadyInUse') : 'Este e-mail já está cadastrado. Faça login ou redefina sua senha.'
      case 'auth/invalid-email':
        return t ? t('auth.errors.invalidEmail') : 'O formato do e-mail informado é inválido.'
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return t ? t('auth.errors.invalidCredentials') : 'E-mail ou senha incorretos. Verifique suas credenciais.'
      case 'auth/weak-password':
      case 'auth/password-too-short':
        return t ? t('auth.errors.passwordTooShort') : 'A senha deve ter no mínimo 6 caracteres.'
      case 'auth/password-no-uppercase':
        return t ? t('auth.errors.passwordNoUppercase') : 'A senha deve conter pelo menos uma letra maiúscula (A-Z).'
      case 'auth/password-no-special':
        return t ? t('auth.errors.passwordNoSpecial') : 'A senha deve conter pelo menos um caractere especial (!@#$...).'
      case 'auth/user-disabled':
        return t ? t('auth.errors.userDisabled') : 'Esta conta de usuário foi desativada pelo administrador.'
      case 'auth/too-many-requests':
        return t ? t('auth.errors.tooManyRequests') : 'Muitas tentativas sem sucesso. Aguarde alguns instantes ou redefina sua senha.'
      case 'auth/popup-closed-by-user':
        return t ? t('auth.errors.popupClosed') : 'A janela de autenticação com o Google foi fechada antes de finalizar.'
      case 'auth/network-request-failed':
        return t ? t('auth.errors.networkFailed') : 'Erro de conexão com a rede. Verifique sua conexão com a internet.'
      case 'auth/api-key-not-valid':
      case 'auth/invalid-api-key':
        return 'Chave de API do Firebase não autorizada. Verifique se o domínio está configurado no Firebase Console.'
      case 'auth/missing-password':
        return t ? t('auth.errors.missingPassword') : 'Por favor, informe a senha.'
      default:
        return err.message || (t ? t('auth.errors.generic') : 'Ocorreu um erro ao processar. Tente novamente.')
    }
  }

  return {
    currentUser,
    userProfile,
    authLoading,
    isAuthenticated,
    isEmailVerified,
    registerUser,
    loginUser,
    loginWithGoogle,
    resendVerificationEmail,
    resetPassword,
    reloadUser,
    logoutUser,
    mapAuthError,
    evaluatePasswordStrength,
    isPasswordPolicyCompliant
  }
}
