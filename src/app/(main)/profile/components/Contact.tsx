"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useContactUs } from "@/hooks/use-query";
import { contactUsSchema } from "@/util/schema";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

const Contact: React.FC = () => {
  const { data: session } = useSession();
  const { mutate: submitContactForm, isPending } = useContactUs();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Initialize form with validation schema
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  // Auto-populate user data when session is available
  useEffect(() => {
    if (session?.user) {
      form.setValue("name", session.user.name || "");
      form.setValue("email", session.user.email || "");
    }
  }, [session, form]);

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof contactUsSchema>) => {
    submitContactForm(values, {
      onSuccess: () => {
        setShowSuccessDialog(true);
        form.reset({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          mobile: "",
          message: "",
        });
      },
    });
  };

  // Close success dialog
  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-md min-h-[400px]">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Have questions about your immigration application or need
                  assistance? We&apos;re here to help you every step of the way.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">connect@careerireland.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+353 89 947 1396</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        Dublin, Ireland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Name *"
                              {...field}
                              className="text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
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
                              placeholder="Email *"
                              type="email"
                              {...field}
                              className="text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
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
                              placeholder="Phone Number *"
                              {...field}
                              className="text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
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
                              placeholder="Write your message *"
                              rows={5}
                              {...field}
                              className="text-sm min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full flex items-center gap-2 bg-gorgonzolaBlue hover:bg-gorgonzolaBlue/90"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        onConfirm={handleCloseSuccessDialog}
        title="Message Sent Successfully!"
        description="Thank you for contacting us. We'll get back to you within 24 hours."
        confirmText="OK"
        variant="default"
      />
    </>
  );
};

export default Contact;
