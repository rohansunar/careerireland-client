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
import { loginSchema } from "@/util/schema";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface LoginImmProps {
  setLoginError?: (msg: string | null) => void;
  showInlineError?: boolean;
  callbackUrl?: string;
}

const LoginImm: React.FC<LoginImmProps> = ({
  setLoginError,
  showInlineError = false,
  callbackUrl
}) => {
  const params = useSearchParams();
  const urlError = params.get("error");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const finalCallbackUrl = callbackUrl || (typeof window !== 'undefined' ? window.location.href : "/");

    if (setLoginError) {
      // Immigration flow - prevent redirect for better control
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: finalCallbackUrl,
      });

      if (result?.error) {
        setLoginError("Invalid credentials. Please try again.");
      } else {
        setLoginError(null);
        // Redirect on success
        if (result?.url) {
          window.location.href = result.url;
        }
      }
    } else {
      // Standard auth flow - allow NextAuth to handle redirect
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: finalCallbackUrl,
      });
    }
  };

  const otherLogin = async () => {
    const finalCallbackUrl = callbackUrl || (typeof window !== 'undefined' ? window.location.href : "/");
    await signIn("google", {
      callbackUrl: finalCallbackUrl,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {/* Show inline error if enabled and URL error exists */}
        {showInlineError && urlError && (
          <div className="bg-[#ffebe6] p-2 rounded-md text-[#fd381d] text-center text-sm font-medium">
            {urlError}
          </div>
        )}
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
                {showInlineError ? (
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                ) : (
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                )}
              </div>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-base bg-gorgonzolaBlue hover:bg-gorgonzolaBlue/70 py-6"
        >
          Login
        </Button>
        <Button
          onClick={() => otherLogin()}
          type="button"
          variant="outline"
          className="w-full py-6 text-base"
        >
          Login with Google
        </Button>
      </form>
    </Form>
  );
};

export default LoginImm;
