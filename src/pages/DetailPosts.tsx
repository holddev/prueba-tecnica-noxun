import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Comment, Post } from "../types.d"
import { PostItem } from "../components/PostItem"
import './DetailPosts.css'
import { CommentsList } from "../components/CommentsList"

interface Props {
  searchParam: string
}

export const DetailPost: React.FC<Props> = ({ searchParam }) => {
  const params = useParams()

  const [commentPost, setcommentPost] = useState<Comment[]>([])
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const GENERAL_URL_API = 'https://jsonplaceholder.typicode.com'
    const fetchData = async () => {
      const responses = await Promise.allSettled([
        fetch(`${GENERAL_URL_API}/posts/${params.id}`),
        fetch(`${GENERAL_URL_API}/posts/${params.id}/comments`)
      ])

      const [res1, res2] = responses;

      if (res1.status === "fulfilled") {
        const dataPost = await res1.value.json();
        setPost(dataPost);
      } else {
        console.error("Error fetching the post:", res1.reason);
      }

      if (res2.status === "fulfilled") {
        const dataComment: Comment[] = await res2.value.json();
        setcommentPost(dataComment);
      } else {
        console.error("Error fetching the comments:", res2.reason);
      }

      setIsLoading(false)
    }
    fetchData()

  }, [params.id])

  const filteredComments = commentPost.filter(({ name, body }) => {
    console.log('name: ', name)
    console.log('body: ', name)
    const compare = searchParam.toLowerCase()
    return name.toLowerCase().includes(compare) || body.toLowerCase().includes(compare)
  })


  return (
    <>
      <main className="Detail">
        <div className="Detail-div">
          {
            isLoading ?
              (<span className="Detail-span">Cargando...</span>)
              : (
                <>
                  {
                    post ? (
                      <>
                        <h3 className="Detail-title">Post</h3>
                        <PostItem
                          className="Detail"
                          post={post}
                        />
                      </>
                    ) : (
                      <span className="Detail-span">No se pudo cargar el post</span>
                    )
                  }
                  {
                    filteredComments.length > 0 ? (
                      <>
                        <h3 className="Detail-subtitle">Comments</h3>
                        <CommentsList
                          commentsPost={filteredComments}
                        />
                      </>
                    ) : (
                      <span className="Detail-span">No hay comentarios disponibles.</span>
                    )
                  }
                </>
              )
          }
        </div>
      </main>
    </>
  )
}