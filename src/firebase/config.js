import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Firebase configuration provided from Firebase Console for project 'websitevyliam'
const firebaseConfig = {
  apiKey: "AIzaSyDDN0_ducncDyrzOG98p5Up3hEmmirqYps",
  authDomain: "websitevyliam.firebaseapp.com",
  projectId: "websitevyliam",
  storageBucket: "websitevyliam.firebasestorage.app",
  messagingSenderId: "790645403641",
  appId: "1:790645403641:web:b24d4d63b1fcea76e79728",
  measurementId: "G-PJY8PYEHE9"
}

// Initialize Firebase App
export const app = initializeApp(firebaseConfig)

// Initialize Firebase Services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Analytics safely
export let analytics = null
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  }).catch(() => {})
}

// Configure Google Provider options
googleProvider.setCustomParameters({
  prompt: 'select_account'
})
