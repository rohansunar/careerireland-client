"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Linkedin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import React from "react";
import { imgUrl } from "@/util/urls";

const Reviews = ({ review }: { review: ICustomerReview }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to truncate text and add "Read more" button
  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;

    if (!expanded) {
      return (
        <div>
          {text.substring(0, maxLength)}...
          <div className="mt-2">
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => setExpanded(true)}
            >
              Read more
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {text}
        <div className="mt-2">
          <Button
            variant="link"
            className="p-0 h-auto text-primary"
            onClick={() => setExpanded(false)}
          >
            Show less
          </Button>
        </div>
      </div>
    );
  };

  // Function to render star rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const formattedDate = format(new Date(review.date), "MMM d, yyyy");

  return (
    <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow  flex flex-col justify-between">
      <CardContent className="space-y-2">
        <CardHeader className=" px-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={`${imgUrl}${review.img}`} alt={review.name} />
              <AvatarFallback>
                {review.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{review.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(review.rating)}
              </div>
            </div>
          </div>
        </CardHeader>
        <div className="text-sm text-muted-foreground">
          {truncateText(review.comment)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 text-xs text-muted-foreground gap-2">
        <Badge
          variant="outline"
          className="flex items-center gap-1 font-normal rounded-full"
        >
          {getSourceIcon(review.source)}
          {review.source}
        </Badge>
        <span>{formattedDate}</span>
      </CardFooter>
    </Card>
  );
};

export default Reviews;

// Function to get source icon
const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case "linkedin":
      return <Linkedin className="h-4 w-4 text-[#0A66C2]" />;
    case "whatsapp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[#25D366]"
        >
          <path d="M17.6 6.8A7.8 7.8 0 0 0 12 4c-4.4 0-8 3.6-8 8 0 1.4.4 2.8 1 4l-1 4 4.2-1c1.2.6 2.6 1 4 1 4.4 0 8-3.6 8-8 0-2.2-.8-4.2-2.6-5.8z" />
          <path d="M12 17.5c-1.4 0-2.8-.4-4-1l-.3-.2-3 .8.8-3-.2-.3a6.3 6.3 0 0 1-1-3.5 6.3 6.3 0 0 1 6.3-6.3c1.7 0 3.3.7 4.5 1.9a6.3 6.3 0 0 1 1.9 4.5 6.5 6.5 0 0 1-6.5 6.5z" />
          <path d="M15 12.7a1 1 0 0 0-.5-.4l-1.5-.6v-.8c0-.4-.2-.6-.4-.7a5.5 5.5 0 0 0-2.7 0c-.2 0-.4.3-.4.7v.8L8 12.3a1 1 0 0 0-.5.4c0 .4.7.8 1.5 1.1.8.4 1.6.5 2 .5.4 0 1.2-.1 2-.5.8-.3 1.5-.7 1.5-1.1z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[#1DA1F2]"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    case "google":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="-3 0 262 262"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
      );
    case "gmail":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[#EA4335]"
        >
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "email":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[#EA4335]"
        >
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[#E4405F]"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    default:
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
  }
};
