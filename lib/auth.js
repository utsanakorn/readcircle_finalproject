import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

let isSigningIn = false

export async function signInWithGoogle() {
  if (isSigningIn) return
  isSigningIn = true
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } finally {
    isSigningIn = false
  }
}

export async function signOutUser() {
  await signOut(auth)
}