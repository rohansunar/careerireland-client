import React from "react";
import { apiUrl } from "@/util/urls";
import { CommentSection } from "./components/comments";

export const getBlogSlug = async (slug: string) => {
  const res = await fetch(`${apiUrl}/blog/${slug}`, {
    next: {
      tags: ["blog", slug],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TBlog;
  }
  return null;
};
export const getComments = async (blogId: string) => {
  const res = await fetch(`${apiUrl}/comment/${blogId}?page=0&limit=0`, {
    next: {
      tags: ["comments", blogId],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as IComment[];
  }
  return [];
};

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const data = await getBlogSlug(params.slug);
  const comments = await getComments(data?.id || "");

  return (
    <div className="p-4 max-w-6xl mx-auto w-full py-24 space-y-8">
      <div
        className="prose-sm lg:prose-base "
        dangerouslySetInnerHTML={{ __html: data?.desc || "" }}
      />

      <div className="border-t pt-8">
        <CommentSection comments={comments} blogId={data?.id as string} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
