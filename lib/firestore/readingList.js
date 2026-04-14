import { db } from '../firebase'
import {
  collection, doc, setDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp,
} from 'firebase/firestore'

export async function saveBook(uid, book) {
  const ref = doc(db, 'users', uid, 'readingList', book.id)
  await setDoc(ref, { ...book, savedAt: serverTimestamp() })
}

export async function removeBook(uid, bookId) {
  await deleteDoc(doc(db, 'users', uid, 'readingList', bookId))
}

export function subscribeReadingList(uid, callback) {
  const q = query(
    collection(db, 'users', uid, 'readingList'),
    orderBy('savedAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}