"use client";

import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { CommentForm } from "@/app/(main)/blog/[slug]/components/comment-form";
import { isValidUrl } from "@/util/tools";
import { imgUrl } from "@/util/urls";

interface CommentItemProps {
  comment: IComment;
  onReply: (commentId: string) => void;
  replyingTo: string | null;
  onSubmitReply: (content: string, parentId: string) => void;
  level: number;
}

export function CommentItem({
  comment,
  onReply,
  replyingTo,
  onSubmitReply,
  level,
}: CommentItemProps) {
  // Format the date to a relative time (e.g., "2 hours ago")
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="group">
      <div className="flex gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={
              isValidUrl(comment.author.image || "")
                ? `${comment.author.image}`
                : `${imgUrl}${comment.author.image}`
            }
            alt={comment.author.name}
          />
          <AvatarFallback>
            {comment.author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>

          <div className="text-sm">{comment.content}</div>

          {/* Only show reply button for top-level comments (level 0) */}
          {level === 0 && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => onReply(comment.id)}
              >
                <MessageSquare className="mr-1 h-3 w-3" />
                Reply
              </Button>
            </div>
          )}

          {/* Reply form - only for top-level comments */}
          {level === 0 && replyingTo === comment.id && (
            <div className="mt-4">
              <CommentForm
                onSubmit={(content) => onSubmitReply(content, comment.id)}
                placeholder="Write a reply..."
                buttonText="Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Render replies - simplified since replies are only at one level */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 md:pl-12 border-l-2 border-[#404bd0]/10">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mb-4">
              <CommentItem
                comment={reply}
                onReply={onReply}
                replyingTo={replyingTo}
                onSubmitReply={onSubmitReply}
                level={level + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
