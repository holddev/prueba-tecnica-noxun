import React, { useEffect, useState } from "react"
import { Post } from "../types"
import { Pagination } from "../components/Pagination"
import { PostsList } from "../components/PostsList"
import './Home.css'

interface Props {
  searchParam: string
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export const Home: React.FC<Props> = ({ searchParam }) => {

  const [post, setPost] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

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

  //page
  const postsByPage = 10

  //page
  const indexLastPost = currentPage * postsByPage
  const indexFirstPost = indexLastPost - postsByPage

  //page
  const currentPosts = searchParam ?
    filteredPosts : filteredPosts.slice(indexFirstPost, indexLastPost)

  //page
  const totalPages = Math.ceil(filteredPosts.length / postsByPage)

  //page
  const pageNumbers = [...Array(totalPages).keys()].map((x) => x + 1);

  const handleChangePage = (pageSelected: number) => setCurrentPage(pageSelected)

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
              onChangePage={handleChangePage}
            />
          )

        }
      </main>

    </>
  )
}