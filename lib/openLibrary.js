const BASE = 'https://openlibrary.org'

export async function searchBooks(query) {
  if (!query.trim()) return []

  const url = `${BASE}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`
  const res  = await fetch(url)
  if (!res.ok) throw new Error('Search failed')

  const data = await res.json()

  return (data.docs || []).map((doc) => ({
    id:       doc.key?.replace('/works/', '') ?? '',
    title:    doc.title ?? 'Unknown Title',
    author:   doc.author_name?.[0] ?? 'Unknown Author',
    coverUrl: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : null,
    year:     doc.first_publish_year ?? null,
  }))
}

export async function getBookById(id) {
  const res = await fetch(`${BASE}/works/${id}.json`)
  if (!res.ok) throw new Error(`Book not found: ${id}`)

  const work = await res.json()

  const description =
    typeof work.description === 'string'
      ? work.description
      : work.description?.value ?? 'No description available.'

  const coverId  = work.covers?.[0]
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null

  return {
    id,
    title:       work.title ?? 'Unknown Title',
    description,
    coverUrl,
    year:        work.first_publish_date ?? null,
    subjects:    work.subjects?.slice(0, 6) ?? [],
  }
}