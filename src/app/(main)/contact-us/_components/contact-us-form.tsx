"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactUsSchema } from "@/util/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useContactUs } from "@/hooks/use-query";
import Link from "next/link";

const ContactUsForm = () => {
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
  });

  const { mutate, isPending } = useContactUs();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof contactUsSchema>) {
    mutate(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
  }

  const contacts = [
    {
      name: "Phone",
      icon: "/contact-us/phone.svg",
      value: "+353 89 947 1396 ",
      link: "tel:+353899471396",
    },
    // {
    //   name: "Fax",
    //   icon: "/contact-us/fax.svg",
    //   value: "03 5432 1234",
    // },
    {
      name: "Email",
      icon: "/contact-us/email.svg",
      value: "connect@careerireland.com",
      link: "mailto:connect@careerireland.com",
    },
    {
      name: "WhatsApp",
      icon: "/contact-us/whatsapp.svg",
      value: "+353 89 947 1396",
      link: "https://wa.me/353899471396",
    },
  ];

  return (
    <div className=" flex flex-col h-full w-full gap-3 lg:px-0">
      <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left w-full">
        Get in Touch with Career Ireland
      </h3>

      <p className="text-sm md:text-base text-center lg:text-left w-full">
        At Career Ireland, we provide expert guidance to help you build the
        career you&apos;ve always wanted. From CV building and interview prep to
        job search strategies, we&apos;re here to support your journey. We also
        offer immigration services including work permits, visa extensions,
        citizenship support and dependent visas. Whether you&apos;re looking to
        advance in your career or hire top talent, we&apos;re here to help.
        Reach out today and let&apos;s achieve your goals together!
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full h-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="contact-us-input text-sm md:text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="contact-us-input text-sm md:text-base"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="contact-us-input text-sm md:text-base"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="contact-us-input min-h-[120px] text-sm md:text-base"
                    placeholder="Write your message"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs md:text-sm" />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="bg-gorgonzolaBlue w-full text-sm md:text-base font-medium"
          >
            SEND
          </Button>
        </form>
      </Form>

      <div className="flex flex-wrap md:flex-row items-start md:items-center gap-4 w-full mb-[5rem] justify-between">
        {contacts.map((contact, i) => (
          <div
            key={i}
            className="flex items-center md:items-center gap-2 w-full md:w-auto"
          >
            <Image
              src={contact.icon}
              alt={contact.name}
              width={24}
              height={24}
              className="flex-shrink-0"
            />
            <div className="p-3 space-y-0">
              <p className="text-xs lg:text-sm uppercase">{contact.name}</p>
              <p className="text-xs md:text-[0.75rem] lg:text-sm text-gorgonzolaBlue">
                <Link href={contact.link} className="hover:underline">
                  {contact.value}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUsForm;
