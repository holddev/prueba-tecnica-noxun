import { Comment } from "../types.d"
import './CommentsList.css'

interface Props {
  commentsPost: Comment[]
}

export const CommentsList: React.FC<Props> = ({ commentsPost }) => {
  return (
    <ul className="Detail-ul">
      {
        commentsPost.map(({ id, name, body }) => (
          <li className="Detail-li" key={id}>
            <h4 className="Detail-h4" >{name}</h4>
            <p className="Detail-p" >{body}</p>
          </li>
        ))
      }
    </ul>
  )
}