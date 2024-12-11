import React, { useEffect, useState } from "react"
import { Post } from "../types"
import { Pagination } from "../components/Pagination"
import { PostsList } from "../components/PostsList"
import './Home.css'
import { usePagination } from "../hooks/usePagination"
import { useFilter } from "../hooks/useFilter"

interface Props {
  searchParam: string
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const Home: React.FC<Props> = ({ searchParam }) => {

  const [post, setPost] = useState<Post[]>([])
  const { filteredItems } = useFilter({ searchParam: searchParam, items: post })
  const {
    paginatedItems,
    currentPage,
    pageNumbers,
    onChangePage
  } = usePagination({ itemsByPage: 10, items: filteredItems })


  useEffect(() => {
    fetch(POSTS_URL)
      .then(res => res.json())
      .then(data => {
        setPost(() => data)
      })
  }, [])


  return (
    <>
      <main className="Home">
        {
          paginatedItems.length > 0 ? ((
            <PostsList
              currentPosts={paginatedItems}
            />
          ))
            : <p className="Home-p">No se encontro ningun recurso</p>
        }
        {
          (filteredItems.length > 10 && !searchParam) && (
            <Pagination
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              onChangePage={onChangePage}
            />
          )
        }
      </main>

    </>
  )
}