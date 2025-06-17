import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/components/form/signup";

const SignUpPage = () => {
  return (
    <Suspense>
      <div className="px-14 pt-20 mb-20  ">
        <div
          className="
        white-blue-bg2 
        "
        >
          <div className="flex flex-col gap-3 w-full lg:px-20">
            <h1 className="text-4xl text-center">Sign Up</h1>
            <p className="text-balance text-muted-foreground text-center">
              Enter your information to create an account
            </p>
            <SignUpForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </div>
          </div>

          <div className="hidden h-[600px] relative bg-muted md:block  w-full  ">
            <Image
              src="/auth/login-image.jpeg"
              alt="Image"
              fill
              className=" w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignUpPage;
