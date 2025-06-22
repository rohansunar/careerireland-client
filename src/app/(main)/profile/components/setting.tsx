"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import ChangePassword from "./change-password";

const Setting = ({ user }: { user: IProfile }) => {
  return (
    <DropdownMenuContent className="w-56 ">
      <div>
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </div>
      <DropdownMenuItem className="cursor-pointer" asChild>
        <ChangePassword />
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">
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
  );
};

export default Setting;
