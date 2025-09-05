import { CommentComponent } from "../comment/comment.component";

export const ProductComments = ({ comments, isLoading, error }) => {
    if (isLoading) return <div>Loading comments...</div>;
    if (error) return <div>Error loading comments: {error.message}</div>;
    if (!comments || comments.length === 0) return <div>No comments yet.</div>;

    return (
        <div>
            {comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment.comment} user={comment.user} />
            ))}
        </div>
    );
}