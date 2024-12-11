import { useState } from "react"

interface Props<T> {
  items: T[]
  itemsByPage: number
}

export const usePagination = <T>({ items, itemsByPage }: Props<T>) => {

  const [currentPage, setCurrentPage] = useState(1)
  const indexLastItem = currentPage * itemsByPage
  const indexFirstItem = indexLastItem - itemsByPage

  const totalPages = Math.ceil(items.length / itemsByPage)
  const paginatedItems = items.slice(indexFirstItem, indexLastItem)
  const pageNumbers = [...Array(totalPages).keys()].map((x) => x + 1);

  function onChangePage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return { paginatedItems, currentPage, onChangePage, pageNumbers }
}