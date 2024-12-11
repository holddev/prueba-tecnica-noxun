interface iterableItems {
  name?: string
  title?: string
  body: string
}

interface Props<T> {
  searchParam: string
  items: T[]
}
export const useFilter = <T extends iterableItems>({ items, searchParam }: Props<T>) => {

  const search = searchParam.toLowerCase()

  const filteredItems = items.filter(({ title, name, body }) => {
    const nameMatch = name && name.toLowerCase().includes(search)
    const bodyMatch = body.toLowerCase().includes(search)
    const titleMatch = title && title.toLowerCase().includes(search)

    return nameMatch || bodyMatch || titleMatch
  })

  return { filteredItems }
}