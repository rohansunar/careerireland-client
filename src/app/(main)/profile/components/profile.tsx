"use client";

import React from "react";
import { format } from "date-fns";
import { Mail, Settings2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Setting from "./setting";

const Profile = ({ user }: { user: IProfile }) => {
  return (
    <>
      <Card className="max-w-md mx-auto rounded-xl shadow-lg border border-gray-200">
        <CardContent className="p-8 flex flex-col items-center space-y-6">
          <Avatar className="w-28 h-28 border-4 border-indigo-500 shadow-lg">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback className="text-4xl bg-indigo-100 text-indigo-700 font-semibold uppercase">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {user.name}
            </h1>
            <div className="inline-flex items-center gap-2 text-indigo-600 font-medium">
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>{user.email}</span>
            </div>
            <p className="text-gray-500 text-sm">
              Member since {format(new Date(user.createdAt), "MMMM yyyy")}
            </p>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-indigo-400 hover:bg-indigo-50 text-indigo-700"
                aria-label="Account Settings"
                title="Account Settings"
              >
                <Settings2 className="w-5 h-5" />
                Account Settings
              </Button>
            </DropdownMenuTrigger>
            <Setting user={user} />
          </DropdownMenu>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
