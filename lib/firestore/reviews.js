import { db } from '../firebase'
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, where, orderBy, serverTimestamp,
} from 'firebase/firestore'

export async function addReview({ uid, bookId, rating, text }) {
  await addDoc(collection(db, 'reviews'), {
    uid, bookId, rating, text,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateReview(reviewId, { rating, text }) {
  await updateDoc(doc(db, 'reviews', reviewId), {
    rating, text, updatedAt: serverTimestamp(),
  })
}

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, 'reviews', reviewId))
}

export function subscribeReviews(bookId, callback) {
  const q = query(
    collection(db, 'reviews'),
    where('bookId', '==', bookId),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}