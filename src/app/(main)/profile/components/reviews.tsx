import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { EmptyState } from "@/loader/empty-state";

const Reviews = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="reviews">
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Your reviews for mentors</CardDescription>
        </CardHeader>
        <CardContent>
          {user.reviews.length === 0 && (
            <EmptyState
              icon={Star}
              title="No Reviews"
              description="You haven't written any reviews yet. Share your experience with mentors to help others make informed decisions."
            />
          )}
          <div className="space-y-4">
            {user.reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={review.mentor.image} />
                    <AvatarFallback>
                      {review.mentor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.mentor.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(review.createdAt), "PPP")}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      size={25}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.message}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Reviews;
