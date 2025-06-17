import { imgUrl } from "@/util/urls";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="rounded-xl flex flex-col gap-3 border shadow-md"
    >
      <div className="h-[200px] w-full relative">
        <Image
          src={imgUrl + blog.img}
          fill
          className="object-cover  h-full w-full rounded-t-xl"
          alt="blog image"
          unoptimized
        />
      </div>

      <div className="p-5 flex flex-col gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">{blog.title}</h3>
          <p className="text-gray-600 text-sm">{blog.summary}</p>
          <div className="w-full flex mt-10">
            <button className="text-white text-sm rounded-md bg-gorgonzolaBlue px-4 py-2">
              Read More
            </button>
          </div>
        </div>

        <div className="flexBetween">
          <div className="flex items-center gap-1">
            <User size={20} />
            <p className="text-gray-600 text-xs">{blog.blogger}</p>
          </div>

          <div className="h-5 w-[1px] bg-gray-300 " />

          <p className="text-gray-600 text-xs">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
