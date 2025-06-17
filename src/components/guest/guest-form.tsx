import React from "react";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { guestPurchaseSchema } from "@/util/schema";
import {
  useGuestImmigrationService,
  useGuestMentorService,
  useGuestPackage,
  useGuestTrainingService,
} from "@/hooks/use-query";
import { AtSign, LoaderCircle, PhoneIcon, User } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

const GuestForm = ({ purchase, id }: { purchase: string; id: string }) => {
  const form = useForm<z.infer<typeof guestPurchaseSchema>>({
    resolver: zodResolver(guestPurchaseSchema),
  });
  const { mutate: packages, isPending: isPackage } = useGuestPackage();
  const { mutate: service, isPending: isService } = useGuestMentorService();
  const { mutate: immigration, isPending: isImmigration } =
    useGuestImmigrationService();
  const { mutate: training, isPending: isTraining } = useGuestTrainingService();
  const onSubmit = (data: z.infer<typeof guestPurchaseSchema>) => {
    if (purchase === "package") {
      packages({ ...data, id });
    }
    if (purchase === "immigration") {
      immigration({ ...data, id });
    }
    if (purchase === "service") {
      service({ ...data, id });
    }
    if (purchase === "training") {
      training({ ...data, id });
    }
  };
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        {purchase === "package" && (
          <DialogTitle className="text-xl font-semibold">
            Our Package
          </DialogTitle>
        )}
        {purchase === "immigration" && (
          <DialogTitle className="text-xl font-semibold">
            Our Immigration Service
          </DialogTitle>
        )}
        {purchase === "service" && (
          <DialogTitle className="text-xl font-semibold">
            Our Mentor Service
          </DialogTitle>
        )}
        {purchase === "training" && (
          <DialogTitle className="text-xl font-semibold">
            Our Training Program
          </DialogTitle>
        )}
      </DialogHeader>
      <Form {...form}>
        <form className=" space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="peer ps-9"
                        placeholder="John"
                        {...field}
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <User size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile no</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="peer ps-9"
                        placeholder="353 ***********"
                        {...field}
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <PhoneIcon
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="peer ps-9"
                        placeholder="example@gmail.com"
                        type="email"
                        {...field}
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end mt-4">
            {isPackage || isImmigration || isService || isTraining ? (
              <Button disabled>
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Processing
              </Button>
            ) : (
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Pay Now
              </Button>
            )}
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default GuestForm;
