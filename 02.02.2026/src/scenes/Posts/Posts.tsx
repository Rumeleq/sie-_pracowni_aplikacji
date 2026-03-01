import type Post from "../../types/Post"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import megamind from "../../assets/megamind.png"
import styles from "./Posts.module.scss"

function Posts() {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data as Array<Post>)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className={styles.Posts}>
      {isLoading && <p>Trwa loading...</p>}
      {isError && <p>Trwa błąd.</p>}
      {!isLoading && !isError && (
        <>
          {posts.length === 0 && (
            <div className={styles.PostsError}>
              No wpises? <img src={megamind} alt="megamind" />
            </div>
          )}
          {posts.map(post => (
            <div
              className={styles.PostsElement}
              key={post.id}
            >
              <h5 className={styles.PostsElementTitle}>
                {post.title}
              </h5>
              <p className={styles.PostsElementBody}>
                {post.body.substring(0, 67)}...
              </p>
              <Link to={'/wpises/wpis/' + post.id} className={styles.PostsElementLink}>
                Przejdź do wpisó
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Posts