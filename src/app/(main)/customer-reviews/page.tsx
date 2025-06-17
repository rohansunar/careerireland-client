import { getCustomerReviews } from "@/hooks/use-server";
import React from "react";
import HeroSection from "./components/hero-section";
import Reviews from "./components/reviews";

const CustomerReviewsPage = async () => {
  const reviews = await getCustomerReviews();

  return (
    <div>
      <HeroSection />
      <div className="mt-10 space-y-14 mx-auto md:container p-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Customer Reviews</h1>
          <p className="font-semibold text-[#6D7D8B]">
            Hear what our customers have to say!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((el) => (
            <Reviews review={el} key={el.id} />
          ))}
        </div>
        {/* <PaginationForCustomerReview reviews={reviews.length} page={1}/> */}
      </div>
      <div className="h-24" />
    </div>
  );
};

export default CustomerReviewsPage;
