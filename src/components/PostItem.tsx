import { Post } from "../types"
import './PostItem.css'

interface Props {
  post: Post
  className: string
}

export const PostItem: React.FC<Props> = ({ post, className }) => {
  const { title, body } = post
  return (
    <article className={`${className}-article`}>
      <h3 className={`${className}-h3`}>{title}</h3>
      <p className={`${className}-p`}>{body}</p>
    </article>
  )
}