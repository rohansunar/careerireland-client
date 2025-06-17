"use client";
import { imgUrl } from "@/util/urls";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useTraining } from "@/hooks/use-query";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GuestForm from "@/components/guest/guest-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const InitiatorCard = ({ item }: { item: ITraining }) => {
  const { data: session } = useSession();
  const { mutate, isPending } = useTraining();
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="space-y-4 ">
        <CardHeader>
          <CardTitle className="text-black text-sm lg:text-xl text-center font-bold w-full">
            {item.name}
          </CardTitle>
        </CardHeader>
        <div className="h-[200px] md:h-[250px] w-full relative ">
          <Image
            src={imgUrl + item.img}
            fill
            alt="initiator"
            className="rounded-sm w-full object-cover h-full"
            unoptimized
          />
        </div>

        <ul className="list-disc list-outside  px-5">
          {item.service.map((point: string, i: number) => (
            <li key={i} className="text-sm ">
              {point}
            </li>
          ))}
        </ul>

        <p className="text-sm lg:text-base font-bold">Key Highlights</p>

        <ul className="list-disc list-outside px-4">
          {item.highlights.map((highlight: string, i: number) => (
            <li key={i} className="text-sm ">
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="w-full flex flex-col space-y-3">
        <div className="flex items-center justify-center mt-4 border-t pt-4 w-full" />
        {session ? (
          <Button
            onClick={() => mutate({ trainingId: item.id })}
            disabled={isPending}
            className="w-full"
          >
            Buy Now – €{item.amount}
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger className="bg-gorgonzolaBlue text-white p-3 rounded-md w-full">
              Buy Now – €{item.amount}
            </DialogTrigger>
            <GuestForm purchase="training" id={item.id} />
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default InitiatorCard;
