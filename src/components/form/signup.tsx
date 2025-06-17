"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/util/schema";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useSignUp } from "@/hooks/use-query";
import Password from "@/components/common/password";

const SignUpForm = () => {
  const params = useSearchParams();
  const error = params.get("error");
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate } = useSignUp();
  const onSubmit: (data: z.infer<typeof signUpSchema>) => void = async (
    data
  ) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...result } = data;
    mutate(result);
  };

  const otherLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-3">
        {error && (
          <div className="bg-red-500 p-2 rounded-md text-white text-center font-semibold">
            Wrong email or password
          </div>
        )}
        <div className="flex items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2 w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="username@gmail.com"
                  {...field}
                  autoComplete="current-email"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                {/* <Input
                  type="password"
                  {...field}
                  autoComplete="current-password"
                /> */}
                <Password field={field} placeholder="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <div className="flex items-center">
                <FormLabel>Confirm Password</FormLabel>
              </div>
              <FormControl>
                {/* <Input
                  type="password"
                  {...field}
                  autoComplete="current-password"
                /> */}
                <Password field={field} placeholder="confirm password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-base bg-gorgonzolaBlue hover:bg-gorgonzolaBlue/70 py-6"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => otherLogin()}
          type="button"
          variant="outline"
          className="w-full py-6  text-base"
        >
          Sign Up with Google
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
