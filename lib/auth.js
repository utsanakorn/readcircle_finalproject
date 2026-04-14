import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export async function signOutUser() {
  await signOut(auth)
}