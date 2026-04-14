import { getBookById } from '../../../lib/openLibrary'
import BookDetail from '../../../components/book/BookDetail'

export default async function BookPage({ params }) {
  const { id } = await params
  const book = await getBookById(id)

  return <BookDetail book={book} />
}