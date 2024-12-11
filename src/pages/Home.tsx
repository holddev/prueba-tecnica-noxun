import React, { useEffect, useState } from "react"
import { Post } from "../types"
import { Pagination } from "../components/Pagination"
import { PostsList } from "../components/PostsList"
import './Home.css'
import { usePagination } from "../hooks/usePagination"

interface Props {
  searchParam: string
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const Home: React.FC<Props> = ({ searchParam }) => {

  const [post, setPost] = useState<Post[]>([])
  const {
    paginatedItems,
    currentPage,
    pageNumbers,
    onChangePage
  } = usePagination({ itemsByPage: 10, items: post })

  useEffect(() => {
    fetch(POSTS_URL)
      .then(res => res.json())
      .then(data => {
        setPost(() => data)
      })
  }, [])

  const filteredPosts = post.filter(({ title, body }) => {
    const titleSearch = title.toLowerCase()
    const bodySearch = body.toLowerCase()
    const searchPost = searchParam.toLowerCase()
    return titleSearch.includes(searchPost) || bodySearch.includes(searchPost)
  })

  const currentPosts = searchParam ?
    filteredPosts : paginatedItems

  return (
    <>
      <main className="Home">
        {
          currentPosts.length > 0 ? ((
            <PostsList
              currentPosts={currentPosts}
            />
          ))
            : <p className="Home-p">No se encontro ningun recurso</p>
        }
        {
          !searchParam && (
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