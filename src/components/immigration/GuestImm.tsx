import React from "react";
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
import { guestPurchaseSchema } from "@/util/schema";
import { User, PhoneIcon, AtSign } from "lucide-react";

import { useGuestPurchase } from "./GuestPurchaseContext";

const GuestImm: React.FC = () => {
  const { data, setData } = useGuestPurchase();

  const form = useForm({
    resolver: zodResolver(guestPurchaseSchema),
    defaultValues: data,
  });

  // Sync form values to Context on change
  React.useEffect(() => {
    const subscription = form.watch((value: any) => {
      setData(value);
    });
    return () => subscription.unsubscribe();
  }, [form, setData]);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})}>
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
                      <PhoneIcon size={16} strokeWidth={2} aria-hidden="true" />
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
      </form>
    </Form>
  );
};

export default GuestImm;
