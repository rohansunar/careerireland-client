"use client";
import React from "react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import { useResendOTP, useVerify } from "@/hooks/use-query";

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const [otp, setOtp] = useState("");
  const { mutate: verify, isPending: isVerify } = useVerify();
  const { mutate: resend, isPending: isResend } = useResendOTP();
  const handleSubmit = () => {
    if (otp.length === 6) {
      verify({
        otp,
        token: searchParams.token,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MailCheck className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification code to your email address. Please
            enter it below.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <input type="hidden" name="otp" value={otp} />
              {/* {message && (
                <div
                  className={`text-sm ${
                    message.success ? "text-green-600" : "text-destructive"
                  }`}
                >
                  {message.message}
                </div>
              )} */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gorgonzolaBlue hover:bg-gorgonzolaBlue/70"
              disabled={otp.length !== 6 || isVerify}
            >
              {isVerify ? "Verifying..." : "Verify Email"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-sm  text-muted-foreground "
              onClick={() => resend({ token: searchParams.token })}
              disabled={isResend}
            >
              Didn&apos;t receive a code? Resend
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default VerifyPage;
