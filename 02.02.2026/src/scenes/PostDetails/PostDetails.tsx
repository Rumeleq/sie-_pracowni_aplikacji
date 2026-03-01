import type Post from "../../types/Post"
import type User from "../../types/User"
import type Comment from "../../types/Comment"
import {useEffect, useState} from "react"
import styles from "../PostDetails/PostDetails.module.scss"
import {useParams} from "react-router-dom";

function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Array<Comment>>([])

  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchPostDetailsData = async () => {
      setLoading(true)
      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await postResponse.json()
        setPost(data)

        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
        const userData = await userResponse.json()
        setUser(userData)

        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        const commentsData = await commentsResponse.json()
        setComments(commentsData)
      }
      catch (error) {
        console.error('Error fetching post details:', error)
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    fetchPostDetailsData()
  }, [id])


  return (
    <div className={styles.Posts}>
      {isLoading && <p>Trwa loading...</p>}
      {isError && <p>Trwa błąd.</p>}
      {!isLoading && !isError && (
        <>
        <div className="post-container">
          <div className="post-author">
            <p>Autor: {user?.username}</p>
          </div>
          <div
            className={styles.PostsElement}
            key={post?.id}
          >
            <h5 className={styles.PostsElementTitle}>
              {post?.title}
            </h5>
            <p className={styles.PostsElementBody}>
              {post?.body}
            </p>
          </div>
        </div>

        <div className="comments-container">
          <h3>Komentarze:</h3>
          {comments.map(comment => (
            <div className="comment-item" key={comment.id}>
              <p><strong>{comment.name.substring(0, 10)}</strong> ({comment.email})</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default PostDetails