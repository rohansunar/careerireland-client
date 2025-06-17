"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentSchema } from "@/util/schema";
import { useSession } from "next-auth/react";
import { useMentorService } from "@/hooks/use-query";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GuestForm from "@/components/guest/guest-form";

const AppointmentForm = ({ mentor }: { mentor: TMentorInfo }) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      services: mentor.services[0].id,
    },
  });

  const { mutate, isPending } = useMentorService();

  function onSubmit(data: z.infer<typeof appointmentSchema>) {
    mutate({ serviceId: data.services });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 border rounded-xl lg:p-10 p-4"
      >
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mentor Services</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Services" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mentor.services.map((el) => (
                    <SelectItem key={el.id} value={el.id}>
                      {el.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm bg-[#f5f5f5] p-2 rounded-lg">
          {
            mentor.services.find((item) => item.id === form.watch("services"))
              ?.description
          }
        </p>
        <div className="flex justify-center">
          {session ? (
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gorgonzolaBlue rounded-full hover:bg-gorgonzolaBlue"
            >
              Book Appointment - €
              {
                mentor.services.find(
                  (item) => item.id === form.watch("services")
                )?.price
              }
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger
                asChild
                className="bg-gorgonzolaBlue  hover:bg-gorgonzolaBlue p-2 rounded-full text-white  test-sm px-4"
              >
                <Button
                  type="button"
                  disabled={isPending}
                  className="bg-gorgonzolaBlue rounded-full hover:bg-gorgonzolaBlue"
                >
                  Book Appointment - €
                  {
                    mentor.services.find(
                      (item) => item.id === form.watch("services")
                    )?.price
                  }
                </Button>
              </DialogTrigger>
              <GuestForm purchase="service" id={form.watch("services")} />
            </Dialog>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
