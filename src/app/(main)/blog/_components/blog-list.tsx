import BlogCard from "@/components/cards/blog-card";
import React from "react";
import { apiUrl } from "@/util/urls";

export const getBlog = async () => {
  const res = await fetch(`${apiUrl}/blog`, {
    next: {
      tags: ["blog"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TBlog[];
  }
  return [];
};

export default async function BlogList() {
  const blogs = await getBlog();
  return (
    <div className="container  rounded-lg  h-full  w-full  py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 w-full  justify-center">
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </div>
    </div>
  );
}


