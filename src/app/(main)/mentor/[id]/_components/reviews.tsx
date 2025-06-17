import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getReviews } from "@/hooks/use-server";
import { isValidUrl } from "@/util/tools";
import { imgUrl } from "@/util/urls";
import { Star } from "lucide-react";
import React from "react";

const Reviews = async ({ mentorId }: { mentorId: string }) => {
  const data = await getReviews(mentorId);
  return (
    <>
      {data.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <p className="text-gray-500">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      )}
      <div className="space-y-4">
        {data.map((el) => (
          <Card key={el.id} className="p-0">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-10 h-10  rounded-full bg-[#f8f8f8] dark:bg-[#18181b] cursor-pointer">
                  <AvatarImage
                    src={
                      isValidUrl(el.user.image || "")
                        ? `${el.user.image}`
                        : `${imgUrl}${el.user.image}`
                    }
                    alt={el.user.name}
                    className=" rounded-md object-contain"
                  />
                  <AvatarFallback>
                    {el.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900 capitalize">
                    {el.user.name}
                  </h3>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= el.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{el.message}</p>
              <div className="mt-2 text-sm text-gray-500">
                {new Date(el.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Reviews;
