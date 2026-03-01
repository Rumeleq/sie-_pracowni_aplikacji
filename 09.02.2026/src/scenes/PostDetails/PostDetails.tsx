import type Post from "../../types/Post";
import type User from "../../types/User";
import type Comment from "../../types/Comment";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "../PostDetails/PostDetails.module.scss";

function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery<Comment[]>({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<User>({
    queryKey: ["user", post?.userId],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post?.userId}`,
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!post?.userId,
  });

  const isLoading = isPostLoading || isCommentsLoading || isUserLoading;
  const isError = isPostError || isCommentsError || isUserError;

  return (
    <div className={styles.Posts}>
      {isLoading && <p>Trwa loading szczegółów...</p>}
      {isError && <p>Trwa błąd ładowania danych.</p>}

      {!isLoading && !isError && post && (
        <>
          <div className="post-container">
            <div className="post-author">
              <p>Autor: {user?.username}</p>
            </div>
            <div className={styles.PostsElement}>
              <h5 className={styles.PostsElementTitle}>{post?.title}</h5>
              <p className={styles.PostsElementBody}>{post?.body}</p>
            </div>
          </div>

          <div className="comments-container">
            <h3>Komentarze:</h3>
            {comments?.map((comment) => (
              <div className="comment-item" key={comment.id}>
                <p>
                  <strong>{comment.name.substring(0, 10)}</strong> (
                  {comment.email})
                </p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetails;
