import { CommentItem } from "./comment-item";

interface CommentListProps {
  comments: IComment[];
  onReply: (commentId: string) => void;
  replyingTo: string | null;
  onSubmitReply: (content: string, parentId: string) => void;
  level?: number;
}

export function CommentList({
  comments,
  onReply,
  replyingTo,
  onSubmitReply,
  level = 0,
}: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          replyingTo={replyingTo}
          onSubmitReply={onSubmitReply}
          level={level}
        />
      ))}
    </div>
  );
}
