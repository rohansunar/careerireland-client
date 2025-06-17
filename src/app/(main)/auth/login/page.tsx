import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginImm from "@/components/immigration/LoginImm";

const LoginPage = () => {
  return (
    <Suspense>
      <div className="px-14 pt-20 mb-20  ">
        <div
          className="
        white-blue-bg2 
        "
        >
          <div className="flex flex-col gap-3 w-full lg:px-20 justify-center">
            <h1 className="text-4xl text-center">Login</h1>
            <p className="text-balance text-muted-foreground text-center">
              Enter your email below to login to your account
            </p>
            <LoginImm showInlineError={true} callbackUrl="/" />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline">
                Sign up
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

export default LoginPage;
