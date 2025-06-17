"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the form schema with validation
const formSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
});

type FormValues = z.infer<typeof formSchema>;

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export function CommentForm({
  onSubmit,
  placeholder = "Write a comment...",
  buttonText = "Post Comment",
}: CommentFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(values.content);
      form.reset();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          {session ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : buttonText}
            </Button>
          ) : (
            <Button type="button" onClick={() => router.push("/auth/login")}>
              Post Comment
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
