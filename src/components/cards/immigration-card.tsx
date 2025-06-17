"use client";
import { useImmigrationService } from "@/hooks/use-query";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";


const ImmigrationCard = ({
  packageDetails,
  index,
}: {
  packageDetails: TImmigration;
  index: number;
}) => {
  const { data: session } = useSession();
  const { mutate, isPending } = useImmigrationService();
  const router = useRouter();
  return (
    <div
      className="rounded-lg p-4 flex flex-col h-full border space-y-4"
      style={{
        backgroundColor: index === 0 ? "#FF783E26" : "transparent",
      }}
    >
      {/* Header Section - Fixed Height */}
      <div className=" space-y-4">
        <p className="text-sm lg:text-base font-bold">{packageDetails.name}</p>
      </div>

      {/* Price Section - Fixed Height */}
      <div className="min-h-[48px] flex items-center gap-2">
        <h3 className="text-3xl font-semibold">€{packageDetails.amount}</h3>
        <span className="text-xs text-gray-500">VAT included</span>
      </div>

      {/* Features Section - Takes remaining space */}
      <div className="flex-grow ">
        <div className="space-y-3">
          {packageDetails.service.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="h-5 w-5 flex-shrink-0">
                <div
                  className={`rounded-sm h-full w-full flex items-center justify-center
                    ${index === 0 ? "bg-preciousPersimmon" : "bg-[#F2F2F2]"}`}
                >
                  <Check
                    size={16}
                    className={`w-full ${index === 2 ? "text-white" : "text-gray-500"}`}
                  />
                </div>
              </div>
              <p className="text-sm">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button Section - Fixed Height */}
      <div className="h-[48px] mt-4">
        {session ? (
          <Button
            onClick={() => mutate({ immigration_serviceId: packageDetails.id })}
            disabled={isPending}
            className={`w-full h-full text-sm lg:text-base rounded-full
              ${
                index === 0
                  ? "bg-preciousPersimmon text-white"
                  : "border-2 bg-white text-black hover:border-0 hover:bg-preciousPersimmon hover:text-white"
              }
            `}
          >
            Get Started
          </Button>
        ) : (
          <Dialog>
            <Button
              onClick={() =>
                router.push(
                  `/checkout?purchase=immigration&price=${packageDetails.amount}&name=${packageDetails.name}&id=${packageDetails.id}`
                )
              }
              className={`w-full h-full rounded-lg text-base font-medium flex items-center justify-center
            ${
              index === 0
                ? "bg-preciousPersimmon hover:bg-orange-600 text-white"
                : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-preciousPersimmon hover:border-transparent hover:text-white"
            }
          `}
            >
              Get Started
            </Button>

            {/* <DialogContent>
              <Checkout purchase="immigration" id={packageDetails.id} />
            </DialogContent> */}
            {/* <GuestForm purchase="immigration" id={packageDetails.id} /> */}
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ImmigrationCard;
