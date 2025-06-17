"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const PaginationForCustomerReview = ({
  page,
  reviews,
}: {
  page: number;
  reviews: number;
}) => {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between gap-3">
        <PaginationItem>
          <Button
            variant="ghost"
            className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-disabled={page === 1 ? true : undefined}
            role={page === 1 ? "link" : undefined}
          >
            <ArrowLeftIcon
              className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-disabled={reviews < 10 ? true : undefined}
            role={reviews < 10 ? "link" : undefined}
          >
            Next
            <ArrowRightIcon
              className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationForCustomerReview;
