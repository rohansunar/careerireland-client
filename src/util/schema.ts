import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password can't be empty"),
});

export const contactUsSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().email(),
  mobile: z.string().min(1, "Mobile no can't be empty"),
  message: z.string().min(1, "Message can't be empty"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
export const appointmentSchema = z.object({
  mentorCategory: z.string().optional(),
  services: z.string(),
});

export const reviewSchema = z.object({
  message: z.string(),
  rating: z.coerce.number(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export const guestPurchaseSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().email("Please enter a valid email address"),
  mobile_no: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot be longer than 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const deleteAccountSchema = z.object({
  confirmation: z
    .string()
    .min(1, "Please type 'DELETE' to confirm")
    .refine((val) => val === "DELETE", {
      message: "Please type 'DELETE' to confirm",
    }),
});

export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type GuestPurchaseSchema = z.infer<typeof guestPurchaseSchema>;
