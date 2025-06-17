"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { useComment } from "@/hooks/use-query";

export function CommentSection({
  comments,
  blogId,
}: {
  comments: IComment[];
  blogId: string;
}) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { mutate } = useComment();

  const addComment = (content: string, parentId: string | null = null) => {
    if (!parentId) {
      mutate({
        content,
        blogId,
      });
    } else {
      mutate({
        content,
        blogId,
        parentId,
      });
    }
    setReplyingTo(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Leave a comment</h3>
        <CommentForm onSubmit={(content) => addComment(content)} />
      </div>
      <CommentList
        comments={comments}
        onReply={(commentId) => setReplyingTo(commentId)}
        replyingTo={replyingTo}
        onSubmitReply={(content, parentId) => addComment(content, parentId)}
      />
    </div>
  );
}
