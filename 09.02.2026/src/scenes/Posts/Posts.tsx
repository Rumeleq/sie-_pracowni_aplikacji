import type Post from "../../types/Post";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import megamind from "../../assets/megamind.png";
import styles from "./Posts.module.scss";

function Posts() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (!response.ok) throw new Error("Błąd pobierania postów");
      return response.json();
    },
  });

  return (
    <div className={styles.Posts}>
      {isLoading && <p>Trwa loading...</p>}
      {isError && <p>Trwa błąd.</p>}
      {!isLoading && !isError && posts && (
        <>
          {posts.length === 0 && (
            <div className={styles.PostsError}>
              No wpises? <img src={megamind} alt="megamind" />
            </div>
          )}
          {posts.map((post) => (
            <div className={styles.PostsElement} key={post.id}>
              <h5 className={styles.PostsElementTitle}>{post.title}</h5>
              <p className={styles.PostsElementBody}>
                {post.body.substring(0, 67)}...
              </p>
              <Link
                to={"/wpises/wpis/" + post.id}
                className={styles.PostsElementLink}
              >
                Przejdź do wpisu
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
