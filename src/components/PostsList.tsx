import { Link } from "react-router-dom"
import { Post } from "../types.d"
import { PostItem } from "./PostItem"
import './PostsList.css'

interface Props {
  currentPosts: Post[]
}

export const PostsList: React.FC<Props> = ({ currentPosts }) => {
  return (
    <ul className="Posts">
      {
        currentPosts.map((post) => (
          <li className="Posts-li" key={post.id}>
            <Link className="Posts-link" to={`/detail/${post.id}`} >
              <PostItem
                className="Posts"
                post={post}
              />
            </Link>
          </li>
        ))
      }
    </ul>
  )
}