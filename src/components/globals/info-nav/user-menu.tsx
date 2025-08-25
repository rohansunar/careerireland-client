"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isValidUrl } from "@/util/tools";
import { imgUrl } from "@/util/urls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const UserMenu = ({ session }: { session: any }) => {
  // Helper function to get user initials safely
  const getUserInitials = (name: string | null | undefined): string => {
    if (!name || typeof name !== 'string') {
      return 'U'; // Default fallback for undefined/null names
    }
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      return 'U'; // Default fallback for empty names
    }
    return trimmedName.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              isValidUrl(session?.user?.image || "")
                ? `${session.user.image}`
                : `${imgUrl}${session?.user?.image || ""}`
            }
            alt={session?.user?.name || "User"}
          />
          <AvatarFallback>
            {getUserInitials(session?.user?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            href={"/profile"}
            className="text-gorgonzolaBlue flex items-center"
          >
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <div
            className="text-gorgonzolaBlue flex items-center"
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
