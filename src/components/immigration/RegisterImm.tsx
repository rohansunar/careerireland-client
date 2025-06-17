import { ChangeEvent, FormEvent, Suspense } from "react";
import SignUpForm from "@/components/form/signup";

interface RegisterProps {
  formData: {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function RegisterImm({
  formData,
  onChange,
  onSubmit,
}: RegisterProps) {
  return (
    <Suspense>
      <p className="text-balance text-muted-foreground text-center">
        Enter your information to create an account
      </p>
      <SignUpForm />
    </Suspense>
  );
}
