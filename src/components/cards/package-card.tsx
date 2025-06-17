"use client";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { usePackage } from "@/hooks/use-query";
import { Dialog, DialogTrigger } from "../ui/dialog";
import GuestForm from "../guest/guest-form";
import { Badge } from "../ui/badge";

// PackageCard.tsx
const PackageCard = ({
  packageDetails,
  index,
}: {
  packageDetails: TPackage;
  index: number;
}) => {
  const { data: session } = useSession();
  const { mutate, isPending } = usePackage();

  return (
    <div
      className="rounded-xl p-6 flex flex-col justify-between gap-4 border border-gray-400 
      w-full h-full bg-white hover:shadow-lg transition-all duration-300"
      style={{
        backgroundColor: index === 0 ? "rgba(255, 120, 62, 0.08)" : "#fff",
      }}
    >
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-900">
          {packageDetails.name}
        </p>

        {index === 0 && (
          <Badge className="rounded-full bg-preciousPersimmon hover:bg-preciousPersimmon ">
            Best Value Plan
          </Badge>
        )}

        <div className="flex items-center gap-x-3">
          <h3 className="text-3xl font-bold text-gray-900">
            €{packageDetails.amount}
          </h3>
          <span className="text-xs text-gray-500">VAT included</span>
        </div>

        {packageDetails.note && (
          <p className="text-sm text-gray-500">{packageDetails.note}</p>
        )}
      </div>

      <div className="flex-1 py-4 space-y-4">
        <div className="space-y-3">
          {packageDetails.service.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-5 w-5 flex-shrink-0">
                <div
                  className={`rounded-sm h-5 w-5 flex items-center justify-center 
                  ${index === 0 ? "bg-preciousPersimmon" : "bg-gray-100"}`}
                >
                  <Check
                    size={16}
                    className={`${index === 2 ? "text-white" : "text-gray-600"}`}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-snug">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {session ? (
        <Button
          onClick={() => mutate({ packageId: packageDetails.id })}
          disabled={isPending}
          className={`w-full rounded-lg text-base font-medium transition-all
            ${
              index === 0
                ? "bg-preciousPersimmon hover:bg-orange-600 text-white"
                : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-preciousPersimmon hover:border-transparent hover:text-white"
            }
            h-12`}
        >
          Get Started
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger
            className={`w-full rounded-lg text-base font-medium text-center flex items-center justify-center
            ${
              index === 0
                ? "bg-preciousPersimmon hover:bg-orange-600 text-white"
                : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-preciousPersimmon hover:border-transparent hover:text-white"
            }
            h-12 transition-all`}
          >
            Get Started
          </DialogTrigger>
          <GuestForm purchase="package" id={packageDetails.id} />
        </Dialog>
      )}
    </div>
  );
};

export default PackageCard;
