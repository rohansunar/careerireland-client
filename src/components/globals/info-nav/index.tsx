import React from "react";
import { Mail, MapPin, User } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserMenu from "@/components/globals/info-nav/user-menu";

const InfoNavbar = async () => {
  let session = null;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    // Silently handle JWT decryption errors on initial page load
    session = null;
  }

  return (
    <div className="w-full border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-2">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex items-center gap-6  text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>connect@careerireland.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>109 Windmill Park, Crumlin, Dublin D12Y0YX</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {session ? (
              <UserMenu session={session} />
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2  text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            <Link
              href="/contact-us"
              className="bg-gorgonzolaBlue text-background rounded-full px-4 py-1.5 text-sm hover:bg-gorgonzolaBlue/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoNavbar;
