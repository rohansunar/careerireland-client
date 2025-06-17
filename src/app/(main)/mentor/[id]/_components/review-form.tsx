"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewSchema } from "@/util/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, StarIcon } from "lucide-react";
import { useReview } from "@/hooks/use-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReviewForm = ({ mentorId }: { mentorId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });
  const { mutate, isPending } = useReview();
  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    mutate({ ...data, mentorId });
    form.reset({
      message: undefined,
      rating: 0,
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 p-2 lg:p-5"
          >
            <h2 className="text-xl lg:text-2xl font-semibold">
              Write a Review
            </h2>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Your Review
                  </FormLabel>
                  <FormDescription>
                    User Login is required for submitting review.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Share your experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Rating
                  </FormLabel>
                  <FormControl>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= field.value
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <Button
                disabled
                className="w-full button hover:bg-gorgonzolaBlue"
              >
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Processing
              </Button>
            ) : (
              <>
                {session ? (
                  <Button
                    type="submit"
                    className="w-full button hover:bg-gorgonzolaBlue"
                  >
                    Submit Review
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => router.push("/auth/login")}
                    className="w-full button hover:bg-gorgonzolaBlue"
                  >
                    Submit Review
                  </Button>
                )}
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
